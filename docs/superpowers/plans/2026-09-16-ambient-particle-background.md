# Ambient Particle Network Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed, full-page, ambient Three.js particle-network background (with subtle cursor/scroll parallax) to the portfolio, coexisting with the existing cursor-follower gradient.

**Architecture:** Pure logic (lerp math, connection-pair geometry, device/motion capability checks) lives in small, unit-tested modules under `src/Components/particle/`. The Three.js scene setup, animation loop, and DOM wiring live in `src/Components/ParticleBackground.tsx`, which consumes those pure modules. The component is lazy-loaded from `App.tsx` so the Three.js bundle doesn't block first paint.

**Tech Stack:** React 18, TypeScript, Three.js, Vitest (new dev dependency, this project currently has zero test infrastructure).

**Design doc:** `docs/superpowers/specs/2026-09-16-ambient-particle-background-design.md`

---

## File Structure

- Create: `src/Components/particle/lerp.ts` — linear interpolation helper
- Create: `src/Components/particle/lerp.test.ts`
- Create: `src/Components/particle/connections.ts` — computes which particle pairs are close enough to draw a connecting line
- Create: `src/Components/particle/connections.test.ts`
- Create: `src/Components/particle/capabilities.ts` — `prefersReducedMotion()` / `isCoarsePointer()` device checks
- Create: `src/Components/particle/capabilities.test.ts`
- Create: `src/Components/particle/constants.ts` — tunable visual/behavioral constants
- Create: `src/Components/ParticleBackground.tsx` — the Three.js component
- Modify: `src/App.tsx` — lazy-mount `ParticleBackground`
- Modify: `package.json` — add `three`, `@types/three`, `vitest`, `jsdom`, `test` script
- Modify: `vite.config.js` — add Vitest `test` config block

---

## Task 1: Set up Vitest

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`

- [ ] **Step 1: Install Vitest and jsdom**

Run: `npm install -D vitest jsdom`
Expected: packages added to `devDependencies` in `package.json`.

- [ ] **Step 2: Add a `test` script**

Modify `package.json` — in the `"scripts"` block, add:

```json
"test": "vitest run",
```

so the block reads:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "test": "vitest run"
},
```

- [ ] **Step 3: Add Vitest config to `vite.config.js`**

Replace the contents of `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  test: {
    environment: 'jsdom',
  },
})
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vite.config.js
git commit -m "chore: add Vitest test runner"
```

---

## Task 2: `lerp` helper (TDD)

**Files:**
- Create: `src/Components/particle/lerp.ts`
- Create: `src/Components/particle/lerp.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/Components/particle/lerp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { lerp } from "./lerp";

describe("lerp", () => {
  it("returns current when factor is 0", () => {
    expect(lerp(0, 10, 0)).toBe(0);
  });

  it("returns target when factor is 1", () => {
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("returns the midpoint when factor is 0.5", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("moves toward target from a nonzero starting point", () => {
    expect(lerp(4, 8, 0.5)).toBe(6);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/Components/particle/lerp.test.ts`
