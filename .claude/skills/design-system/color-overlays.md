# Color Overlays - Invitación de Boda

Guía completa para implementar overlays que garanticen legibilidad sobre imágenes de fondo.

## ¿Por Qué Overlays?

**Problema**: Imágenes de fondo pueden tener áreas claras y oscuras que hacen el texto ilegible.

**Solución**: Capa semitransparente entre el fondo y el texto que homogeniza el contraste.

## Patrón Estándar de Overlay

```css
.section-with-bg {
    position: relative;
    background-image: url('../assets/images/backgrounds/section-bg.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.section-with-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 254, 249, 0.85); /* Overlay blanco 85% */
    z-index: 1;
}

.section-with-bg > * {
    position: relative;
    z-index: 2; /* Contenido encima del overlay */
}
```

## Tabla de Opacidades según Contraste de Fondo

| Tipo de Fondo | Opacidad Overlay | Color Overlay | Contraste Resultante |
|---------------|------------------|---------------|----------------------|
| Muy claro (pastel) | 0.70-0.75 | Blanco (#FFFEF9) | 4.5:1 - 5.5:1 |
| Claro (flores suaves) | 0.80-0.85 | Blanco | 5.5:1 - 7:1 |
| Medio (mixto) | 0.85-0.90 | Blanco o Beige | 7:1 - 9:1 |
| Oscuro (dramático) | 0.90-0.95 | Blanco | 9:1+ |
| Muy oscuro | 0.30-0.40 | Negro (#000) | 8:1+ (texto blanco) |

## Overlays por Color

### Overlay Blanco (más común)
```css
.overlay-white-light {
    background: rgba(255, 254, 249, 0.75); /* Blanco floral 75% */
}

.overlay-white-medium {
    background: rgba(255, 254, 249, 0.85); /* Blanco floral 85% */
}

.overlay-white-heavy {
    background: rgba(255, 254, 249, 0.92); /* Blanco floral 92% */
}
```

### Overlay Beige (cálido)
```css
.overlay-beige-light {
    background: rgba(245, 240, 230, 0.75); /* Beige 75% */
}

.overlay-beige-medium {
    background: rgba(245, 240, 230, 0.85); /* Beige 85% */
}
```

### Overlay Rosa Suave (romántico)
```css
.overlay-rosa-light {
    background: rgba(244, 232, 233, 0.70); /* Rosa suave 70% */
}

.overlay-rosa-medium {
    background: rgba(244, 232, 233, 0.80); /* Rosa suave 80% */
}
```

### Overlay Oscuro (para fondos muy claros)
```css
.overlay-dark-subtle {
    background: rgba(63, 79, 34, 0.05); /* Primary color 5% */
}

.overlay-dark-light {
    background: rgba(63, 79, 34, 0.10); /* Primary color 10% */
}
```

## Gradientes como Overlays

### Gradiente Vertical (oscurece abajo)
```css
.overlay-gradient-bottom {
    background: linear-gradient(
        to bottom,
        rgba(255, 254, 249, 0.70) 0%,
        rgba(255, 254, 249, 0.90) 100%
    );
}
```

### Gradiente Radial (centro más claro)
```css
.overlay-gradient-radial {
    background: radial-gradient(
        circle at center,
        rgba(255, 254, 249, 0.70) 0%,
        rgba(255, 254, 249, 0.90) 100%
    );
}
```

### Gradiente para Texto Centrado
```css
.overlay-gradient-center {
    background: radial-gradient(
        ellipse at center,
        rgba(255, 254, 249, 0.75) 30%,
        rgba(255, 254, 249, 0.90) 70%,
        rgba(255, 254, 249, 0.95) 100%
    );
}
```

## Overlays con Textura

### Overlay + Patrón de Puntos
```css
.section-with-bg::before {
    background-color: rgba(255, 254, 249, 0.85);
    background-image: radial-gradient(
        circle,
        rgba(107, 123, 89, 0.05) 1px,
        transparent 1px
    );
    background-size: 20px 20px;
}
```

### Overlay + Textura de Papel
```css
.section-with-bg::before {
    background: rgba(255, 254, 249, 0.85);
    background-blend-mode: multiply;
}

.section-with-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('../assets/images/textures/paper-texture.png');
    opacity: 0.15;
    z-index: 1;
    pointer-events: none;
}
```

## Calculadora de Contraste

### Función JavaScript para Verificar Contraste

```javascript
/**
 * Calcula el ratio de contraste entre dos colores
 * @param {string} color1 - Color en formato hex (#RRGGBB)
 * @param {string} color2 - Color en formato hex (#RRGGBB)
 * @returns {number} - Ratio de contraste (ej: 4.5, 7.2)
 */
function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(hexToRgb(color1));
    const lum2 = getLuminance(hexToRgb(color2));
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
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

// Uso:
const contrast = getContrastRatio('#3f4f22', '#FDFBF7');
console.log(`Contraste: ${contrast.toFixed(1)}:1`); // "Contraste: 7.2:1"
```

## Ejemplos Prácticos por Sección

### Cover - Fondo Floral Suave
```css
.cover {
    background-image: url('../assets/images/backgrounds/cover-bg.webp');
}

.cover::before {
    /* Flores rosas/blancas suaves → Overlay blanco medio */
    background: rgba(255, 254, 249, 0.80);
    z-index: 1;
}

.cover .section-title {
    color: var(--primary-color); /* #3f4f22 */
    z-index: 2;
    /* Contraste esperado: ~6:1 (AA) */
}
```

### Ceremony - Fondo de Iglesia
```css
.ceremony {
    background-image: url('../assets/images/backgrounds/ceremony-bg.webp');
}

.ceremony::before {
    /* Iglesia con áreas oscuras → Overlay blanco fuerte */
    background: rgba(255, 254, 249, 0.88);
    z-index: 1;
}

.ceremony .section-subtitle {
    color: var(--accent-color); /* #556b2f */
    z-index: 2;
    /* Contraste esperado: ~5.5:1 (AA) */
}
```

### Countdown - Fondo Texturizado
```css
.countdown {
    background-image: url('../assets/images/textures/paper-texture.webp');
}

.countdown::before {
    /* Textura sutil → Overlay ligero con gradiente */
    background: radial-gradient(
        ellipse at center,
        rgba(255, 254, 249, 0.70) 40%,
        rgba(255, 254, 249, 0.85) 100%
    );
    z-index: 1;
}

.countdown .time-unit span {
    color: var(--primary-color);
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5); /* Realce adicional */
    z-index: 2;
}
```

### Closing - Fondo Romántico Atardecer
```css
.closing {
    background-image: url('../assets/images/backgrounds/closing-bg.webp');
}

.closing::before {
    /* Atardecer con tonos cálidos → Overlay rosa suave */
    background: rgba(244, 232, 233, 0.82);
    z-index: 1;
}

.closing .section-title {
    color: var(--primary-color);
    z-index: 2;
    /* Contraste esperado: ~6.5:1 (AA) */
}
```

## Overlay Doble (Background + Textura)

```css
.section-with-double-overlay {
    background-image: url('../assets/images/backgrounds/section-bg.webp');
}

/* Primer overlay: Color sólido */
.section-with-double-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 254, 249, 0.80);
    z-index: 1;
}

/* Segundo overlay: Textura */
.section-with-double-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('../assets/images/textures/watercolor.png');
    opacity: 0.20;
    mix-blend-mode: multiply;
    z-index: 1;
}

.section-with-double-overlay > * {
    z-index: 2;
}
```

## Testing de Overlays

### Herramientas para verificar contraste:

1. **Chrome DevTools**:
   - Inspect element → Color picker → muestra ratio de contraste

2. **WebAIM Contrast Checker**:
   - https://webaim.org/resources/contrastchecker/

3. **Coolors Contrast Checker**:
   - https://coolors.co/contrast-checker

### Proceso de testing:

1. Implementar overlay con opacidad estimada (0.80-0.85)
2. Usar DevTools para medir contraste real
3. Ajustar opacidad hasta alcanzar mínimo 4.5:1
4. Probar en diferentes tamaños de pantalla
5. Verificar en móvil con brillo reducido

## Reglas de Oro

1. **Mínimo 4.5:1 siempre**: Nunca comprometas legibilidad por estética
2. **Overlay obligatorio**: Si hay imagen de fondo, hay overlay
3. **Blanco por defecto**: rgba(255, 254, 249, 0.80-0.90) funciona en el 90% de casos
4. **Gradientes para composición**: Usa gradientes cuando el texto está en área específica
5. **Textura opcional**: Overlay + textura sutil (0.10-0.20 opacity) agrega elegancia

## Checklist de Overlay

Antes de aprobar una implementación:

- [ ] Overlay implementado con ::before
- [ ] Z-index correcto (overlay: 1, contenido: 2)
- [ ] Opacidad entre 0.70-0.95
- [ ] Contraste medido (mínimo 4.5:1)
- [ ] Probado en móvil y desktop
- [ ] Gradiente considerado si el texto está localizado
- [ ] Textura opcional agregada si mejora la estética

---

Usa overlays en TODAS las secciones con imagen de fondo para garantizar legibilidad perfecta.
