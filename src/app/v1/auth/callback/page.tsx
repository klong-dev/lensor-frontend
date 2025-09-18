'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Error getting session:', error) // Log test
                    router.push('/v1/auth/signin?error=auth_callback_error') // Hiển thị trang lỗi
                    return
                }

                if (data.session) {
                    // Chỗ này check thành công thì về trang chủ
                    router.push('/')
                } else {
                    // Fail thì bắt login lại
                    router.push('/v1/auth/signin')
                }
            } catch (err) {
                console.error('Auth callback error:', err)
                router.push('/v1/auth/signin?error=auth_callback_error') // Hiển thị trang lỗi
            }
        }

        handleAuthCallback()
    }, [router])

    return (
        <p>Đang xử lý đăng nhập...</p>
    )
}