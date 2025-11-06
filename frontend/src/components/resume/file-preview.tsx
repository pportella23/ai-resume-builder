'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  FileText, 
  FileImage, 
  Download, 
  Eye, 
  X,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react'

interface FilePreviewProps {
  file: {
    id: string
    name: string
    size: number
    type: string
    url?: string
  }
  onClose?: () => void
}

export function FilePreview({ file, onClose }: FilePreviewProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />
    if (type.includes('image')) return <FileImage className="h-8 w-8 text-blue-500" />
    return <FileText className="h-8 w-8 text-gray-500" />
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3))
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5))
  const rotate = () => setRotation(prev => (prev + 90) % 360)
  const reset = () => {
    setScale(1)
    setRotation(0)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getFileIcon(file.type)}
            <span className="truncate">{file.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* File Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>Size: {formatFileSize(file.size)}</span>
              <span>Type: {file.type}</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {/* Preview Controls */}
          <div className="flex items-center gap-2 border-b pb-2">
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={rotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              Reset
            </Button>
          </div>

          {/* Preview Area */}
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="overflow-auto max-h-[60vh] p-4">
              <div 
                className="bg-white shadow-sm mx-auto"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                {/* Mock PDF Preview */}
                {file.type.includes('pdf') ? (
                  <div className="w-[600px] h-[800px] bg-white border">
                    <div className="p-8">
                      <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          {file.name.replace('.pdf', '')}
                        </h1>
                        <p className="text-gray-600">Professional Resume</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Experienced software engineer with 5+ years of expertise in full-stack development, 
                            specializing in React, Node.js, and cloud technologies. Proven track record of 
                            delivering scalable solutions and leading development teams.
                          </p>
                        </div>
                        
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-2">Experience</h2>
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-medium text-gray-900">Senior Software Engineer</h3>
                              <p className="text-gray-600">Tech Company • 2022 - Present</p>
                              <ul className="text-sm text-gray-700 mt-1 list-disc list-inside">
                                <li>Led development of microservices architecture</li>
                                <li>Improved application performance by 40%</li>
                                <li>Mentored junior developers</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
                          <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map(skill => (
                              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-[600px] h-[400px] bg-white border flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-600">Preview not available for this file type</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supported preview formats: PDF, Images
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 