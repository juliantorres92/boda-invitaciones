---
name: animations
description: Animaciones sutiles y performantes para la invitación de boda. Incluye biblioteca de @keyframes, scroll animations y guía de performance.
---

# Skill: Animations - Invitación de Boda

Animaciones elegantes y optimizadas para el proyecto.

## Filosofía

- **Sutileza sobre espectacularidad**
- **60fps obligatorio**
- **Accesibilidad first** (prefers-reduced-motion)
- **Transformaciones suaves**

## Propiedades Performantes

✅ **Usar**:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (con moderación)

❌ **NO usar**:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

## Archivos de Soporte

**Básicos (proyecto actual)**:
- **[css-animations.md](css-animations.md)** — Biblioteca de @keyframes reutilizables
- **[scroll-animations.md](scroll-animations.md)** — IntersectionObserver patterns
- **[performance-guide.md](performance-guide.md)** — Optimización 60fps
- **[subtle-movements.md](subtle-movements.md)** — Animaciones apropiadas para bodas

**Avanzados (técnicas profesionales)**:
- **[advanced-css-animations.md](advanced-css-animations.md)** — clip-path, mask, @property, scroll-driven, 3D, View Transitions API
- **[javascript-animations.md](javascript-animations.md)** — WAAPI, stagger dinámico, spring physics, countdown flip, scroll-linked con rAF
- **[svg-animations.md](svg-animations.md)** — path drawing, filtros SVG, morph, animación de ilustraciones del proyecto

## Durations Recomendadas

- Fade-in: 400-500ms
- Slide-up: 500-600ms
- Hover: 200-300ms
- Delays escalonados: 100-200ms

## Checklist

- [ ] Solo transform/opacity
- [ ] Duration 300-600ms
- [ ] prefers-reduced-motion implementado
- [ ] 60fps verificado (DevTools)
- [ ] Consistente con animaciones existentes
