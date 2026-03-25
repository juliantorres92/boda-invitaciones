---
name: Especificaciones sección Cover — primer prompt generado
description: Requerimientos y prompts entregados para el fondo full-screen de la portada
type: project
---

Primera imagen de fondo solicitada: sección Cover (portada).

Requerimientos clave:
- Orientación vertical (portrait) — 1080x1920px — invitación móvil
- Texto sobre la imagen: "Julian & Yessica", "Nos casamos", "02 · Mayo · 2026" en blanco/crema
- Flores en bordes/esquinas, centro respirable con zona más suave/oscura para legibilidad
- Formato final: WebP, <150KB, guardado en `assets/images/backgrounds/cover-bg.webp`

Herramienta recomendada: Midjourney (mejor calidad estética para este caso, permite seeds para futuras iteraciones coherentes).

Overlay CSS recomendado para implementación: radial-gradient oscureciendo bordes, centro más claro, o rgba(63, 79, 34, 0.35) oscuro sobre texto blanco.

**Why:** Imagen portrait es diferente a todos los templates existentes que asumen 16:9. El aspecto ratio 9:16 es crítico para que no se recorte en móvil.
**How to apply:** En futuras iteraciones para esta sección, mantener --ar 9:16. Si el usuario pide variaciones, partir del prompt Midjourney base documentado aquí. Cuando se implemente en CSS, el overlay debe ser oscuro (no blanco) porque el texto es blanco/crema.
