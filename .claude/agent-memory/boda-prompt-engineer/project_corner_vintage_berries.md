---
name: Esquina floral 5 — corner-lily-vintage-berries.png
description: Prompt para el 5to diseno de esquina: Lilium candidum + bayas decorativas + flores rosa vintage (#DCC5C7), composicion en L estricta
type: project
---

Diseno 5 de la serie de esquinas v3. Sigue todas las reglas invariables: lirios como protagonista, composicion en L, ramas finas como lapiz, fondo transparente PNG, estilo watercolor botanico wet-on-wet.

**Archivo destino**: `corner-lily-vintage-berries.png`

**Concepto**: Lirios blancos prominentes como flor principal. Bayas pequenas decorativas (tipo hypericum berry o snowberry) aportan textura y ritmo a lo largo de las ramas. Flores pequenas en rosa vintage apagado (#DCC5C7 — rosa polvoriento, casi grisaceo) como acento calido. Paleta mas calida y romantica que las versiones previas.

---

### Prompt Midjourney

```
Watercolor botanical illustration of prominent Lilium candidum (Madonna lily)
as the main flower, with small decorative hypericum berries and delicate vintage
rose blossoms in dusty rose tones, strict L-shaped corner composition with one
arm horizontal along the bottom edge and one arm vertical along the left edge,
corner anchor at bottom-left, pencil-thin stems and branches, sparse and
elegant arrangement, ivory cream and dusty vintage rose (#DCC5C7) and pale sage
green palette, romantic wedding invitation aesthetic, loose wet-on-wet watercolor
technique with visible paper grain, transparent background --ar 1:1 --v 6 --q 2
--style raw --s 35
--no background white fill solid rectangular frame dark colors bold saturation
neon vibrant geometric modern cartoon centered symmetrical sunflowers tulips
diagonal sweep centered bouquet oval arrangement
```

---

### Prompt DALL-E 3

**Parametros**: Quality "hd", Style "natural", 1024x1024

```
A watercolor botanical corner decoration for a wedding invitation. The main
flowers are elegant white Lilium candidum (Madonna lilies) with trumpet-shaped
blooms and visible golden stamens. Secondary elements: small decorative berries
(hypericum or snowberry style) scattered along the stems, and delicate small
flowers in dusty vintage rose color (#DCC5C7 — a soft, muted, slightly grey-
toned pink). The composition is strictly L-shaped: one branch runs horizontally
along the bottom edge of the canvas, another branch runs vertically along the
left edge, meeting at the bottom-left corner. Stems and branches are as thin as
pencil lines. The arrangement is sparse and airy, never crowded. Color palette:
ivory cream white for lilies, dusty vintage rose for small accent flowers, soft
pale sage green for foliage, warm ivory background transparent. Style: loose
romantic botanical watercolor, wet-on-wet technique, visible paper grain,
bleeding watercolor edges. The background must be completely transparent, PNG
with alpha channel. No solid background, no white fill, no borders, no frame,
no centered bouquet, no diagonal sweep.
```

---

### Prompt negativo (MJ/SD)

```
no background, no white fill, no solid fill, no rectangular frame, no border,
no paper texture, dark colors, bold saturation, neon, vibrant, geometric,
modern, industrial, sharp edges, plastic look, digital art style, cartoon,
anime, centered symmetrical arrangement, tulips, sunflowers, tropical flowers,
diagonal sweep, centered bouquet, oval arrangement, roses as main flower,
peonies as main flower
```

---

### Post-procesamiento

1. Verificar que la L es visible y los dos brazos son distinguibles (horizontal y vertical)
2. Comprobar que los lirios son el elemento mas grande y prominente — las bayas y flores vintage son notablemente mas pequenas
3. Si el rosa vintage aparece demasiado saturado, ajustar con Hue/Saturation: -20% saturation en canal rojo/magenta
4. Eliminar fondo blanco si DALL-E lo genera (Color to Alpha en Photoshop/GIMP)
5. Exportar PNG-24 con alpha, target <200KB
6. Si la forma de L no se respeta, agregar: "strict L-shaped composition only, one arm horizontal along bottom edge, one arm vertical along left edge, corner anchor at bottom-left, NO diagonal sweep, NO centered bouquet, NO oval arrangement"

---

**Why:** El usuario solicito el 5to diseno de la serie para completar el juego de esquinas. Los 4 anteriores cubren blush/rosa suave, lavanda, mix silvestres, y follaje verde. Este 5to aporta textura de bayas y el calor del rosa vintage (#DCC5C7) como variante distinta a las anteriores.
**How to apply:** Este es el 5to diseno de la serie v3. Si el usuario pide mas variaciones, continuar la numeracion a partir de aqui manteniendo las mismas reglas invariables.
