'use client'
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from '@/components/motion-primitives/image-comparison'
import Image from 'next/image'
import React, { useState } from 'react'

interface ImageGalleryProps {
    images: string[]
    productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [fade, setFade] = useState(true)

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
            {/* Main Image */}
            <div className='relative aspect-video overflow-hidden'>
                <ImageComparison className='aspect-16/10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800' enableHover >
                    <ImageComparisonImage
                        src={images[selectedImage]}
                        alt={productName}
                        position='left'
                        className={`rounded-2xl object-cover transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`} />
                    <ImageComparisonImage
                        src={images[selectedImage]}
                        alt={productName}
                        position='right'
                        className={`rounded-2xl object-cover transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'} filter brightness-75 contrast-125 saturate-150`} />
                    <ImageComparisonSlider className='bg-white w-[1px]' />
                    
                    <div className='absolute top-5 left-5 text-sm font-semibold text-white pointer-events-none' data-position="left">
                        {productName}
                    </div>
                    <div className='absolute top-5 right-5 text-sm font-semibold text-white pointer-events-none' data-position="right">
                        Normal
                    </div>
                </ImageComparison>
            </div>

            {/* Thumbnail Gallery */}
            <div className='flex gap-2'>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`aspect-square relative w-20 h-20 ${selectedImage === index
                            ? 'ring-2 ring-offset-2 rounded-md'
                            : ''
                            }`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <Image
                            src={image}
                            alt={`${productName} - Preview ${index + 1}`}
                            fill
                            className='rounded-md object-cover hover:opacity-80 transition-opacity cursor-pointer'
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
