

# Hero Redesign: Elena Borisova-Style Fixed Image + Scattered Letters

## What Changes

The hero will be completely restructured to match Elena Borisova's approach: a large central image with colorful scattered letters floating around it. As the user scrolls, the image stays fixed and naturally exits the viewport while the letters assemble into readable "Pijamas que abrazan" text.

## Visual Flow

```text
SCROLL = 0 (top of page)              SCROLL = 1 (bottom of scroll area)
+-------------------------------+      +-------------------------------+
|        P                      |      |                               |
|   i         a                 |      |                               |
|      [=== BIG IMAGE ===]      |      |    (image scrolled away)      |
|      [=== HERO KIDS  ===]     |      |                               |
|   q  [================= ]  s  |      |                               |
|      u   e                    |  ->  |    Pijamas que abrazan        |
|  a b r  a  z  a  n     m     |      |                               |
|         j                     |      |                               |
+-------------------------------+      +-------------------------------+
 Letters scattered around image         Letters assembled, image gone
```

## Key Differences from Current

1. **Image is NOT scaled down** -- it stays large and fixed, the viewport simply scrolls past it
2. **Letters are positioned absolutely around the image** (overlapping, surrounding), not below it
3. **The expanding line is removed** -- not needed in this design
4. **Section height increases to ~300vh** to give enough scroll room for the image to exit and letters to assemble
5. **Letters assemble into a centered position** in the lower portion of the sticky viewport, so they remain visible after the image has scrolled away

## Technical Approach

### 1. Layout Structure
- Outer section: `height: 300vh` (enough scroll distance)
- Inner sticky container: `position: sticky; top: 0; height: 100vh`
- Image: large, centered, takes up ~60-70% of viewport height
- Letters: `position: absolute` within the sticky container, scattered around the image

### 2. Scroll Progress Phases
- **Phase 1 (progress 0-0.5)**: Image is visible, letters are scattered around it with floating animation. Image starts translating upward as user scrolls (parallax-style exit).
- **Phase 2 (progress 0.5-1.0)**: Image has moved off-screen, letters converge to center and assemble into readable text.

### 3. Image Behavior
- Starts centered and large (~65vh height)
- As progress increases, `translateY` moves it upward and out of view
- Opacity fades to 0 around progress 0.4-0.6
- No scaling -- it simply exits the viewport

### 4. Letter Scatter & Assembly
- Each letter has absolute scatter coordinates (tx, ty, tz, rot) -- reuse existing pseudo-random seed logic
- Scatter targets are wider and taller to wrap around the image area
- Assembly target: all letters converge to inline positions centered in the viewport
- Brand colors preserved (magenta, yellow, coral, blue cycling)

### 5. Floating Animation
- Active when `progress < 0.2` (letters mostly scattered)
- Gentle translateY oscillation per letter with staggered delays

### 6. Responsive
- Desktop: image ~65vh, letters font-size ~7-8xl, scatter radius large
- Tablet: image ~50vh, letters ~5-6xl, scatter radius reduced
- Mobile: image ~40vh, letters ~3-4xl, scatter radius compact

## File Changes
- **Edit**: `src/components/sections/HeroPapacho.tsx` -- complete rewrite of the scroll logic, layout structure, and animation phases as described above

