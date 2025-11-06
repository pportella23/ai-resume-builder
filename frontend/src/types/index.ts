export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  subscription_status: 'free' | 'premium'
  usage_count: number
  created_at: string
  updated_at: string
}

export interface Resume {
  id: string
  user_id: string
  original_content: string
  job_description: string
  ai_generated_content?: string
  template_used: string
  compatibility_score?: number
  s3_file_path?: string
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  user_id: string
  amplify_app_id?: string
  domain_name?: string
  content: PortfolioContent
  status: 'building' | 'deployed' | 'failed'
  created_at: string
}

export interface PortfolioContent {
  personal_info: {
    name: string
    title: string
    email: string
    phone?: string
    location?: string
    summary: string
  }
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  social_links: SocialLink[]
}

export interface Skill {
  name: string
  level: number // 1-100
  category: string
}

export interface Experience {
  company: string
  position: string
  start_date: string
  end_date?: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  start_date: string
  end_date?: string
  gpa?: number
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: string
  plan_type: 'free' | 'premium'
  current_period_start: string
  current_period_end: string
  created_at: string
}

export interface ResumeTemplate {
  id: string
  name: string
  category: 'tech' | 'creative' | 'executive' | 'minimalist'
  description: string
  preview_image: string
  sections: {
    header: boolean
    skills: boolean
    experience: boolean
    projects: boolean
    education: boolean
    certifications: boolean
  }
  styling: {
    primary_color: string
    secondary_color: string
    font_family: string
    spacing: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 