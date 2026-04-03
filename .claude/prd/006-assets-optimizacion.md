# PRD 006 — Optimización de assets visuales
**Estado**: Propuesta
**Fecha**: 2026-03-30
**Agente**: boda-assets
**Archivos afectados**: index.html, styles.css, assets/images/

---

## Contexto

Auditoría de los assets del proyecto revela problemas de calidad visual (fondos incorrectos en imágenes decorativas), problemas de rendimiento (archivos sobredimensionados, audio con preload agresivo) y recursos desperdiciados (fuentes no utilizadas). Este PRD documenta todos los hallazgos y las correcciones propuestas ordenadas por impacto.

---

## Hallazgos

### Inventario actual de assets

```
assets/images/florals/
  lily-corner.webp           108 KB   ✅ Tamaño correcto
  lily-counter.webp           88 KB   ✅ Tamaño correcto
  lily-corner-welcome.webp   508 KB   ⚠ Fondo negro
  lily-corner-family.webp    548 KB   ⚠ Fondo negro
  lily-corner-assistent.webp 588 KB   ⚠ Fondo negro
  lily-corner-ceremony.webp  408 KB   ⚠ Fondo verde
  reception-corner.webp      300 KB   ⚠ Fondo verde

assets/images/illustrations/
  champagne-flutes.webp     1800 KB   ❌ Fondo oscuro + tamaño crítico
  couple-silhouette.webp      40 KB   ✅
  rings-illustration.webp     16 KB   ✅
```

### Fuentes cargadas desde Google Fonts (línea 28, index.html)

```
Playfair Display  ✅ En uso
Cinzel            ✅ En uso
Montserrat        ✅ En uso
Cormorant Garamond ⚠ Sin uso verificado en styles.css
Libre Baskerville  ❌ No aparece en styles.css ni index.html
Open Sans          ❌ No aparece en styles.css ni index.html
```

### Audio (línea 167, index.html)

```html
<audio id="bgMusic" loop preload="auto">
```
`preload="auto"` instruye al navegador a descargar el archivo completo al cargar la página, incluso si el usuario nunca reproduce la música.

---

## Problemas críticos

### P1 — Fondos negros en lily-corner-welcome, lily-corner-family, lily-corner-assistent

**Impacto visual**: Las esquinas decorativas muestran un rectángulo negro sobre las secciones de fondo claro (`--white: #FDFBF7`, `--beige: #F5F0E6`), rompiendo completamente la estética.

**Archivos afectados**:
- `assets/images/florals/lily-corner-welcome.webp` (sección Welcome)
- `assets/images/florals/lily-corner-family.webp` (sección Familias)
- `assets/images/florals/lily-corner-assistent.webp` (sección Confirmación)

**Solución rápida CSS** (sin regenerar assets — aplicar inmediatamente):

```css
/* En styles.css, dentro del bloque .deco-corner img */
.deco-corner img {
    display: block;
    width: clamp(280px, 68vw, 440px);
    height: auto;
    opacity: 1;
    mix-blend-mode: multiply; /* Elimina fondos oscuros sobre fondos claros */
}
```

`mix-blend-mode: multiply` hace que el blanco/negro del fondo de la imagen se multiplique con el fondo de la sección: blanco × color = color (desaparece), negro × color = negro (queda visible solo el contenido con color, es decir, los lirios).

**Limitación**: Solo funciona correctamente sobre fondos claros. No aplicar en secciones con fondo oscuro.

**Solución definitiva**: Regenerar los assets con fondo transparente (PNG o WebP con canal alpha). Ver A1 en tabla de propuestas.

---

### P2 — Fondos verdes en lily-corner-ceremony y reception-corner

**Impacto visual**: Las esquinas de Ceremonia y Recepción muestran un fondo verde que contrasta con el fondo de la sección, creando un recuadro visible antiestético.

**Archivos afectados**:
- `assets/images/florals/lily-corner-ceremony.webp` (sección Ceremonia)
- `assets/images/florals/reception-corner.webp` (sección Recepción)

**Solución rápida CSS** (aplica el mismo `mix-blend-mode: multiply` de P1).

El fondo verde claro se multiplica por el fondo claro de la sección y tiende a desaparecer o integrarse. Puede requerir ajuste fino por sección:

```css
/* Si el verde residual persiste en ceremony o recepcion */
.ceremony .deco-corner img,
.recepcion .deco-corner img {
    mix-blend-mode: multiply;
    opacity: 0.9;
}
```

**Solución definitiva**: Regenerar con fondo transparente. Ver A1 en tabla de propuestas.

---

### P3 — champagne-flutes.webp con fondo oscuro sobre sección blanca + peso crítico

**Impacto visual**: La imagen de copas de champagne (1.8 MB) tiene fondo oscuro y se muestra sobre la sección Recepción de fondo claro.

**Impacto de rendimiento**: 1.8 MB es inaceptable. La imagen debe estar por debajo de 150 KB.

**Ubicación en index.html** (línea 116):
```html
<img src="assets/images/illustrations/champagne-flutes.webp" alt="" class="reception-glasses" loading="lazy" aria-hidden="true">
```

**CSS relevante** (styles.css línea 779):
```css
.reception-glasses { ... }
```

**Solución**:

