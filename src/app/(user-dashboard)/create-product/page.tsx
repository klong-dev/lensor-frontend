import { CardTitle } from '@/components/ui/card'
import { PackagePlus } from 'lucide-react';
import React from 'react'
import CreateForm from './components/create-product-form';

export default function CreateProduct() {
    return (
        <div className='container px-6 min-h-screen'>
            <div className='flex flex-col mx-auto px-4 py-8 gap-4'>
                <CardTitle className='flex gap-2 justify-start items-center py-2 px-3'>
                    <PackagePlus />
                    <h1>Create Your <span className='text-primary'>New Product</span></h1>
                </CardTitle>
                <CreateForm />
            </div>
        </div>
    )
}
