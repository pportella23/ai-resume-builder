'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ResumeList } from '@/components/resume/resume-list'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResumesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <p className="mt-2 text-gray-600">
          Create and manage your AI-optimized resumes
        </p>
      </div>

      <ResumeList />
    </DashboardLayout>
  )
} 