---
name: Bugs confirmados en styles.css
description: Dos errores de sintaxis CSS encontrados en el análisis inicial del 2026-03-19
type: project
---

## Bug 1: Regla CSS huérfana (línea 150)

`opacity: 0.85;` aparece fuera de cualquier bloque de regla, después del cierre de `.welcome .section-intro {}`. La llave de cierre está en la línea 149 pero la propiedad en la 150 queda suelta.

**Archivo:** styles.css, línea 150
**Impacto:** El navegador ignora la propiedad. Podría ser un vestigio de una clase eliminada.

## Bug 2: Llave de cierre sin apertura (línea 272)

En la línea 272 hay un `}` aislado después de `.after-ceremony .section-title { margin-bottom: 0.5rem; }` (línea 269-271). Este `}` cierra un bloque que no existe en ese punto, desalineando todos los bloques de CSS posteriores.

**Archivo:** styles.css, línea 272
**Impacto:** Puede provocar que reglas CSS posteriores sean ignoradas o mal interpretadas por el parser.

## Bug 3: Color hardcodeado en label del countdown

En la línea 306 se usa `color: #888` en lugar de `var(--text-color)`. Rompe la coherencia del sistema de design tokens.

**Archivo:** styles.css, línea 306

**Why:** Detectados en revisión inicial del 2026-03-19.
**How to apply:** Al modificar styles.css, tener estos bugs presentes para corregirlos si se toca esa zona del archivo.
