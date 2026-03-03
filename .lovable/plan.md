

## Add Papachoa Logo Below "Pijamas que abrazan"

### Approach: Fade-in with subtle scale

**Why fade-in over letter-by-letter?**
The Papachoa logo is a hand-drawn, stylized image with unique letter shapes, colors, and the decorative sun/rays element. Recreating it as individual text characters would lose its artistic quality. A smooth fade-in with a slight upward slide creates an elegant reveal that complements the letter assembly without competing with it.

### How it works

1. Copy the uploaded logo image to `src/assets/brand/papachoa-logo.png`
2. Place the logo below the assembled text in the sticky container
3. As scroll progresses and letters converge (progress approaches 1), the logo fades in starting around 60% scroll progress and fully visible by 90%
4. The logo starts slightly translated down and scales up to its final position, creating a gentle "bloom" entrance

### Visual timeline

```text
Scroll 0%       -> Letters scattered, image visible, logo invisible
Scroll 0-60%    -> Letters assembling, image sliding up/out, logo still invisible
Scroll 60-90%   -> Letters nearly assembled, logo fading in + sliding up
Scroll 100%     -> Text fully assembled, logo fully visible below it
```

### Technical details

- **File**: `src/components/sections/HeroPapacho.tsx`
- Import the new logo image
- Add a `div` below the `h1` containing the logo `img`
- Compute `logoOpacity` and `logoTranslateY` from scroll progress:
  - `logoOpacity = clamp((progress - 0.6) / 0.3, 0, 1)`
  - `logoTranslateY = (1 - logoOpacity) * 20` px downward offset
- Style with `opacity`, `transform`, and a smooth CSS transition
- Logo sized to roughly 200-280px wide, centered below the text

