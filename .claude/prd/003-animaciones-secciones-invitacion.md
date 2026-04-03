# PRD 003 — Animaciones por sección para la invitación

**Estado**: Implementado — 2026-03-30
**Fecha propuesta**: 2026-03-26
**Agente**: boda-animations
**Archivos afectados**: `styles.css`, `script.js` (flip countdown)
**Enfoque**: Mobile-first — el 95%+ de visitas son desde celular vía WhatsApp

---

## Problema

Todas las secciones comparten el mismo gesto de entrada: `fade + translateY(30px→0)`, repetido 7 veces. El resultado es monótono — la invitación pierde narrativa visual y cada sección no tiene personalidad propia.

---

## Objetivo

Dar a cada sección una animación diferenciada que refuerce el contenido emocional, manteniendo elegancia y performance en dispositivos móviles.

---

## Restricciones mobile-first

- **No hover**: los efectos `:hover` no existen en touch — solo usar `:active` como feedback táctil
- **No `filter: blur()`**: causa repaint pesado en móviles gama baja
- **No animaciones infinitas**: consumen batería innecesariamente
- **No parallax con scroll-snap**: conflicto en iOS Safari
- **Solo `transform` + `opacity`**: propiedades que no causan layout/paint
- **`prefers-reduced-motion`**: obligatorio en todas las animaciones

---

## Fase 1 — Alta prioridad (todas simples, CSS puro excepto #4)

### 1. Welcome — Reveal del nombre del invitado
El nombre entra con `opacity + translateY`, diferenciado del fade genérico. Texto y cupos entran escalonados después.

```css
.welcome.visible .guest-name {
    animation: nameReveal 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}
@keyframes nameReveal {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
}
.welcome.visible .section-intro {
    animation: fadeInUp 0.6s ease-out 0.65s both;
}
.welcome.visible .cupos-info {
    animation: fadeInUp 0.5s ease-out 0.9s both;
}
```

---

### 2. Families — Stagger entre los 3 bloques familiares
Cada bloque (Padres novio, Padres novia, Padrinos) aparece con 0.2s de delay — presentación progresiva.

```css
.families .family {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.families.visible .family { opacity: 1; transform: translateY(0); }
.families.visible .family:nth-child(1) { transition-delay: 0.2s; }
.families.visible .family:nth-child(2) { transition-delay: 0.4s; }
.families.visible .family:nth-child(3) { transition-delay: 0.6s; }
```

**Nota**: verificar nth-child vs nth-of-type por los `.deco-corner` hermanos.

---

### 3. Ceremony — Scale-in suave en anillos
Los anillos entran con `scale(0.92→1.0)` con overshoot sutil.

```css
.ceremony .ceremony-rings {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ceremony.visible .ceremony-rings {
    opacity: 0.85;
    transform: scale(1);
    transition-delay: 0.15s;
}
```

---

### 4. Countdown — Flip animado de dígitos
Al cambiar cada segundo, los dígitos salen hacia arriba y entran desde abajo. WAAPI (soportado en todos los móviles modernos).

```js
function flipDigit(el, newValue) {
    const formatted = String(newValue).padStart(2, '0');
    if (el.textContent === formatted) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = formatted;
        return;
    }
    el.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(-14px)', opacity: 0 }
    ], { duration: 180, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
        el.textContent = formatted;
        el.animate([
            { transform: 'translateY(14px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 220, easing: 'ease-out', fill: 'forwards' });
    };
}
```

CSS complementario: `.time-unit { overflow: hidden; }` y `.time-unit span { display: block; }`

---

### 5. Confirmación — Entrada retardada del botón CTA
El botón llega después del título como remate visual. Feedback táctil con `:active` (no hover).

```css
.confirmacion .whatsapp-btn {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
    transition: opacity 0.5s ease-out,
                transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.confirmacion.visible .whatsapp-btn {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition-delay: 0.35s;
}

/* Feedback táctil en móvil */
@media (hover: none) and (pointer: coarse) {
    .whatsapp-btn:active {
        transform: scale(0.97);
    }
}
```

---

## Fase 2 — Media prioridad (evaluar tras Fase 1)

| # | Propuesta | Nota mobile |
|---|-----------|-------------|
| 6 | Entrada escalonada de los 4 time-units del countdown (0.1s c/u) | CSS puro, ligero |
| 7 | Silueta de pareja entra después del texto (after-ceremony) | CSS puro, ligero |
| 8 | Entrada retardada del texto de confirmación | CSS puro, ligero |

---

## Descartadas

| Propuesta | Razón |
|-----------|-------|
| Shimmer en nombre del invitado | Efecto "tech", no combina con acuarela botánica |
| Parallax en corners del cover | Conflicto con scroll-snap en iOS |
| Float infinito en copas | Consume batería, distrae en invitación estática |
| Hover micro-elevación en botones | No existe hover en touch — efecto invisible |
| Fade-out del cover al scroll | Conflicto con scroll-snap |

---

## Notas técnicas

- **Patrón de integración**: Las animaciones internas no reemplazan `.animate-on-scroll`. La sección sigue siendo el trigger (`.visible`) y los hijos animan con delay relativo.
- **Performance**: Solo `transform` y `opacity` — sin layout/paint.
- **Testing**: Probar en Safari iOS y Chrome Android antes de aprobar.
- **Accesibilidad**: Todas las animaciones respetan `prefers-reduced-motion: reduce`.

---

## Plan de implementación

1. Implementar Fase 1 completa (5 animaciones)
2. Probar en móvil real (Safari iOS + Chrome Android)
3. Ajustar tiempos/delays según sensación en dispositivo real
4. Evaluar Fase 2 tras aprobación de Fase 1

---

## Referencia

Propuestas detalladas con código completo: `.claude/agent-memory/boda-animations/proposals_animations_v1.md`
