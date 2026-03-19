---
name: Estado actual del schema de guests.json
description: El campo cupos fue eliminado de guests.json pero generate-links.js aún lo referencia
type: project
---

## Schema actual de guests.json (desde 2026-03-19)

Cada entrada tiene exactamente tres campos:
- `id`: string, formato `##-apellido` (ej: `01-torres`)
- `name`: string, nombre completo del invitado principal
- `display`: string, descripción legible de quiénes asisten (ej: "Fernando Torres, esposa e hija")

## Problema conocido

`generate-links.js` en la línea 12 hace referencia a `g.cupos` que ya no existe en el JSON:
```js
console.log(`Cupos totales: ${guests.reduce((sum, g) => sum + g.cupos, 0)}`);
```
Esto produce `NaN` al ejecutar el script. El campo `cupos` fue reemplazado por `display` en el commit `ba8a463`.

**Why:** El diseño evolucionó de mostrar número de cupos a mostrar nombres de acompañantes.
**How to apply:** Al agregar nuevos invitados, usar solo los tres campos: id, name, display. Actualizar generate-links.js si se necesita el conteo total.
