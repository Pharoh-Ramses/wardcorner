# Ward Sites Template

A template for creating ward websites for The Church of Jesus Christ of Latter-day Saints using Next.js and Payload CMS. This template enables wards to quickly deploy professional websites with minimal technical knowledge.

## Purpose

Wards in The Church of Jesus Christ of Latter-day Saints often need websites for communication, but creating them from scratch requires technical expertise. This template provides:

- **Easy Content Management** - Ward clerks can update content through a user-friendly admin interface
- **Standardized Features** - Common ward needs like announcements, events, sacrament programs, and forms
- **Comprehensive Customization** - Ward-specific branding, colors, content, and contact information via environment variables
- **Modern React Architecture** - Server/Client components with established patterns for maintainability
- **Mobile-Responsive Design** - Works well on all devices for members on the go
- **Type-Safe Development** - Full TypeScript support with auto-generated Payload types

## Features

- **Announcements** - Ward business, activities, and updates
- **Events & Calendar** - Meeting schedules and community events
- **Leadership Directory** - Ward callings and assignments
- **Contact Forms** - Member inquiries and volunteer signups
- **Media Library** - Photos, documents, and recordings
- **Sacrament Programs** - Speaker assignments and musical numbers
- **Polls & Surveys** - Ward decision-making tools

## Tech Stack

- **Frontend**: Next.js 15 with React 19 and TypeScript
- **CMS**: Payload CMS 3.0 (headless content management)
- **Database**: PostgreSQL (configurable)
- **Styling**: CSS with custom properties for dynamic theming
- **Architecture**: Server/Client components with React patterns
- **Testing**: Vitest (integration) + Playwright (E2E)
- **Deployment**: Docker-ready for easy hosting

## React Patterns

This project follows established React patterns for maintainability and consistency:

- **Server Components (Default)**: Data fetching, static content, layout components
- **Client Components**: Only when needed for interactivity (hooks, event handlers)
- **Component Organization**: Layout, UI, and Content component categories
- **TypeScript**: Strict typing with auto-generated Payload types
- **Styling**: CSS custom properties with environment variable overrides
- **Error Handling**: Consistent error states and loading indicators

## Quick Start

### Prerequisites

- Node.js 18.20.2 or higher
- pnpm package manager
- PostgreSQL database

### Local Development

1. **Clone and setup**

   ```bash
   git clone <repository-url>
   cd ward-sites
   cp .env.example .env
   ```

2. **Configure environment**
   Edit `.env` with your database connection and ward-specific settings. See `.env.example` for all available options:

   ```env
   DATABASE_URI=postgresql://user:password@localhost:5432/ward_db
   PAYLOAD_SECRET=your-secret-key-here

   # Ward customization
   NEXT_PUBLIC_SITE_NAME="Oakwood Ward"
   NEXT_PUBLIC_WARD_NAME="Oakwood Ward"
   NEXT_PUBLIC_STAKE_NAME="Riverside Stake"
   NEXT_PUBLIC_PRIMARY_COLOR="#1e40af"
   NEXT_PUBLIC_HERO_TITLE="Welcome to Oakwood Ward"
   ```

3. **Install and run**

   ```bash
   pnpm install
   pnpm dev
   ```

4. **Access the site**
   - Frontend: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Docker Development

For a complete local environment with database:

```bash
docker-compose up -d
pnpm dev
```

## Customization

Ward-specific customization is handled through environment variables in `.env`. Copy `.env.example` to `.env` and customize the values for your ward.

### Required Variables

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Random secret key for Payload CMS

### Site Branding & Identity

- `NEXT_PUBLIC_SITE_NAME` - Site title in navigation and metadata
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Site description for SEO
- `NEXT_PUBLIC_WARD_NAME` - Your ward name
- `NEXT_PUBLIC_STAKE_NAME` - Your stake name

### Theme Colors

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

### Contact Information

