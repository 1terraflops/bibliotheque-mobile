# Setup

## Prerequisites

- Node.js
- pnpm
- Xcode (for iOS builds - this app uses native modules and cannot run in Expo Go)
- The Bibliotheque backend running (locally or deployed)
- A Supabase project

## Environment Variables

Copy `.env.example` to `.env`:

| Variable                   | Description                 |
| -------------------------- | --------------------------- |
| `EXPO_PUBLIC_BASE_URL`     | Base URL of the backend API |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL        |
| `EXPO_PUBLIC_SUPABASE_KEY` | Supabase anon/public key    |

All variables are prefixed `EXPO_PUBLIC_` since they're inlined into the client bundle at build time - none of these should be secret values.

## Supabase Type Generation

Database types are generated from the Supabase schema:

```
npx supabase gen types typescript --project-id <project-id> > types/database.types.ts
```

The output **must** be saved to `types/database.types.ts` - other files in the `types/` folder assume it lives there.

## Install

```bash
pnpm install
```

## Running on a Device

This app uses native modules, so it **cannot run in Expo Go**. The workflow is:

```bash
# generate native iOS/Android projects
npx expo prebuild

# open and run via Xcode (for iOS)
open ios/*.xcworkspace
```

Build and run directly from Xcode onto a connected device (or simulator). After the prebuild, run `npx expo start --dev-client` for JS bundler to start and begin the development.

If native dependencies change, rerun `npx expo prebuild` and rebuild the project with Xcode to sync the native projects.