Expected: FAIL — `Failed to resolve import "./lerp"` (the module doesn't exist yet).

- [ ] **Step 3: Write the implementation**

Create `src/Components/particle/lerp.ts`:

```ts
export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/Components/particle/lerp.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/Components/particle/lerp.ts src/Components/particle/lerp.test.ts
git commit -m "feat: add lerp helper for particle background"
```

---

## Task 3: `findConnections` geometry helper (TDD)

**Files:**
- Create: `src/Components/particle/connections.ts`
- Create: `src/Components/particle/connections.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/Components/particle/connections.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { findConnections } from "./connections";

describe("findConnections", () => {
  it("connects two points within the threshold", () => {
    const positions = new Float32Array([0, 0, 0, 1, 0, 0]);
    const result = findConnections(positions, 2, 1.5);
    expect(Array.from(result)).toEqual([0, 0, 0, 1, 0, 0]);
  });

  it("does not connect points beyond the threshold", () => {
    const positions = new Float32Array([0, 0, 0, 10, 0, 0]);
    const result = findConnections(positions, 2, 1.5);
    expect(result.length).toBe(0);
  });

  it("connects each close pair independently among three points", () => {
    const positions = new Float32Array([
      0, 0, 0,
      1, 0, 0,
      10, 10, 0,
    ]);
    const result = findConnections(positions, 3, 1.5);
    expect(Array.from(result)).toEqual([0, 0, 0, 1, 0, 0]);
  });

  it("measures proximity in the x/y plane only, ignoring depth", () => {
    const positions = new Float32Array([0, 0, 0, 0, 0, 5]);
    const result = findConnections(positions, 2, 1.5);
    expect(Array.from(result)).toEqual([0, 0, 0, 0, 0, 5]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/Components/particle/connections.test.ts`
Expected: FAIL — `Failed to resolve import "./connections"`.

- [ ] **Step 3: Write the implementation**

Create `src/Components/particle/connections.ts`:

```ts
// Distance is measured in the x/y plane only: connections are meant to read
// as a flat web overlaying the field, regardless of each particle's depth.
export function findConnections(
  positions: Float32Array,
  count: number,
  threshold: number
): Float32Array {
  const segments: number[] = [];

  for (let i = 0; i < count; i++) {
    const xi = positions[i * 3];
    const yi = positions[i * 3 + 1];
    const zi = positions[i * 3 + 2];

    for (let j = i + 1; j < count; j++) {
      const xj = positions[j * 3];
      const yj = positions[j * 3 + 1];
      const zj = positions[j * 3 + 2];

      const dx = xi - xj;
      const dy = yi - yj;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        segments.push(xi, yi, zi, xj, yj, zj);
      }
    }
  }

  return new Float32Array(segments);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/Components/particle/connections.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/Components/particle/connections.ts src/Components/particle/connections.test.ts
git commit -m "feat: add findConnections geometry helper for particle background"
```

---

## Task 4: Device/motion capability checks (TDD)

**Files:**
- Create: `src/Components/particle/capabilities.ts`
- Create: `src/Components/particle/capabilities.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/Components/particle/capabilities.test.ts`:

```ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion, isCoarsePointer } from "./capabilities";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when the media query matches", () => {
    mockMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns false when the media query does not match", () => {
    mockMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("isCoarsePointer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when hover is unavailable", () => {
    mockMatchMedia(true);
    expect(isCoarsePointer()).toBe(true);
  });

  it("returns false when hover is available", () => {
    mockMatchMedia(false);
    expect(isCoarsePointer()).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/Components/particle/capabilities.test.ts`
Expected: FAIL — `Failed to resolve import "./capabilities"`.

- [ ] **Step 3: Write the implementation**

Create `src/Components/particle/capabilities.ts`:

```ts
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  return window.matchMedia("(hover: none)").matches;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/Components/particle/capabilities.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/Components/particle/capabilities.ts src/Components/particle/capabilities.test.ts
git commit -m "feat: add reduced-motion and coarse-pointer capability checks"
```

---

## Task 5: Visual/behavioral constants

**Files:**
- Create: `src/Components/particle/constants.ts`

- [ ] **Step 1: Create the constants module**

Create `src/Components/particle/constants.ts`:

```ts
// Point count and connection distance sit between the "medium" and
// "prominent" density options validated during brainstorming.
export const PARTICLE_COUNT = 100;
export const CONNECT_DISTANCE = 1.6;

export const POINT_SIZE = 0.07;
export const POINT_OPACITY = 0.85;
export const LINE_OPACITY = 0.6;

// Matches the existing dark-theme palette: #gradient-box's navy glow and
// the badge foreground ice-blue used elsewhere in the dark theme.
export const POINT_COLOR = 0xc8e2ff;
export const LINE_COLOR = 0x183453;

export const PARALLAX_LERP = 0.05;

export const FIELD_WIDTH = 14;
export const FIELD_HEIGHT = 10;
export const FIELD_DEPTH = 4;
export const DRIFT_SPEED = 0.004;
```

- [ ] **Step 2: Commit**

```bash
git add src/Components/particle/constants.ts
git commit -m "feat: add particle background constants"
```

---

## Task 6: Install Three.js

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install `three` and its types**

Run: `npm install three && npm install -D @types/three`
Expected: `three` added to `dependencies`, `@types/three` added to `devDependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add three.js dependency"
```

---

## Task 7: `ParticleBackground` component

**Files:**
- Create: `src/Components/ParticleBackground.tsx`

This task is not unit-tested — it's Three.js scene setup, a `requestAnimationFrame` loop, and DOM event wiring, none of which is meaningfully testable without a real WebGL context and browser. It's verified manually in Task 9.

- [ ] **Step 1: Write the component**

Create `src/Components/ParticleBackground.tsx`:

```tsx
import * as React from "react";
import * as THREE from "three";
import { lerp } from "./particle/lerp";
import { findConnections } from "./particle/connections";
import { prefersReducedMotion, isCoarsePointer } from "./particle/capabilities";
import {
  PARTICLE_COUNT,
  CONNECT_DISTANCE,
  POINT_SIZE,
  POINT_OPACITY,
  LINE_OPACITY,
  POINT_COLOR,
  LINE_COLOR,
  PARALLAX_LERP,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_DEPTH,
  DRIFT_SPEED,
} from "./particle/constants";

export default function ParticleBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const scene = new THREE.Scene();

    const boundX = FIELD_WIDTH / 2;
    const boundY = FIELD_HEIGHT / 2;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: [number, number][] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_WIDTH;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_DEPTH;
      velocities.push([
        (Math.random() - 0.5) * DRIFT_SPEED,
        (Math.random() - 0.5) * DRIFT_SPEED,
      ]);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: POINT_COLOR,
      size: POINT_SIZE,
      transparent: true,
      opacity: POINT_OPACITY,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      transparent: true,
      opacity: LINE_OPACITY,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    resize();

    function renderFrame() {
      const pos = pointsGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i][0];
        pos[i * 3 + 1] += velocities[i][1];
        if (pos[i * 3] > boundX || pos[i * 3] < -boundX) velocities[i][0] *= -1;
        if (pos[i * 3 + 1] > boundY || pos[i * 3 + 1] < -boundY) velocities[i][1] *= -1;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      const segments = findConnections(pos, PARTICLE_COUNT, CONNECT_DISTANCE);
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(segments, 3));

      renderer.render(scene, camera);
    }

    if (isCoarsePointer()) {
      renderFrame();
      return () => {
        pointsGeometry.dispose();
        lineGeometry.dispose();
        pointsMaterial.dispose();
        lineMaterial.dispose();
        renderer.dispose();
      };
    }

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    let rafId = 0;

    function onMouseMove(e: MouseEvent) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function onScroll() {
      targetScroll = window.scrollY;
    }

    function onResize() {
      resize();
    }

    function tick() {
      currentMouseX = lerp(currentMouseX, targetMouseX, PARALLAX_LERP);
      currentMouseY = lerp(currentMouseY, targetMouseY, PARALLAX_LERP);
      currentScroll = lerp(currentScroll, targetScroll, PARALLAX_LERP);

      camera.position.x = currentMouseX * 0.6;
      camera.position.y = -currentMouseY * 0.4 - currentScroll * 0.0015;
      camera.lookAt(0, 0, 0);

      renderFrame();
      rafId = requestAnimationFrame(tick);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      pointsGeometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/Components/ParticleBackground.tsx
git commit -m "feat: add ParticleBackground Three.js component"
```

---

## Task 8: Mount `ParticleBackground` in `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the lazy import**

In `src/App.tsx`, change the import block (currently lines 1–11) from:

```tsx
import {
  HeroSection,
  Experience,
  Footer,
  Projects,
  Skills,
} from "./Components";
import { About } from "./Components/About";
import React from "react";
import NavSection from "./Components/NavSection";
import CursorFollower from "./Components/CursorFollower";
```

to:

```tsx
import {
  HeroSection,
  Experience,
  Footer,
  Projects,
  Skills,
} from "./Components";
import { About } from "./Components/About";
import React from "react";
import NavSection from "./Components/NavSection";
import CursorFollower from "./Components/CursorFollower";

const ParticleBackground = React.lazy(() => import("./Components/ParticleBackground"));
```

- [ ] **Step 2: Mount it beside `CursorFollower`**

Change:

```tsx
    <>
      <CursorFollower />
      <div className="relative max-w-screen-xl mx-auto p-6 py-8 md:py-24">
```

to:

```tsx
    <>
      <CursorFollower />
      <React.Suspense fallback={null}>
        <ParticleBackground />
      </React.Suspense>
      <div className="relative max-w-screen-xl mx-auto p-6 py-8 md:py-24">
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: mount ParticleBackground in App"
```

---

## Task 9: Manual verification

No automated test covers rendering, layering, or the responsive/motion fallbacks — verify these by hand.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — all Task 2–4 tests (12 total) pass.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: build succeeds with no errors (confirms the new component and `three` import are valid TypeScript/bundle correctly).

- [ ] **Step 3: Visual check in the dev server**

Run: `npm run dev`, open the printed local URL in a desktop browser.
Expected:
- A field of ice-blue points with faint navy connecting lines is visible behind the page content, across the full viewport, even after scrolling.
- Page text and cards remain fully readable and clickable (the canvas must not block pointer events).
- Moving the mouse subtly shifts the field (small parallax, not a large or jarring movement).
- Scrolling the page subtly shifts the field as well.
- The existing cursor-follower gradient glow still works when hovering over cards (`body.card-hovered #gradient-box` behavior unchanged).

- [ ] **Step 4: Verify the reduced-motion fallback**

In Chrome DevTools: Rendering tab → "Emulate CSS media feature prefers-reduced-motion" → "reduce". Reload the page.
Expected: no particle canvas is rendered at all (inspect the DOM — no stray canvas element, or an empty unstyled one with no WebGL context).

- [ ] **Step 5: Verify the touch/coarse-pointer fallback**

In Chrome DevTools: toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M) to emulate a touch device, reload.
Expected: the particle field renders once as a static frame — no visible drifting/animation, no console errors from missing listeners.

