# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Development server with Turbopack (localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Technology Stack

- **Next.js 15.5** with React 18 and TypeScript (strict mode)
- **Tailwind CSS 3.4** for styling with custom pirate/ocean theme
- **lucide-react** and **@icons-pack/react-simple-icons** for icons
- **Google Fonts** - Press Start 2P for pixel aesthetic

## Architecture

This is an interactive pirate-themed portfolio website. Users navigate a pixel boat across an ocean to visit islands, each representing a section (Home, Skills, Projects, Contact). No API calls or external data fetching — all content is static.

### Directory Structure

- `app/page.tsx` - Main client component orchestrating the boat, islands, ocean, modals, and treasure map
- `app/components/pirate/` - Active UI components:
  - `PixelBoat.tsx` - CSS box-shadow pixel art boat with animations (bobbing, sail flutter, directional flip)
  - `Island.tsx` - Four island types (`port`, `tropical`, `mountain`, `cove`) with unique SVG art and anchor prompts
  - `OceanBackground.tsx` - Parallax sky, clouds, waves, sparkles, and seagulls
  - `PixelModal.tsx` - 8-bit styled modal for island content
  - `TreasureMap.tsx` - Fixed bottom navigation showing island positions and boat location
  - `WaveLayer.tsx` - Standalone wave component (not currently used)
- `app/hooks/useBoatController.ts` - Physics engine: drag, click-to-sail, keyboard (arrow/A/D), friction, island snapping
- `app/lib/data.tsx` - Static data for projects, skills, and island positions
- `app/lib/colorPalette.ts` - Organized color system (ocean, sand, wood, PICO-8 pixel colors, sky gradients)
- `app/globals.css` - Custom CSS variables, 15+ keyframe animations, pixel utility classes, custom anchor cursor

### Legacy Components (not currently used)

- `app/sections/` - Old section-based layout (Hero, Skills, Projects, Contact)
- `app/components/Navbar.tsx`, `Footer.tsx`, `ProjectCard.tsx` - From pre-pirate version

### Key Patterns

**Boat controller hook**: `useBoatController` manages position (0-100%), velocity with friction decay, drag/touch/keyboard input, click-to-sail targeting, and island proximity snapping via `requestAnimationFrame`.

**Island content system**: `app/page.tsx` defines `modalTitles` and `modalContent` object maps. Four inline content components (`HomeContent`, `SkillsContent`, `ProjectsContent`, `ContactContent`) render inside `PixelModal`.

**Parallax layers**: `OceanBackground` applies different scroll speeds based on `boatX` — sky (0.05), clouds (0.1/0.15), waves (0.25/0.4/0.6).

**Pixel art**: Boat rendered with CSS `box-shadow` at 6px pixel size. Islands use SVG. Consistent 8-bit styling via `.pixel-border`, `.pixel-button`, `.pixel-art` utility classes.

**Island positions**: Home (10%), Skills (38%), Projects (65%), Contact (92%) — not evenly spaced.

### Modifying Content

- **Projects**: Edit `app/lib/data.tsx` projects array (title, description, tech, highlights, gradient)
- **Skills**: Edit `app/lib/data.tsx` skillCategories array
- **Island positions**: Edit `app/lib/data.tsx` island data (id, position, label)
- **Modal content**: Edit the inline content components in `app/page.tsx`
- **Colors/theme**: Edit `app/lib/colorPalette.ts` and CSS variables in `app/globals.css`
- **Animations**: Edit keyframes in `app/globals.css`
