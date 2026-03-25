---
name: Visual fixes Sprint 2 — decoraciones y fondos
description: Correcciones aplicadas en sesion 2026-03-23: fondo duplicado en section, tamanio/opacidad de decoraciones, nuevas imagenes lily-watercolor-bottom y lily-cream-closing
type: project
---

## Fixes aplicados (2026-03-23)

**Fix 1 — Fondo duplicado en secciones**
Se eliminó `background: var(--white)` del selector genérico `section { }` en styles.css.
**Why:** Ese valor sobrescribía el fondo de secciones que necesitan un background propio (ceremony, recepcion con textura de papel). Al eliminar el background en `section`, las secciones con textura funcionan sin interferencia. El fondo base sigue siendo provisto por `body` y `.invitation`.
**How to apply:** No agregar `background` al selector `section {}` genérico. Cada sección especial define su propio background en su clase propia.

**Fix 2 — Decoraciones de esquina y anillos**
Valores anteriores vs nuevos:
- `.deco-corner img` desktop: `clamp(110px, 24vw, 160px)` / opacity 0.38 → `clamp(160px, 35vw, 240px)` / opacity 0.62
- `.deco-corner img` mobile: `clamp(90px, 22vw, 130px)` / opacity 0.32 → `clamp(130px, 32vw, 200px)` / opacity 0.55
- `.ceremony-rings`: `clamp(90px, 22vw, 130px)` / opacity 0.60 → `clamp(140px, 34vw, 200px)` / opacity 0.85
**Why:** Las decoraciones eran invisibles a primera vista. El aumento es de ~50% en tamaño y ~60% en opacidad.

**Fix 3 — Nuevas imágenes decorativas**
- `lily-watercolor-bottom.png` → clase `.cover-watercolor-bottom`: position absolute, bottom 0, left 0, width 100%, z-index 2. Se coloca dentro de `.cover` como último hijo, después del `.section-divider`.
- `lily-cream-closing.png` → clase `.closing-deco-corner`: position absolute, bottom 0, left 0, ancho clamp(160px, 38vw, 260px), opacity 0.72, z-index 1. Se coloca como último hijo de `.closing`.

**Nota z-index cover:** `.cover-watercolor-bottom` tiene z-index 2 (mismo nivel que `.cover-content`). Esto es intencional porque la imagen tiene fondo transparente y el arco debe aparecer encima del overlay (`::before` con z-index 1). No interfiere con texto porque se posiciona solo en la parte inferior.
