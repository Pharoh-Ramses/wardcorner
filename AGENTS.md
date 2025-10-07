# Agent Guidelines for ward-sites

## Project Overview

This is a template for ward websites of The Church of Jesus Christ of Latter-day Saints, built with Next.js and Payload CMS. The goal is to provide a simple, customizable website that wards can deploy with minimal technical knowledge.

## Build/Lint/Test Commands

- **Build**: `pnpm build`
- **Dev server**: `pnpm dev`
- **Lint**: `pnpm lint`
- **All tests**: `pnpm test`
- **Integration tests**: `pnpm test:int`
- **E2E tests**: `pnpm test:e2e`
- **Single test**: `vitest run --config ./vitest.config.mts path/to/test.spec.ts`

## Code Style Guidelines

### Formatting

- Single quotes, trailing commas, print width 100, no semicolons
- Use Prettier for formatting

### TypeScript

- Strict typing required
- Use explicit types, avoid `any` (ESLint warns)
- PascalCase for interfaces/types, camelCase for variables

### Imports

- Absolute imports with `@/` alias (e.g., `import config from '@/payload.config'`)
- Group: React, Next.js, third-party, local imports

### Naming Conventions

- Components: PascalCase (e.g., `HomePage`)
- Functions/variables: camelCase
- Collections: PascalCase (e.g., `Media`, `Users`)
- Files: kebab-case for routes, PascalCase for components

### Error Handling

- Use try/catch for async operations
- TypeScript strict mode catches type errors
- ESLint warns on unused variables (ignore with `_` prefix)

### React Patterns

#### Component Architecture

- **Server Components (Default)**: Use for data fetching, static content, and layout components
- **Client Components**: Only when needed for interactivity (hooks, event handlers, browser APIs)
- **Always use named export default**: `export default function ComponentName()`
- **Component naming**: PascalCase (e.g., `Header`, `Footer`, `AnnouncementCard`)

#### File Organization

```
src/
├── components/
│   ├── layout/           # Layout components (Header, Footer, Navigation)
│   ├── ui/              # Reusable UI components (Button, Card, Modal)
│   ├── content/         # Content-specific components (AnnouncementCard, EventCard)
│   └── forms/           # Form components
├── lib/
│   ├── utils/           # Pure utility functions (formatters, helpers)
│   ├── hooks/           # Custom React hooks
│   └── constants/       # App constants
└── app/                 # Next.js app router pages
```

#### Data Fetching Patterns

- Server components for data fetching with try/catch error handling
- Use `React.cache()` for data fetching functions
- Consistent error states and loading indicators

#### Styling Patterns

- Prefer CSS classes over inline styles
- CSS custom properties for theming and customization
- Component-specific styles with consistent naming

#### Helper Functions & Utilities

- Pure utility functions in `src/lib/utils/`
- Reusable components for rich text rendering
- Consistent date/time formatting functions

#### Component Composition

- Props interfaces for all components
- List components for collections of items
- Consistent error boundaries and loading states

#### Performance & Accessibility

- Next.js Image component for media
- Semantic HTML and proper ARIA labels
- Keyboard navigation support

### Testing

- Vitest for integration tests
- Playwright for E2E tests
- Test files: `*.int.spec.ts` for integration, `*.e2e.spec.ts` for E2E

## Ward Website Features

- **Announcements** - Ward business, activities, updates
- **Events** - Calendar integration, meeting schedules
- **Assignments/Callings** - Ward leadership directory
- **Forms & Polls** - Contact forms, volunteer signups, voting
- **Sacrament Programs** - Speaker assignments, musical numbers
- **Media Library** - Photos, documents, recordings

## Customization Approach

Ward-specific customization is handled through environment variables in the `.env` file. Copy `.env.example` to `.env` and customize the values for your ward.

### Available Environment Variables

#### Site Branding & Identity

- `NEXT_PUBLIC_SITE_NAME` - Site title in navigation and metadata
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Site description for SEO
- `NEXT_PUBLIC_WARD_NAME` - Your ward name
- `NEXT_PUBLIC_STAKE_NAME` - Your stake name

#### Theme Colors

