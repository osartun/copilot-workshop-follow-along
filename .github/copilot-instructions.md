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
