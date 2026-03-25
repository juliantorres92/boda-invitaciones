# Consistency Guide - AI Prompts

Mantener coherencia visual entre imágenes generadas.

## Documentación de Imagen

### Template

```markdown
## [nombre-archivo].webp

**Sección**: Cover | Welcome | Ceremony | etc.
**Herramienta**: DALL-E 3 | Midjourney v6 | Stable Diffusion
**Fecha**: YYYY-MM-DD
**Seed**: [número] (solo MJ/SD)

### Prompt usado:
```
[prompt completo aquí]
```

### Parámetros:
- Aspect Ratio: 16:9
- Quality: hd (DALL-E) | --q 2 (MJ) | Steps 30 (SD)
- Style: natural (DALL-E) | --style raw (MJ)

### Variaciones:
- Total generadas: 4
- Seleccionada: #2
- Razón: Mejor balance de flores y espacio para texto

### Post-Procesamiento:
1. Resize: 1920x1080px
2. Formato: WebP 80%
3. Peso final: 142KB
4. Ajustes: Brightness +3%, Contrast -2%

### Notas:
- Overlay aplicado: rgba(255, 254, 249, 0.82)
- Contraste verificado: 5.2:1 (AA)
```

## Mantener Coherencia

### 1. Reutilizar Seeds (Midjourney/SD)

```
# Prompt original (seed guardado)
/imagine prompt: [tu prompt] --seed 123456789

# Variación manteniendo coherencia
/imagine prompt: [prompt similar] --seed 123456789
```

### 2. Estructura de Prompt Consistente

**Orden de keywords**:
```
[Estilo general] → [Sujeto principal] → [Detalles] → [Iluminación] → 
[Mood] → [Composición] → [Parámetros]
```

**Ejemplo**:
```
Soft focus photography (estilo) of white roses (sujeto) with eucalyptus 
(detalles), natural daylight (iluminación), romantic aesthetic (mood), 
centered negative space (composición) --ar 16:9 --q 2 (parámetros)
```

### 3. Paleta Color Consistente

**Siempre mencionar**:
```
olive green (#6B7B59), blush pink (#F4E8E9), cream white (#FDFBF7) tones
```

**En TODOS los prompts de fondo**.

### 4. Estilo Fotográfico Uniforme

**Usar consistentemente**:
```
soft focus photography, natural daylight, film aesthetic
```

**NO alternar entre**:
- Photography ↔ Illustration
- Soft focus ↔ Sharp focus
- Natural light ↔ Studio lighting

## Iteración Basada en Feedback

### Si dice "demasiado rosa":

**Original**:
```
blush pink roses with olive green foliage
```

**Iteración**:
```
predominantly white roses with subtle blush pink accents and olive green foliage
```

### Si dice "muy ocupado":

**Original**:
```
abundant floral arrangement, roses, peonies, eucalyptus, olive branches
```

**Iteración**:
```
delicate white roses with minimal eucalyptus, simple and elegant composition
```

### Si dice "muy difuminado":

**Original**:
```
soft focus with dreamy bokeh effect
```

**Iteración**:
```
soft focus with subtle bokeh, slightly sharper details
```

## Checklist de Consistencia

- [ ] Seed documentado (MJ/SD)
- [ ] Estructura de prompt similar a previos
- [ ] Paleta de colores mencionada
- [ ] Estilo fotográfico consistente
- [ ] Post-procesamiento documentado
- [ ] Contraste verificado post-overlay

---

Documenta TODO para poder replicar y mantener coherencia.
