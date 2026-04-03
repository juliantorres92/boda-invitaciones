---
name: PRD 004 — Refinamientos UI/UX Post v1
description: Hallazgos H1-H15 de UI/UX sobre el estado actual del código, tabla de propuestas A-L ordenadas por prioridad, y fuera de alcance delimitado de otros PRDs
type: project
---

PRD 004 creado el 2026-03-30 en `.claude/prd/004-uiux-mejoras.md`. Estado: Propuesta, pendiente de aprobación.

**15 hallazgos identificados sobre el código en producción:**

- H1: Labels countdown con color hardcodeado #888 y contraste insuficiente (~2.1:1)
- H2: user-scalable=no bloquea zoom (WCAG 1.4.4)
- H3: og:image / twitter:image ausentes — preview WhatsApp sin imagen
- H4: Sección .closing ausente del HTML, clase .closing-names dead code en CSS
- H5: setInterval del countdown corre indefinidamente después de la boda
- H6: Clases .save-the-date, .names, .event-place sin uso en HTML
- H7: after-ceremony hereda min-height 100dvh para contenido mínimo
- H8: .event h2 duplica valores de .section-title
- H9: .section-intro sobreescrita en welcome con valores contrarios a su semántica
- H10: Familias sin separador visual entre los tres bloques
- H11: Área táctil de botones en límite mínimo (~44px), insuficiente para adultos mayores
- H12: countdown-deco sobredimensionado en desktop
- H13: rel="noopener noreferrer" — YA CORREGIDO en HTML actual
- H14: Cormorant Garamond en uso solo en .cover .section-subtitle (coordinar con PRD 006)
- H15: @keyframes fadeInUp definido dos veces con valores distintos

**12 propuestas A-L:** Ver tabla en el PRD. Orden recomendado: E → B → A → L → H → F → J → K → G → I → D → C.

**Why:** Análisis de UI/UX post v1 para afinar legibilidad, accesibilidad y coherencia de código.
**How to apply:** Consultar el PRD antes de implementar cualquier mejora de estas áreas para no duplicar trabajo.
