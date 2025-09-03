# Overview

SensAI is an AI-powered career development platform that provides personalized guidance, interview preparation, and career coaching. The application helps users advance their careers through tailored interview questions, resume building tools, industry insights, and analytics tracking. It features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and JWT-based authentication.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built with React 18 using TypeScript and Vite as the build tool. The UI framework is shadcn/ui with Radix UI components and Tailwind CSS for styling. The application uses Wouter for client-side routing and TanStack Query for server state management. The component structure follows a modular approach with reusable UI components, page components, and custom hooks.

## Backend Architecture  
The server is an Express.js application using TypeScript with ESM modules. It implements a RESTful API structure with route handlers for authentication, user management, and onboarding. The backend includes JWT-based authentication middleware and session management. The storage layer uses an abstraction pattern with both in-memory storage (development) and database storage implementations.

## Authentication & Authorization
The application uses JWT tokens for authentication stored in localStorage on the client side. The backend implements token verification middleware for protected routes. Session management includes automatic token validation and refresh capabilities. Password hashing is handled using bcryptjs.

## Database Design
The system uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema includes a users table with fields for authentication (email, password), personal information (firstName, lastName), and onboarding data (industry, experienceLevel). Database migrations are managed through Drizzle Kit.

## State Management
Client-side state is managed through React Context for authentication state and TanStack Query for server state caching. The application implements optimistic updates and background refetching for a smooth user experience. Form state is handled using React Hook Form with Zod validation.

## UI/UX Design System
The application uses a dark theme by default with CSS custom properties for theming. The design system is built on shadcn/ui components with consistent spacing, typography, and color schemes. The interface is fully responsive with mobile-first design principles and includes gradient backgrounds and card-based layouts.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations

## UI & Styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

## Development Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Server-side bundling for production

## Authentication & Security
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and verification

## State Management & Data Fetching
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional CSS class handling
- **nanoid**: Unique ID generation