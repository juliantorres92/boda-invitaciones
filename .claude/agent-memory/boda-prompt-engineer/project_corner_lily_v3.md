---
name: Esquinas florales v3 — lirios protagonistas + composicion en L
description: 5 prompts corregidos donde Lilium candidum es siempre flor principal, composicion en forma de L (no bouquet/diagonal), flores secundarias aportan color de contraste
type: project
---

Correccion critica aplicada en v3: los prompts anteriores (v1 y v2) usaban rosas y peonias como flor principal. Los lirios (Lilium candidum) son invariables como flor protagonista en TODAS las esquinas del proyecto. Lo que varia son las flores secundarias y los acentos de color.

Problema resuelto: los lirios blancos sobre fondo beige/crema no tienen suficiente contraste. La solucion NO es cambiar los lirios, sino agregar flores secundarias de color y follaje rico que hagan destacar los lirios blancos.

Composicion: siempre en forma de L — rama horizontal a lo largo del borde inferior + rama vertical a lo largo del borde lateral, ramas muy finas como lineas de lapiz.

Los 5 archivos generados en esta iteracion:
1. `corner-lily-blush.png` — Lirios + rosas blush + gypsophila, contraste rosa suave #F4E8E9
2. `corner-lily-lavender.png` — Lirios + lavanda + clematis, contraste lavanda #E8DFF0
3. `corner-lily-champagne.png` — Lirios + ranunculus + mimosa + trigo, contraste champagne dorado
4. `corner-lily-wildflowers.png` — Lirios + mix silvestres (anemone blush + viola lavanda + cosmos dusty rose)
5. `corner-lily-greenery.png` — Lirios + follaje abundante sage/eucalipto/olivo, sin flores secundarias

Reglas de coherencia (invariables):
- Lilium candidum siempre flor principal y prominente
- Composicion en L estricta (nunca bouquet centrado, nunca diagonal)
- Ramas tan finas como lineas de lapiz
- Fondo transparente PNG con alpha
- Estilo watercolor botanico, wet-on-wet, paper grain

Si la L no se respeta, agregar al prompt:
"strict L-shaped composition only, one arm horizontal along bottom edge, one arm vertical along left edge, corner anchor at bottom-left, NO diagonal sweep, NO centered bouquet, NO oval arrangement"

**Why:** El usuario confirmo que los lirios son la flor principal invariable del proyecto, igual que en lily-corner.webp existente. Las versiones previas con rosas/peonias como protagonistas estaban incorrectas conceptualmente.
**How to apply:** Toda generacion futura de esquinas debe partir de esta v3. Si el usuario pide "nuevas variaciones", mantener lirios como protagonistas y variar solo las secundarias. Si pide ajustar color, cambiar flores secundarias (no los lirios).
