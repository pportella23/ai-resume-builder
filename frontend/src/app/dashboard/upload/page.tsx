'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ResumeUpload } from '@/components/resume/resume-upload'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Upload Resume</h1>
        <p className="mt-2 text-gray-600">
          Upload your existing resume to get started with AI optimization
        </p>
      </div>

      <ResumeUpload />
    </DashboardLayout>
  )
} 