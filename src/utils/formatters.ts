/**
 * Format number or string to Vietnamese currency (VND)
 */
export const formatCurrency = (amount: number | string): string => {
     const num = typeof amount === 'string' ? parseFloat(amount) : amount
     return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
     }).format(num)
}

/**
 * Format ISO date string to readable format
 */
export const formatDate = (dateString: string): string => {
     return new Date(dateString).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
     })
}

/**
 * Get full image URL from image path
 */
export const getImageUrl = (imagePath: string): string => {
     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
     return `${baseUrl}${imagePath}`
}
