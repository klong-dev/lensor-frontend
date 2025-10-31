'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
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
import { Textarea } from '@/components/ui/textarea'
import { NotepadText, Palette } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import ImagePairUploader from './image-pair-uploader'

export default function CreateForm() {
    const [presetFile, setPresetFile] = useState<File | null>(null)

    const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Create Product')

        if (!presetFile) {
            toast.error('Please upload a preset file (.xmp, .cube, .dng)')
            return
        }
        toast.success('Product created successfully!')
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
                                        Set your base price and optional sale price
                                    </FieldDescription>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="product-price">
                                                Base Price (VND)
                                            </FieldLabel>
                                            <Input
                                                id="product-price"
                                                placeholder="e.g. 250000"
                                                type="number"
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="product-salePrice">
                                                Sale Price (Optional)
                                            </FieldLabel>
                                            <Input
                                                id="product-salePrice"
                                                placeholder="e.g. 199000"
                                                type="number"
                                            />
                                            <FieldDescription>
                                                Leave blank if the product isn&apos;t discounted.
                                            </FieldDescription>
                                        </Field>
                                    </div>
                                </FieldSet>

                                <FieldSeparator />

                                <FieldSet>
                                    <FieldLegend>Additional Info</FieldLegend>
                                    <FieldDescription>
                                        Optional details that help customers understand compatibility
                                    </FieldDescription>

                                    <Field>
                                        <FieldLabel htmlFor="product-software">Compatible Software</FieldLabel>
                                        <Input id="product-software" placeholder="e.g. Lightroom, Photoshop" />
                                    </Field>
                                </FieldSet>

                                <Field orientation="horizontal" className="mt-6">
                                    <Button type="submit">Create Product</Button>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1 space-y-6">
                    <Card className="p-6">
                        <CardTitle className='flex items-center gap-2'><Palette />Preset File</CardTitle>
                        <CardContent className="space-y-4 mt-4 p-0">
                            <Field>
                                <FieldLabel
                                    htmlFor="preset-file">Upload Preset File</FieldLabel>
                                <Input
                                    id="preset-file"
                                    type="file" accept=".xmp,.cube,.dng"
                                    required />
                                <FieldDescription> Accepted formats: .xmp, .cube, .dng </FieldDescription>
                            </Field>
                        </CardContent>
                    </Card>

                    <ImagePairUploader />
                </div>
            </div>
        </form>
    )
}
