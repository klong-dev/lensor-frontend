'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { X, Plus, Upload, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PresetItem, PresetUploadModalProps } from '@/types/marketplace'
import { resizeImage } from '@/utils/imageTools'


export default function PresetUploadModal({ isOpen, onClose, onSave, existingItems = [] }: PresetUploadModalProps) {
    const [items, setItems] = useState<PresetItem[]>(existingItems)
    const [currentItem, setCurrentItem] = useState<{
        beforeImage?: File
        afterImage?: File
        presetFile?: File
        beforePreview?: string
        afterPreview?: string
    }>({})
    const [isProcessing, setIsProcessing] = useState(false)

    const handleImageUpload = async (type: 'before' | 'after', e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsProcessing(true)
        try {
            const preview = await resizeImage(file)
            setCurrentItem(prev => ({
                ...prev,
                [`${type}Image`]: file,
                [`${type}Preview`]: preview
            }))
        } catch (error) {
            console.error('Error processing image:', error)
            toast.error('Failed to process image')
        } finally {
            setIsProcessing(false)
        }
    }

    const handlePresetFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setCurrentItem(prev => ({ ...prev, presetFile: file }))
        }
    }

    const handleAddItem = () => {
        if (!currentItem.beforeImage || !currentItem.afterImage || !currentItem.presetFile) {
            toast.error('Please upload all required files (before image, after image, and preset file)')
            return
        }

        const newItem: PresetItem = {
            id: Date.now().toString(),
            beforeImage: currentItem.beforeImage,
            afterImage: currentItem.afterImage,
            presetFile: currentItem.presetFile,
            beforePreview: currentItem.beforePreview!,
            afterPreview: currentItem.afterPreview!,
            presetFileName: currentItem.presetFile.name
        }

        setItems(prev => [...prev, newItem])
        setCurrentItem({})
        toast.success('Preset item added successfully!')
    }

    const handleRemoveItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
        toast.info('Item removed')
    }

    const handleConfirm = () => {
        if (items.length === 0) {
            toast.error('Please add at least one preset item')
            return
        }
        onSave(items)
        onClose()
    }

    const handleClose = () => {
        if (items.length > 0) {
            onSave(items)
        }
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload Preset Items</DialogTitle>
                    <DialogDescription>
                        Add preset items with before/after images and preset files. Each item represents one preset variation.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {items.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold">Added Items ({items.length})</h3>
                            <div className="grid gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium mb-2">Preset: {item.presetFileName}</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-1">Before</p>
                                                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                                                            <Image
                                                                src={item.beforePreview}
                                                                alt="Before"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-1">After</p>
                                                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                                                            <Image
                                                                src={item.afterPreview}
                                                                alt="After"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="ml-2"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="text-sm font-semibold">Add New Preset Item</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="before-image">Before Image *</FieldLabel>
                                <Input
                                    id="before-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload('before', e)}
                                    disabled={isProcessing}
                                />
                                {currentItem.beforePreview && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border mt-2">
                                        <Image
                                            src={currentItem.beforePreview}
                                            alt="Before preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-green-500  rounded-full p-1">
                                            <Check className="h-3 w-3" />
                                        </div>
                                    </div>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="after-image">After Image *</FieldLabel>
                                <Input
                                    id="after-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload('after', e)}
                                    disabled={isProcessing}
                                />
                                {currentItem.afterPreview && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border mt-2">
                                        <Image
                                            src={currentItem.afterPreview}
                                            alt="After preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                            <Check className="h-3 w-3" />
                                        </div>
                                    </div>
                                )}
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="preset-file">Preset File *</FieldLabel>
                            <Input
                                id="preset-file"
                                type="file"
                                accept=".xmp,.cube,.dng,.lrtemplate,.dcp"
                                onChange={handlePresetFileUpload}
                            />
                            <FieldDescription>
                                Accepted formats: .xmp, .cube, .dng, .lrtemplate, .dcp
                            </FieldDescription>
                            {currentItem.presetFile && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                                    <Check className="h-4 w-4" />
                                    {currentItem.presetFile.name}
                                </div>
                            )}
                        </Field>

                        <Button
                            type="button"
                            onClick={handleAddItem}
                            disabled={isProcessing || !currentItem.beforeImage || !currentItem.afterImage || !currentItem.presetFile}
                            className="w-full"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add This Preset Item
                        </Button>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} disabled={items.length === 0}>
                            <Upload className="h-4 w-4 mr-2" />
                            Confirm ({items.length} item{items.length !== 1 ? 's' : ''})
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