- `NEXT_PUBLIC_WARD_CLERK_EMAIL` - Ward clerk email
- `NEXT_PUBLIC_WARD_CLERK_PHONE` - Ward clerk phone
- `NEXT_PUBLIC_WARD_ADDRESS` - Ward meetinghouse address
- `NEXT_PUBLIC_BISHOPRIC_EMAIL` - Bishopric contact email
- `NEXT_PUBLIC_BISHOPRIC_PHONE` - Bishopric contact phone

### Social Media Links

- `NEXT_PUBLIC_FACEBOOK_URL` - Ward Facebook page
- `NEXT_PUBLIC_INSTAGRAM_URL` - Ward Instagram account
- `NEXT_PUBLIC_YOUTUBE_URL` - Ward YouTube channel

### Feature Flags

- `NEXT_PUBLIC_ENABLE_EVENTS` - Enable/disable events functionality
- `NEXT_PUBLIC_ENABLE_ANNOUNCEMENTS` - Enable/disable announcements
- `NEXT_PUBLIC_ENABLE_SACRAMENT_PROGRAMS` - Enable/disable sacrament programs
- `NEXT_PUBLIC_ENABLE_FORMS` - Enable/disable form builder

### Content Customization

- `NEXT_PUBLIC_HERO_TITLE` - Homepage hero section title
- `NEXT_PUBLIC_HERO_SUBTITLE` - Homepage hero section subtitle
- `NEXT_PUBLIC_FOOTER_TEXT` - Footer disclaimer text

### Church-specific Settings

- `NEXT_PUBLIC_TIMEZONE` - Ward timezone (e.g., "America/Los_Angeles")
- `NEXT_PUBLIC_LOCALE` - Locale for date/time formatting (e.g., "en-US")

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (frontend)/        # Public-facing pages
│   │   ├── layout.tsx     # Root layout with theming
│   │   ├── page.tsx       # Home page
│   │   └── styles.css     # Global styles with CSS custom properties
│   └── (payload)/         # Admin interface
├── components/            # Reusable React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── ui/               # UI components (RichText, Loading, ErrorMessage)
│   └── content/          # Content components (AnnouncementCard, EventCard, Lists)
├── lib/                  # Utilities and configurations
│   ├── utils/            # Pure utility functions (formatters)
│   ├── hooks/            # Custom React hooks (useLocalStorage)
│   └── constants/        # App constants (navigation)
├── collections/          # Payload CMS collections
│   ├── Announcements.ts  # Ward announcements
│   ├── Events.ts         # Ward events and meetings
│   ├── Members.ts        # Ward members
│   ├── Media.ts          # File uploads
│   └── Users.ts          # Admin users
├── payload-types.ts      # Auto-generated TypeScript types
└── payload.config.ts     # CMS configuration

tests/
├── e2e/                  # End-to-end tests (Playwright)
└── int/                  # Integration tests (Vitest)
```

## Development Workflow

1. **Content Management** - Use Payload admin at `/admin` for all content
2. **Customization** - Update environment variables for ward-specific branding
3. **Testing** - Run `pnpm test` for full test suite
4. **Deployment** - Use Docker for consistent deployment

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run all tests
- `pnpm test:int` - Run integration tests only
- `pnpm test:e2e` - Run E2E tests only

## Deployment

### Docker Deployment

```bash
# Build and run with Docker
docker build -t ward-sites .
docker run -p 3000:3000 --env-file .env ward-sites
```

### Cloud Platforms

This template is designed to work with:

- Vercel (recommended for Next.js)
- Railway
- Render
- Any platform supporting Node.js and PostgreSQL

## Contributing

### For AI Agents

- Always update this README when making significant changes or architectural decisions
- Document new environment variables in the Customization section
- Add new features to the Features section
- Update Tech Stack if dependencies change significantly
- Follow established React patterns documented in AGENTS.md
- Maintain component organization (layout/, ui/, content/ directories)

### Code Style

See [AGENTS.md](./AGENTS.md) for detailed coding guidelines and development practices.

## Support

For technical issues with Payload CMS, visit:

- [Payload Documentation](https://payloadcms.com/docs)
- [Discord Community](https://discord.com/invite/payload)

For questions about ward website implementation, please create an issue in this repository.
