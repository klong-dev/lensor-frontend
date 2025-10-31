'use client'

import { Input } from "@/components/ui/input"
import { SearchBarProps } from "@/types/marketplace"
import { useState } from 'react'

export default function SearchBar({
    onSearch,
    onSubmit,
    showSearchIcon = true,
    ...props
}: SearchBarProps) {

    const [query, setQuery] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setQuery(value)
        onSearch?.(value)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onSubmit?.(query)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={query}
                onChange={handleChange}
                type="string"
                placeholder="Search..."
                className="[&_input]:focus:border-purple-500 [&_input]:focus:font-medium"
                {...props}
            />
        </form>
    )
}