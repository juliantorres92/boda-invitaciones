# Jerarquía Visual - Invitación de Boda

Sistema de jerarquía visual, z-index y contraste para mantener orden y legibilidad.

## Z-Index Layers

Sistema de capas de 0 a 10:

```css
/* Z-Index System */
--z-background: 0;        /* Imágenes de fondo */
--z-overlay: 1;           /* Overlays semitransparentes */
--z-content: 2;           /* Contenido principal (texto, botones) */
--z-decoration-static: 0; /* Decoraciones con position absolute */
--z-decoration-float: 3;  /* Decoraciones que flotan sobre contenido */
--z-modal: 10;            /* Modals (futuro) */
```

### Patrón Estándar de Capas

```css
.section-with-background {
    position: relative;
    background-image: url('...'); /* z-index: 0 implícito */
}

.section-with-background::before {
    /* Overlay */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 254, 249, 0.85);
    z-index: var(--z-overlay); /* 1 */
}

.section-with-background > * {
    /* Todo el contenido */
    position: relative;
    z-index: var(--z-content); /* 2 */
}

.section-with-background .decoration {
    /* Decoración que NO debe tapar texto */
    position: absolute;
    z-index: var(--z-decoration-static); /* 0 - detrás del overlay */
    opacity: 0.3;
}
```

## Jerarquía Tipográfica

### Niveles de Texto

```css
/* Nivel 1: Títulos Principales */
.section-title {
    font-family: var(--font-title);
    font-size: clamp(2rem, 8vw, 4rem);
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--primary-color); /* #3f4f22 */
    line-height: 1.2;
}

/* Nivel 2: Subtítulos */
.section-subtitle {
    font-family: var(--font-subtitle);
    font-size: clamp(1rem, 4vw, 1.8rem);
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent-color); /* #556b2f */
    line-height: 1.4;
}

/* Nivel 3: Texto de Cuerpo */
.section-text {
    font-family: var(--font-text);
    font-size: clamp(0.85rem, 3vw, 1.25rem);
    font-weight: 400;
    letter-spacing: 0.5px;
    color: var(--text-color); /* #8a7f6a */
    line-height: 1.6;
}

/* Nivel 4: Texto Introductorio (cursiva) */
.section-intro {
    font-family: var(--font-title);
    font-size: clamp(1rem, 4vw, 1.8rem);
    font-weight: 400;
    font-style: italic;
    color: var(--primary-color);
    line-height: 1.5;
}

/* Nivel 5: Texto Pequeño (detalles, labels) */
.section-small {
    font-family: var(--font-text);
    font-size: clamp(0.75rem, 2.5vw, 1rem);
    font-weight: 400;
    color: var(--text-color);
    opacity: 0.8;
}
```

## Contraste de Color (WCAG)

### Contraste Mínimo Requerido

**WCAG AA** (estándar):
- Texto normal (<18pt): **4.5:1** mínimo
- Texto grande (≥18pt o bold ≥14pt): **3:1** mínimo

**WCAG AAA** (ideal):
- Texto normal: **7:1** mínimo
- Texto grande: **4.5:1** mínimo

### Fórmula de Contraste

```javascript
// Cálculo de contraste (luminancia relativa)
function getContrast(color1, color2) {
    const L1 = getLuminance(color1);
    const L2 = getLuminance(color2);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(rgb) {
    const [r, g, b] = rgb.map(val => {
        val = val / 255;
        return val <= 0.03928 
            ? val / 12.92 
            : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

### Combinaciones Aprobadas

```css
/* Contraste 7.2:1 (AAA) */
.text-primary-on-white {
    color: var(--primary-color); /* #3f4f22 */
    background: var(--white); /* #FDFBF7 */
}

/* Contraste 5.8:1 (AA) */
.text-accent-on-white {
    color: var(--accent-color); /* #556b2f */
    background: var(--white);
}

/* Contraste 4.6:1 (AA) */
.text-body-on-white {
    color: var(--text-color); /* #8a7f6a */
    background: var(--white);
}

/* Contraste mejorado con sombra */
.text-on-image {
    color: var(--white);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    /* Aumenta contraste percibido */
}
```

## Orden de Lectura Visual

### Patrón F (Desktop)

```
┌─────────────────────────────┐
│ [TÍTULO]                    │  ← Primera mirada (horizontal)
│                             │
│ [Subtítulo largo texto...]  │  ← Segunda mirada (horizontal)
│                             │
│ [Texto]                     │  ← Escaneo vertical
│ [Más texto]                 │
│ [Botón]                     │
└─────────────────────────────┘
```

### Patrón Z (Landing Sections)

```
┌─────────────────────────────┐
│ Título ─────────────────→   │  ← Línea 1 (horizontal)
│        ↘                    │
│           Subtítulo         │  ← Diagonal
│                  ↘          │
│                    Botón    │  ← Línea 2 (horizontal)
└─────────────────────────────┘
```

## Sombras y Profundidad

```css
/* Sombras sutiles para elevar elementos */
--shadow-sm: 0 1px 2px rgba(107, 123, 89, 0.05);
--shadow-md: 0 4px 6px rgba(107, 123, 89, 0.1);
--shadow-lg: 0 10px 15px rgba(107, 123, 89, 0.15);
--shadow-xl: 0 20px 25px rgba(107, 123, 89, 0.2);

/* Aplicación */
.card {
    box-shadow: var(--shadow-md);
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: var(--shadow-lg);
}

.button {
    box-shadow: var(--shadow-sm);
}

.button:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}
```

## Tamaño Mínimo de Toque (Mobile)

```css
/* Mínimo 44x44px para elementos interactivos (Apple HIG) */
.touch-target {
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* Botones */
.btn {
    min-height: 48px; /* Más generoso */
    padding: 12px 24px;
}

/* Enlaces */
.map-link {
    padding: 12px 20px;
    min-height: 44px;
}
```

## Ejemplos Visuales

### Sección con Alta Jerarquía Visual

```css
.cover {
    /* Fondo: z-index 0 */
    background-image: url('cover-bg.webp');
}

.cover::before {
    /* Overlay: z-index 1 */
    background: rgba(255, 254, 249, 0.80);
    z-index: 1;
}

.cover .section-title {
    /* Título: z-index 2, mayor tamaño */
    font-size: clamp(2.5rem, 10vw, 5rem);
    z-index: 2;
}

.cover .section-subtitle {
    /* Subtítulo: z-index 2, menor tamaño */
    font-size: clamp(1.2rem, 5vw, 2rem);
    z-index: 2;
}

.cover .decoration {
    /* Decoración: z-index 0, detrás del overlay */
    z-index: 0;
    opacity: 0.25;
}
```

## Checklist de Jerarquía

Antes de aprobar un diseño:

- [ ] Z-index documentado para cada layer
- [ ] Contraste verificado (mínimo 4.5:1 para texto)
- [ ] Jerarquía tipográfica clara (Título > Subtítulo > Texto)
- [ ] Sombras consistentes con escala definida
- [ ] Elementos táctiles mínimo 44x44px
- [ ] Orden de lectura lógico (F o Z pattern)
- [ ] Decoraciones NO compiten con contenido principal

---

Mantén esta jerarquía en todas las secciones para coherencia visual.
