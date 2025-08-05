# AI Resume Builder SaaS

A modern SaaS application that helps job seekers generate AI-optimized resumes tailored to specific job descriptions. Users can upload their existing resume, paste a job listing, and get a customized resume with one-click export capabilities.

## 🚀 Features

- **AI-Powered Resume Optimization**: Tailored resumes based on job descriptions
- **Multiple Export Formats**: PDF, Word, and HTML export options
- **Professional Templates**: 3-5 professional resume designs
- **Portfolio Generation**: Automatic personal portfolio website creation
- **Cover Letter Generation**: AI-generated cover letters
- **Compatibility Scoring**: Resume-job matching analysis
- **Subscription Management**: Free and premium tiers

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: NextAuth.js v5
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Query
- **Animations**: Framer Motion

### Backend (Planned)
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **AI Service**: OpenAI GPT-4 API
- **File Storage**: AWS S3
- **Payments**: Stripe

### Infrastructure (Planned)
- **Frontend Hosting**: AWS Amplify
- **Backend API**: AWS ECS with Fargate
- **Database**: AWS RDS PostgreSQL
- **CDN**: CloudFront

## 📁 Project Structure

```
ai-resume-builder/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # Utility functions
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript type definitions
│   └── public/             # Static assets
├── backend/                # Express.js backend (planned)
├── shared/                 # Shared types and utilities
└── docs/                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-resume-builder
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Development Status

### ✅ Completed
- **Phase 3 - Week 5, Day 1-2**: Next.js Setup
- **Phase 3 - Week 5, Day 3-4**: Authentication UI
- **Phase 3 - Week 5, Day 5**: Dashboard Layout (Partially)

### 🔄 In Progress
- **Phase 3 - Week 5, Day 5**: Navigation System

### 📅 Planned
- **Phase 3 - Week 6**: Resume Management UI
- **Phase 4 - Week 7**: Portfolio Generation System
- **Phase 5 - Week 8**: Subscription & Payment System

## 🧪 Testing

The application is currently running in "mock mode" for development:
- Authentication uses mock user data
- All features work for UI testing
- Ready to connect to real backend when Phase 1 & 2 are completed

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@airesumebuilder.com or join our Slack channel.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 