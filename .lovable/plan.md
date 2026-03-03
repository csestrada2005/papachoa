

## iOS Performance Issues — Root Cause Analysis & Fix Plan

### Root Causes Identified

There are **5 interrelated problems** causing the broken scroll experience on iOS:

**1. Programmatic auto-scroll fights iOS scroll engine (Index.tsx, lines 25-65)**
The landing page runs `window.scrollTo()` inside a `requestAnimationFrame` loop on mount, scrolling to `2 × innerHeight` over 3.2 seconds. iOS treats programmatic scroll differently from user-initiated scroll — it conflicts with the native momentum engine, causing stuttering and "jumpy" sections.

**2. `marginTop: -100vh` transition causes full layout reflow (Index.tsx, line 87)**
When `heroComplete` triggers, the entire content block below the hero animates from `marginTop: 0` to `marginTop: -100vh`. On iOS, this forces a complete layout recalculation of every element below, causing visible jumps and section overlap.

**3. `translate3d` still uses `vh` units for image shift (HeroPapacho.tsx, line 141)**
The image parallax still uses `vh` in the Y component: `imgSlide * -120}vh`. iOS dynamically resizes `vh` as the address bar shows/hides, causing the image to jitter during scroll.

**4. Continuous rAF loop in ColeccionesEditorial (lines 69-86)**
The auto-scrolling catalog runs `requestAnimationFrame` indefinitely, even when off-screen. On iOS this competes with the hero's scroll-driven animations for the single UI thread.

**5. Multiple competing scroll listeners**
The hero's `onScroll`, the Index auto-scroll `window.scrollTo`, and the `touchmove` listener all fight for control, creating unpredictable behavior on iOS's lower-frequency scroll event dispatch.

---

### Fix Plan

#### Fix 1: Replace programmatic auto-scroll with CSS-driven intro (Index.tsx)
- Remove the entire `useEffect` that calls `window.scrollTo` in a rAF loop (lines 25-65)
- Remove the `heroComplete` / `autoScrollDone` state and the wheel/touchmove listener (lines 22-23, 67-77)
- Remove the `marginTop: -100vh` transition trick (line 87) — replace with a simple static layout where sections flow naturally below the hero
- The hero's own scroll-to-assemble animation (350vh sticky) already provides the cinematic intro; the forced auto-scroll on top of it is what breaks iOS

#### Fix 2: Convert remaining `vh` to pixel values in HeroPapacho (HeroPapacho.tsx)
- Line 141: Replace `imgSlide * -120}vh` with a pixel calculation: `(imgSlide * -120 * window.innerHeight) / 100`
- This prevents iOS dynamic viewport resizing from causing jitter

#### Fix 3: Pause ColeccionesEditorial rAF when off-screen (ColeccionesEditorial.tsx)
- Add an IntersectionObserver to only run the auto-scroll rAF when the section is visible
- This frees up the iOS UI thread for the hero animation and user scrolling

#### Fix 4: Simplify hero exit behavior
- Replace the `.hero-exiting` CSS class (scale + opacity transition triggered by IntersectionObserver) with a simpler approach — let the sticky container naturally unstick when its 350vh parent scrolls past, no additional transform needed
- Remove the `exiting` state and its IntersectionObserver (lines 114-124)

---

### Files to modify
- `src/pages/Index.tsx` — Remove auto-scroll, remove marginTop hack, simplify layout
- `src/components/sections/HeroPapacho.tsx` — Fix vh units, remove exit observer
- `src/components/sections/ColeccionesEditorial.tsx` — Pause rAF when off-screen
- `src/index.css` — Remove `.hero-exiting` class (no longer needed)

