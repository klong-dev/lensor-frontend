'use client'

import { createTheme, MantineProvider } from '@mantine/core'
import React from 'react'

const theme = createTheme({
     fontFamily: "inherit"
})

export default function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
     
     return (
          <MantineProvider theme={theme} defaultColorScheme='dark'>
               {children}
          </MantineProvider>
     )
}
