# Ambient Particle Network Background — Design

## Context

The portfolio (`dev-portfolio`) currently has Framer Motion entrance/scroll animations and a cursor-following radial gradient (`CursorFollower.tsx` / `#gradient-box`), but the page feels static once those animations settle. The goal is to add ambient background movement using Three.js, without competing with content readability or hurting performance.

## Decision Summary

Explored four live Three.js prototypes (particle network, wireframe terrain, floating geometry, liquid gradient blob) via the brainstorming visual companion. Particle Network was selected, with density between the "medium" and "prominent" previews, full-page fixed placement, and subtle cursor/scroll-driven parallax. Coexists with (does not replace) the existing `CursorFollower` gradient glow.

## Architecture

A new component, `src/Components/ParticleBackground.tsx`, renders a single fixed, full-viewport `<canvas>` behind all page content:

- `position: fixed; inset: 0; z-index: -1; pointer-events: none;` — sits behind `#gradient-box` (z-index 0) and the main content wrapper, so it never intercepts clicks or scroll and never displaces existing layering.
- Mounted as a sibling of `CursorFollower` in `App.tsx`, e.g.:
  ```tsx
  <CursorFollower />
  <ParticleBackground />
  <div className="relative max-w-screen-xl mx-auto ...">...</div>
  ```
- Loaded via `React.lazy(() => import("./ParticleBackground"))` wrapped in `<Suspense fallback={null}>`, so the Three.js bundle is fetched after first paint instead of blocking initial render.

## Visual Design

- ~100 particles (`THREE.Points`), positioned randomly across a plane sized to the viewport with some depth variance.
- `THREE.LineSegments` connect particles within a threshold distance, recomputed every frame (O(n²) over ~100 points is trivial).
- Density: between the "medium" and "prominent" prototype presets shown during brainstorming — roughly:
  - particle count ≈ 100
  - connection distance ≈ 1.6 (world units)
  - point size ≈ 0.07, opacity ≈ 0.85
  - line opacity ≈ 0.6
  - (exact values tunable during implementation/visual QA)
- Colors reuse the site's existing dark-theme palette rather than introducing new ones:
  - Points: ice-blue `#c8e2ff` (matches `--primary-foreground` badge text in dark mode)
  - Lines: navy `rgba(24, 52, 83, ...)` (matches `#gradient-box`'s existing gradient color)

## Interactivity

- **Cursor parallax:** mouse position tracked and lerped (reusing the same `LERP = 0.2` smoothing pattern already used in `CursorFollower`) into a small camera pan/tilt offset. This is an ambient nudge, not particles actively chasing or repelling from the pointer.
- **Scroll parallax:** `window.scrollY` tracked and lerped similarly into a small vertical offset applied to the camera or particle group, so the field subtly drifts as the user scrolls. The field remains a fixed viewport backdrop — it does not scroll away with content, and the world is not rebuilt to document height (unnecessary complexity/perf cost for a background effect).

## Responsiveness & Performance

- **`prefers-reduced-motion: reduce`:** component renders nothing. This check happens before any Three.js/WebGL setup — no canvas, no renderer created.
- **Touch/coarse-pointer devices** (`window.matchMedia("(hover: none)").matches`, same check `CursorFollower` already uses): the scene is set up and rendered once as a static frame. No animation loop, no mouse/scroll listeners are attached.
- **Desktop (default):** full animation loop via `requestAnimationFrame`, paused when the tab is hidden (`document.visibilitychange` → check `document.hidden`) and resumed when visible again, to avoid wasting battery/CPU on backgrounded tabs.
- **Resize handling:** renderer size and camera aspect ratio updated on `window resize`.
- **Cleanup:** on unmount, cancel any pending `requestAnimationFrame`, remove all event listeners, and dispose of Three.js renderer/geometries/materials — mirrors the cleanup already done in `CursorFollower`'s `useEffect`.

## Dependencies

Adds to `package.json`:
- `three` (runtime)
- `@types/three` (devDependency, for TypeScript support)

## Out of Scope

- No changes to `CursorFollower.tsx` or `#gradient-box` styling/behavior — they coexist unmodified.
- No light-mode variant — the site has no theme toggle; dark-theme colors only.
- No per-section variation (e.g., different density behind Hero vs Projects) — one consistent full-page field.