- [ ] **Step 6: Check for console errors**

With DevTools console open, reload the page in normal desktop mode, scroll, and move the mouse around for a few seconds.
Expected: no errors or warnings related to Three.js, the canvas, or React (e.g. no `act()` warnings, no WebGL context errors).

- [ ] **Step 7: Final commit (if any fixes were needed)**

If manual verification required code changes, commit them:

```bash
git add -A
git commit -m "fix: address issues found in manual verification"
```

If no changes were needed, skip this step.

---

## Self-Review Notes

- **Spec coverage:** placement/layering (Task 7 canvas styles + Task 8 mount order), density/colors (Task 5 constants), cursor+scroll parallax (Task 7 `tick`), reduced-motion (Task 7 early return, Task 9 Step 4), touch/coarse-pointer static frame (Task 7 `isCoarsePointer` branch, Task 9 Step 5), tab-visibility pause (Task 7 `onVisibilityChange`), resize handling (Task 7 `onResize`), cleanup/dispose (Task 7 effect return), lazy-loading (Task 8), `three`/`@types/three` dependency (Task 6) — all covered.
- **Type consistency:** `findConnections(positions, count, threshold)` signature matches its usage in `ParticleBackground.tsx`; `lerp(current, target, factor)` matches its three call sites; constant names in `constants.ts` match every import in `ParticleBackground.tsx`.
