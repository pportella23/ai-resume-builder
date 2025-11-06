import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          })

          if (!res.ok) return null
          const data = await res.json()
          if (!data?.data?.user || !data?.data?.accessToken) return null

          const { user, accessToken, refreshToken } = data.data
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            subscription_status: user.subscriptionStatus,
            accessToken,
            refreshToken,
          } as any
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.subscription_status = user.subscription_status
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string
        session.user.subscription_status = token.subscription_status as string
        ;(session as any).accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
  },
  debug: process.env.NODE_ENV === 'development',
}

export const { auth, handlers } = NextAuth(authOptions) 