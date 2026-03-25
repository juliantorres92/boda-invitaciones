---
name: Esquinas florales v2 — con color visible
description: 5 prompts para esquinas florales con más color (resaltan sobre fondos beige/crema), reemplazando lirios blancos que se perdían
type: project
---

El usuario detectó que las flores blancas/ivory de las esquinas actuales se pierden sobre los fondos #F5F0E6 y #FDFBF7. Se solicitó una segunda iteración con flores que tengan color visible pero manteniendo la elegancia nupcial.

Problema raíz: Las flores ivory/blancas no tienen suficiente contraste cromático sobre fondos crema. La solución no es aumentar opacidad sino agregar matiz de color (blush, dusty rose, champagne, lavanda, sage).

5 nuevos conceptos generados:
1. `corner-roses-blush.png` — Rosas blush/rosa pálido, composición vertical
2. `corner-peonies-dusty.png` — Peonías dusty rose, composición diagonal abierta
3. `corner-champagne-mix.png` — Mix flores color champagne/dorado, horizontal
4. `corner-lavender-wildflowers.png` — Flores silvestres lavanda, composición aérea
5. `corner-garden-pastels.png` — Mix pastel multifloral (el más colorido de los 5)

Regla de iteración si resultado es "muy saturado": agregar `muted tones, slightly desaturated, soft watercolor wash` y reducir --s a 20 en MJ.

**Why:** Las flores blancas sobre beige no crean contraste visual suficiente. El usuario quiere decoración visible que enriquezca visualmente sin ser llamativa.
**How to apply:** Para futuras esquinas florales, partir de estos prompts v2 en vez de los prompts con lirios blancos de la versión original. Si el usuario pide "más color", escalar hacia `corner-garden-pastels`. Si pide "menos color pero visible", escalar hacia `corner-roses-blush`.
