# PRD 005 — Animaciones Fase 2: correcciones y refinamientos

**Estado**: Propuesta
**Fecha**: 2026-03-30
**Agente**: boda-animations
**Archivos afectados**: `styles.css`, `script.js`
**Contexto**: Correcciones y mejoras post-implementación de Fase 1 (PRD 003)

---

## Hallazgos del análisis

### Bug — Accesibilidad (prioridad ALTA)

`.recepcion .reception-glasses` tiene animación CSS (opacity + scale-in) pero **no aparece en el bloque `@media (prefers-reduced-motion: reduce)`** de `styles.css`. Es el único elemento animado en Fase 1 que quedó sin cobertura.

El bloque actual cubre (líneas 994–1023):
- `.welcome.visible` → guest-name, section-intro, cupos-info
- `.families .family`
- `.ceremony .ceremony-rings`
- `.confirmacion .whatsapp-btn`
- `.confirmacion .confirm-text`

**Falta**:
- `.recepcion .reception-glasses`

---

### Timing — Duraciones fuera de rango recomendado (prioridad ALTA)

El rango válido según las convenciones del proyecto es **300ms–600ms**. Las animaciones implementadas en Fase 1 exceden ese rango en varios puntos:

| Selector | Duración actual | Estado |
|----------|-----------------|--------|
| `.animate-on-scroll` base | `0.8s` (800ms) | Fuera de rango |
| `.welcome.visible .guest-name` | `1.2s` (1200ms) | Fuera de rango |
| `.welcome.visible .section-intro` | `1.0s` (1000ms) | Fuera de rango |
| `.welcome.visible .cupos-info` | `0.8s` (800ms) | Fuera de rango |
| `.ceremony .ceremony-rings` | `1.2s` (1200ms) | Fuera de rango |
| `.recepcion .reception-glasses` | `1.2s` (1200ms) | Fuera de rango |
| `.confirmacion .whatsapp-btn` | `1.0s` (1000ms) | Fuera de rango |
| `.confirmacion .confirm-text` | `0.8s` (800ms) | Fuera de rango |
| `.families .family` stagger máximo | `1.5s` delay | Acumulado excesivo |

En scroll-snap con iOS Safari, duraciones largas en sección visible se perciben lentas porque el usuario ya llegó a la sección y espera que el contenido aparezca de inmediato. El delay máximo acumulado de las familias (0.5s + 1.0s + 1.5s) es especialmente problemático.

---

### Animaciones pendientes de Fase 2 (prioridad MEDIA)

Definidas en PRD 003 como "Media prioridad (evaluar tras Fase 1)":

1. **Countdown time-units — stagger de entrada**: Los 4 bloques (días, horas, minutos, segundos) entran todos simultáneamente cuando la sección es visible. Sin escalonado no hay narrativa visual.

2. **After-ceremony — entrada de silueta**: `.after-ceremony-img` no tiene animación propia. El texto entra con el fade genérico de `.animate-on-scroll` pero la imagen decorativa permanece estática.

3. **Section-divider — aparición sutil**: Los 3 puntos del divisor de sección son completamente estáticos. Una aparición escalonada muy sutil daría cierre visual a cada sección.

---

### Feedback táctil en botón de mapa (prioridad BAJA)

`.map-link` tiene hover con `background + opacity` pero no tiene feedback táctil `:active` para móvil (touch). El `.whatsapp-btn` sí tiene `:active` implementado. Los dos botones deben tener comportamiento consistente.

---

## Soluciones propuestas

### 1. Bug accesibilidad — `.recepcion .reception-glasses` (ALTA)

**Corrección mínima**: añadir 2 líneas al bloque `prefers-reduced-motion` existente en `styles.css`, después de la regla `.ceremony .ceremony-rings`:

```css
    .recepcion .reception-glasses {
        transition-duration: 0.01ms;
        opacity: 0.85;
        transform: scale(1);
    }
```

---

### 2. Corrección de timings — reducir a rango 300–600ms (ALTA)

**Animación base de scroll** (`styles.css` línea 549):

