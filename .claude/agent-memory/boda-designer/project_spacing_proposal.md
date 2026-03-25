---
name: spacing_proposal_v1
description: Propuesta de sistema de spacing para todas las secciones — Opción A vs Opción B, tokens CSS y tratamientos especiales por sección
type: project
---

Propuesta de sistema de spacing generada el 2026-03-23. Pendiente de aprobación por el usuario.

**Decisión propuesta:** Opción B (centrado visual con safe zone)

**Why:** Las secciones tienen densidad de contenido muy heterogénea (2 líneas en after-ceremony, ~10 en families/ceremony). La safe zone absorbe esa variación y protege el espacio para futuras decoraciones florales en el top. El centrado ligeramente elevado es la convención clásica de tipografía para invitaciones impresas.

**How to apply:** Cuando se implemente el spacing, usar las variables de Opción B. No usar Opción A.

---

## Bugs detectados en el CSS actual (styles.css)

1. **Doble declaración de padding-top en `section`:** `padding: 4rem 1.5rem` seguido de `padding-top: 5rem` — el primer top nunca actúa (líneas 49 y 61).
2. **Mobile sobreescribe padding con shorthand:** `padding: 3rem 1rem` borra el top diferenciado sin intención explícita.
3. **No hay tokens de spacing en :root** — todos los valores están hardcodeados.
4. **`.section-divider` mezcla `margin-top: auto` y `position: absolute`** — el margin-top es inefectivo porque el elemento es sacado del flujo flex.
5. **`.closing` hereda `min-height: 100dvh`** — debería ser `min-height: auto` para comportarse como cierre narrativo.

---

## Tokens CSS propuestos (Opción B)

```css
/* Spacing scale */
--sp-xs: 0.25rem; --sp-sm: 0.5rem; --sp-md: 1rem; --sp-lg: 1.5rem;
--sp-xl: 2rem; --sp-2xl: 3rem; --sp-3xl: 4rem; --sp-4xl: 6rem;

/* Safe zone */
--section-safe-top-desktop:    4rem;
--section-safe-bottom-desktop: 5rem;
--section-px-desktop:          1.5rem;
--section-safe-top-mobile:     3.5rem;
--section-safe-bottom-mobile:  4.5rem;
--section-px-mobile:           1rem;

/* Divider */
--divider-bottom-desktop: 2rem;
--divider-bottom-mobile:  1.5rem;
```

## Tratamientos especiales

- **cover:** padding:0 en section, safe zone aplicada en cover-content (min-height: 100dvh, width: 100%)
- **closing:** min-height: auto, padding simétrico 6rem, sin section-divider
- **footer:** min-height: auto, padding 3rem / 2rem mobile, sin scroll-snap-align
- **after-ceremony:** sin override — el flex absorbe el espacio sobrante naturalmente
