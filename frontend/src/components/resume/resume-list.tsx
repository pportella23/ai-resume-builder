'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  FileText, 
  Edit, 
  Download, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  Star,
  MoreHorizontal,
  Upload
} from 'lucide-react'

interface Resume {
  id: string
  name: string
  originalName: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'generated' | 'optimized'
  template: string
  compatibilityScore?: number
  jobDescription?: string
}

const mockResumes: Resume[] = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    originalName: 'john_doe_resume.pdf',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:45:00Z',
    status: 'optimized',
    template: 'tech-focused',
    compatibilityScore: 92,
    jobDescription: 'Senior Software Engineer at Google'
  },
  {
    id: '2',
    name: 'Product Manager Resume',
    originalName: 'jane_smith_resume.docx',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-12T16:20:00Z',
    status: 'generated',
    template: 'modern',
    compatibilityScore: 87,
    jobDescription: 'Product Manager at Microsoft'
  },
  {
    id: '3',
    name: 'UX Designer Resume',
    originalName: 'alex_johnson_resume.pdf',
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-08T11:00:00Z',
    status: 'draft',
    template: 'creative',
  }
]

export function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>(mockResumes)
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'text-green-600 bg-green-100'
      case 'generated':
        return 'text-blue-600 bg-blue-100'
      case 'draft':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized':
        return <Star className="h-4 w-4" />
      case 'generated':
        return <FileText className="h-4 w-4" />
      case 'draft':
        return <Edit className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
          <p className="text-gray-600">Manage and optimize your resumes</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Create New Resume
        </Button>
      </div>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{resume.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {resume.originalName}
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Resume Actions</DialogTitle>
                      <DialogDescription>
                        Choose an action for "{resume.name}"
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={() => deleteResume(resume.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
                  {getStatusIcon(resume.status)}
                  {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                </span>
                {resume.compatibilityScore && (
                  <span className="text-xs text-gray-500">
                    {resume.compatibilityScore}% match
                  </span>
                )}
              </div>

              {/* Template Info */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Template:</span> {resume.template}
              </div>

              {/* Job Description */}
              {resume.jobDescription && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Target:</span> {resume.jobDescription}
                </div>
              )}

              {/* Dates */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(resume.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(resume.updatedAt)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="mr-1 h-3 w-3" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {resumes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-4">
              Upload your first resume to get started with AI optimization
            </p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 