'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { marketplaceApi } from '@/lib/apis/marketplaceApi'
import { PresetItem } from '@/types/marketplace'
import { Eye, NotepadText, Palette, Paperclip, Upload } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import PresetUploadModal from './preset-upload-modal'
import { COMPATIBILITY_OPTIONS, FEATURES_OPTIONS, SPECIFICATIONS_OPTIONS } from '@/constants/productOptions'

export default function CreateForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [displayPrice, setDisplayPrice] = useState<string>("")
    const [originalPrice, setOriginalPrice] = useState('')
    const [displayOriginalPrice, setDisplayOriginalPrice] = useState<string>("")
    const [category, setCategory] = useState('Presets')
    const [tags, setTags] = useState('')
    const [compatibility, setCompatibility] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>([])
    const [specifications, setSpecifications] = useState({
        adjustments: [] as string[],
        bestFor: [] as string[],
        difficulty: ''
    })
    const [presetItems, setPresetItems] = useState<PresetItem[]>([])
    const [priceError, setPriceError] = useState('')
    const [originalPriceError, setOriginalPriceError] = useState('')

    const handleCompatibilityChange = (option: string, checked: boolean) => {
        setCompatibility(prev =>
            checked ? [...prev, option] : prev.filter(item => item !== option)
        )
    }

    const handleFeatureChange = (option: string, checked: boolean) => {
        setFeatures(prev =>
            checked ? [...prev, option] : prev.filter(item => item !== option)
        )
    }

    const handleSpecificationChange = (type: 'adjustments' | 'bestFor', option: string, checked: boolean) => {
        setSpecifications(prev => ({
            ...prev,
            [type]: checked
                ? [...prev[type], option]
                : prev[type].filter(item => item !== option)
        }))
    }

    const handleSavePresetItems = (items: PresetItem[]) => {
        setPresetItems(items)
        toast.success(`${items.length} preset item(s) added successfully!`)
    }

    const handlePriceChange = (value: string) => {
        try {
            if (value && !/^[\d.]*$/.test(value)) {
                setPriceError('Please enter a valid number')
                return
            }

            const numericValue = value.replace(/\D/g, "");

            if (numericValue === '') {
                setPrice('')
                setDisplayPrice('')
                setPriceError('')
                return
            }

            const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

            setPrice(numericValue)
            setDisplayPrice(formattedValue)
            setPriceError('')
            validatePrice(numericValue, originalPrice)
        } catch (error) {
            console.error('Error parsing price:', error)
            setPriceError('Invalid price format')
        }
    }

    const handleOriginalPriceChange = (value: string) => {
        try {
            if (value && !/^[\d.]*$/.test(value)) {
                setOriginalPriceError('Please enter a valid number for original price')
                return
            }

            const numericValue = value.replace(/\D/g, "");

            if (numericValue === '') {
                setOriginalPrice('')
                setDisplayOriginalPrice('')
                setOriginalPriceError('')
                return
            }

            const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

            setOriginalPrice(numericValue)
            setDisplayOriginalPrice(formattedValue)
            setOriginalPriceError('')
            validatePrice(price, numericValue)
        } catch (error) {
            console.error('Error parsing original price:', error)
            setOriginalPriceError('Invalid original price format')
        }
    }

    const validatePrice = (currentPrice: string, currentOriginalPrice: string) => {
        if (currentPrice && currentOriginalPrice) {
            const priceNum = parseFloat(currentPrice)
            const originalPriceNum = parseFloat(currentOriginalPrice)

            if (priceNum > originalPriceNum) {
                setPriceError('Price cannot be higher than original price')
            } else {
                setPriceError('')
                setOriginalPriceError('')
            }
        } else {
            setPriceError('')
            setOriginalPriceError('')
        }
    }

    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (priceError) {
            toast.error('Please fix the price error before submitting')
            return
        }

        if (originalPriceError) {
            toast.error('Please fix the original price error before submitting')
            return
        }

        if (presetItems.length === 0) {
            toast.error('Please add at least one preset item with before/after images and preset file')
            return
        }

        if (originalPrice && price) {
            const priceNum = parseFloat(price)
            const originalPriceNum = parseFloat(originalPrice)
            if (priceNum > originalPriceNum) {
                toast.error('Price cannot be higher than original price')
                return
            }
        }

        setIsSubmitting(true)

        try {
            const formData = new FormData()

            formData.append('title', title)
            formData.append('description', description)
            formData.append('price', price)
            if (originalPrice) formData.append('originalPrice', originalPrice)

            if (originalPrice && price) {
                const priceNum = parseFloat(price)
                const originalPriceNum = parseFloat(originalPrice)
                if (originalPriceNum > priceNum) {
                    const discountPercent = Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
                    formData.append('discount', discountPercent.toString())
                }
            }

            formData.append('category', category)
            if (tags) {
                const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                formData.append('tags', JSON.stringify(tagsArray))
            }
            if (compatibility.length > 0) {
                formData.append('compatibility', JSON.stringify(compatibility))
            }
            if (features.length > 0) {
                formData.append('features', JSON.stringify(features))
            }
            if (specifications.adjustments.length > 0 || specifications.bestFor.length > 0 || specifications.difficulty) {
                formData.append('specifications', JSON.stringify(specifications))
            }

            const warranty = {
                duration: 'Lifetime',
                coverage: 'Free updates',
                terms: ['3-day money back guarantee', 'Support included', 'Compatible with future Lightroom versions']
            }
            formData.append('warranty', JSON.stringify(warranty))

            const fileFormats = new Set<string>()
            let totalSize = 0

            presetItems.forEach(item => {
                const file = item.presetFile as File
                const extension = '.' + file.name.split('.').pop()
                fileFormats.add(extension)
                totalSize += file.size
            })

            const fileFormatStr = Array.from(fileFormats).join(', ')
            const fileSizeStr = totalSize > 1048576
                ? `${(totalSize / 1048576).toFixed(2)} MB`
                : `${(totalSize / 1024).toFixed(2)} KB`

            formData.append('fileFormat', fileFormatStr)
            formData.append('fileSize', fileSizeStr)

            formData.append('includesCount', presetItems.length.toString())
            formData.append('image', presetItems[0].afterImage)

            presetItems.forEach((item, index) => {
                formData.append(`imagePairs[${index}][before]`, item.beforeImage)
                formData.append(`imagePairs[${index}][after]`, item.afterImage)
                formData.append('presetFiles', item.presetFile as File)
            })

            await marketplaceApi.create(formData)

            toast.success('Product created successfully!')
            router.push('/product-management')
        } catch (error) {
            console.error('Error creating product:', error)
            toast.error('Failed to create product. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <form onSubmit={handleCreateProduct}>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="p-6">
                        <CardContent>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend className="flex items-center gap-2">
                                        <NotepadText /> Product Details
                                    </FieldLegend>
                                    <FieldDescription>
                                        Basic information about your marketplace item
                                    </FieldDescription>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="product-title">Product Title</FieldLabel>
                                            <Input
                                                id="product-title"
                                                placeholder="e.g. Cyberpunk Lightroom Preset"
                                                required
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                            <FieldDescription>
                                                Keep it short and descriptive — around 5-8 words.
                                            </FieldDescription>
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="product-description">Description</FieldLabel>
                                            <Textarea
                                                id="product-description"
                                                placeholder="Describe what the preset does, style, tone, etc."
                                                rows={4}
                                                required
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                            <FieldDescription>
                                                Include details about usage, mood, and who it&apos;s for.
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>

                                <FieldSeparator />

                                <FieldSet>
                                    <FieldLegend>Pricing</FieldLegend>
                                    <FieldDescription>
                                        Set your pricing information
                                    </FieldDescription>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="product-originalPrice">
                                                Original Price (Optional)
                                            </FieldLabel>
                                            <Input
                                                id="product-originalPrice"
                                                placeholder="e.g. 499000 or 499.000"
                                                type="text"
                                                value={displayOriginalPrice}
                                                onChange={e => handleOriginalPriceChange(e.target.value)}
                                            />
                                            {originalPriceError && (
                                                <p className="text-sm text-red-500 mt-1">{originalPriceError}</p>
                                            )}
                                            <FieldDescription>
                                                Discount will be calculated automatically
                                            </FieldDescription>
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="product-price">
                                                Price (VND)
                                            </FieldLabel>
                                            <Input
                                                id="product-price"
                                                placeholder="e.g. 250000 or 250.000"
                                                type="text"
                                                required
                                                value={displayPrice}
                                                onChange={e => handlePriceChange(e.target.value)}
                                                className={priceError ? 'border-red-500' : ''}
                                            />
                                            {priceError && (
                                                <p className="text-sm text-red-500 mt-1">{priceError}</p>
                                            )}
                                        </Field>
                                    </div>
                                </FieldSet>

                                <FieldSeparator />

                                <FieldSet>
                                    <FieldLegend>Additional Info</FieldLegend>
                                    <FieldDescription>
                                        Details that help customers understand your product
                                    </FieldDescription>

                                    <Field>
                                        <FieldLabel htmlFor="product-category">Category</FieldLabel>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger id="product-category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Presets">Presets</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription>Product category</FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="product-tags">Tags (comma-separated)</FieldLabel>
                                        <Input
                                            id="product-tags"
                                            placeholder="e.g. lightroom, preset, photography, portrait"
                                            value={tags}
                                            onChange={e => setTags(e.target.value)}
                                        />
                                        <FieldDescription>Separate tags with commas</FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Compatible Software</FieldLabel>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            {COMPATIBILITY_OPTIONS.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`compat-${option}`}
                                                        checked={compatibility.includes(option)}
                                                        onCheckedChange={(checked) => handleCompatibilityChange(option, checked as boolean)}
                                                    />
                                                    <label
                                                        htmlFor={`compat-${option}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <FieldDescription>Select all compatible software</FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Features</FieldLabel>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            {FEATURES_OPTIONS.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`feature-${option}`}
                                                        checked={features.includes(option)}
                                                        onCheckedChange={(checked) => handleFeatureChange(option, checked as boolean)}
                                                    />
                                                    <label
                                                        htmlFor={`feature-${option}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <FieldDescription>Select applicable features</FieldDescription>
                                    </Field>
                                </FieldSet>

                                <FieldSeparator />

                                <FieldSet>
                                    <FieldLegend>Specifications</FieldLegend>
                                    <FieldDescription>
                                        Technical details about the preset adjustments and usage
                                    </FieldDescription>

                                    <Field>
                                        <FieldLabel>Adjustments Included</FieldLabel>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            {SPECIFICATIONS_OPTIONS.adjustments.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`adj-${option}`}
                                                        checked={specifications.adjustments.includes(option)}
                                                        onCheckedChange={(checked) => handleSpecificationChange('adjustments', option, checked as boolean)}
                                                    />
                                                    <label
                                                        htmlFor={`adj-${option}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Best For</FieldLabel>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            {SPECIFICATIONS_OPTIONS.bestFor.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`best-${option}`}
                                                        checked={specifications.bestFor.includes(option)}
                                                        onCheckedChange={(checked) => handleSpecificationChange('bestFor', option, checked as boolean)}
                                                    />
                                                    <label
                                                        htmlFor={`best-${option}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Difficulty Level</FieldLabel>
                                        <Select value={specifications.difficulty} onValueChange={(value) => setSpecifications(prev => ({ ...prev, difficulty: value }))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {SPECIFICATIONS_OPTIONS.difficulty.map((level) => (
                                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </FieldSet>

                                <Field orientation="horizontal" className="mt-6">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : 'Create Product'}
                                    </Button>
                                    <Button variant="outline" type="button" onClick={() => router.back()}>
                                        Cancel
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>
                </div>

                {/*Section cua Preset Items ne*/}
                <div className="md:col-span-1 space-y-6">
                    <Card className="p-6 sticky top-10">
                        <CardTitle className='flex items-center gap-2'>
                            <Palette />Preset Items
                        </CardTitle>
                        <CardContent className="space-y-4 mt-4 p-0">
                            <FieldDescription>
                                Upload preset items with before/after examples and preset files.
                                The first item&apos;s &quot;after&quot; image will be used as the main product cover.
                            </FieldDescription>

                            {presetItems.length === 0 ? (
                                <Button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full"
                                    variant="outline"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Preset Items
                                </Button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid gap-3">
                                        {presetItems.slice(0, 3).map((item, index) => (
                                            <div key={item.id} className="border rounded-lg p-3 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">Item {index + 1}</p>
                                                    {index === 0 && presetItems.length > 1 && (
                                                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                                            Cover Image
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="relative aspect-video rounded overflow-hidden border">
                                                        <Image
                                                            src={item.beforePreview}
                                                            alt="Before"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                                                            Before
                                                        </span>
                                                    </div>
                                                    <div className="relative aspect-video rounded overflow-hidden border">
                                                        <Image
                                                            src={item.afterPreview}
                                                            alt="After"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                                                            After
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="flex justify-start items-center gap-2 text-xs text-muted-foreground truncate">
                                                    <Paperclip size={18} />{item.presetFileName}
                                                </p>
                                            </div>
                                        ))}
                                        {presetItems.length > 3 && (
                                            <div className="text-center text-sm text-muted-foreground py-2 border rounded-lg">
                                                + {presetItems.length - 3} more item{presetItems.length - 3 !== 1 ? 's' : ''}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => setIsModalOpen(true)}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View/Edit ({presetItems.length})
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <PresetUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePresetItems}
                existingItems={presetItems}
            />
        </form>
    )
}
