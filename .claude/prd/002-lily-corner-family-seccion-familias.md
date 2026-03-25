# PRD 002 — lily-corner-family en Sección Familias + Optimización Esquinas

## Contexto

La sección `.families` tenía una sola esquina decorativa (bottom-left) con `lily-corner.webp` genérico e inline style. Las secciones ceremony y recepción siguen el patrón correcto de dos esquinas diagonales con clase específica. Se estandariza families y se optimizan las imágenes de esquinas que no tenían versión WebP.

**Estado**: ✅ Implementado

---

## Cambios realizados

### Imágenes optimizadas

| Archivo | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| `lily-corner-family.png` | 2.0 MB | `lily-corner-family.webp` 545 KB | -73% |
| `lily-corner-ceremony.png` | 587 KB | `lily-corner-ceremony.webp` 407 KB | -31% |
| `reception-corner.png` | 372 KB | `reception-corner.webp` 296 KB | -20% |

Comando usado: `cwebp -q 85 [origen] -o [destino]`

### HTML — `index.html`

**Sección families**: Eliminada esquina única bottom-left con inline style. Reemplazada por dos esquinas (top-left + bottom-right) con `lily-corner-family.webp` y clase `.family-corner`.

**Sección ceremony**: Referencias `lily-corner-ceremony.png` → `lily-corner-ceremony.webp`

**Sección recepción**: Referencias `reception-corner.png` → `reception-corner.webp`

### CSS — `styles.css`

Agregado bloque `.family-corner` (~línea 709) siguiendo patrón de ceremony y recepción:

```css
.families .family-corner img {
    width: clamp(338px, 91vw, 494px);
    opacity: 0.90;
}
.families .family-corner.top-left     { top: 0; left: 0; }
.families .family-corner.bottom-right { bottom: 0; right: 0; }
.families .family-corner.top-left img    { transform: scale(-1, -1); }
.families .family-corner.bottom-right img { transform: none; }
.families .deco-corner { z-index: 3; }
```

---

## Nota

Este PRD fue creado retroactivamente. El protocolo correcto es crear el PRD **antes** de implementar y esperar aprobación explícita del usuario.
