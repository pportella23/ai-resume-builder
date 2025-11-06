'use client'

import { SessionProvider as NextAuthSessionProvider, useSession } from 'next-auth/react'
import { useEffect } from 'react'

function TokenSync() {
  const { data } = useSession()
  useEffect(() => {
    const accessToken = (data as any)?.accessToken
    if (typeof window === 'undefined') return
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken as string)
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [data])
  return null
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <TokenSync />
      {children}
    </NextAuthSessionProvider>
  )
} 