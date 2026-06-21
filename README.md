# Bibliotheque - Mobile App

Bibliotheque is a mobile application for book tracking. It uses a custom backend for book data, reading sessions, stats, and reviews, and Supabase for authentication.

## Tech Stack

| Layer                     | Technology                                                          |
| ------------------------- | ------------------------------------------------------------------- |
| Framework                 | Expo                                                                |
| Navigation                | Expo Router                                                         |
| Language                  | TypeScript                                                          |
| Styling                   | NativeWind (Tailwind for React Native)                              |
| Server State              | TanStack Query                                                      |
| Client State              | Zustand + Immer                                                     |
| Forms                     | TanStack Form + Zod                                                 |
| Debouncing                | TanStack Pacer                                                      |
| Modals                    | react-native-modalfy                                                |
| Context menus             | Zeego                                                               |
| Charts                    | react-native-gifted-charts and react-native-chart-kit               |
| Animation                 | Moti + `react-native-reanimated`                                    |
| Auth & Storage            | Supabase                                                            |
| Secure storage            | `expo-secure-store`                                                 |
| Camera / barcode scanning | `expo-camera`                                                       |
| Image handling            | `expo-image`, `expo-image-picker`, `react-native-image-crop-picker` |
| HTTP Client               | Axios                                                               |
| Icons                     | `lucide-react-native`, `@expo/vector-icons`, `expo-symbols`         |
| Fonts                     | Inter, Roboto Mono, Nunito Sans via `@expo-google-fonts/*`          |
| Package Manager           | pnpm                                                                |
| Native Tooling            | Xcode (local prebuild required - see [Setup](./docs/setup.md))      |

This app uses Expo's **New Architecture** and several native modules (camera/barcode scanning, image cropping, iOS context menus, secure storage), so it must be run via a custom dev client / prebuild rather than Expo Go.

## Documentation

- [Architecture](./docs/architecture.md) - folder structure, navigation, state management, API/types layers, styling
- [Setup](./docs/setup.md) - environment variables, install, Supabase type generation, running on a device
