'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function Authprovider({
    children,

}: { children: ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}