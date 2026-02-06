# Card Deck Shuffle Mode — Design Spec

## Overview
Card Deck Shuffle is a new game mode for Soc Ops where players tap to draw random question cards instead of playing on a bingo grid. Each player opens independently and draws cards on tap. Features left/right response zones (skip/match) with visual feedback.

## Key Features
✅ **Single question card display** (full-screen centered, responsive)
✅ **Tap to draw** next random card from deck
✅ **Left zone (Skip)**: Tap to skip current card
✅ **Right zone (Match)**: Tap when you find a match
✅ **Card counter**: Tracks cards drawn during session
✅ **Smooth animations**: Fade transitions on card change, hover effects
✅ **Visual feedback**: Color highlights for left (red) / right (green) zones
✅ **Splash screen**: "Ready?" state with emoji and instructions before first draw

## Design Decisions

### Card Layout
- **Single card focus**: Large, tappable card showing one random question per draw
- **Responsive width**: `max-w-sm` center card with left/right zones that scale with viewport
- **Interactive zones**: 20px left/right edges respond to taps with visual feedback
- **Typography**: Serif Playfair for question text (bold, 1.5 rem), sans body for labels
- **Touch targets**: Ideal for mobile (left/right zones + center card all >60px)

### Interaction Patterns
| Action | Result | Visual Feedback |
|--------|--------|-----------------|
| Tap center | Draw next card | Fade animation, shadow hover |
| Tap left | Skip current | Red highlight, ✕ scales up |
| Tap right | Mark as match | Green highlight, ✓ scales up |
| All actions | Card counter increments | Badge updates in header |

### Animation & Polish
- **Card entrance**: Scale in from 0.95 with fade (improves perception of change)
- **Zone feedback**: One-time color flash on interaction (red/green backgrounds)
- **Hover states**: Card lifts with shadow increase, zone icons brighten
- **Active state**: Card scales down slightly on tap (tactile feedback)
- **Splash screen**: Smooth hover scale-up (1.05) on first card before game starts

### Styling Details
- **Card shadows**: `shadow-lg` → `shadow-2xl` on hover (depth increase)
- **Card border**: `border-marked/30` base, `border-accent/50` on hover
- **Zone backgrounds**: Transparent by default (`hover:bg-red-50/30`), fill to `bg-red-100/30` on click
- **Text colors**: Zone icons fade from `text-accent/30` to `text-accent/60` on hover
- **Transitions**: All 300ms duration for smooth compound effects

### State Management
- **useCardDeck hook**: Manages question deck, drawn cards tracking, card randomization
- **Randomization**: Fisher-Yates shuffle equivalent—picks from remaining undrawn cards, cycles when exhausted
- **Component state**: Tracks animation frame and last action for visual feedback

## Architecture
```
CardDeck (Component)
├─ useCardDeck (Hook) — Question randomization, counter, state
├─ Header — Back button, title, card counter badge
├─ Splash screen (hasStarted = false) — CTA to start
└─ Main game area (hasStarted = true)
   ├─ Left zone — Skip button with feedback
   ├─ Center card — Question display, tap to draw
   └─ Right zone — Match button with feedback
```

## Iterations Completed
1. ✅ Mode selector on start screen (Bingo vs. Card Deck buttons)
2. ✅ CardDeck component with single card + tap interaction
3. ✅ Random card draw logic (no repeats until deck exhausted)
4. ✅ Left/right (fail/success) indicators with color feedback
5. ✅ Card counter, animations, visual polish (color flashes, shadows, scale effects)

## Design System Integration
- **Colors**: Taupe accent, Copper accent-light, Sage marked, Cream background (per Design System spec)
- **Typography**: Playfair Display (serif) for card text, Inter (sans) for UI labels
- **Shadows & Elevation**: Card uses `shadow-lg`/`shadow-2xl`, zones use subtle color overlays
- **Spacing**: Standard Tailwind scale (p-6, mt-8, gap-3)
- **Accessibility**: All text has 4.5:1 contrast (dark brown on cream/white), touch targets exceed 60px

## Future Enhancements
- Track matches separately from skips (statistics)
- Timer mode (60-second rounds)
- Difficulty levels (question subsets by theme)
- Social sharing of match counts
- Deck customization (pick question themes)
