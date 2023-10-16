"use client"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
export default function AuthProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
