# Tify - AI Consultancy Landing Page

## Project Overview
A modern, professional landing page for Tify - "Your Digital AI Partner" - an AI consultancy platform offering courses and digital products.

## Brand Identity
- **Primary Color**: Dark Blue (#0E1230 / HSL: 228 55% 12%)
- **Secondary Color**: Dark Grey (#3D3D4A / HSL: 240 10% 27%)
- **Accent Color**: Dark Purple (#6B46C1 / HSL: 258 48% 52%)
- **Typography**: 
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)
  - Mono: JetBrains Mono

## Architecture

### Frontend (React + TypeScript)
- **Pages**:
  - Home: Hero, service cards, blog preview, testimonials carousel, CTA
  - Products: Pricing tables (FREE/ADVANCED/ENTERPRISE), YouTube demo embeds
  - Courses: Filtering/sorting, course grid, detailed course pages
  - Consultancy: Service cards, 4-step timeline, WhatsApp-style CTA
  - Blog: Category filtering, grid layout, detailed post pages
  - About Us: Team cards, company story, statistics

- **Components**:
  - Navigation: Responsive with mobile hamburger menu
  - Footer: 4-column layout with social links
  - ChatWidget: Floating bottom-right widget with Chat/Voice tabs, n8n webhook integration
  - Layout: Wraps all pages with Navigation, Footer, and ChatWidget

### Backend (Express + TypeScript)
- In-memory storage for: blog posts, courses, products, testimonials, team members
- API endpoints:
  - GET /api/blog (with category filtering)
  - GET /api/courses (with category/format filtering and sorting)
  - GET /api/products
  - GET /api/testimonials
  - GET /api/team
  - POST /api/chat/send (forwards to n8n webhook)

### Data Models (shared/schema.ts)
- BlogPost: title, slug, excerpt, content, category, author info, featured image
- Course: title, slug, description, category, format, price, instructor info, modules
- Product: name, slug, description, pricing tiers (free/advanced/enterprise)
- Testimonial: name, role, company, content, rating
- TeamMember: name, title, bio, image, order
- ChatMessage: message, pageSource, timestamp

## Critical Features

### Chat Widget (CRITICAL)
- **Position**: Fixed bottom-right, always visible, z-index 50
- **Behavior**: Opens in-page modal with single chat tab
- **Features**: 
  - Text messaging with typing indicators
  - Auto-scroll to latest messages
  - Send on Enter key
- **Context-Aware Messages**:
  - Products page: "Hi Tify, I want to ask more about tify product"
  - Courses page: "Hi Tify, I'm interested with your course"
  - Other pages: "Hi Tify"
- **Webhook Integration** (configured via environment variables):
  - Environment variables required: `N8N_WEBHOOK_URL`, `N8N_AUTH_HEADER`
  - See `.env.example` for configuration format
  - Actual credentials must be set in `.env` file (gitignored)
  - Payload sent: {message, page_source, timestamp}
  - Graceful fallback if webhook unavailable

## Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI, Wouter, TanStack Query, Framer Motion
- **Backend**: Express.js, TypeScript
- **Storage**: In-memory (MemStorage)
- **Styling**: TailwindCSS with custom color tokens in index.css

## Environment Configuration

The application requires the following environment variables for n8n webhook integration:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
N8N_AUTH_HEADER=Basic YOUR_BASE64_ENCODED_CREDENTIALS_HERE
```

Copy `.env.example` to `.env` and fill in the actual credentials. The `.env` file is gitignored for security.

### ⚠️ SECURITY NOTICE

**IMPORTANT**: The n8n webhook credentials that were previously in the codebase were exposed in git history and must be rotated immediately before production deployment:

1. Log into your n8n instance at https://n8n.tify.cloud
2. Generate new credentials for the webhook at `/webhook/website-tify-co-id-general-support`
3. Update the webhook's Basic Authentication settings with a new username/password
4. Encode the new credentials: `echo -n "username:password" | base64`
5. Update the `.env` file with the new `N8N_AUTH_HEADER` value
6. Restart the application to apply the new credentials

**DO NOT reuse the old credentials** as they are now considered compromised.

## Development Status

### Phase 1: Schema & Frontend ✅
- [x] Configure brand design system (colors, typography)
- [x] Define all data schemas
- [x] Build all page components
- [x] Create navigation and footer
- [x] Implement chat widget with n8n integration

### Phase 2: Backend ✅
- [x] Implement storage interface with rich sample data
- [x] Create API routes for all features (blog, courses, products, testimonials, team, chat)
- [x] Integrate chat webhook forwarding to n8n
- [x] Add query parameter filtering for blog/courses

### Phase 3: Integration & Testing ✅
- [x] Connect frontend to backend
- [x] Add loading states and error handling
- [x] Fix security issues (move n8n credentials to env vars)
- [x] Fix DOM nesting errors
- [x] Fix query parameter passing for filters
- [x] Remove non-functional voice tab from chat widget

## Recent Changes
- 2025-11-14 (10:30 AM): Initial project setup, brand configuration, all frontend components built
- 2025-11-14 (10:37 AM): Fixed critical security issue - moved n8n credentials to env vars, fixed query filtering, simplified chat widget
