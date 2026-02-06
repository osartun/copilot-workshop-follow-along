# Copilot Instructions for Soc Ops Bingo Game

## Pre-Commit Checklist
- [ ] `npm run lint` (ESLint with React Hooks rules)
- [ ] `npm run build` (TypeScript + Vite bundle)
- [ ] `npm run test` (Vitest)

## Overview
**Soc Ops**: Social bingo game for mixers. Players tap squares to find 5-in-a-row (horizontally, vertically, diagonally). React 19, Vite, Tailwind v4. Auto-deploys to GitHub Pages on push to `main`.

## Architecture: Hooks-Driven
- **`useBingoGame`** ([src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts)): State, localStorage (with version validation), lifecycle
- **`bingoLogic`** ([src/utils/bingoLogic.ts](src/utils/bingoLogic.ts)): Pure functions (`generateBoard`, `toggleSquare`, `checkBingo`, `getWinningSquareIds`)
- **Components**: Stateless presentational layers (StartScreen, GameScreen, BingoBoard, BingoSquare, BingoModal)

**Pattern**: Never mutate board state directly. Use spreads/maps. localStorage validates with `STORAGE_VERSION`—bump when data structure changes. Always check `typeof window` before localStorage access.

## Data Model
```typescript
interface BingoSquareData { id: number; text: string; isMarked: boolean; isFreeSpace: boolean; }
interface BingoLine { type: 'row' | 'column' | 'diagonal'; index: number; squares: number[]; }
type GameState = 'start' | 'playing' | 'bingo';
```
**Board**: Always 5×5. Center (index 12) = free space (marked). Questions from [src/data/questions.ts](src/data/questions.ts) (≥24 items). Square IDs 0–24 (row-major: `id = row * 5 + col`).

## Key Workflows
| Task | Command |
|------|---------|
| Dev | `npm run dev` (Vite HMR) |
| Build | `npm run build` (TypeScript check + bundle) |
| Lint | `npm run lint` |
| Test | `npm run test` (Vitest, pure functions) |

**Adding features**: Types → `bingoLogic` → `useBingoGame` → Components → Tests. **Updating questions**: Edit [src/data/questions.ts](src/data/questions.ts), run tests.

## Styling & Deployment
Tailwind v4 with `@theme` directives in `src/index.css` (no `tailwind.config.js`). Use `bg-black/50` (not `bg-opacity-50`). GitHub Pages auto-deploys on `main` push; `VITE_REPO_NAME` env sets base path.

## Design System: Cozy Coffee Shop

**Aesthetic**: Warm Scandinavian café—calm, inviting, down-to-earth with subtle decorative touches.

### Color Palette
- **Accent (Taupe)**: `--color-accent: #A0826D` — Primary interactive and headline color
- **Accent Light (Copper)**: `--color-accent-light: #B8956A` — Winning state and hover accents
- **Marked (Sage)**: `--color-marked: #A8B5A3` — Marked square background
- **Marked Border (Dark Sage)**: `--color-marked-border: #8A9A7E` — Marked square border
- **Cream**: `--color-cream: #F5E6D3` — Page background and card backgrounds
- **Text**: `--color-text: #2C1810` — Dark brown, primary text throughout

### Typography
- **Headings**: `font-serif` — Playfair Display (bold, 700 weight). Used for titles ([StartScreen](src/components/StartScreen.tsx), [GameScreen](src/components/GameScreen.tsx), [BingoModal](src/components/BingoModal.tsx))
- **Body**: `font-sans` — Inter (regular, 400–600 weights). All descriptive text, instructions, squares
- **Import**: Google Fonts via `@import` in [src/index.css](src/index.css)

### Component Patterns
- **Buttons**: Taupe background (`bg-accent`), white text, smooth transitions. Hover lightens to copper (`hover:bg-accent-light`)
- **Cards**: Cream background (`bg-cream`), soft sage borders (`border-marked/30`), subtle shadows (`shadow-md` to `shadow-xl`)
- **Interactive States**: 
  - **Unmarked square**: White/cream with sage border, hover softens background
  - **Marked square**: Soft sage background with darker sage border
  - **Winning square**: Copper background with copper border (20% opacity, `bg-accent-light/20`)
  - **Free space**: Sage background, bold serif text
- **Animations**: Calm only—fade-in (0.3s) and scale-in (0.4s) on modal, no bounces

### Accessibility & Touch
- All text has minimum 4.5:1 contrast ratio (dark brown on cream/sage)
- Touch targets: `min-h-[60px]` for bingo squares (60px minimum touch)
- Transparency used sparingly to maintain readability
- `aria-labels` and `aria-pressed` on interactive elements

### Extending the Design
When adding features:
1. Use only the defined color tokens (`--color-*` in `@theme`)
2. Maintain serif headlines (Playfair) vs. sans body text hierarchy
3. Prefer soft shadows and transparency over harsh contrasts
4. Test on mobile—padding and spacing must accommodate 60px minimum touch targets
5. Animations use `fadeIn` or `scaleIn` keyframes (avoid bounces, keep <0.5s)
6. Update this section if color palette, fonts, or major visual patterns change
