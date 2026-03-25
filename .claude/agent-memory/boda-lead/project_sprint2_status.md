---
name: Sprint 2 Design Hero - Estado
description: Estado completo del Sprint 2 tras ejecución, pendiente de merge a main
type: project
---

Sprint 2 "Design Hero" ejecutado completamente en `sprint/2-design-hero`.
Las 4 HUs están commiteadas y mergeadas en la rama del sprint.

**Por qué:** Mejorar diseño visual de las secciones Cover y Welcome antes de continuar con Sprint 3.
**How to apply:** No merge a main hasta visto bueno del usuario. Para continuar, el usuario revisará `sprint/2-design-hero` y aprobará el merge.

## Commits del Sprint 2

| Commit | HU | Descripción |
|:-------|:---|:------------|
| `4222015` | HU-4 | feat(css): imagen floral cover-bg.webp + overlay radial |
| `7731dfd` | HU-5 | style(css): tipografía cover (Cinzel blanco, Cormorant italic, Montserrat date) |
| `7c105f4` | HU-6 | feat(css): keyframes fadeInDown/fadeInUp/fadeIn, animaciones escalonadas |
| `02d85c0` | HU-7 | style(html,css): ornamento SVG welcome, overrides guest-name y cupos-info |
| `c58bb4b` | docs | docs(backlog): marcar HU-4 a HU-7 como completadas |

## Implementación real vs plan

- `index.html`: El ornamento SVG de welcome ya existía con dimensiones 60x20 (plan pedía 80x24 con 3 círculos). Se mantuvo el existente al hacer merge — no hay diferencia funcional.
- `styles.css`: Todo implementado según el plan. El bloque `prefers-reduced-motion` del plan fue omitido porque ya estaba cubierto por la regla global de `animate-on-scroll`.
- Ramas locales creadas: `hu/4-cover-background`, `hu/5-cover-typography`, `hu/6-cover-animations`, `hu/7-welcome-redesign`

## Estado de ramas

- `sprint/2-design-hero` → adelantada de `main` por 9 commits
- NO mergeada a `main` (pendiente revisión del usuario)
- Próximo paso: crear PR o merge directo cuando el usuario apruebe
