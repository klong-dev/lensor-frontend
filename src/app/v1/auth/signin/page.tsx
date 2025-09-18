'use client'

import { useState } from 'react'
import { authHelpers } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data, error: signInError } = await authHelpers.signInWithEmail(
                formData.email,
                formData.password
            )

            if (signInError) {
                setError(signInError.message)
            } else if (data.user) {
                // Đăng nhập thành công sẽ tự redirect về trang chủ
                router.push('/')
            }
        } catch (err) {
            setError('Adu lỗi mà sao ko log được ta')
        } finally {
            setLoading(false)
        }
    }

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
        setLoading(true)
        setError('')

        try {
            const { error: oauthError } = await authHelpers.signInWithOAuth(provider)

            if (oauthError) {
                setError(oauthError.message)
            }
            // OAuth sẽ redirect đến trang khác, không cần xử lý thêm
        } catch (err) {
            setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className='border'
                                required
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className='border'
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <button
                            onClick={() => handleSocialLogin('google')}
                        >
                            Google
                        </button>

                        <button
                            onClick={() => handleSocialLogin('facebook')}
                        >
                            Facebook
                        </button>

                        <button
                            onClick={() => handleSocialLogin('github')}
                        >
                            Github
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
