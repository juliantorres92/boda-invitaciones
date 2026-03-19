---
name: Backlog inicial de issues
description: Lista de issues identificados en el análisis del 2026-03-19, ordenados por prioridad
type: project
---

## Estado del análisis

Fecha: 2026-03-19. Se revisaron index.html (135 líneas), styles.css (428 líneas), script.js (111 líneas), guests.json (87 líneas), generate-links.js (13 líneas).

## Issues identificados

### CRÍTICOS (bugs que afectan funcionalidad)
1. CSS sintaxis rota en styles.css líneas 150 y 272 - regla huérfana y llave extra
2. generate-links.js referencia g.cupos que ya no existe en JSON - produce NaN

### ALTOS (experiencia de usuario y SEO)
3. Enlace de mapa de recepción (Casa Carmelo) apunta a búsqueda genérica en Google Maps, no a coordenadas exactas
4. Falta og:image y twitter:image en meta tags de Open Graph y Twitter Card - el preview al compartir en WhatsApp/redes muestra sin imagen
5. Sección confirmacion no tiene section-divider ni la sección closing lo tiene tampoco (rompe consistencia visual)
6. El countdown no detiene el setInterval cuando diff <= 0 (sigue corriendo en background)

### MEDIOS (mejoras de calidad)
7. Color hardcodeado #888 en .time-unit label (styles.css línea 306) en lugar de var(--text-color)
8. Mensaje de WhatsApp incluye "Acompañantes: [display]" que puede resultar redundante o confuso
9. La clase .closing-names definida en CSS no se usa en HTML (dead code)
10. Las clases .save-the-date, .names y .event-place definidas en CSS no se usan en HTML (dead code)
11. El script genera URL con /index.html?f= que puede no ser necesario (GitHub Pages sirve index.html por defecto)

### BAJOS (mejoras menores)
12. user-scalable=no en el viewport meta impide zoom de accesibilidad
13. No hay atributo rel="noopener noreferrer" en enlaces target="_blank"
14. La sección closing usa .section-title para los nombres (h2 semántico) pero el elemento es un <p>

**Why:** Análisis inicial completo del proyecto.
**How to apply:** Priorizar corrección de bugs críticos antes del deploy final (faltan ~6 semanas para la boda).
