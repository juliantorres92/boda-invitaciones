# PRD 001 — Expansión del Agente boda-animations

## Contexto

El agente `boda-animations` está optimizado únicamente para animaciones básicas (fade-in, slide-up, hover). Le faltan capacidades profesionales: animaciones CSS avanzadas, JavaScript animations API, scroll-driven animations y efectos sobre SVG/imágenes. Se requiere expandir tanto el agente como su skill `animations`.

---

## Objetivo

Convertir `boda-animations` en un agente capaz de implementar animaciones profesionales complejas manteniendo la filosofía del proyecto (elegancia, 60fps, accesibilidad).

---

## Cambios a realizar

### A. Nuevos archivos de skill en `.claude/skills/animations/`

#### `advanced-css-animations.md`
Técnicas CSS avanzadas que el agente actualmente no conoce:

- **Clip-path transitions**: Revelar elementos con formas geométricas animadas
- **Mask animations**: Desenmascarar texto o imágenes progresivamente
- **CSS custom properties + @property**: Variables animables para colores, gradientes
- **Multi-step @keyframes**: Animaciones con más de 2 estados (0%, 30%, 70%, 100%)
- **Animation composition**: `animation-composition: add` para combinar animaciones
- **CSS scroll-driven animations**: `@scroll-timeline`, `animation-timeline: scroll()` (Chrome 115+)
- **View Transitions API**: Transiciones entre estados de página con `::view-transition`
- **3D transforms sutiles**: `perspective`, `rotateX/Y` muy suaves para profundidad

#### `javascript-animations.md`
Patrones JS que el agente no tiene documentados:

- **Web Animations API (WAAPI)**: `element.animate()`, control de playback, promises
- **requestAnimationFrame loops**: Animaciones físicas (spring, decay) sin librerías
- **Stagger coordinado**: Calcular delays dinámicamente según número de elementos
- **Intersection + WAAPI**: Combinar observer con animaciones JS controladas
- **Scroll position linked**: Animar basado en `scrollY` con `requestAnimationFrame`
- **Countdown animation**: Flip clock o number morphing para el contador del proyecto

#### `svg-animations.md`
Animaciones SVG que aplican directamente al proyecto (esquinas florales, divisores):

- **stroke-dasharray / stroke-dashoffset**: Dibujar líneas progresivamente (path drawing)
- **SMIL vs CSS vs JS**: Cuándo usar cada enfoque
- **SVG filter animations**: `feGaussianBlur`, `feColorMatrix` animados
- **Morph entre paths**: Transición suave entre dos formas SVG

---

### B. Actualizar `.claude/agents/boda-animations.md`

Agregar secciones:

1. **Capacidades avanzadas**: listar las nuevas técnicas disponibles
2. **Cuándo usar cada enfoque**: CSS puro vs WAAPI vs rAF según el caso
3. **Ejemplos concretos para el proyecto**: countdown flip, path drawing en divisores, parallax real
4. **Compatibilidad**: qué funciona en todos los navegadores vs solo Chrome moderno

---

## Archivos a crear/modificar

| Acción | Archivo |
|--------|---------|
| CREAR | `.claude/skills/animations/advanced-css-animations.md` |
| CREAR | `.claude/skills/animations/javascript-animations.md` |
| CREAR | `.claude/skills/animations/svg-animations.md` |
| MODIFICAR | `.claude/agents/boda-animations.md` |
| MODIFICAR | `.claude/skills/animations/SKILL.md` (actualizar índice) |

---

## Lo que NO cambia

- Filosofía: sutileza, 60fps, `prefers-reduced-motion`
- Biblioteca básica existente (css-animations.md, scroll-animations.md, etc.)
- Restricciones de animaciones inapropiadas para bodas
- Herramientas del agente: Read, Edit, Write, Glob, Grep, Bash

---

## Verificación

1. Pedir al agente una animación de `clip-path` → debe producir código correcto con fallback
2. Pedir una animación con WAAPI → debe usar `element.animate()` correctamente
3. Pedir un path drawing en SVG → debe usar `stroke-dashoffset`
4. Verificar que `prefers-reduced-motion` sigue aplicando en todos los ejemplos nuevos
