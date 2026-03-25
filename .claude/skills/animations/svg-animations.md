# SVG Animations

Animaciones SVG para decoraciones florales, divisores y elementos gráficos del proyecto.

---

## Path Drawing (stroke-dashoffset)

Dibujar líneas y formas progresivamente. Ideal para divisores florales y marcos decorativos.

```css
/* 1. Medir el largo del path en JS: path.getTotalLength() */
/* 2. Asignar como dasharray y dashoffset inicial */

.animated-path {
    stroke-dasharray: 500;     /* largo total del path */
    stroke-dashoffset: 500;    /* oculto al inicio */
    transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.animated-path.visible {
    stroke-dashoffset: 0;      /* dibujado completo */
}
```

```js
// Calcular dasharray dinámicamente
function initPathDrawing(svgSelector) {
    const paths = document.querySelectorAll(svgSelector);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = reduced ? 0 : length;
        path.style.transition = reduced
            ? 'none'
            : `stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)`;
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll(svgSelector).forEach(path => {
                path.style.strokeDashoffset = '0';
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.svg-container').forEach(el => observer.observe(el));
}
```

---

## Decoración Floral SVG Animada

Patrón para animar los divisores florales del proyecto (`.section-divider`).

```html
<!-- Divisor SVG con path animable -->
<svg class="floral-divider-svg" viewBox="0 0 200 40" aria-hidden="true">
    <!-- Línea central -->
    <path class="divider-line"
          d="M 10 20 Q 50 10 100 20 Q 150 30 190 20"
          fill="none"
          stroke="currentColor"
          stroke-width="0.8"
          opacity="0.4"/>
    <!-- Puntos decorativos -->
    <circle class="divider-dot" cx="100" cy="20" r="2" fill="currentColor" opacity="0.6"/>
    <circle class="divider-dot" cx="85"  cy="20" r="1.2" fill="currentColor" opacity="0.4"/>
    <circle class="divider-dot" cx="115" cy="20" r="1.2" fill="currentColor" opacity="0.4"/>
</svg>
```

```css
.floral-divider-svg .divider-line {
    stroke-dasharray: 250;
    stroke-dashoffset: 250;
    transition: stroke-dashoffset 1s ease-out 0.2s;
}
.floral-divider-svg .divider-dot {
    opacity: 0;
    transform: scale(0);
    transform-origin: center;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.section.visible .floral-divider-svg .divider-line {
    stroke-dashoffset: 0;
}
.section.visible .floral-divider-svg .divider-dot {
    opacity: 0.6;
    transform: scale(1);
    transition-delay: 0.9s;
}

@media (prefers-reduced-motion: reduce) {
    .floral-divider-svg .divider-line { stroke-dashoffset: 0; transition: none; }
    .floral-divider-svg .divider-dot  { opacity: 0.6; transform: scale(1); transition: none; }
}
```

---

## SVG Filter Animations

Efectos de blur, glow y color con filtros animados.

```css
/* Glow sutil en decoraciones florales */
.floral-glow {
    filter: drop-shadow(0 0 0px var(--verde-sage));
    transition: filter 0.6s ease-out;
}
.floral-glow:hover,
.floral-glow.visible {
    filter: drop-shadow(0 0 6px rgba(156, 175, 136, 0.4));
}

/* Blur-to-focus en entrada */
@keyframes focusIn {
    from { filter: blur(8px); opacity: 0; }
    to   { filter: blur(0);   opacity: 1; }
}
.focus-in {
    animation: focusIn 0.8s ease-out forwards;
}
```

```html
<!-- Filtros definidos en SVG (reutilizables) -->
<svg style="display:none" aria-hidden="true">
    <defs>
        <!-- Glow suave para florales -->
        <filter id="floral-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>

        <!-- Soft focus (slight blur para fondo) -->
        <filter id="soft-focus">
            <feGaussianBlur stdDeviation="1.5"/>
        </filter>
    </defs>
</svg>

<!-- Aplicar filtro a imagen decorativa -->
<img class="rings-illustration" style="filter: url(#floral-glow)" ...>
```

---

## Morph entre Paths (forma a forma)

Transición suave entre dos formas SVG. Requieren el mismo número de puntos.

```css
/* Con CSS (solo funciona si paths tienen misma estructura) */
@keyframes morphShape {
    0%   { d: path("M 50,0 C 80,0 100,30 100,50 C 100,70 80,100 50,100 C 20,100 0,70 0,50 C 0,30 20,0 50,0"); }
    50%  { d: path("M 50,10 C 90,0 110,40 90,60 C 70,80 30,90 10,70 C -10,50 10,10 50,10"); }
    100% { d: path("M 50,0 C 80,0 100,30 100,50 C 100,70 80,100 50,100 C 20,100 0,70 0,50 C 0,30 20,0 50,0"); }
}
.morph-shape path {
    animation: morphShape 6s ease-in-out infinite;
}
```

```js
// Morph con WAAPI (más control)
function morphPath(pathElement, fromD, toD, duration = 800) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        pathElement.setAttribute('d', toD);
        return Promise.resolve();
    }
    return pathElement.animate(
        [{ d: `path("${fromD}")` }, { d: `path("${toD}")` }],
        { duration, easing: 'ease-in-out', fill: 'forwards' }
    ).finished;
}
```

---

## SMIL vs CSS vs JS — Cuándo usar cada uno

| Técnica | Usar cuando | No usar cuando |
|---------|-------------|----------------|
| **CSS** | Transiciones simples, hover states, on/off | Necesitas control de playback, paths complejos |
| **SMIL** (atributo `animate`) | Compatibilidad SVG pura sin CSS | Proyectos modernos (deprecated en Chrome, revival parcial) |
| **WAAPI** | Control de playback, secuencias, await | Animaciones simples que CSS resuelve |
| **rAF** | Física, valores continuos, scroll-linked | Animaciones discretas (inicio/fin definido) |

---

## Animación de Ilustraciones del Proyecto

Aplicar a `rings-illustration.webp`, `couple-silhouette.webp`, `champagne-flutes.webp`:

```css
/* Entrada suave de ilustraciones (más lenta que texto — son elementos visuales) */
.ceremony-rings,
.reception-glasses {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
    transition:
        opacity 0.8s ease-out,
        transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.event.visible .ceremony-rings,
.event.visible .reception-glasses {
    opacity: 0.85;
    transform: translateY(0) scale(1);
}

/* Float muy sutil una vez visible (opcional) */
.event.visible .ceremony-rings {
    animation: floatGentle 5s ease-in-out infinite 0.8s;
}

@keyframes floatGentle {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-5px); }
}

@media (prefers-reduced-motion: reduce) {
    .ceremony-rings,
    .reception-glasses {
        opacity: 0.85;
        transform: none;
        transition: none;
        animation: none;
    }
}
```
