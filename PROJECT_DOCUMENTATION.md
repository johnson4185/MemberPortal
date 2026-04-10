# MemberConnect - Complete Project Documentation

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Environment Configuration](#environment-configuration)
- [API Architecture](#api-architecture)
- [Component Structure](#component-structure)
- [State Management](#state-management)
- [Development Workflow](#development-workflow)
- [Build & Deployment](#build--deployment)

---

## 🎯 Project Overview

**MemberConnect** is a modern, production-ready health insurance member portal built with Next.js 14 (App Router). It provides comprehensive member services including claims management, policy information, provider search, payments, support ticketing, and wellness tracking.

### Key Highlights
- ✅ **Production-ready**: Feature-based modular architecture
- ✅ **Type-safe**: Full TypeScript with strict type checking
- ✅ **Mock/Real API toggle**: Easy backend integration
- ✅ **Comprehensive documentation**: JSDoc on all modules
- ✅ **Scalable structure**: Industry-standard SaaS architecture

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5.x** - Type safety

### State Management & Data
- **Zustand 4.5.5** - Lightweight state management
- **React Query 5.59.0** - Server state management
- **React Hook Form 7.54.0** - Form handling
- **Zod 3.23.8** - Schema validation

### Styling
- **Tailwind CSS 3.4.19** - Utility-first CSS
- **Lucide React 0.460.0** - Icon library
- **clsx 2.1.1** - Conditional classnames

### Utilities
- **date-fns 4.1.0** - Date manipulation
- **js-cookie 3.0.5** - Cookie management

---

## 🏗️ Architecture

### Feature-Based Modular Architecture

```
memberconnect/
├── app/                      # Next.js App Router (Pages & Layouts)
├── features/                 # Feature modules (API logic)
├── components/               # Reusable UI components
├── lib/                      # Shared utilities & infrastructure
│   ├── api/                 # API client & configuration
│   ├── types/               # Global type definitions
│   ├── constants/           # App-wide constants
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Zustand stores
│   └── utils/               # Helper functions
└── public/                   # Static assets
```

### Three-Tier API Architecture

```
Component → Feature API → API Client → Backend
```

**Example Flow:**
```typescript
// 1. Component calls feature API
ClaimsPage → claimsApi.getAll()

// 2. Feature API uses API client
claims.api.ts → apiClient.get("/claims") OR mock data

// 3. API client makes HTTP request
apiClient → fetch(baseURL + "/claims")
```

---

## 📁 Folder Structure

### Root Directory
```
memberconnect/
├── .env.local              # Environment variables (gitignored)
├── .env.local.example      # Environment template
├── .gitignore              # Git ignore rules
├── .vscode/                # VS Code settings
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

### `/app` - Pages & Routing
```
app/
├── layout.tsx              # Root layout (metadata, fonts)
├── page.tsx                # Home page (redirects to dashboard)
├── globals.css             # Global styles
│
├── (auth)/                 # Auth route group (centered layout)
│   ├── layout.tsx         # Auth layout wrapper
│   ├── login/             # Login page
│   └── register/          # Registration page
│
└── (dashboard)/            # Dashboard route group (sidebar layout)
    ├── layout.tsx         # Dashboard layout with sidebar
    ├── dashboard/         # Main dashboard
    ├── claims/            # Claims management
    │   ├── page.tsx           # Claims list
    │   ├── [id]/page.tsx      # Claim detail
    │   └── new/page.tsx       # Submit new claim
    ├── policy/            # Policy information
    ├── providers/         # Provider search
    ├── payments/          # Payment history & billing
    ├── support/           # Support tickets & FAQ
    ├── wellness/          # Health & wellness tracking
    └── settings/          # Account settings
```

### `/features` - Feature Modules
```
features/
├── auth/                   # Authentication
│   ├── auth.api.ts            # API functions (login, register, logout)
│   ├── auth.mock.ts           # Mock user data
│   ├── auth.types.ts          # Auth-specific types (LoginCredentials, etc.)
│   └── auth.constants.ts      # Auth constants
│
├── claims/                 # Claims Management
│   ├── claims.api.ts          # getAll, getById, create, update, delete
│   ├── claims.mock.ts         # Mock claims data
│   ├── claims.types.ts        # ClaimsListParams, SubmitClaimPayload
│   └── claims.constants.ts    # Status colors, allowed file types
│
├── policy/                 # Policy Information
├── payments/               # Payment Processing
├── providers/              # Provider Directory
├── support/                # Support Tickets & FAQ
└── wellness/               # Wellness & Health Tracking
```

**Each feature follows the pattern:**
- `.api.ts` - API functions (what you call from components)
- `.mock.ts` - Mock data (for development without backend)
- `.types.ts` - Request/response types
- `.constants.ts` - Feature-specific constants

### `/components` - UI Components
```
components/
├── ui/                     # Base UI components
│   ├── Button.tsx             # Reusable button
│   ├── Badge.tsx              # Status badge
│   ├── StatCard.tsx           # Dashboard stat card
│   ├── Pagination.tsx         # Pagination controls
│   └── index.ts               # Exports
│
├── forms/                  # Form components
│   ├── Input.tsx              # Text input
│   ├── Select.tsx             # Dropdown select
│   ├── Textarea.tsx           # Multi-line input
│   ├── FileUpload.tsx         # File upload
│   └── index.ts
│
├── shared/                 # Shared components
│   ├── Modal.tsx              # Modal dialog
│   ├── EmptyState.tsx         # Empty state message
│   ├── LoadingSkeleton.tsx    # Loading skeleton
│   ├── ProtectedRoute.tsx     # Auth guard
│   └── index.ts
│
├── layout/                 # Layout components
│   ├── Sidebar.tsx            # Dashboard sidebar navigation
│   ├── Navbar.tsx             # Top navbar
│   ├── DashboardLayout.tsx    # Dashboard wrapper
│   └── index.ts
│
└── tables/                 # Table components
    └── DataTable.tsx          # Generic data table
```

### `/lib` - Shared Infrastructure
```
lib/
├── api/                    # API Infrastructure
│   ├── apiClient.ts           # HTTP client (fetch wrapper)
│   ├── apiRoutes.ts           # Endpoint definitions
│   └── apiConfig.ts           # API configuration (baseURL, mock toggle)
│
├── types/                  # Global Type Definitions
│   ├── index.ts               # Exports all types
│   ├── user.ts                # User & Address interfaces
│   ├── claim.ts               # Claim entity types
│   ├── policy.ts              # Policy entity types
│   ├── payment.ts             # Payment entity types
│   ├── provider.ts            # Provider entity types
│   ├── support.ts             # Support ticket types
│   └── wellness.ts            # Wellness metric types
│
├── constants/              # Global Constants
│   └── index.ts               # ROUTES, STATES, REGEX patterns
│
├── store/                  # State Management
│   ├── authStore.ts           # Auth state (user, token)
│   └── uiStore.ts             # UI state (sidebar, modals)
│
├── hooks/                  # Custom React Hooks
│   └── (custom hooks here)
│
└── utils/                  # Utility Functions
    └── index.ts               # Helper functions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
cd C:\MemberDCFportal\memberconnect
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
copy .env.local.example .env.local

# Edit .env.local with your values
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## ✨ Features

### 1. Authentication
- **Login** - Email/password authentication
- **Registration** - New member signup
- **Protected Routes** - Auth guard for dashboard pages
- **Token Management** - Cookie-based session

**Files:**
- `features/auth/auth.api.ts`
- `lib/store/authStore.ts`
- `components/shared/ProtectedRoute.tsx`

---

### 2. Claims Management
- **View Claims** - List all claims with filtering
- **Claim Details** - View individual claim information
- **Submit Claim** - File new insurance claim
- **Update Claim** - Edit claim details
- **Attachments** - Upload supporting documents

**Files:**
- `features/claims/claims.api.ts`
- `app/(dashboard)/claims/page.tsx`
- `app/(dashboard)/claims/[id]/page.tsx`
- `app/(dashboard)/claims/new/page.tsx`

---

### 3. Policy Information
- **View Policy** - Active policy details
- **Coverage Details** - Deductibles, limits, copays
- **Download Documents** - Policy PDF, ID card

**Files:**
- `features/policy/policy.api.ts`
- `app/(dashboard)/policy/page.tsx`

---

### 4. Provider Directory
- **Search Providers** - Find doctors, hospitals, pharmacies
- **Filter by Type** - Primary care, specialist, urgent care
- **View Details** - Hours, address, contact info
- **In-Network Status** - Network participation

**Files:**
- `features/providers/providers.api.ts`
- `app/(dashboard)/providers/page.tsx`

---

### 5. Payments & Billing
- **Payment History** - View past payments
- **Make Payment** - Pay premium or claim balance
- **Billing Overview** - Current balance, due date
- **Download Receipt** - Payment confirmation

**Files:**
- `features/payments/payments.api.ts`
- `app/(dashboard)/payments/page.tsx`

---

### 6. Support Center
- **Support Tickets** - Create and track support requests
- **FAQ Section** - Common questions and answers
- **Ticket Messages** - Add replies to tickets
- **Status Tracking** - Open, in progress, resolved

**Files:**
- `features/support/support.api.ts`
- `app/(dashboard)/support/page.tsx`

---

### 7. Wellness Tracking
- **Health Metrics** - Steps, weight, blood pressure
- **Wellness Articles** - Health tips and resources
- **Telemedicine** - Virtual doctor appointments
- **Goals** - Set and track health goals

**Files:**
- `features/wellness/wellness.api.ts`
- `app/(dashboard)/wellness/page.tsx`

---

### 8. Account Settings
- **Profile Management** - Update personal information
- **Change Password** - Security settings
- **Notification Preferences** - Email/SMS notifications
- **Address Update** - Mailing address

**Files:**
- `app/(dashboard)/settings/page.tsx`

---

## 🔧 Environment Configuration

### Environment Variables

**`.env.local`** (not committed to Git)
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.yourbackend.com
NEXT_PUBLIC_USE_MOCK=true

# Optional: Add your backend-specific variables
# NEXT_PUBLIC_AUTH_DOMAIN=auth.yourbackend.com
# API_SECRET_KEY=your-secret-key
```

**`.env.local.example`** (template in Git)
```env
# API Configuration
# Set to false when connecting to real backend
NEXT_PUBLIC_USE_MOCK=true

# Backend API URL (used when NEXT_PUBLIC_USE_MOCK=false)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Timeout for API requests (milliseconds)
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Mock Mode vs Real API

**Development (Mock Mode):**
```env
NEXT_PUBLIC_USE_MOCK=true
```
- Uses mock data from `features/*/mock.ts`
- No backend required
- Perfect for frontend development

**Production (Real API):**
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE_URL=https://api.production.com
```
- Connects to real backend
- Uses `apiClient` for HTTP requests
- Requires backend API setup

---

## 🌐 API Architecture

### API Client (`lib/api/apiClient.ts`)

**Features:**
- ✅ Automatic auth token injection
- ✅ Request timeout handling
- ✅ Error handling & formatting
- ✅ TypeScript generic responses

**Usage:**
```typescript
import { apiClient } from "@/lib/api/apiClient";

// GET request
const claims = await apiClient.get<Claim[]>("/claims");

// POST request
const newClaim = await apiClient.post<Claim>("/claims", claimData);

// PUT request
const updated = await apiClient.put<Claim>(`/claims/${id}`, updates);

// DELETE request
await apiClient.delete(`/claims/${id}`);
```

### API Routes (`lib/api/apiRoutes.ts`)

Centralized endpoint definitions:

```typescript
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  },
  CLAIMS: {
    LIST: "/claims",
    DETAIL: (id: string) => `/claims/${id}`,
    CREATE: "/claims",
    UPDATE: (id: string) => `/claims/${id}`,
  },
  // ... more routes
};
```

### Feature API Pattern

Each feature has an API module with standard CRUD operations:

**Example: `features/claims/claims.api.ts`**
```typescript
export const claimsApi = {
  // Get all claims
  getAll: async (params?: ClaimsListParams): Promise<ClaimsListResponse> => {
    if (apiConfig.useMock) {
      return MOCK_CLAIMS; // Mock data
    }
    return apiClient.get(API_ROUTES.CLAIMS.LIST, { params });
  },

  // Get single claim
  getById: async (id: string): Promise<Claim> => {
    if (apiConfig.useMock) {
      return getMockClaimById(id);
    }
    return apiClient.get(API_ROUTES.CLAIMS.DETAIL(id));
  },

  // Create new claim
  create: async (data: SubmitClaimPayload): Promise<Claim> => {
    if (apiConfig.useMock) {
      return createMockClaim(data);
    }
    return apiClient.post(API_ROUTES.CLAIMS.CREATE, data);
  },

  // Update claim
  update: async (id: string, data: UpdateClaimPayload): Promise<Claim> => {
    if (apiConfig.useMock) {
      return updateMockClaim(id, data);
    }
    return apiClient.put(API_ROUTES.CLAIMS.UPDATE(id), data);
  },

  // Delete claim
  delete: async (id: string): Promise<void> => {
    if (apiConfig.useMock) {
      return deleteMockClaim(id);
    }
    return apiClient.delete(API_ROUTES.CLAIMS.DELETE(id));
  },
};
```

### Usage in Components

```typescript
"use client";
import { claimsApi } from "@/features/claims/claims.api";

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await claimsApi.getAll({ status: "submitted" });
      setClaims(response.claims);
    };
    fetchClaims();
  }, []);

  return (
    <div>
      {claims.map(claim => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  );
}
```

---

## 🎨 Component Structure

### UI Components (`components/ui/`)

**Button.tsx**
```typescript
<Button variant="primary" size="lg">Submit Claim</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

**Badge.tsx**
```typescript
<Badge variant="success">Approved</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Denied</Badge>
```

**StatCard.tsx**
```typescript
<StatCard 
  title="Total Claims" 
  value="12" 
  icon={<FileText />} 
  trend="+2 this month" 
/>
```

### Form Components (`components/forms/`)

```typescript
<Input 
  label="Email" 
  type="email" 
  placeholder="Enter email" 
  error={errors.email?.message} 
/>

<Select 
  label="Claim Type" 
  options={claimTypes} 
  value={selectedType} 
  onChange={setSelectedType} 
/>

<FileUpload 
  label="Attachments" 
  accept=".pdf,.jpg,.png" 
  maxSize={5 * 1024 * 1024} 
  onChange={setFiles} 
/>
```

### Layout Components (`components/layout/`)

**Sidebar Navigation:**
- Dashboard
- Claims
- Policy
- Providers
- Payments
- Support
- Wellness
- Settings

**Responsive:**
- Desktop: Fixed sidebar
- Mobile: Collapsible menu

---

## 💾 State Management

### Zustand Stores

**Auth Store (`lib/store/authStore.ts`)**
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Usage
const { user, isAuthenticated, login, logout } = useAuthStore();
```

**UI Store (`lib/store/uiStore.ts`)**
```typescript
interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  // ... modal states
}

// Usage
const { isSidebarOpen, toggleSidebar } = useUIStore();
```

---

## 🔄 Development Workflow

### Adding a New Feature

1. **Create feature folder**
```
features/my-feature/
├── my-feature.api.ts
├── my-feature.mock.ts
├── my-feature.types.ts
└── my-feature.constants.ts
```

2. **Define types** (`my-feature.types.ts`)
```typescript
export interface MyFeatureData {
  id: string;
  name: string;
}

export interface MyFeatureListParams {
  page?: number;
  search?: string;
}
```

3. **Create API** (`my-feature.api.ts`)
```typescript
export const myFeatureApi = {
  getAll: async (params?: MyFeatureListParams) => {
    if (apiConfig.useMock) {
      return MOCK_DATA;
    }
    return apiClient.get("/my-feature", { params });
  },
};
```

4. **Add mock data** (`my-feature.mock.ts`)
```typescript
export const MOCK_MY_FEATURE_DATA = [
  { id: "1", name: "Test Item" },
];
```

5. **Create page** (`app/(dashboard)/my-feature/page.tsx`)
```typescript
import { myFeatureApi } from "@/features/my-feature/my-feature.api";

export default function MyFeaturePage() {
  // Use the API
  const data = await myFeatureApi.getAll();
  return <div>...</div>;
}
```

### Backend Integration Checklist

- [ ] Set `NEXT_PUBLIC_USE_MOCK=false`
- [ ] Configure `NEXT_PUBLIC_API_BASE_URL`
- [ ] Update endpoint routes in `lib/api/apiRoutes.ts`
- [ ] Test API responses match TypeScript types
- [ ] Update types if backend structure differs
- [ ] Remove mock files if no longer needed

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

**Output:**
- `.next/` - Compiled Next.js application
- Static pages pre-rendered
- Server-side code optimized

### Environment Setup

**Development:**
```env
NEXT_PUBLIC_USE_MOCK=true
```

**Staging:**
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE_URL=https://staging-api.example.com
```

**Production:**
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### Deployment Platforms

**Vercel (Recommended):**
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push

**Other Platforms:**
- AWS Amplify
- Netlify
- Azure Static Web Apps
- Docker container

### Performance Optimizations

✅ Server-side rendering (SSR)  
✅ Static generation where possible  
✅ Image optimization (Next.js Image)  
✅ Code splitting (automatic)  
✅ Tree shaking (Tailwind CSS purge)  
✅ Lazy loading components  

---

## 📖 Key Concepts

### Type Safety

**Global Types** (`lib/types/`)
- Base entity models (User, Claim, Policy)
- Used across entire application

**Feature Types** (`features/*/types.ts`)
- API request/response shapes
- Feature-specific interfaces

### Constants Organization

**Global Constants** (`lib/constants/`)
- Application routes
- US states list
- Validation regex patterns

**Feature Constants** (`features/*/constants.ts`)
- Status labels and colors
- Feature-specific limits
- Display configurations

### Mock vs Real API

The application seamlessly switches between mock and real data:

```typescript
// Controlled by environment variable
if (apiConfig.useMock) {
  return mockData; // Development
} else {
  return apiClient.get(endpoint); // Production
}
```

**Benefits:**
- Frontend development without backend
- Demo mode for presentations
- Easy testing with controlled data

---

## 🔒 Security

### Authentication
- JWT token stored in HTTP-only cookies
- Protected routes with middleware
- Automatic token refresh

### Data Validation
- Zod schemas for form validation
- Type-safe API requests
- Input sanitization

### Environment Variables
- Sensitive data in `.env.local`
- Never committed to Git
- Template provided in `.env.local.example`

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

### Code Quality
- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting (via VS Code)

---

## 👥 Team Guidelines

### Code Style
- Use TypeScript for all files
- Follow file naming conventions: `kebab-case.tsx`
- Export components as default
- Use named exports for utilities

### Component Guidelines
- One component per file
- Props interface before component
- Use React Hook Form for forms
- Implement loading and error states

### API Guidelines
- One API file per feature
- Include JSDoc comments
- Handle errors gracefully
- Return typed responses

---

## 🐛 Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Types not found:**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**Mock data not loading:**
- Check `NEXT_PUBLIC_USE_MOCK=true` in `.env.local`
- Verify mock data exists in feature folder

**API calls failing:**
- Check `NEXT_PUBLIC_API_BASE_URL` is correct
- Verify backend is running
- Check network tab in browser DevTools

---

## 📞 Support

For questions or issues:
1. Check this documentation
2. Review feature-specific files
3. Consult inline JSDoc comments
4. Check `.env.local.example` for configuration

---

## 📄 License

Private - MemberConnect

---

**Last Updated:** February 14, 2026  
**Version:** 0.1.0  
**Framework:** Next.js 16.1.6 with App Router
