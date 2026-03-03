

## Diagnosis

Two distinct iOS problems visible from the screenshots and description:

### Problem 1: Image doesn't slide away on iOS
On line 144-146, the iOS path uses `px` units for the image shift:
```js
// iOS: imgSlide * -120 = only 120 PIXELS up (barely moves)
`translate(${mouse.x * -6}px, ${mouse.y * -6 + imgSlide * -120}px)`
// Desktop: imgSlide * -120 = 120 VIEWPORT HEIGHT units up (fully exits)
`translate3d(${mouse.x * -6}px, ${mouse.y * -6 + imgSlide * -120}vh, 0)`
```
The iOS image only moves 120px up instead of 120vh. That's why the hero image stays visible on iOS after the animation completes — it needs to move ~120% of the viewport height, not 120 pixels.

**Fix**: Calculate actual viewport height in pixels for iOS and use that instead of the hardcoded 120px.

### Problem 2: Scroll lag / bouncing upwards on iOS
The `window.scrollTo()` auto-scroll loop (Index.tsx lines 26-82) fights with iOS Safari's native momentum scrolling. When the user touches the screen during or after the programmatic scroll, iOS's rubber-banding and momentum engine conflicts with the RAF-driven `scrollTo`, causing the page to snap backwards or stutter.

Additionally, the `translateY(calc(var(--vh) * -100))` transition (line 109) causes a massive layout reflow that iOS struggles with during active scrolling.

**Fix (iOS only)**:
- Skip the programmatic `window.scrollTo` auto-scroll on iOS — let the user scroll naturally
- Skip the `translateY(-100vh)` hack on iOS — let the content flow naturally without the jump
- Keep both behaviors intact for desktop/Android

---

## Changes

### `src/components/sections/HeroPapacho.tsx`
- Fix the iOS `imgShift` calculation: use `window.innerHeight` to convert the `-120vh` to actual pixels: `imgSlide * -1.2 * window.innerHeight` instead of `imgSlide * -120`

### `src/pages/Index.tsx`
- Import `isIOS` from platform
- Guard the auto-scroll `useEffect`: skip the `window.scrollTo` loop on iOS (return early)
- Guard the `translateY(-100vh)`: on iOS, always use `translateY(0)` — no layout shift hack
- On iOS, set `heroComplete` immediately (or skip the listener) since there's no auto-scroll to wait for

