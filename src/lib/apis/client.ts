import axios from "axios"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export const apiClient = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
     withCredentials: true
})

apiClient.interceptors.request.use(
     async (config) => {
          const { data: { session } } = await supabase.auth.getSession()

          if (session?.access_token) {
               config.headers.Authorization = `Bearer ${session.access_token}`
          }

          return config
     },
     async (error) => {
          return Promise.reject(error)
     }
)

apiClient.interceptors.response.use(undefined, async (error) => {
     if (error.response?.status === 401) {
          // Chỉ redirect login nếu không phải GET (tức là các hành động cần login)
          const method = error.config?.method?.toUpperCase();
          if (method && method !== 'GET') {
               if (typeof window !== 'undefined') {
                    sessionStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search)
                    window.location.href = '/(auth)/login'
               }
          }
          return Promise.reject(error)
     }
     throw error
})