```css
/* Antes */
transition: transform 0.8s ease, opacity 0.8s ease;

/* Después */
transition: transform 0.5s ease-out, opacity 0.5s ease-out;
```

**Welcome — guest-name, section-intro, cupos-info**:

```css
/* Antes */
.welcome.visible .guest-name {
    animation: nameReveal 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}
.welcome.visible .section-intro {
    animation: fadeInUp 1s ease-out 1.2s both;
}
.welcome.visible .cupos-info {
    animation: fadeInUp 0.8s ease-out 1.8s both;
}

/* Después */
.welcome.visible .guest-name {
    animation: nameReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}
.welcome.visible .section-intro {
    animation: fadeInUp 0.45s ease-out 0.4s both;
}
.welcome.visible .cupos-info {
    animation: fadeInUp 0.4s ease-out 0.6s both;
}
```

**Ceremony y Recepcion — scale-in**:

```css
/* Antes */
transition: opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.34, 1.2, 0.64, 1);
/* con transition-delay: 0.5s */

/* Después */
transition: opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
/* con transition-delay: 0.15s */
```

**Families — stagger** (delay acumulado máximo pasa de 1.5s a 0.4s):

```css
/* Antes */
transition: opacity 1s ease-out, transform 1s ease-out;
.families.visible .family:nth-child(4) { transition-delay: 0.5s; }
.families.visible .family:nth-child(5) { transition-delay: 1.0s; }
.families.visible .family:nth-child(6) { transition-delay: 1.5s; }

/* Después */
transition: opacity 0.5s ease-out, transform 0.5s ease-out;
.families.visible .family:nth-child(4) { transition-delay: 0.1s; }
.families.visible .family:nth-child(5) { transition-delay: 0.2s; }
.families.visible .family:nth-child(6) { transition-delay: 0.4s; }
```

**Nota**: El stagger de familias usa `nth-child` en lugar de `nth-child(1/2/3)` porque los `.deco-corner` son hermanos en el DOM. Verificar el índice real antes de implementar con `nth-of-type` si es necesario.

**Confirmación — whatsapp-btn y confirm-text**:

```css
/* Antes */
.confirmacion .whatsapp-btn {
    transition: opacity 1s ease-out,
                transform 1s cubic-bezier(0.34, 1.2, 0.64, 1), ...;
    /* transition-delay: 0.8s */
}
.confirmacion .confirm-text {
    transition: opacity 0.8s ease-out;
    /* transition-delay: 1.4s */
}

/* Después */
.confirmacion .whatsapp-btn {
    transition: opacity 0.5s ease-out,
                transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), ...;
    /* transition-delay: 0.35s */
}
.confirmacion .confirm-text {
    transition: opacity 0.4s ease-out;
    /* transition-delay: 0.6s */
}
```

---

### 3. Countdown time-units — stagger de entrada (MEDIA)

CSS puro, sin cambios en `script.js`. Los 4 `time-unit` entran escalonados cuando la sección `.countdown` recibe `.visible`:

