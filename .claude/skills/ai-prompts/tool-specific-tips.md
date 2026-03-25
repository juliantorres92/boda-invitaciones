# Tool-Specific Tips - AI Image Generation

Guía comparativa de DALL-E, Midjourney y Stable Diffusion.

## DALL-E 3 (OpenAI)

### Ventajas
- ✅ Interpreta lenguaje natural muy bien
- ✅ Calidad consistente
- ✅ No requiere sintaxis especial
- ✅ Integrado en ChatGPT

### Limitaciones
- ❌ No tiene seeds (no replicable exacto)
- ❌ Aspect ratios limitados (square, landscape, portrait)
- ❌ No permite control fino de parámetros

### Parámetros

**Quality**:
```
standard - Rápido, menor detalle
hd - Alta calidad, más detalle (RECOMENDADO)
```

**Style**:
```
natural - Foto realista (RECOMENDADO para fondos)
vivid - Más saturado, artístico
```

### Ejemplo de Prompt
```
Soft focus romantic floral background, delicate white roses with olive 
branches, natural daylight, wedding invitation aesthetic, centered negative 
space for text, pastel palette --quality hd --style natural
```

### Best For
- Fondos generales
- Texturas
- Cuando no necesitas replicar exacto

---

## Midjourney

### Ventajas
- ✅ Altísima calidad estética
- ✅ Seeds para consistencia
- ✅ Control fino de parámetros
- ✅ Estética "artística" superior

### Limitaciones
- ❌ Requiere Discord
- ❌ Sintaxis específica
- ❌ Costo por generación

### Parámetros Principales

**Versión**:
```
--v 6      Versión 6 (más realista, RECOMENDADO)
--v 5.2    Versión 5.2 (más artístico)
--niji 5   Anime/ilustración
```

**Quality**:
```
--q 0.25   Rápido, menos detalle
--q 1      Balance (default)
--q 2      Alta calidad (RECOMENDADO)
```

**Stylize**:
```
--s 0      Literal al prompt
--s 50     Poco estilo MJ (RECOMENDADO para realismo)
--s 100    Balance (default)
--s 750    Muy estilizado
```

**Chaos**:
```
--chaos 0   Consistente (default, RECOMENDADO)
--chaos 50  Variación media
--chaos 100 Muy variado
```

**Aspect Ratio**:
```
--ar 16:9   Landscape (fondos sección)
--ar 4:3    Texturas
--ar 1:1    Cuadrado (decoraciones)
```

**Style**:
```
--style raw      Menos procesado, más realista (RECOMENDADO)
--style default  Estética MJ estándar
```

### Ejemplo de Prompt Completo
```
Soft focus romantic floral background, delicate white roses with eucalyptus, 
natural daylight, wedding invitation aesthetic, olive green and blush pink 
tones, centered negative space for text --ar 16:9 --v 6 --q 2 --s 50 
--style raw --seed 123456789
```

### Comandos Útiles

```
/imagine [prompt]           Generar imagen
/blend [img1] [img2]        Mezclar imágenes
--seed 123456789            Usar seed específico
U1, U2, U3, U4              Upscale variación
V1, V2, V3, V4              Crear variaciones
Vary (Strong/Subtle)        Variaciones de upscale
Zoom Out, Pan              Expandir imagen
```

### Best For
- Fondos artísticos de alta calidad
- Flores muy detalladas
- Cuando necesitas coherencia (seeds)

---

## Stable Diffusion

### Ventajas
- ✅ Control total (models, LoRAs, etc.)
- ✅ Gratis (si tienes GPU)
- ✅ Seeds para replicar
- ✅ Iteraciones rápidas

### Limitaciones
- ❌ Curva de aprendizaje alta
- ❌ Requiere setup (GPU o Colab)
- ❌ Calidad depende del modelo

### Parámetros Principales

**Steps**:
```
20-30   Rápido, menos detalle
30-50   Balance (RECOMENDADO)
50-100  Alta calidad, más lento
```

**CFG Scale** (qué tan literal sigue el prompt):
```
5-7     Creativo, menos literal
7-9     Balance (RECOMENDADO)
10-15   Muy literal al prompt
```

**Sampler**:
```
DPM++ 2M Karras    RECOMENDADO (balance calidad/velocidad)
Euler a            Rápido
DDIM              Consistente
```

**Model**:
```
Realistic Vision   RECOMENDADO para fotos realistas
Deliberate         Ilustraciones
DreamShaper        Balance realismo/arte
```

### Ejemplo de Settings

**Prompt**:
```
soft focus romantic floral background, delicate white roses, eucalyptus, 
natural daylight, wedding invitation aesthetic, olive green and blush pink, 
centered negative space, (masterpiece:1.2), (best quality:1.2), 8k
```

**Negative Prompt**:
```
(worst quality:1.4), (low quality:1.4), (normal quality:1.4), lowres, bad 
anatomy, bad hands, watermark, signature, text, busy, cluttered, dark, 
bold colors, modern, geometric
```

**Settings**:
```
Steps: 30
CFG Scale: 7
Sampler: DPM++ 2M Karras
Model: Realistic Vision v5.1
Seed: 123456789
Size: 1024x576 (16:9)
```

### LoRAs Útiles (Romántico Floral)

```
Watercolor LoRA      Para texturas acuarela
Film Grain LoRA      Para estética vintage
Soft Focus LoRA      Para bokeh effect
```

### Best For
- Iteraciones rápidas
- Experimentación
- Cuando tienes setup técnico

---

## Comparativa Rápida

| Feature | DALL-E 3 | Midjourney | Stable Diffusion |
|---------|----------|------------|------------------|
| Facilidad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Calidad | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Control | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Costo | $$ | $$$ | $ (GPU) |
| Coherencia | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Recomendación por Uso

**Fondos de Sección** → **Midjourney** (mejor calidad estética)
**Texturas** → **DALL-E 3** (más rápido, suficiente calidad)
**Decoraciones** → **Stable Diffusion** (control fino, iteraciones)
**Iteraciones rápidas** → **Stable Diffusion** (si tienes GPU)

---

Elige la herramienta según prioridad: calidad vs velocidad vs control.
