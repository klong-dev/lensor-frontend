'use client'

import { colorsTuple, createTheme, MantineProvider, MantineRadiusValues } from '@mantine/core'
import React from 'react'

const theme = createTheme({
     fontFamily: "inherit",
     colors: {
          main: colorsTuple('#8C4AEA'),
     },
     primaryColor: 'main',
     defaultRadius: 'md'
})

export default function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
     
     return (
          <MantineProvider theme={theme} defaultColorScheme='dark'>
               {children}
          </MantineProvider>
     )
}