```css
/* Estado inicial */
.countdown .time-unit {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

/* Visible con stagger */
.countdown.visible .time-unit {
    opacity: 1;
    transform: translateY(0);
}
.countdown.visible .time-unit:nth-child(1) { transition-delay: 0s; }
.countdown.visible .time-unit:nth-child(2) { transition-delay: 0.08s; }
.countdown.visible .time-unit:nth-child(3) { transition-delay: 0.16s; }
.countdown.visible .time-unit:nth-child(4) { transition-delay: 0.24s; }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
    .countdown .time-unit {
        transition-duration: 0.01ms;
        transition-delay: 0ms !important;
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Nota de integración**: El estado inicial `opacity: 0` no interfiere con `flipDigit()` porque el flip opera sobre el `<span>` hijo. La opacidad del `time-unit` padre se resuelve al agregar `.visible` antes del primer tick del countdown (que ocurre al cargar, antes de 1s).

---

### 4. After-ceremony — entrada de silueta (MEDIA)

`.after-ceremony-img` entra con fade + translateX sutil desde la derecha, dando sensación de "llegar a la recepción":

```css
/* Estado inicial */
.after-ceremony .after-ceremony-img {
    opacity: 0;
    transform: translateX(16px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

/* Visible — entra después del texto */
.after-ceremony.visible .after-ceremony-img {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 0.3s;
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
    .after-ceremony .after-ceremony-img {
        transition-duration: 0.01ms;
        transition-delay: 0ms;
        opacity: 1;
        transform: translateX(0);
    }
}
```

---

### 5. Section-divider — aparición escalonada (BAJA)

Los 3 spans del divisor aparecen uno a uno con delay mínimo como punto final de sección:

```css
/* Estado inicial */
.section-divider span {
    opacity: 0;
    transition: opacity 0.3s ease-out;
}

/* Visible — stagger de 0.08s */
.animate-on-scroll.visible .section-divider span:nth-child(1) {
    opacity: 1;
    transition-delay: 0.2s;
}
.animate-on-scroll.visible .section-divider span:nth-child(2) {
    opacity: 1;
    transition-delay: 0.28s;
}
.animate-on-scroll.visible .section-divider span:nth-child(3) {
    opacity: 1;
    transition-delay: 0.36s;
}

/* Excepción: cover usa animation propia, no transition */
.cover .section-divider span {
    opacity: 1; /* La animación del cover maneja esto */
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
    .section-divider span {
        transition-duration: 0.01ms;
        transition-delay: 0ms !important;
        opacity: 1;
    }
}
```

**Advertencia**: Verificar que `.closing .section-divider span` no pierda su `opacity: 0.6` estilístico al aplicar el estado visible. Puede requerir ajuste de especificidad.

---

### 6. Feedback táctil en map-link (BAJA)

Añadir `:active` al bloque touch existente en `styles.css`:

```css
/* Bloque existente (línea 987) */
@media (hover: none) and (pointer: coarse) {
    .whatsapp-btn:active {
        transform: scale(0.97);
    }
    /* Añadir: */
    .map-link:active {
        transform: scale(0.97);
        opacity: 0.8;
    }
}
```

---

## Clasificación y orden de implementación

| # | Elemento | Prioridad | Tipo | Archivos |
|---|----------|-----------|------|----------|
| 1 | Bug: `.recepcion .reception-glasses` en reduced-motion | **ALTA** | Bug fix | styles.css |
| 2 | Timings: reducir todas las duraciones a 300–600ms | **ALTA** | Corrección | styles.css |
| 3 | Countdown time-units stagger de entrada | MEDIA | Mejora | styles.css |
| 4 | After-ceremony: entrada de silueta | MEDIA | Mejora | styles.css |
| 5 | Section-divider: aparición escalonada | BAJA | Pulido | styles.css |
| 6 | Feedback táctil en `.map-link` | BAJA | Consistencia | styles.css |

---

## Checklist de implementación

- [ ] Bug #1 verificado: `.recepcion .reception-glasses` presente en prefers-reduced-motion
- [ ] Timings verificados en DevTools: ninguna animación supera 600ms de duración
- [ ] Stagger acumulado máximo de familias: ≤ 0.5s total
- [ ] Countdown stagger no interfiere con flipDigit
- [ ] After-ceremony-img no pisa texto en ningún viewport
- [ ] Section-divider closing mantiene opacity 0.6
- [ ] Todas las animaciones nuevas tienen bloque prefers-reduced-motion
- [ ] Probado en Safari iOS (scroll-snap)
- [ ] Probado en Chrome Android
- [ ] 60fps confirmado en DevTools (Performance tab)

---

## Notas técnicas

- **Cover excluida de corrección de timings**: las animaciones `fadeInDown/fadeIn/fadeInUp` del cover usan 1s intencionalmente para la primera impresión. Son animaciones de entrada única, no repetidas en scroll.
- **No se modifica script.js**: todas las mejoras son CSS puro excepto si se decide implementar stagger JS para countdown (alternativa al CSS).
- **Especificidad**: las correcciones de timing sobreescriben reglas existentes. Verificar que no haya conflictos con las capas de especificidad actuales.
