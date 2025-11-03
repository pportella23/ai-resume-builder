# AI Resume Builder - Backend API

Express.js backend API for the AI Resume Builder SaaS application.

## 🚀 Features

- **RESTful API** with Express.js and TypeScript
- **Database** with PostgreSQL and Prisma ORM
- **Authentication** with JWT tokens
- **Error Handling** with comprehensive error middleware
- **Logging** with Pino logger
- **Validation** with Zod schemas
- **Type Safety** with TypeScript

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   ├── database.ts        # Prisma client setup
│   │   ├── env.ts             # Environment variables validation
│   │   └── logger.ts          # Logger configuration
│   ├── middleware/
│   │   ├── auth.ts            # Authentication middleware
│   │   ├── errorHandler.ts   # Error handling middleware
│   │   └── notFound.ts        # 404 handler
│   ├── routes/
│   │   ├── auth.routes.ts     # Authentication routes
│   │   ├── health.routes.ts  # Health check routes
│   │   ├── resumes.routes.ts  # Resume management routes
│   │   └── index.ts           # Route aggregator
│   ├── utils/
│   │   ├── jwt.ts             # JWT utilities
│   │   └── password.ts        # Password hashing utilities
│   └── index.ts               # Express app entry point
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Secret key for JWT tokens
   - `JWT_REFRESH_SECRET`: Secret key for refresh tokens
   - `NEXTAUTH_SECRET`: Secret for NextAuth integration
   - Other API keys as needed

3. **Set up database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3001` (or the port specified in `.env`)

## 📚 API Endpoints

### Health Check
- `GET /health` - Health check endpoint
- `GET /api/health` - Detailed health check with database status

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Resumes
- `GET /api/resumes` - Get all resumes for authenticated user (protected)
- `GET /api/resumes/:id` - Get a specific resume (protected)
- `POST /api/resumes` - Create a new resume (protected)
- `DELETE /api/resumes/:id` - Delete a resume (protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without building

## 🗄️ Database

The application uses PostgreSQL with Prisma ORM. The schema includes:

- **Users**: User accounts and authentication
- **Social Logins**: OAuth provider connections
- **Resumes**: Resume data and AI-generated content
- **Subscriptions**: Stripe subscription management
- **Portfolios**: Portfolio website data
- **Usage Logs**: Usage tracking for billing

Run `npm run prisma:studio` to open a visual database editor.

## 🧪 Development

The backend is configured for development with:
- Hot reload with `tsx watch`
- Detailed error messages
- Request logging
- Type checking

## 🚀 Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Set `NODE_ENV=production` in your environment

3. Start the server:
   ```bash
   npm start
   ```

## 📦 Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `NEXTAUTH_SECRET` - NextAuth integration secret
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)

## 🔄 Next Steps

- [ ] Implement AI service integration (OpenAI)
- [ ] Add S3 file upload functionality
- [ ] Implement subscription management
- [ ] Add portfolio generation endpoints
- [ ] Set up rate limiting
- [ ] Add API documentation (Swagger/OpenAPI)

## 📄 License

MIT
