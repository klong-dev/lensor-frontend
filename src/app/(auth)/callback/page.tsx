'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ROUTES } from '@/constants/path';
import Loading from '@/app/loading';
import { useCartStore } from '@/stores/cart-store';
import { cartApi } from '@/lib/apis/cartApi';

export default function AuthCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { getPendingCart, clearPendingCart } = useCartStore()

    // Hàm đồng bộ pending cart sau khi login
    const syncPendingCart = async () => {
        const pendingItems = getPendingCart();
        if (pendingItems && pendingItems.length > 0) {
            try {
                for (const item of pendingItems) {
                    await cartApi.addItem({
                        productId: item.productId,
                        quantity: item.quantity
                    });
                }
                clearPendingCart();
                toast.success(`${pendingItems.length} item(s) added to your cart!`);
            } catch (error) {
                console.error('Error syncing pending cart:', error);
            }
        }
    };

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {

                await new Promise(resolve => setTimeout(resolve, 100))

                const { data, error } = await supabase.auth.getSession()
                console.log(data)
                if (error) {
                    console.error('Error getting session:', error)
                    toast.error('An error occurred while processing the login. Please try again.')
                    router.replace('/login?error=auth_callback_error')
                    return
                }

                if (data.session) {
                    toast.success('Login successful!')

                    // Đồng bộ pending cart
                    await syncPendingCart();

                    // Kiểm tra redirectAfterLogin
                    const redirectUrl = typeof window !== 'undefined' ? sessionStorage.getItem('redirectAfterLogin') : null
                    if (redirectUrl) {
                        sessionStorage.removeItem('redirectAfterLogin')
                        router.replace(redirectUrl)
                    } else {
                        router.replace(ROUTES.HOME)
                    }
                } else {

                    await new Promise(resolve => setTimeout(resolve, 500))
                    const { data: retryData, error: retryError } = await supabase.auth.getSession()

                    if (retryError || !retryData.session) {
                        console.error('No session found after retry')
                        toast.error('Invalid login session. Please try again.')
                        router.replace(ROUTES.LOGIN)
                    } else {
                        console.log('Session data (retry):', retryData.session)
                        toast.success('Login successful!')

                        // Đồng bộ pending cart
                        await syncPendingCart();

                        // Kiểm tra redirectAfterLogin
                        const redirectUrl = typeof window !== 'undefined' ? sessionStorage.getItem('redirectAfterLogin') : null
                        if (redirectUrl) {
                            sessionStorage.removeItem('redirectAfterLogin')
                            router.replace(redirectUrl)
                        } else {
                            router.replace(ROUTES.HOME)
                        }
                    }
                }
            } catch (err) {
                console.error('Auth callback error:', err)
                toast.error('An error occurred while processing the login. Please try again.')
                router.replace('/login?error=auth_callback_error')
            }
        }

        handleAuthCallback()
    }, [router, searchParams])

    return (
        <Loading />
    )
}