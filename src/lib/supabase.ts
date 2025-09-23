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

    signUpWithEmail: async (full_name: string, email: string, password: string) => {
        console.log("Email supa: ", email)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name
                }
            }
        })
        return { data, error }
    },

    signInWithOAuth: async (provider: 'google' | 'facebook' | 'github') => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        return { data, error }
    },


    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
    },


    getCurrentUser: () => {
        return supabase.auth.getUser()
    },


    onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
        return supabase.auth.onAuthStateChange(callback)
    },


    resetPassword: async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        return { data, error }
    }


}