'use client'

import { TextInput, TextInputProps } from '@mantine/core'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

interface SearchBarProps extends Omit<TextInputProps, 'leftSection' | 'onSubmit'> {
    onSearch?: (query: string) => void,
    onSubmit?: (query: string) => void,
    showSearchIcon?: boolean
}

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
            <TextInput
                value={query}
                onChange={handleChange}
                onSubmit={handleSubmit}
                leftSection={showSearchIcon ? <CiSearch size={18} /> : undefined}
                radius="md"
                size="md"
                className="[&_input]:focus:border-purple-500 [&_input]:focus:font-medium"
                {...props}
            />
        </form>
    )
}