- `NEXT_PUBLIC_PRIMARY_COLOR` - Main brand color (#1e40af)
- `NEXT_PUBLIC_PRIMARY_HOVER` - Primary color hover state
- `NEXT_PUBLIC_SECONDARY_COLOR` - Secondary color for accents
- `NEXT_PUBLIC_ACCENT_COLOR` - Accent color for highlights
- `NEXT_PUBLIC_BG_PRIMARY` - Main background color
- `NEXT_PUBLIC_BG_SECONDARY` - Secondary background color
- `NEXT_PUBLIC_BG_TERTIARY` - Tertiary background color
- `NEXT_PUBLIC_TEXT_PRIMARY` - Primary text color
- `NEXT_PUBLIC_TEXT_SECONDARY` - Secondary text color
- `NEXT_PUBLIC_TEXT_MUTED` - Muted text color
- `NEXT_PUBLIC_BORDER_COLOR` - Border color
- `NEXT_PUBLIC_BORDER_HOVER` - Border hover color

#### Contact Information

- `NEXT_PUBLIC_WARD_CLERK_EMAIL` - Ward clerk email
- `NEXT_PUBLIC_WARD_CLERK_PHONE` - Ward clerk phone
- `NEXT_PUBLIC_WARD_ADDRESS` - Ward meetinghouse address
- `NEXT_PUBLIC_BISHOPRIC_EMAIL` - Bishopric contact email
- `NEXT_PUBLIC_BISHOPRIC_PHONE` - Bishopric contact phone

#### Social Media Links

- `NEXT_PUBLIC_FACEBOOK_URL` - Ward Facebook page
- `NEXT_PUBLIC_INSTAGRAM_URL` - Ward Instagram account
- `NEXT_PUBLIC_YOUTUBE_URL` - Ward YouTube channel

#### Feature Flags

- `NEXT_PUBLIC_ENABLE_EVENTS` - Enable/disable events functionality
- `NEXT_PUBLIC_ENABLE_ANNOUNCEMENTS` - Enable/disable announcements
- `NEXT_PUBLIC_ENABLE_SACRAMENT_PROGRAMS` - Enable/disable sacrament programs
- `NEXT_PUBLIC_ENABLE_FORMS` - Enable/disable form builder

#### Content Customization

- `NEXT_PUBLIC_HERO_TITLE` - Homepage hero section title
- `NEXT_PUBLIC_HERO_SUBTITLE` - Homepage hero section subtitle
- `NEXT_PUBLIC_FOOTER_TEXT` - Footer disclaimer text

#### Church-specific Settings

- `NEXT_PUBLIC_TIMEZONE` - Ward timezone (e.g., "America/Los_Angeles")
- `NEXT_PUBLIC_LOCALE` - Locale for date/time formatting (e.g., "en-US")

## Development Workflow

1. Use Payload admin for content management
2. Customize via environment variables
3. Test with Vitest (integration) and Playwright (E2E)
4. Deploy with minimal configuration changes

## Implementation Roadmap

### Phase 1: Core Frontend (Week 1-2)

**Goal**: Get basic content display working

#### 1.1 Home Page (`src/app/page.tsx`)

- [ ] Create server component for home page
- [ ] Fetch and display recent announcements (last 5)
- [ ] Show upcoming events (next 3 events)
- [ ] Add basic layout with header/navigation
- [ ] Style with responsive design

#### 1.2 Data Fetching Setup

- [ ] Create utility functions for Payload API calls
- [ ] Set up proper TypeScript types from generated payload-types
- [ ] Implement error handling and loading states
- [ ] Add caching strategies for performance

#### 1.3 Basic Layout Components

- [ ] Create `src/components/layout/Header.tsx`
- [ ] Create `src/components/layout/Footer.tsx`
- [ ] Add navigation menu (Home, Events, Announcements, etc.)
- [ ] Implement responsive mobile menu

### Phase 2: Content Pages (Week 3-4)

**Goal**: Complete main content display functionality

#### 2.1 Events Page (`src/app/events/page.tsx`)

- [ ] List all upcoming events with pagination
- [ ] Display event details (title, date, location, description)
- [ ] Add filtering by event type (meeting, activity, service)
- [ ] Create event detail view (`src/app/events/[id]/page.tsx`)
- [ ] Show location details from enhanced location fields

#### 2.2 Announcements Page (`src/app/announcements/page.tsx`)

- [ ] Display announcements with rich text content
- [ ] Add filtering by category (ward-business, activities, updates)
- [ ] Show publication date and author
- [ ] Implement featured announcements highlighting

#### 2.3 Sacrament Programs Page (`src/app/sacrament-programs/page.tsx`)

- [ ] Display upcoming sacrament programs
- [ ] Show presiding, conducting, speakers, and musical numbers
- [ ] Link speakers/musicians to Members collection
- [ ] Add program detail view with full information

### Phase 3: Interactive Features (Week 5-6)

**Goal**: Add user interaction and dynamic content

#### 3.1 Form Builder Integration

- [ ] Create reusable form component (`src/components/FormBuilder.tsx`)
- [ ] Implement form rendering from form builder schema
- [ ] Add form submission handling
- [ ] Style forms to match site branding
- [ ] Add form confirmation messages

#### 3.2 Member Directory (Optional)

- [ ] Create members page (`src/app/members/page.tsx`)
- [ ] Display member information (name, calling)
- [ ] Add search/filter functionality
- [ ] Implement proper access controls (ward leadership only)

#### 3.3 Admin Dashboard Enhancements

- [ ] Customize Payload admin interface
- [ ] Add custom fields for ward-specific data
- [ ] Configure email settings for form notifications
- [ ] Set up user roles and permissions

### Phase 4: Advanced Features (Week 7-8)

**Goal**: Polish and add advanced functionality

#### 4.1 Email Configuration

- [ ] Set up email service (SendGrid, AWS SES, etc.)
- [ ] Configure form submission email templates
- [ ] Add email notifications for ward leadership
- [ ] Implement email preferences for members

#### 4.2 Media Integration

- [ ] Create media gallery page (`src/app/media/page.tsx`)
- [ ] Display uploaded images and documents
- [ ] Add categories/tags for organization
- [ ] Implement file upload from frontend

#### 4.3 Search & Filtering

- [ ] Add global search functionality
- [ ] Implement advanced filtering on events/announcements
- [ ] Add date range filtering for events
- [ ] Create search results page

### Phase 5: Testing & Deployment (Week 9-10)

**Goal**: Ensure quality and prepare for production

#### 5.1 Testing

- [ ] Write integration tests for API endpoints
- [ ] Create E2E tests for critical user flows
- [ ] Test form submissions and email delivery
- [ ] Performance testing and optimization

#### 5.2 Deployment & Configuration

- [ ] Set up production database (PostgreSQL)
- [ ] Configure environment variables
- [ ] Set up CI/CD pipeline
- [ ] Deploy to hosting platform (Vercel, Netlify, etc.)

#### 5.3 Documentation & Training

- [ ] Create admin user guide
- [ ] Document customization options
- [ ] Add deployment instructions
- [ ] Create ward leadership training materials

## Technical Architecture

### Frontend Structure

```
src/
├── app/                    # Next.js app router
│   ├── (frontend)/        # Public pages
│   │   ├── page.tsx       # Home page
│   │   ├── events/        # Events pages
│   │   ├── announcements/ # Announcements pages
│   │   └── ...
│   └── (payload)/         # Admin interface
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── forms/            # Form components
├── lib/                  # Utilities and configurations
└── styles/               # Global styles
```

### Key Technologies

- **Next.js 15**: App router with server components
- **Payload CMS**: Headless CMS with form builder
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **PostgreSQL**: Production database

### Data Flow

1. **Content Creation**: Ward leadership uses Payload admin
2. **Data Storage**: PostgreSQL database via Payload
3. **API Layer**: Payload REST/GraphQL APIs
4. **Frontend**: Next.js server components fetch data
5. **User Interaction**: Form submissions stored and processed

## Development Best Practices

### Code Organization

- Use feature-based folder structure
- Keep components small and focused
- Implement proper error boundaries
- Use TypeScript for all new code

### Performance

- Implement proper caching strategies
- Use Next.js Image component for media
- Lazy load non-critical components
- Optimize database queries

### Security

- Implement proper access controls
- Validate all form inputs
- Use HTTPS in production
- Regular security updates

### Accessibility

- Follow WCAG guidelines
- Test with screen readers
- Ensure keyboard navigation
- Provide alt text for images
