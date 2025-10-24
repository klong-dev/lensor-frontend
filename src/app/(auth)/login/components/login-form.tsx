'use client'

import { authHelpers } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Facebook, Github } from 'lucide-react';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useUserStore } from '@/stores/user-store'
import { ROUTES } from '@/constants/path'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldSeparator,
    FieldError,
} from "@/components/ui/field"

type FormType = 'login' | 'register'

export function LoginForm(props: Record<string, never>) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formType, setFormType] = useState<FormType>('login')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { user } = useUserStore()

    useEffect(() => {
        if (user) {
            router.replace(ROUTES.HOME)
            toast.success('You are already logged in')
        }
    }, [user, router])

    // Validate form
    const validateForm = () => {
        const errors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long'
        }

        // Register-specific validations
        if (formType === 'register') {
            if (!formData.name.trim()) {
                errors.name = 'Full name is required'
            }

            if (!formData.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password'
            } else if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match'
            }
        }

        setFormErrors(errors)
        return !Object.values(errors).some(error => error !== '')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        setLoading(true)

        try {
            if (formType === 'login') {
                const { data, error: signInError } = await authHelpers.signInWithEmail(
                    formData.email,
                    formData.password
                )

                if (signInError) {
                    setError(signInError.message)
                    toast.error(signInError.message)
                } else if (data.user) {
                    toast.success('Login successful!')
                    router.push(ROUTES.HOME)
                }
            } else {
                const { data, error: signUpError } = await authHelpers.signUpWithEmail(
                    formData.name,
                    formData.email.toLowerCase().trim(),
                    formData.password
                )

                if (signUpError) {
                    setError(signUpError.message)
                    toast.error(signUpError.message)
                } else if (data.user) {
                    toast.success('Account created successfully! Please check your email to verify.')
                    setFormType('login')
                    setFormData({ name: '', email: formData.email, password: '', confirmPassword: '' })
                }
            }
        } catch (err) {
            const errorMessage = 'An error occurred. Please try again.'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
        setLoading(true)
        setError('')

        try {
            const { data, error: oauthError } = await authHelpers.signInWithOAuth(provider)

            if (oauthError) {
                setError(oauthError.message)
                toast.error(oauthError.message)
                setLoading(false)
                return
            }

            if (!data?.url) {
                console.error('No redirect URL returned from OAuth')
                setError('Failed to initiate login. Please try again.')
                toast.error('Failed to initiate login. Please try again.')
                setLoading(false)
                return
            }
            console.log('Redirecting to OAuth provider:', data.url)

        } catch (err) {
            console.error('Error during social login:', err)
            setError('An error occurred during login. Please try again.')
            toast.error('An error occurred during login. Please try again.')
            setLoading(false)
        }
    }


    return (
        <div className='w-full max-w-md mx-auto py-4 px-6 bg-card text-card-foreground rounded-lg '>
            <div className='text-center mb-4'>
                <h2 className='text-xl font-bold'>
                    {formType === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>

            </div>

            {/* Social Login Buttons */}
            <div className='flex justify-center items-center gap-3 mb-4'>
                <button
                    className='cursor-pointer bg-red-500 hover:bg-red-600 items-center justify-center w-11 h-11 flex rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                    aria-label="Sign in with Google"
                >
                    <Image
                        src='/icons8-google-32.png'
                        alt='Login With Google'
                        width={22}
                        height={22}
                    />
                </button>
                <button
                    className='cursor-pointer bg-blue-600 hover:bg-blue-700 items-center justify-center w-11 h-11 flex rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={loading}
                    aria-label="Sign in with Facebook"
                >
                    <Facebook className='text-white' size={20} />
                </button>
                <button
                    className='cursor-pointer bg-gray-800 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 items-center justify-center w-11 h-11 flex rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => handleSocialLogin('github')}
                    disabled={loading}
                    aria-label="Sign in with GitHub"
                >
                    <Github className='text-white' size={20} />
                </button>
            </div>

            <FieldSeparator>
                <span className='text-muted-foreground text-xs'>OR CONTINUE WITH</span>
            </FieldSeparator>

            <form onSubmit={handleSubmit} className='mt-4'>
                <FieldSet>
                    <FieldGroup className='gap-4'>
                        {formType === 'register' && (
                            <Field>
                                <div className='flex gap-6 justify-between items-center'>
                                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                    {formErrors.name && <FieldError>{formErrors.name}</FieldError>}
                                </div>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    className={formErrors.name ? 'border-destructive' : ''}
                                />

                            </Field>
                        )}

                        <Field>
                            <div className='flex gap-6 justify-between items-center'>
                                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                {formErrors.email && <FieldError>{formErrors.email}</FieldError>}
                            </div>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                                className={formErrors.email ? 'border-destructive' : ''}
                            />
                        </Field>

                        <Field>
                            <div className='flex gap-6 justify-between items-center'>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                {formErrors.password && <FieldError>{formErrors.password}</FieldError>}
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading}
                                className={formErrors.password ? 'border-destructive' : ''}
                            />
                        </Field>

                        {formType === 'register' && (
                            <Field>
                                <div className='flex gap-6 justify-between items-center'>
                                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                    {formErrors.confirmPassword && <FieldError>{formErrors.confirmPassword}</FieldError>}
                                </div>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    className={formErrors.confirmPassword ? 'border-destructive' : ''}
                                />
                            </Field>
                        )}
                    </FieldGroup>

                    {error && (
                        <div className="text-destructive text-sm mt-2 p-2.5 bg-destructive/10 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full mt-3"
                        disabled={loading}
                    >
                        {loading
                            ? (formType === 'login' ? 'Signing in...' : 'Creating account...')
                            : (formType === 'login' ? 'Sign In' : 'Sign Up')}
                    </Button>
                </FieldSet>
            </form>

            <div className='text-center mt-4'>
                <p className="text-sm text-muted-foreground">
                    {formType === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => {
                            setFormType(formType === 'login' ? 'register' : 'login')
                            setFormErrors({ name: '', email: '', password: '', confirmPassword: '' })
                            setError('')
                        }}
                        className="text-primary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {formType === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    )
}