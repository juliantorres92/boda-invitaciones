# Memory Index — boda-animations

## Project
- [proposals_animations_v1.md](proposals_animations_v1.md) — Propuestas de animación v1 para todas las secciones (2026-03-24). 14 propuestas priorizadas, ninguna implementada.

## Reference
- Sistema de animación actual: `.animate-on-scroll` + `.visible` (IntersectionObserver, threshold 0.3, fade+translateY 30px, 0.8s ease)
- Animaciones de cover ya implementadas en CSS: fadeInDown/fadeIn/fadeInUp escalonados con delays 0.3s/0.8s/1.2s/1.6s
- Hover en botones (`.whatsapp-btn`, `.map-link`) solo usa background+opacity actualmente — sin transform
- Countdown actualiza con textContent puro, sin animación de transición
