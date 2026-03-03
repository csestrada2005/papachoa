

## Diagnóstico: Problemas en iOS Safari

Hay **4 problemas raíz** que causan los bugs en iOS:

### 1. Letras cortadas en el Hero
**Causa**: Las letras usan `translate(Xvw, Yvh)` con valores grandes (hasta 22vh). En iOS Safari, el contenedor sticky con `overflow: visible` no siempre respeta elementos transformados fuera del bounds. Además, iOS calcula `vh` incluyendo la barra de herramientas del navegador, lo que empuja letras fuera del viewport visible.

**Solución**: Reducir los valores de scatter a rangos más conservadores (máx ~8vw, ~10vh) y usar valores en píxeles en vez de unidades de viewport para los desplazamientos de las letras. Esto evita que Safari las recorte.

### 2. Secciones que saltan / pantalla trabada
**Causa**: El `translateY(calc(var(--vh) * -100))` en el contenedor post-hero cuando `heroComplete` cambia a `true` provoca un salto masivo de layout en iOS. Además, el auto-scroll programático (`window.scrollTo` en un RAF loop) compite con el scroll nativo de iOS, causando "traba" y scroll errático.

**Solución**: 
- Eliminar el auto-scroll programático por completo (el `useEffect` que hace `window.scrollTo` en loop). En iOS esto pelea constantemente con el momentum scroll nativo.
- Eliminar la transformación de `-100vh` del contenedor post-hero. Simplificar el layout para que las secciones fluyan naturalmente sin transformaciones condicionales.
- Cambiar `heroComplete` a activarse simplemente cuando el hero sale del viewport via IntersectionObserver, sin depender de auto-scroll + wheel/touchmove.

### 3. Carrusel del catálogo no se mueve en iOS
**Causa**: El enfoque actual usa `overflow-x-scroll` + `scrollLeft += speed` via RAF. En iOS Safari, modificar `scrollLeft` programáticamente en un contenedor con `-webkit-overflow-scrolling: touch` es inconsistente y frecuentemente ignorado por el motor de scroll nativo.

**Solución**: Reemplazar el mecanismo de auto-scroll basado en `scrollLeft` por una **animación CSS con `translateX`** (similar al BrandMarquee que ya funciona perfectamente). Esto no depende de scrollLeft y funciona de forma idéntica en todos los navegadores:
- Envolver los productos en un track con `display: flex; width: max-content`
- Aplicar `animation: scroll-track Xs linear infinite` con `translateX(-50%)`
- Duplicar los productos para loop infinito (ya están duplicados)

### 4. Flujo lento en general
**Causa**: Múltiples `will-change: transform` en las letras del hero, las transiciones CSS con `0.05s linear` en cada letra que se recalculan en cada frame de scroll, y el RAF del scroll handler que dispara `setProgress` frecuentemente causan excesivo trabajo de compositing en el GPU de iOS (que es más limitado que desktop).

**Solución**:
- Eliminar `will-change: transform` de las letras individuales
- Cambiar la transición de las letras de `0.05s linear` a `none` (el RAF ya genera movimiento suave)
- Asegurar que el scroll handler use la referencia funcional sin causar re-renders innecesarios (usar `useRef` para progress en vez de `useState` + aplicar transforms directamente al DOM)

---

## Archivos a modificar

1. **`src/components/sections/HeroPapacho.tsx`** — Reducir scatter ranges, eliminar will-change, usar px en vez de vw/vh para scatter, quitar transición de 0.05s en letras
2. **`src/pages/Index.tsx`** — Eliminar auto-scroll programático, eliminar translateY condicional del contenedor post-hero, simplificar heroComplete logic con IntersectionObserver  
3. **`src/components/sections/ColeccionesEditorial.tsx`** — Reemplazar scrollLeft-based auto-scroll con CSS translateX animation (patrón BrandMarquee)

