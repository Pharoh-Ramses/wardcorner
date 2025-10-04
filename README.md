# Ward Sites Template

A template for creating ward websites for The Church of Jesus Christ of Latter-day Saints using Next.js and Payload CMS. This template enables wards to quickly deploy professional websites with minimal technical knowledge.

## Purpose

Wards in The Church of Jesus Christ of Latter-day Saints often need websites for communication, but creating them from scratch requires technical expertise. This template provides:

- **Easy Content Management** - Ward clerks can update content through a user-friendly admin interface
- **Standardized Features** - Common ward needs like announcements, events, leadership directory, and forms
- **Customizable Branding** - Ward-specific colors, names, and contact information via environment variables
- **Mobile-Responsive Design** - Works well on all devices for members on the go

## Features

- **Announcements** - Ward business, activities, and updates
- **Events & Calendar** - Meeting schedules and community events
- **Leadership Directory** - Ward callings and assignments
- **Contact Forms** - Member inquiries and volunteer signups
- **Media Library** - Photos, documents, and recordings
- **Sacrament Programs** - Speaker assignments and musical numbers
- **Polls & Surveys** - Ward decision-making tools

## Tech Stack

- **Frontend**: Next.js 15 with React 19
- **CMS**: Payload CMS 3.0 (headless content management)
- **Database**: PostgreSQL (configurable)
- **Styling**: CSS modules with custom properties
- **Testing**: Vitest (integration) + Playwright (E2E)
- **Deployment**: Docker-ready for easy hosting

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
   Edit `.env` with your database connection and ward-specific settings:

   ```env
   DATABASE_URI=postgresql://user:password@localhost:5432/ward_db
   PAYLOAD_SECRET=your-secret-key-here

   # Ward customization
   WARD_NAME="Example Ward"
   SITE_TITLE="Example Ward Website"
   PRIMARY_COLOR="#2E7D32"
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

Ward-specific customization is handled through environment variables in `.env`:

### Required Variables

- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Random secret key for Payload CMS

### Ward Branding

- `WARD_NAME` - Display name of the ward
- `WARD_STAKE` - Stake name
- `SITE_TITLE` - Browser title and meta title
- `SITE_DESCRIPTION` - Meta description
- `PRIMARY_COLOR` - Main theme color
- `SECONDARY_COLOR` - Secondary theme color

### Feature Flags

- `ENABLE_CALENDAR` - Show/hide calendar integration
- `ENABLE_FORMS` - Enable contact forms
- `ENABLE_POLLS` - Enable polling functionality
- `ENABLE_RECORDINGS` - Enable audio/video uploads

### Contact Information

- `WARD_ADDRESS` - Physical address
- `WARD_PHONE` - Contact phone number
- `WARD_EMAIL` - Contact email

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (frontend)/        # Public-facing pages
│   └── (payload)/         # Admin interface
├── collections/           # Payload CMS collections
│   ├── Media.ts          # File uploads
│   └── Users.ts          # Admin users
└── payload.config.ts     # CMS configuration

tests/
├── e2e/                  # End-to-end tests
└── int/                  # Integration tests
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

### Code Style

See [AGENTS.md](./AGENTS.md) for detailed coding guidelines and development practices.

## Support

For technical issues with Payload CMS, visit:

- [Payload Documentation](https://payloadcms.com/docs)
- [Discord Community](https://discord.com/invite/payload)

For questions about ward website implementation, please create an issue in this repository.
