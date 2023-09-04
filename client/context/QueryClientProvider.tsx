'use client'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

type Props = {
    children: React.ReactNode
}


function ReactQueryProvider({ children }: Props) {
    const [client] = useState(new QueryClient());
    return (
        <QueryClientProvider
            client={client}
        >{children}</QueryClientProvider>
    )
}

export default ReactQueryProvider