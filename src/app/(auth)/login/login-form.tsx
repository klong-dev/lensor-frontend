'use client'

import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { upperFirst, useToggle } from '@mantine/hooks'
import { GrGoogle } from "react-icons/gr"
import { FaFacebook } from "react-icons/fa"
import { Flex } from '@mantine/core'
import { FaGithub } from "react-icons/fa"
import { authHelpers } from '@/lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'

export function LoginForm(props: PaperProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [type, toggle] = useToggle(['login', 'register'])
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            term: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            term: (val) => (type === 'register' && !val ? 'You must accept terms and conditions' : null)
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data, error: signInError } = await authHelpers.signInWithEmail(
                form.values.email,
                form.values.password
            )

            if (signInError) {
                setError(signInError.message)
                notifications.show({
                    title: 'Error',
                    message: error,
                })
            } else if (data.user) {
                router.push('/')
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi đăng nhập!')
            notifications.show({
                title: 'Error',
                message: error,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!form.validate()) return

        setLoading(true)
        setError('')
        const email = form.values.email.toLowerCase().trim();

        try {
            const { data, error: signInError } = await authHelpers.signUpWithEmail(
                form.values.name,
                email,
                form.values.password
            )
            if (signInError) {
                if (signInError.message.includes("invalid")) {
                    setError("Email không hợp lệ hoặc đã tồn tại. Vui lòng dùng email khác.");
                    notifications.show({
                        title: 'Error',
                        message: error,
                    })
                } else if (data.user) {
                    console.log(data.user)
                    router.push('/')
                }
            }
        } catch (err) {
            setError('Có lỗi khi đăng ký!')
            notifications.show({
                title: 'Error',
                message: error,
            })
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
                notifications.show({
                    title: 'Error',
                    message: error,
                })
            }

        } catch (err) {
            setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.')
            notifications.show({
                title: 'Error',
                message: error,
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <Paper radius="md" p="xl" withBorder {...props} className='w-full py-12 shadow-lg'>
            <Flex
                mih={60}
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
                className="mb-2"
            >
                <button
                    className='cursor-pointer bg-red-500 hover:bg-red-600 items-center justify-center w-12 h-12 flex rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-md'
                    onClick={() => handleSocialLogin('google')}
                >
                    <GrGoogle className="text-lg" />
                </button>
                <button
                    className='cursor-pointer bg-blue-600 hover:bg-blue-700 items-center justify-center w-12 h-12 flex rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-md'
                    onClick={() => handleSocialLogin('facebook')}
                >
                    <FaFacebook className="text-lg" />
                </button>
                <button
                    className='cursor-pointer bg-gray-800 hover:bg-gray-900 items-center justify-center w-12 h-12 flex rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-md'
                    onClick={() => handleSocialLogin('github')}
                >
                    <FaGithub className="text-lg" />
                </button>
            </Flex>

            <Divider
                label="Or continue with email"
                labelPosition="center"
                my="md"
                color="gray.3"
                size="xs"
            />

            <form
                onSubmit={type === 'login' ? handleSubmit : handleRegister}
                className='text-left space-y-4'
            >
                <Stack gap="md">
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Enter your full name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                            size="md"
                            styles={{
                                input: {
                                    '&:focus': {
                                        borderColor: '#8B5CF6',
                                    },
                                },
                                label: {
                                    fontWeight: 500,
                                    color: '#374151'
                                }
                            }}
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="Enter your email address"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                        size="md"
                        styles={{
                            input: {
                                '&:focus': {
                                    borderColor: '#8B5CF6',
                                },
                            },
                            label: {
                                fontWeight: 500,
                                color: '#374151'
                            }
                        }}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Enter your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                        size="md"
                        styles={{
                            input: {
                                '&:focus': {
                                    borderColor: '#8B5CF6',
                                },
                            },
                            label: {
                                fontWeight: 500,
                                color: '#374151'
                            }
                        }}
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.term}
                            onChange={(event) => form.setFieldValue('term', event.currentTarget.checked)}
                            color="violet"
                            size="sm"
                            error={form.errors.term}
                            styles={{
                                label: {
                                    color: '#6B7280'
                                }
                            }}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="md" className="pt-4">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => toggle()}
                        size="sm"
                        className="hover:no-underline"
                    >
                        {type === 'register'
                            ? <p className="text-gray-600">Already have an account? <span className='text-[#6441A5] font-medium hover:text-violet-700'>Login</span></p>
                            : <p className="text-gray-600">Don&apos;t have an account? <span className='text-[#6441A5] font-medium hover:text-violet-700'>Register</span></p>
                        }
                    </Anchor>
                    <Button
                        type="submit"
                        radius="md"
                        size="md"
                        disabled={loading}

                        style={{
                            background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #6441A5 100%, #2a0845 100%)'
                        }}
                    >
                        {loading && type === 'login' ? 'Signing in...' : loading && type === 'register' ? 'Creating account...' : upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}