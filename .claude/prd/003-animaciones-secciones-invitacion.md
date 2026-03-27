# PRD 003 — Animaciones por sección para la invitación

**Estado**: Pendiente de aprobación
**Fecha propuesta**: 2026-03-24
**Agente**: boda-animations
**Archivos afectados**: `styles.css`, `index.html` (mínimo), posiblemente un bloque `<script>` en index.html

---

## Problema

Todas las secciones comparten el mismo gesto de entrada: `fade + translateY(30px→0)`, repetido 7 veces. El resultado es monótono — la invitación pierde narrativa visual y cada sección no tiene personalidad propia.

---

## Objetivo

Dar a cada sección una animación diferenciada que refuerce el contenido emocional, manteniendo elegancia y performance.

---

## Alcance — Fase 1 (Alta prioridad, todas simples)

### 1. Welcome — Entrada del nombre con blur
El nombre del invitado entra con `filter: blur(4px→0)` + `translateY` en lugar del fade genérico. Hace la bienvenida más especial.

```css
.welcome.visible .guest-name {
    animation: revealName 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes revealName {
    from { opacity: 0; filter: blur(4px); transform: translateY(12px); }
    to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
}
```

**Riesgo**: `filter: blur()` puede causar repaint en móvil gama baja. Fallback: omitir blur, mantener solo opacity + translateY.

---

### 2. Families — Stagger entre los 3 bloques familiares
Cada bloque (Padres novio, Padres novia, Padrinos) aparece con 0.2s de delay entre sí — presentación progresiva y narrativa.

```css
.families.visible .family:nth-child(1) { animation-delay: 0.1s; }
.families.visible .family:nth-child(2) { animation-delay: 0.3s; }
.families.visible .family:nth-child(3) { animation-delay: 0.5s; }
```

---

### 3. Ceremony — Entrada con scale en los anillos
Los anillos entran con `scale(0.92→1.0)` con cubic-bezier de overshoot sutil, reforzando su protagonismo visual.

```css
.ceremony.visible .ceremony-rings {
    animation: ringEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
}
@keyframes ringEntrance {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 0.85; transform: scale(1); }
}
```

---

### 4. Countdown — Flip animado de dígitos
Al cambiar cada segundo, los dígitos hacen flip: salen por arriba (-14px) y el nuevo entra desde abajo. Se implementa con WAAPI.

```js
function flipDigit(el, newValue) {
    if (el.textContent === newValue) return;
    el.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(-14px)', opacity: 0 }
    ], { duration: 180, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
        el.textContent = newValue;
        el.animate([
            { transform: 'translateY(14px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 220, easing: 'ease-out', fill: 'forwards' });
    };
}
```

---

### 5. Confirmación — Hover del botón CTA con micro-elevación
El botón principal sube 3px y refuerza su sombra al hacer hover, haciéndolo más invitante.

```css
.btn-confirmar:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(107, 123, 89, 0.35);
}
.btn-confirmar {
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease;
}
```

---

## Alcance — Fase 2 (Media prioridad, para evaluación posterior)

| # | Propuesta | Complejidad |
|---|-----------|-------------|
| 6 | Hover micro-elevación en botones "Ver ubicación" (ceremony + recepcion) | Simple |
| 7 | Float infinito sutil (±5px, 4s) en copas de champagne post-entrada | Simple |
| 8 | Entrada de countdown con stagger entre los 4 time-units (0.1s c/u) | Simple |
| 9 | Botón confirmación entra con delay 0.35s y scale 0.97→1 | Simple |
| 10 | Parallax 0.08 en corners florales del cover al hacer scroll inicial | Simple |

---

## Alcance — Fase 3 (Baja prioridad)

| # | Propuesta | Complejidad |
|---|-----------|-------------|
| 11 | Divisor floral: 3 puntos aparecen uno a uno (0.6s/0.75s/0.9s) | Simple |
| 12 | Fade-out del cover al comenzar el scroll | Simple |
| 13 | Shimmer único en el nombre del invitado post-entrada | Moderada |

---

## Notas técnicas

- **Patrón de integración**: Las animaciones de elementos internos no reemplazan `.animate-on-scroll`. La sección sigue siendo el trigger (`.visible`) y los hijos animan con delay relativo.
- **Performance**: Usar solo `transform`, `opacity` y `filter` — sin `top/left/width/height`.
- **Float infinito (Fase 2 #7)**: Pausar con `animation-play-state: paused` cuando la sección sale del viewport para no consumir CPU innecesariamente.

---

## Implementación sugerida (cuando se apruebe)

1. Implementar Fase 1 completa (5 animaciones) en una sola sesión
2. Probar en mobile (Safari iOS y Chrome Android)
3. Revisar el blur en Welcome — si hay problema de performance, aplicar fallback
4. Decidir Fase 2 tras ver resultado de Fase 1

---

## Referencia

Propuestas detalladas con código completo: `.claude/agent-memory/boda-animations/proposals_animations_v1.md`
