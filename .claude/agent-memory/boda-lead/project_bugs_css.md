---
name: Bugs confirmados en styles.css e index.html
description: Bugs visuales y de código detectados en revisiones del 2026-03-19 y 2026-03-23
type: project
---

## Estado del archivo

styles.css tiene 698 líneas (creció de 428 en revisión anterior — se agregó Sprint 2 de decoraciones florales).

---

## BUG-01: Color hardcodeado en .time-unit label (BAJO)

`color: #888` en línea 404 de styles.css en lugar de `var(--text-color)`.
**Persiste sin corrección desde 2026-03-19.**

---

## BUG-02: Texto ilegible en .closing — verde sobre verde (ALTO)

`<p class="section-title">Julian & Yessica</p>` en index.html línea 208 hereda `color: var(--primary-color)` (#3f4f22) sobre fondo `.closing` con `background: var(--verde-oliva)`. Ambos son verde oscuro.
La clase `.closing-names` (styles.css línea 487) tiene `color: var(--beige)` correcto, pero no se usa en el HTML.
**Fix:** Aplicar clase `.closing-names` al `<p>` del cierre, o agregar override `.closing .section-title { color: var(--beige); }`.

---

## BUG-03: background-blend-mode frágil en ceremony y recepcion (ALTO)

styles.css líneas 635-643: `background-blend-mode: multiply` sobre textura `.webp`. Si la imagen falla, no hay fallback visual. Además, el selector usa `.ceremony` y `.recepcion` sueltos, inconsistente con el HTML que usa `.event.ceremony` y `.event.recepcion`.

---

## BUG-04: Dead code — 4 clases CSS sin uso en HTML (MEDIO)

| Clase | Línea CSS |
|-------|-----------|
| `.save-the-date` | 268 |
| `.names` | 277 |
| `.event-place` | 325 |
| `.closing-names` | 487 |

`.closing-names` debería usarse (ver BUG-02).

---

## BUG-05: .guest-name definida dos veces, regla base es dead code (MEDIO)

`.guest-name` genérico (línea 295) siempre es sobreescrito por `.welcome .guest-name` (línea 176) porque el único elemento que usa esa clase está dentro de `.welcome`. La regla de la línea 295 nunca aplica.

---

## BUG-06: z-index: 2 compartido entre cover-watercolor-bottom y cover-content (MEDIO)

styles.css líneas 216, 220, 668-679: `.cover-content`, `.cover .section-divider` y `.cover-watercolor-bottom` tienen todos `z-index: 2`. La imagen al ser el último elemento en el DOM puede solapar visualmente el divider en la parte inferior del cover.

---

## BUG-07: Estilos de flujo en .floral-divider inefectivos (MEDIO)

`.floral-divider` define `margin: 1.5rem auto` y `display: flex`, pero siempre se usa junto con `.section-divider` que tiene `position: absolute`. Las propiedades de flujo no tienen efecto sobre elementos absolutamente posicionados.

---

## BUG-08: .confirmacion y .closing sin section-divider (BAJO — consistencia)

Todas las secciones del proyecto tienen `<div class="section-divider">` excepto `.confirmacion` (índex.html 195-203) y `.closing` (205-210).

---

## BUG-09: .closing hereda overflow: clip con min-height: auto (BAJO)

`section` base define `overflow: clip` (línea 84). `.closing` anula `min-height: auto` (línea 457) pero no anula `overflow`. Si `.closing-deco-corner` sobresale el límite de la sección compacta, será recortado.

**Why:** Detectados en revisiones del 2026-03-19 y 2026-03-23.
**How to apply:** Al modificar styles.css o index.html, verificar estos bugs activos para corregirlos si se toca la zona afectada. BUG-02 es el de mayor impacto visual inmediato.
