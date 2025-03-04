# CLAUDE.md - Project Guidelines

## Commands
- Build/Run: `bun start`, `bun ios`, `bun android`, `bun web`
- Database: `bun db:generate`, `bun db:migrate`, `bun db:view`
- Lint: `bun lint`
- Test: `bun test` (watch mode), `bun test -- -t "testName"` (specific test)

## Code Style
- Use `bun` instead of `npm` and `bunx` instead of `npx`
- File structure:
  - Screens in `src/app/**` with Expo Router conventions
  - Components in `src/components/**`
  - Utilities in `src/lib/**`
  - Database in `src/lib/db/**`
- Use TypeScript for type safety
- Use NativeWind (TailwindCSS) with `className` prop for styling
- Follow ESLint/Prettier configuration (2 space tabs, 80 char line width)
- After native dependency changes, run `bun ios` to rebuild