# Advanced CSS Animations

Técnicas CSS avanzadas para animaciones más elaboradas, manteniendo performance y accesibilidad.

---

## Clip-path Transitions

Revelar elementos con formas animadas. Performante (no causa reflow).

```css
/* Reveal de abajo hacia arriba */
.reveal-clip {
    clip-path: inset(100% 0 0 0);
    transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal-clip.visible {
    clip-path: inset(0% 0 0 0);
}

/* Reveal circular (desde centro) */
.reveal-circle {
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 0.7s ease-out;
}
.reveal-circle.visible {
    clip-path: circle(75% at 50% 50%);
}

/* Reveal diagonal (esquina superior izquierda) */
.reveal-diagonal {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal-diagonal.visible {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

---

## Mask Animations

Desenmascarar progresivamente. Útil para texto y fotografías.

```css
/* Text reveal con máscara gradiente */
.text-reveal {
    -webkit-mask-image: linear-gradient(to right, black 0%, transparent 0%);
    mask-image: linear-gradient(to right, black 0%, transparent 0%);
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
    transition: -webkit-mask-position 0.8s ease-out,
                mask-position 0.8s ease-out;
}
.text-reveal.visible {
    -webkit-mask-position: 0% 0;
    mask-position: 0% 0;
}

/* Imagen fade con máscara radial */
.image-reveal-radial {
    -webkit-mask-image: radial-gradient(circle, black 0%, transparent 0%);
    mask-image: radial-gradient(circle, black 0%, transparent 0%);
    transition: -webkit-mask-image 0.8s ease-out,
                mask-image 0.8s ease-out;
}
```

---

## CSS Custom Properties Animables (@property)

Permite animar variables CSS (colores, gradientes, números).

```css
/* Registrar propiedad animable */
@property --gradient-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

@property --glow-opacity {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
}

/* Uso: gradiente animado */
.animated-border {
    background: conic-gradient(
        from var(--gradient-angle),
        var(--verde-sage),
        var(--rosa-suave),
        var(--verde-sage)
    );
    animation: rotate-gradient 4s linear infinite;
}

@keyframes rotate-gradient {
    to { --gradient-angle: 360deg; }
}

/* Uso: opacidad suave en decoraciones */
.floral-deco {
    --glow-opacity: 0;
    opacity: var(--glow-opacity);
    transition: --glow-opacity 0.6s ease-out;
}
.floral-deco.visible {
    --glow-opacity: 0.85;
}
```

---

## Multi-step @keyframes

Animaciones con múltiples estados intermedios para mayor naturalidad.

```css
/* Entrada con rebote suave (wedding-appropriate) */
@keyframes entrySoft {
    0%   { opacity: 0; transform: translateY(40px) scale(0.96); }
    60%  { opacity: 1; transform: translateY(-4px) scale(1.01); }
    80%  { transform: translateY(2px) scale(0.99); }
    100% { transform: translateY(0) scale(1); }
}

/* Shimmer en texto (nombres) */
@keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
}
.shimmer-text {
    background: linear-gradient(
        90deg,
        var(--primary-color) 25%,
        var(--verde-sage) 50%,
        var(--primary-color) 75%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
}

/* Breathe sutil para decoraciones activas */
@keyframes breathe {
    0%, 100% { transform: scale(1);    opacity: 0.80; }
    50%       { transform: scale(1.03); opacity: 0.90; }
}
.breathe {
    animation: breathe 4s ease-in-out infinite;
}
```

---

## CSS Scroll-Driven Animations (Chrome 115+)

Animar basado en posición de scroll sin JavaScript.

```css
/* Barra de progreso de scroll */
@keyframes scrollProgress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
}
.scroll-progress {
    transform-origin: left;
    animation: scrollProgress linear;
    animation-timeline: scroll(root block);
}

/* Fade-in ligado al scroll de una sección */
@keyframes fadeInOnScroll {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}
.section {
    animation: fadeInOnScroll linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
}

/* Parallax con scroll-driven */
@keyframes parallaxShift {
    from { transform: translateY(-20px); }
    to   { transform: translateY(20px); }
}
.parallax-bg {
    animation: parallaxShift linear;
    animation-timeline: scroll(root block);
}
```

> **Compatibilidad**: Solo Chrome/Edge 115+. Siempre añadir fallback con IntersectionObserver.

---

## 3D Transforms Sutiles

Profundidad elegante sin efectos dramáticos.

```css
/* Perspective en contenedor (no en el elemento animado) */
.card-container {
    perspective: 1000px;
}

/* Hover card 3D muy sutil */
.card {
    transform-style: preserve-3d;
    transition: transform 0.4s ease-out;
}
.card:hover {
    transform: rotateX(2deg) rotateY(3deg) translateZ(8px);
}

/* Entrada con profundidad */
@keyframes entryDepth {
    from {
        opacity: 0;
        transform: translateZ(-40px) translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateZ(0) translateY(0);
    }
}
.entry-depth {
    animation: entryDepth 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

---

## View Transitions API

Transiciones fluidas entre estados de página (Chrome 111+).

```css
/* Configuración base */
::view-transition-old(root) {
    animation: fadeOut 0.3s ease-out;
}
::view-transition-new(root) {
    animation: fadeIn 0.3s ease-out;
}

/* Transición específica para sección */
.section-title {
    view-transition-name: section-title;
}
::view-transition-old(section-title) {
    animation: slideOutLeft 0.3s ease-in;
}
::view-transition-new(section-title) {
    animation: slideInRight 0.3s ease-out;
}
```

```js
// Activar desde JavaScript
async function navigateTo(newState) {
    if (!document.startViewTransition) {
        updateDOM(newState); // fallback
        return;
    }
    document.startViewTransition(() => updateDOM(newState));
}
```

---

## Accesibilidad (aplicar siempre)

```css
@media (prefers-reduced-motion: reduce) {
    .reveal-clip,
    .reveal-circle,
    .text-reveal,
    .entry-depth,
    .card {
        transition: none;
        animation: none;
        clip-path: none;
        mask: none;
        opacity: 1;
        transform: none;
    }
}
```
