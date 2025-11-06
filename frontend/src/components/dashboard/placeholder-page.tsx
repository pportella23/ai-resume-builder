'use client'

import { DashboardLayout } from './dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Construction, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            This feature is coming soon! We're working hard to bring you the best experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Construction className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Under Development</span>
          </div>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 