

## Problem

The homepage hero section is **350vh** tall (for the scroll-driven animation). The content div after it compensates with `translateY(-100vh)` and `marginBottom: -100vh`, but only 100vh is reclaimed. The `<Footer>` lives **outside** this compensated div, so it doesn't benefit from the shift — resulting in a large white gap below the footer.

## Fix

Move `<Footer />` **inside** the content div that receives the `translateY` and `marginBottom` compensation. This way the footer shifts up together with the rest of the content, eliminating the dead space.

### Change in `src/pages/Index.tsx`

Move `<Footer />` from after `</main>` to inside the content `<div>` (the one with `zIndex: 10` and the transform), right after the hidden sections and before that div closes.

```
        ...
          <div className="hidden">
            <ComplementaLook />
            ...
          </div>
+         <Footer />
        </Suspense>
        </div>   {/* end of compensated content div */}
      </main>
-     <Footer />
    </div>
```

No animation, transition, or layout logic changes — only the Footer's position in the component tree moves.

