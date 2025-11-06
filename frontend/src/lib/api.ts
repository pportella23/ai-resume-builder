import { ApiResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem('accessToken')
    } catch {
      return null
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const token = this.getAccessToken()

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Resume endpoints
  async createResume(originalContent: string, jobDescription: string, templateUsed?: string) {
    return this.request('/resumes', {
      method: 'POST',
      body: JSON.stringify({ originalContent, jobDescription, templateUsed }),
    })
  }

  async getResumes() {
    return this.request('/resumes')
  }

  async getResume(id: string) {
    return this.request(`/resumes/${id}`)
  }

  async deleteResume(id: string) {
    return this.request(`/resumes/${id}`, {
      method: 'DELETE',
    })
  }

  // AI endpoints
  async rewriteResume(resumeId: string, jobDescription: string) {
    return this.request('/ai/rewrite-resume', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription }),
    })
  }

  async generateCoverLetter(resumeId: string, companyName: string) {
    return this.request('/ai/generate-cover-letter', {
      method: 'POST',
      body: JSON.stringify({ resumeId, companyName }),
    })
  }

  async calculateCompatibility(resumeId: string, jobDescription: string) {
    return this.request('/ai/calculate-compatibility', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription }),
    })
  }

  // Portfolio endpoints
  async generatePortfolio(resumeId: string) {
    return this.request('/portfolios/generate', {
      method: 'POST',
      body: JSON.stringify({ resumeId }),
    })
  }

  async getPortfolio(id: string) {
    return this.request(`/portfolios/${id}`)
  }

  async updatePortfolio(id: string, content: any) {
    return this.request(`/portfolios/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    })
  }

  // Subscription endpoints
  async createSubscription(priceId: string) {
    return this.request('/subscriptions/create', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    })
  }

  async getSubscriptionStatus() {
    return this.request('/subscriptions/status')
  }

  async cancelSubscription() {
    return this.request('/subscriptions/cancel', {
      method: 'POST',
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL) 