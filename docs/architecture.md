# Architecture

## Top-Level Folders

| Folder        | Purpose                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| `app/`        | expo-router screens (file-based routing)                                   |
| `api/`        | TanStack Query layer - queries and mutations                               |
| `types/`      | Zod schemas + inferred types                                               |
| `components/` | UI components, one folder per feature area, plus a `shared/` design system |
| `store/`      | Zustand stores (client-only state)                                         |
| `constants/`  | shared constants (e.g. colors)                                             |
| `utils/`      | general helpers                                                            |

## API and UI Separation

The codebase enforces a strict line between **data fetching** and **presentation**:

- **`api/`** is the only place that talks to the network. It knows about Axios, endpoints, query keys, and response schemas - and nothing about components, navigation, or styling.
- **`components/`** (and `app/` screens) only ever consume data through query/mutation hooks exported from `api/`. They never call `axios` directly, never construct a URL, and never parse a raw response themselves.
- **`types/`** sits underneath both and is shared by them - it's where the contract between server and UI is defined, so a schema change in one Zod file propagates as a type error everywhere it's used, instead of silently mismatching.

## State Management

State is split along a clear line:

- **Server state** (anything that comes from the backend or Supabase - books, sessions, reviews, stats, the user's profile) is owned by **TanStack Query**. See API Layer below.
- **Client-only state** (auth session) lives in a **Zustand** store. It tracks the current Supabase session, the authenticated flag, the loaded `Profile`, and whether the store has finished hydrating on app start.

There is intentionally no overlap - Zustand never duplicates data that TanStack Query already owns.

**Rule: server state belongs in TanStack Query, not Zustand.** Any data that originates from the backend or Supabase - even if it feels like "global state" because many screens read it - must be fetched and cached through a query, not copied into a Zustand store. TanStack Query already provides caching, invalidation, refetching, and loading/error state; duplicating that data into Zustand creates a second source of truth that can drift out of sync with the server. Zustand is reserved for state that has no server-side origin (session/auth flags, transient UI state, hydration status).

## API Layer

`api/` mirrors the backend's module structure (`books`, `reviews`, `reading-stats`, `reading-sessions`, `users`, `auth`) so that touching a backend service has an obvious counterpart on the client.

Each domain folder contains one file per query or mutation, named for what it does:

```
api/books/
  get-book.query.ts
  get-books.query.ts
  get-books-by-statuses.query.ts
  get-user-book.query.ts
  get-by-name.query.ts
  add-book.mutation.ts
  update-book.mutation.ts
  delete-book.mutation.ts
  upload-cover.mutation.ts
```

- **Queries** export a `queryOptions()` function built with TanStack Query's `queryOptions()`, parsing responses through `parseResponse(Schema)` (a Zod-based response parser/validator).
- **Mutations** export a `mutationOptions()` function built with `mutationOptions()`, and are responsible for invalidating the relevant query keys on success (and sometimes side effects like `router.back()`).
- `axios.ts` holds the shared, pre-configured Axios instance (base URL, auth header injection).
- `queryClient.ts` holds the single shared `QueryClient` instance used across the app, so mutations can invalidate queries owned by other files.
- **TanStack Pacer** is used where input needs to be debounced or rate-limited before triggering a query.

## Types Layer

`types/` mirrors the same domain split as `api/`. Each domain is a flat file with schema and type exports:

```ts
export const BookSchema = z.object({ ... });
export type Book = z.infer<typeof BookSchema>;
```

Where a domain has both API-response schemas and form validation schemas (e.g. `books`), they're split into two files to keep concerns separate:

```
types/books/
  index.ts     # API schemas + types (Book, UserBook, BooksByStatuses, ...)
  forms.ts     # form validators (IGetBookForm, ISearchBookByNameForm, ...)
```

`database.types.ts` is **generated**, not hand-written - see [Setup](./setup.md) for the generation command.

## Forms

Forms use **TanStack Form**, validated with the Zod schemas defined in each domain's `forms.ts`. Validation messages come directly from the Zod schema's `message` strings.

## Styling

Styling uses **NativeWind**, with a custom Tailwind theme (`tailwind.config.js`) extending colors and font families:

- A custom dark/light color scale (`dark-1`–`dark-5`, `light-1`–`light-7`) plus semantic tokens (`success`, `error`, `attention`, `approved-*`, chart-specific colors like `duration`, `pages`, `speed`).
- Custom font families for Inter, Roboto Mono, and Nunito Sans at various weights.
- `constants/colors.ts` mirrors some of these tokens for use in places that need raw color values (e.g. native chart libraries or icon props that don't accept Tailwind classes).

## Components

Organized by feature area (`activity`, `reading`, `search`, `tabs`, `auth`, `library`, `user-profile`), with a `shared/` folder acting as the design system: `Button`, `Input`, `Typography`, `ScreenLayout`, `Tabs`, `Avatar`, `Spinner`, etc, plus subfolders for `modals`, `charts`, and `widgets` (composite components built from the base primitives).

`ScreenLayout` is the standard screen wrapper - handles safe area insets, optional header (back button, title, right-side action), optional scroll/refresh behavior, and bottom padding to clear the floating tab bar when needed.

`components/shared/charts` uses both `react-native-gifted-charts` and `react-native-chart-kit` depending on the chart type needed (the two libraries cover different chart shapes - e.g. one is better suited to the reading heatmap, the other to line/bar charts for session stats over time). Animations throughout the app (transitions, list item entrances, progress indicators) are built with Moti on top of `react-native-reanimated`.

Context menus (e.g. long-press actions on a book card) use Zeego, which wraps `react-native-ios-context-menu` to render native-feeling context menus rather than custom-built overlays.

## Conventions

A few rules are followed consistently across the codebase to keep it predictable as it grows:

**No inline styling.** All styling goes through NativeWind className strings using the Tailwind theme tokens defined in `tailwind.config.js`. Inline `style={{ ... }}` props are avoided except where NativeWind genuinely can't express something (e.g. a value computed at runtime, like a dynamic `paddingBottom` derived from safe-area insets) - and even then, prefer composing the dynamic value with `cn()` and a className where possible before reaching for `style`.

**No `any` or `unknown` unless absolutely necessary.** Every value should have an inferred or explicit type that reflects what it actually is. Reaching for `any`/`unknown` is usually a sign that a Zod schema is missing, fix the root cause rather than casting it away.

**File naming**:

- Components: PascalCase for the component, kebab-case for the filename (e.g. `book-dropdown-menu.tsx` exporting `BookDropdownMenu`).
- Hooks: `use-*.ts`/`use-*.tsx`, camelCase (e.g. `useElapsedTime.tsx`).
- Types: one flat file per domain, named after the domain (`books.ts`, `reviews.ts`), with `.forms.ts` suffix for form validators when split out.

**`index.ts` exports.** Folders that are consumed from outside their own directory (`components/shared`, `components/search`, individual `api/` and `types/` domains) expose an `index.ts` that re-exports their public surface, so consumers import from the folder rather than reaching into individual files:

```ts
import { Button, Typography, ScreenLayout } from "@/components/shared";
```

rather than

```ts
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
```

## Utilities

| File                      | Purpose                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| `cn.ts`                   | Tailwind class merging (`clsx`/`tailwind-merge` style helper)      |
| `parseResponse.ts`        | Wraps a Zod schema into a `.then()`-friendly Axios response parser |
| `createSessionFromUrl.ts` | Parses a Supabase auth deep link into a session                    |
| `formatStatus.ts`         | Maps `BookStatus` enum values to display labels                    |
| `formatTime.ts`           | Formats durations (minutes) into display strings                   |
| `getInitials.ts`          | Derives initials from a name, for avatar fallbacks                 |
| `pickImage.ts`            | Wraps the image picker flow (cover uploads)                        |
| `stringToColor.ts`        | Deterministic color generation (e.g. avatar background fallback)   |
| `useCountdown.tsx`        | Hook for countdown timers                                          |
| `useElapsedTime.tsx`      | Hook for tracking elapsed time (active reading sessions)           |
