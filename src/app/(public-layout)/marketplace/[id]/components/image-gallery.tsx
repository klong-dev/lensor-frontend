'use client'
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from '@/components/motion-primitives/image-comparison'
import { BASE_URL } from '@/constants'
import { MarketplaceDetail } from '@/types/marketplace'
import { MoveHorizontal } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ImageGallery({ imagePairs, name }: Pick<MarketplaceDetail, 'imagePairs' | 'name'>) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [fade, setFade] = useState(true)

    const getImageSrc = (imagePath: string | undefined) => {
        return imagePath ? `${BASE_URL}${imagePath}` : '/images/default-fallback-image.png'
    }

    const handleThumbnailClick = (index: number) => {
        if (index === selectedImage) return
        setFade(false)
        setTimeout(() => {
            setSelectedImage(index)
            setFade(true)
        }, 100)
    }


    return (
        <div className='col-span-9 flex flex-col gap-2'>

            <div className='relative aspect-video'>
                <ImageComparison className='aspect-16/10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800'>
                    <ImageComparisonImage
                        src={getImageSrc(imagePairs?.[selectedImage]?.before)}
                        alt={name || 'Product image'}
                        position='right'
                        className={`rounded-2xl object-cover transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`} />

                    <ImageComparisonImage
                        src={getImageSrc(imagePairs?.[selectedImage]?.after)}
                        alt={name || 'Product image'}
                        position='left'
                        className={`rounded-2xl object-cover transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`} />
                    <ImageComparisonSlider className='bg-white w-[1px]'>
                        <div className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white flex items-center justify-center shadow-lg'>
                            <MoveHorizontal size={18} color='black' />
                        </div>
                    </ImageComparisonSlider>

                    <div className='absolute top-5 left-5 text-sm font-semibold text-white pointer-events-none' data-position="right">
                        Normal
                    </div>
                    <div className='absolute top-5 right-5 text-sm font-semibold text-white pointer-events-none' data-position="left">
                        {
                            imagePairs && imagePairs.length > 1
                                ? (name ? `${name} - Preset ${selectedImage + 1}` : 'Product')
                                : (name ? name : 'Product')
                        }
                    </div>
                </ImageComparison>
            </div>


            <div className='flex gap-2'>
                {imagePairs?.map((image, index) => (
                    <div
                        key={index}
                        className={`aspect-square relative w-20 h-20 cursor-pointer ${selectedImage === index
                            ? 'ring-2 ring-offset-2 rounded-md'
                            : ''
                            }`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <Image
                            src={getImageSrc(image?.after)}
                            alt={`${name || 'Product'} - Preview ${index + 1}`}
                            fill
                            sizes="80px"
                            loading='lazy'
                            className='rounded-md object-cover hover:opacity-80 transition-opacity'
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/default-fallback-image.png';
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
