# Convenciones CSS - Invitación de Boda

Guía completa de estilos CSS para el proyecto.

## Variables CSS Completas

```css
:root {
    /* Colores principales */
    --beige: #F5F0E6;
    --avena: #E8DFD0;
    --verde-oliva: #6B7B59;
    --blanco-crema: #FDFBF7;
    --primary-color: #3f4f22;
    --accent-color: #556b2f;
    --text-color: #8a7f6a;
    --light-bg: var(--white);
    --white: #FDFBF7;
    
    /* Tipografías */
    --font-title: 'Playfair Display', Georgia, serif;
    --font-subtitle: 'Cinzel', serif;
    --font-text: 'Montserrat', Arial, sans-serif;
    --text-size: clamp(0.85rem, 3vw, 1.25rem);
}
```

## Uso de Colores

| Color | Variable | Uso Principal |
|:------|:---------|:--------------|
| Verde Oliva Oscuro | `--primary-color` | Títulos principales, textos importantes |
| Verde Oliva | `--verde-oliva` | Botones, acentos, footer, closing section |
| Beige | `--beige` | Fondos secundarios, detalles |
| Crema | `--white` | Fondo principal de secciones |
| Texto | `--text-color` | Texto de cuerpo, información secundaria |
| Accent | `--accent-color` | Subtítulos, elementos decorativos |

## Clases de Tipografía

### Títulos de Sección

```css
.section-title {
    font-family: var(--font-title);
    font-size: clamp(2rem, 8vw, 4rem);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--primary-color);
    margin-bottom: 2rem;
}
```

**Uso**: Títulos principales de cada sección (Ceremonia, Recepción, etc.)

### Subtítulos

```css
.section-subtitle {
    font-family: var(--font-subtitle);
    font-size: clamp(1rem, 4vw, 1.8rem);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent-color);
    margin-bottom: 1rem;
}
```

**Uso**: Subtítulos y nombres de lugares

### Texto de Cuerpo

```css
.section-text {
    font-family: var(--font-text);
    font-size: var(--text-size);
    color: var(--text-color);
    line-height: 1.6;
    margin-top: 1rem;
}
```

**Uso**: Texto general, direcciones, información

### Texto Introductorio

```css
.section-intro {
    font-family: var(--font-title);
    font-size: var(--text-size);
    font-style: italic;
    color: var(--primary-color);
    text-align: center;
    max-width: 90%;
    margin: 0 auto 1rem auto;
}
```

**Uso**: Mensajes de bienvenida o introductorios

## Estructura de Secciones

### Sección Base

```css
section {
    padding: 4rem 1.5rem;
    text-align: center;
    min-height: 100vh;
    min-height: 100svh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    scroll-snap-align: start;
    background: var(--white);
    padding-top: 5rem;
}
```

**Características clave**:
- Altura completa del viewport con fallbacks
- Flexbox para centrado vertical
- Scroll-snap habilitado
- Posición relativa para divisores

### Divisor de Sección

```css
.section-divider {
    margin-top: auto;
    padding-bottom: 0.5rem;
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
}

.section-divider span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-color);
    opacity: 0.5;
    display: inline-block;
    margin: 0 4px;
}
```

**Patrón**: 3 puntos circulares al final de cada sección

## Responsive Design

### Breakpoint Principal

```css
@media (max-width: 600px) {
    section {
        min-height: 100vh;
        min-height: 100svh;
        min-height: 100dvh;
        padding: 3rem 1rem;
    }
    
    .section-divider {
        bottom: 2rem;
    }
}
```

### Uso de clamp()

**Tipografía responsiva automática**:
- `clamp(min, preferred, max)`
- Ejemplo: `clamp(0.85rem, 3vw, 1.25rem)`
  - Mínimo: 0.85rem en pantallas pequeñas
  - Preferido: 3% del ancho del viewport
  - Máximo: 1.25rem en pantallas grandes

**Aplicado a:**
- Títulos: `clamp(2rem, 8vw, 4rem)`
- Subtítulos: `clamp(1rem, 4vw, 1.8rem)`
- Texto: `clamp(0.85rem, 3vw, 1.25rem)`

## Animaciones

### Fade-in al Scroll

```css
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: transform 0.8s ease, opacity 0.8s ease;
    will-change: transform, opacity;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}
```

**Implementación**: IntersectionObserver en JavaScript

### Barra de Progreso

```css
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--verde-oliva);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease-out;
}
```

## Componentes Específicos

### Botón WhatsApp

```css
.whatsapp-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--verde-oliva);
    color: var(--white);
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-family: var(--font-text);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    font-weight: 500;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(107, 123, 89, 0.3);
}

.whatsapp-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 123, 89, 0.4);
}
```

### Enlaces a Mapas

```css
.map-link {
    display: inline-block;
    margin-top: 1rem;
    font-family: var(--font-text);
    font-size: var(--text-size);
    color: var(--text-color);
    text-decoration: underline;
    padding: 0.5rem 1rem;
    border: 1px solid var(--text-color);
    border-radius: 4px;
    transition: background 0.3s, color 0.3s;
}

.map-link:hover {
    background: var(--accent-color);
    color: var(--white);
}
```

### Countdown Timer

```css
.countdown-timer {
    display: flex;
    gap: clamp(0.3rem, 2vw, 0.5rem);
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
}

.time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: clamp(50px, 12vw, 70px);
}

.time-unit span {
    font-family: var(--font-title);
    font-size: clamp(2.5rem, 10vw, 5rem);
    font-weight: 600;
    color: var(--primary-color);
    line-height: 1;
}

.time-unit label {
    font-family: var(--font-text);
    font-size: clamp(0.75rem, 2.5vw, 1rem);
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #888;
    opacity: 0.5;
    margin-top: 0.3rem;
}

.separator {
    font-family: var(--font-title);
    font-size: clamp(2rem, 8vw, 4rem);
    color: var(--accent-color);
    opacity: 0.4;
    margin-top: -1rem;
}
```

## Secciones Especiales

### Cover (Portada)

```css
.cover {
    min-height: 100vh;
    min-height: 100svh;
    min-height: 100dvh;
    background: var(--white);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### Closing (Cierre)

```css
.closing {
    background: var(--verde-oliva) !important;
    color: var(--white);
}

.closing .section-divider span {
    background: var(--beige);
    opacity: 0.6;
}
```

### Footer

```css
.footer {
    background: var(--verde-oliva);
    color: var(--white);
    padding: 3rem 1.5rem;
    text-align: center;
    min-height: auto;
}

.hashtag {
    color: var(--beige);
    font-size: clamp(1rem, 3vw, 1.3rem) !important;
}
```

## Viewport Units

```css
/* Soporte para diferentes navegadores */
min-height: 100vh;      /* Fallback estándar */
min-height: 100svh;     /* Small viewport (barra de navegación visible) */
min-height: 100dvh;     /* Dynamic viewport (ajusta con teclado móvil) */
```

## Safe Area Insets

```css
body {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}
```

**Uso**: Asegura que el contenido no quede oculto por notches o bordes redondeados en dispositivos móviles.

## Scroll Behavior

```css
html {
    scroll-behavior: smooth;
    scroll-padding-top: 10px;
    scroll-snap-type: y mandatory;
}
```

**Características**:
- Scroll suave entre secciones
- Snap a secciones completas
- Padding superior para navegación
