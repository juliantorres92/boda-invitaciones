---
name: design-system
description: Sistema de diseño romántico floral para la invitación de boda. Incluye espaciado, jerarquía visual, overlays y guía de estilo completa.
---

# Skill: Design System - Romántico Floral

Sistema de diseño visual para la invitación de boda digital de **Julian & Yessica**.

## Filosofía de Diseño

El estilo "romántico floral" se basa en:

- **Elegancia minimalista**: Menos es más, cada elemento tiene propósito
- **Legibilidad primero**: Las decoraciones NUNCA comprometen la lectura
- **Naturaleza suave**: Flores, texturas naturales, tonos pastel
- **Consistencia narrativa**: Flujo visual coherente entre secciones
- **Accesibilidad**: Contraste WCAG AA mínimo (4.5:1)

## Paleta de Colores

### Colores Base (existentes)
```css
--verde-oliva: #6B7B59;      /* Botones, acentos principales */
--primary-color: #3f4f22;     /* Títulos principales */
--accent-color: #556b2f;      /* Subtítulos */
--text-color: #8a7f6a;        /* Texto de cuerpo */
--beige: #F5F0E6;             /* Fondos secundarios */
--white: #FDFBF7;             /* Fondo principal */
```

### Colores Extendidos (romántico floral)
```css
--rosa-suave: #F4E8E9;        /* Fondos florales, overlays */
--verde-sage: #9CAF88;        /* Follaje decorativo */
--dorado-suave: #D4AF37;      /* Acentos dorados (opcional) */
--blanco-floral: #FFFEF9;     /* Overlays blancos */
--sombra-floral: rgba(107, 123, 89, 0.1); /* Sombras sutiles */
```

## Mood Board

```
Conceptos clave:
- Soft focus, bokeh, dreamy
- Delicate, subtle, pastel
- Natural daylight, ethereal
- Vintage paper, watercolor
- Eucalyptus, olive branches
- White roses, pink peonies
- Timeless elegance
```

## Archivos de Soporte

Para detalles completos:

- **[spacing-system.md](spacing-system.md)** - Sistema de espaciado base 8px, grid
- **[visual-hierarchy.md](visual-hierarchy.md)** - Z-index, tipografía, contraste
- **[color-overlays.md](color-overlays.md)** - Overlays para legibilidad sobre imágenes
- **[romantic-floral-guide.md](romantic-floral-guide.md)** - Guía completa de estilo floral

## Principios Clave

1. **Mobile-first**: Diseñar primero para 320px, escalar a desktop
2. **Espaciado respiratorio**: Usar sistema de 8px, white space generoso
3. **Overlays obligatorios**: Todo background de sección requiere overlay (0.75-0.90 opacity)
4. **Z-index layers**: Fondo (0) → Overlay (1) → Contenido (2) → Decoraciones absolute (0)
5. **Contraste mínimo**: 4.5:1 para texto normal, 3:1 para texto grande
6. **Decoraciones sutiles**: Opacidad 0.3-0.6, nunca distraen del contenido

## Referencias Visuales

### Inspiración de estilo:
- Pinterest: "romantic floral wedding invitations minimalist"
- Dribbble: "soft pastel wedding web design"
- Behance: "elegant floral invitation layout"

### Flores apropiadas:
- ✅ Rosas blancas, rosa pálido
- ✅ Peonías suaves
- ✅ Eucalipto, ramas de olivo
- ✅ Flores silvestres delicadas
- ❌ Flores tropicales (muy bold)
- ❌ Flores oscuras/dramáticas

## Validaciones

Antes de aprobar un diseño:

- [ ] Contraste verificado (mínimo 4.5:1)
- [ ] Espaciado usando sistema de 8px
- [ ] Overlay implementado si hay background
- [ ] Z-index documentado
- [ ] Consistente con secciones previas
- [ ] Funciona en móvil y desktop

---

Consulta los archivos de soporte para detalles técnicos completos.
