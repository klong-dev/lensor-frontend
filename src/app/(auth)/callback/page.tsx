'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ROUTES } from '@/constants/path';
import Loading from '@/app/loading';

export default function AuthCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()

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
                    router.replace(ROUTES.HOME)
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
                        router.replace(ROUTES.HOME)
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