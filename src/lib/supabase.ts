import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const authHelpers = {
    signInWithEmail: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    },

    signUpWithEmail: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        return { data, error }
    },

    signInWithOAuth: async (provider: 'google' | 'facebook' | 'github') => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/v1/auth/callback`
            }
        })
        return { data, error }
    },

    // Đăng xuất
    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    // Lấy user hiện tại
    getCurrentUser: () => {
        return supabase.auth.getUser()
    },

    // Theo dõi thay đổi auth state
    onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
        return supabase.auth.onAuthStateChange(callback)
    },

    // Reset password
    resetPassword: async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/v1/auth/reset-password`,
        })
        return { data, error }
    }

    // KHÔNG CHỈNH BẬY, ĐỂ YÊN
}