Paso 1 — Corrección visual inmediata con CSS:
```css
.reception-glasses {
    mix-blend-mode: screen; /* Para fondos oscuros sobre sección clara */
    /* o alternativamente: */
    mix-blend-mode: multiply;
}
```

Paso 2 — Reemplazo del asset (obligatorio). La imagen debe regenerarse o reemplazarse con:
- Fondo transparente (PNG/WebP con alpha)
- Dimensiones apropiadas para uso decorativo (máx. 600px de ancho)
- Tamaño < 100 KB

---

### P4 — preload="auto" en elemento audio

**Impacto**: El navegador descarga el archivo MP3 completo al cargar la página. Si el MP3 pesa 3-5 MB, se desperdician en cada visita aunque el usuario nunca toque play.

**Ubicación** (index.html línea 167):
```html
<audio id="bgMusic" loop preload="auto">
```

**Corrección**:
```html
<audio id="bgMusic" loop preload="none">
```

`preload="none"` indica al navegador que no descargue nada hasta que el usuario interactúe. El audio se cargará cuando el usuario presione play. Dado que el audio es opcional y decorativo, este es el comportamiento correcto.

---

## Problemas moderados

### P5 — Fuentes Libre Baskerville y Open Sans cargadas sin uso

**Impacto**: Cada familia de fuentes adicional genera requests HTTP extra y aumenta el tiempo de carga de la primera pintura (FCP).

**Línea afectada** (index.html línea 28):
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:...&family=Libre+Baskerville:wght@400;700&family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

**Corrección**: Eliminar las familias sin uso de la query string:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
```

Nota: Cormorant Garamond requiere verificación adicional antes de eliminar — puede estar en uso en alguna regla CSS que no aparezca en búsqueda literal.

**Verificación antes de implementar**:
```bash
grep -n "Cormorant\|Libre Baskerville\|Open Sans" styles.css index.html
```

---

### P6 — Directorio assets/svg/ no existe

**Impacto**: El diseño del sistema contempla SVGs decorativos (`svg/decorations/`, `svg/dividers/`, `svg/patterns/`) pero el directorio no está creado. Cualquier referencia futura a SVGs fallará silenciosamente.

**Corrección**:
```bash
mkdir -p assets/svg/decorations assets/svg/dividers assets/svg/patterns
```

No requiere cambios en HTML/CSS. Es una tarea de organización de proyecto.

---

## Tabla de propuestas

| ID | Descripción | Prioridad | Esfuerzo | Impacto |
|----|-------------|-----------|----------|---------|
| A1 | Regenerar lily-corner-welcome/family/assistent con fondo transparente | Alta | Alto | Elimina fondos negros definitivamente |
| A2 | Regenerar lily-corner-ceremony y reception-corner con fondo transparente | Alta | Alto | Elimina fondos verdes definitivamente |
| A3 | Aplicar `mix-blend-mode: multiply` en `.deco-corner img` (solución rápida P1+P2) | Alta | Bajo | Fix visual inmediato sin regenerar |
| A4 | Reemplazar champagne-flutes.webp con versión transparente y <100 KB | Alta | Medio | Fix visual + reducción 1.7 MB |
| A5 | Cambiar `preload="auto"` a `preload="none"` en audio | Alta | Bajo | Ahorra 3-5 MB por visita |
| A6 | Eliminar Libre Baskerville y Open Sans del Google Fonts link | Media | Bajo | Reduce requests y tiempo FCP |
| A7 | Crear estructura de directorios assets/svg/ | Baja | Bajo | Organización para trabajo futuro |

---

## Orden de implementación recomendado

1. **A5** — Un cambio de atributo, impacto inmediato en rendimiento
2. **A3** — Tres líneas CSS, fix visual inmediato para P1 y P2
3. **A6** — Editar query string de Google Fonts tras verificar Cormorant Garamond
4. **A7** — mkdir, sin riesgo
5. **A4** — Requiere generar nuevo asset de champagne-flutes
6. **A1 + A2** — Regeneración completa de esquinas, coordinación con boda-prompt-engineer

---

## Notas sobre mix-blend-mode

`mix-blend-mode: multiply` es la solución rápida para P1 y P2. Consideraciones:

- Funciona perfectamente sobre fondos blancos y beige (colores del proyecto)
- Los píxeles blancos del fondo de imagen desaparecen (blanco × cualquier color = ese color)
- Los píxeles negros producen negro (negro × cualquier color = negro) — no aplica aquí
- Los píxeles verdes se mezclan suavemente con el fondo beige/blanco
- No requiere cambios en el HTML, solo en `.deco-corner img` en styles.css
- Es reversible en cualquier momento

Para `champagne-flutes.webp` (P3) con fondo oscuro, evaluar `mix-blend-mode: screen` en lugar de multiply, ya que screen invierte el comportamiento (los píxeles oscuros desaparecen).

---

## Criterios de aceptación

- [ ] Ninguna imagen decorativa muestra rectángulo de fondo sobre secciones claras
- [ ] champagne-flutes.webp pesa menos de 150 KB
- [ ] Audio usa `preload="none"`
- [ ] Google Fonts no incluye fuentes sin uso verificado
- [ ] Directorio assets/svg/ existe con subdirectorios
- [ ] Contraste de texto en todas las secciones mantiene mínimo 4.5:1 tras cambios
