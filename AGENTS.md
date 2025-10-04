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

- Functional components with hooks
- Async server components for data fetching
- Payload CMS patterns for admin/backend integration

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

Ward-specific customization is handled through environment variables:

- Site branding (name, colors, metadata)
- Feature flags (enable/disable functionality)
- Contact information
- External integrations (calendar, email)

## Development Workflow

1. Use Payload admin for content management
2. Customize via environment variables
3. Test with Vitest (integration) and Playwright (E2E)
4. Deploy with minimal configuration changes
