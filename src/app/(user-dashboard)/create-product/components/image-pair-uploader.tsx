'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { Images, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { FieldDescription } from '@/components/ui/field'
import { Dropzone, DropzoneContent } from '@/components/ui/shadcn-io/dropzone'
import { Spinner } from '@/components/ui/spinner'
import { ImagePair } from '@/types/marketplace'
import { resizeImage } from '@/utils/imageTools'

export default function ImagePairUploader() {
    const [isLoading, setIsLoading] = useState(false)
    const [imagePairs, setImagePairs] = useState<ImagePair[]>([])
    const [currentPair, setCurrentPair] = useState<{ before?: File; after?: File }>({})
    const [currentPreview, setCurrentPreview] = useState<{ before?: string; after?: string }>({})

    const handleDrop = async (type: 'before' | 'after', files: File[]) => {
        if (files.length === 0) return
        const file = files[0]
        setIsLoading(true)

        try {
            const resized = await resizeImage(file)
            setCurrentPair((prev) => ({ ...prev, [type]: file }))
            setCurrentPreview((prev) => ({ ...prev, [type]: resized }))
        } catch (err) {
            console.error(err)
            toast.error('Failed to process image.')
        } finally {
            setIsLoading(false)
        }
    }

    const finalizePair = () => {
        if (currentPreview.before && currentPreview.after) {
            setImagePairs((prev) => [
                ...prev,
                { before: currentPreview.before!, after: currentPreview.after! },
            ])
            setCurrentPair({})
            setCurrentPreview({})
            toast.success('Added new before/after pair!')
        } else {
            toast.warning('Please upload both images before continuing.')
        }
    }

    const clearImage = () => {
        setImagePairs([])
        setCurrentPair({})
        setCurrentPreview({})
        toast.info('Cleared all uploaded pairs.')
    }

    return (
        <Card className="p-6">
            <CardTitle className="flex items-center gap-2">
                <Images />
                Before / After Images
            </CardTitle>

            <CardContent className="space-y-5 mt-4 p-0">
                {imagePairs.length > 0 && (
                    <div className="space-y-4">
                        {imagePairs.map((pair, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-3">
                                {[pair.before, pair.after].map((src, i) => (
                                    <div key={i} className="relative aspect-[3/2] overflow-hidden rounded-2xl border">
                                        <Image
                                            src={src}
                                            alt={i === 0 ? `Before ${idx}` : `After ${idx}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    {(['before', 'after'] as const).map((type) => (
                        <div key={type} className="flex flex-col gap-2">
                            <span className="text-sm font-medium mb-1 capitalize">{type}</span>
                            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border">
                                {!currentPreview[type] ? (
                                    <Dropzone
                                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                        onDrop={(files) => handleDrop(type, files)}
                                        maxFiles={1}
                                        className="h-full"
                                    >
                                        <Plus />
                                        {isLoading && (
                                            <DropzoneContent>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Spinner /> Loading...
                                                </div>
                                            </DropzoneContent>
                                        )}
                                    </Dropzone>
                                ) : (
                                    <Image
                                        src={currentPreview[type]!}
                                        alt={`${type} preview`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {currentPreview.before && currentPreview.after && (
                    <div className="flex justify-start items-center mt-3 gap-2">
                        <Button onClick={finalizePair} className="text-sm px-4 py-2">
                            Add Pair
                        </Button>
                        <Button variant="outline" onClick={clearImage} className="text-sm px-4 py-2">
                            Clear
                        </Button>
                    </div>
                )}

                <FieldDescription>
                    Upload before & after examples of your preset.
                </FieldDescription>
            </CardContent>
        </Card>
    )
}
