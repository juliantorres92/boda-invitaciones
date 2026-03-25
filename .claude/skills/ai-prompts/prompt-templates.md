# Prompt Templates - Invitación de Boda

Templates reutilizables para generar imágenes consistentes.

## Template: Fondo de Sección

```
[ESTILO] romantic floral background, [FLORES_PRINCIPALES] with [FOLLAJE], 
[ILUMINACIÓN] natural daylight, [MOOD] wedding invitation aesthetic, 
[COMPOSICIÓN] centered negative space for text, [COLORES] olive green and 
blush pink tones, [TEXTURA] vintage paper texture overlay, [BOKEH] dreamy 
bokeh effect --ar 16:9 --q 2
```

**Variables**:
- `[ESTILO]`: Soft focus | Watercolor | Vintage photography
- `[FLORES_PRINCIPALES]`: Delicate white roses | Blush pink peonies | Mixed florals
- `[FOLLAJE]`: Eucalyptus | Olive branches | Sage green leaves
- `[ILUMINACIÓN]`: Soft | Golden hour | Natural daylight
- `[MOOD]`: Elegant | Romantic | Timeless
- `[COMPOSICIÓN]`: Centered negative space | Off-center composition
- `[COLORES]`: Olive green and blush pink | Cream and sage | Soft pastels
- `[TEXTURA]`: Vintage paper | Watercolor wash | Linen fabric
- `[BOKEH]`: Dreamy bokeh | Soft blur | Sharp focus

## Template: Textura

```
[TIPO_TEXTURA] texture, [COLOR_BASE] color palette, [DETALLES] subtle grain 
and imperfections, [USO] for wedding invitation background, [ESTILO] elegant 
and minimalist, seamless pattern --ar 4:3 --q 2
```

**Ejemplos**:
- Tipo: Vintage paper | Watercolor wash | Linen fabric
- Color: Cream beige | Soft pink | Pale sage green

## Template: Decoración Floral

```
[ELEMENTO] floral decoration, [FLORES] delicate [COLOR] flowers, [ESTILO] 
minimalist line art style, [USO] for wedding invitation corner ornament, 
[COLORES] olive green and blush pink, transparent background --ar 1:1 --q 2
```

## Ejemplo Completo: Cover Background

**Input Variables**:
```
ESTILO: Soft focus photography
FLORES_PRINCIPALES: Delicate white and blush pink roses
FOLLAJE: Eucalyptus and olive branches
ILUMINACIÓN: Natural daylight
MOOD: Romantic and timeless
COMPOSICIÓN: Centered negative space for text
COLORES: Olive green (#6B7B59) and blush pink (#F4E8E9)
TEXTURA: Vintage paper texture overlay
BOKEH: Dreamy bokeh effect
```

**Prompt Resultante**:
```
Soft focus romantic floral background, delicate white and blush pink roses 
with eucalyptus and olive branches, natural daylight, wedding invitation 
aesthetic, centered negative space for text, olive green and blush pink 
tones, vintage paper texture overlay, dreamy bokeh effect, elegant and 
timeless composition --ar 16:9 --q 2 --style natural
```

**Negative Prompt** (MJ/SD):
```
busy, cluttered, dark colors, bold saturation, geometric patterns, modern, 
industrial, sharp focus everywhere, centered flowers blocking text area, 
symmetrical, artificial lighting
```

## Template: Imagen OG (Redes Sociales)

```
Wedding invitation preview, [NOMBRES] names in elegant typography, 
[DECORACIÓN] subtle floral frame, [COLORES] olive green and cream tones, 
[ESTILO] romantic minimalist design, [TEXTO] "02 Mayo 2026" visible, 
professional and polished look --ar 1200:630 --q 2
```

## Post-Procesamiento Template

```markdown
## Imagen Generada: [nombre-archivo].webp

**Herramienta**: [DALL-E 3 | Midjourney v6 | SD]
**Seed**: [número] (solo MJ/SD)
**Variaciones**: [cantidad] generadas, seleccionada [#número]

**Ajustes Post**:
1. Resize a [dimensiones]
2. Convertir a WebP (80% calidad)
3. Peso final: [XX]KB
4. Ajustes: Brightness [±X%], Contrast [±X%]
```

---

Usa estos templates para mantener consistencia entre prompts.
