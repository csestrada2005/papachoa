

# Hero Section: Reversed Scroll Effect with Colorful Letters

## What Changes

The hero scroll animation will be **inverted** from the current behavior:

- **At scroll 0 (top)**: Image fills most of the viewport, letters of "Pijamas que abrazan" are scattered wildly in 3D space with a gentle floating animation to hint interactivity
- **At scroll 1 (bottom of 200vh)**: Image shrinks to a contained size, the expanding line appears at full width, and all letters gather into their assembled, readable position

Each letter gets a unique color from the Papachoa brand palette (magenta, yellow, coral, blue, and warm tones).

All other hero content (subtitle, CTA button, scroll indicator) will be removed. The hero becomes purely: image + line + scattered colorful letters.

## Visual Flow

```text
SCROLL = 0 (top)                    SCROLL = 1 (bottom)
+---------------------------+       +---------------------------+
|                           |       |                           |
|   P        a     s        |       |                           |
|      i  j     m           |       |      [  image  ]          |
|  [=== BIG IMAGE ===]      |  -->  |      ___________          |
|        a                  |       |                           |
|   q  u   e                |       |   Pijamas que abrazan     |
|     a b r  a  z  a  n     |       |                           |
+---------------------------+       +---------------------------+
 Letters scattered, image big        Letters assembled, image small
 Line invisible (scaleX=0)           Line visible (scaleX=1)
```

## Technical Details

### 1. Reversed progress mapping
- `scatter = 1 - progress` (letters start scattered, end assembled)
- `lineScale = progress` (line grows as you scroll)
- Image scale: interpolates from ~1.3 (big) down to 1.0 (normal) based on progress

### 2. Per-letter brand colors
Each letter of "Pijamas que abrazan" gets assigned a color cycling through:
- Magenta (`hsl(331 48% 45%)` / `#ac3c72`)
- Yellow (`#f5ce3e`)
- Coral (`#ff8d6b`)
- Blue (`#416ba9`)
- Warm brown and intermediate tones

### 3. Floating hint animation
At scroll 0, letters will have a subtle CSS animation (gentle translateY oscillation, ~4-6px amplitude, 2-4s duration, staggered per letter) so users can tell the section is interactive.

### 4. Removed elements
- Subtitle paragraph ("Suaves, calidos...")
- CTA link ("Ver coleccion")
- Scroll indicator ("scroll" + line)

### 5. File changes
- **Edit**: `src/components/sections/HeroPapacho.tsx` — reverse the scatter logic, add per-letter colors, add floating animation, remove subtitle/CTA/scroll indicator, scale image inversely with progress
