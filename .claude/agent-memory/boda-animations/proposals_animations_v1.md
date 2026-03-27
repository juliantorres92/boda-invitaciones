# Propuestas de Animación — Julian & Yessica
**Fecha de análisis**: 2026-03-24
**Estado**: Propuestas para revisión. NO implementadas.

---

## Diagnóstico del estado actual

El proyecto tiene un sistema de animación funcional pero básico:

- **Entrada de secciones**: `.animate-on-scroll` + `.visible` → fade-in + translateY(30px→0), 0.8s ease. Una sola animación para toda la sección.
- **Cover**: Animaciones CSS escalonadas (fadeInDown, fadeIn, fadeInUp) con delays 0.3s/0.8s/1.2s/1.6s. Ya bien resuelto.
- **Hover en botones**: Cambio de background + opacity. Sin `transform`. Oportunidad de mejora.
- **Countdown**: Números actualizados con `textContent` directo. Sin animación de transición entre valores.
- **Decoraciones florales**: Estáticas. Potencial de movimiento muy sutil.
- **Barras separadoras** (`.section-divider`): Sin animación propia.

**Problema principal**: Todas las secciones entran con el mismo gesto (fade+slide desde abajo). Monótono a medida que el usuario hace scroll. Cada sección merece su propia personalidad animada.

---

## Propuestas por sección

---

### 1. COVER — Refinamiento de la entrada existente

**Estado actual**: Ya tiene animaciones CSS escalonadas (fadeInDown/fadeIn/fadeInUp). Funciona bien.

**Propuesta A: Parallax sutil en decoraciones florales**
Las esquinas de lirios (`.cover-corner`) se mueven muy ligeramente al hacer scroll inicial, creando sensación de profundidad.

- Prioridad: Media
- Complejidad: Simple

```js
// Parallax muy sutil en corners del cover (speed 0.08)
// Solo se activa en el cover, se detiene al pasar a la siguiente sección
function initCoverParallax() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const topLeft     = document.querySelector('.cover .cover-corner.top-left');
    const bottomRight = document.querySelector('.cover .cover-corner.bottom-right');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const coverHeight = document.querySelector('.cover').offsetHeight;

            // Solo en el rango del cover
            if (scrollY > coverHeight) { ticking = false; return; }

            const offset = scrollY * 0.08;
            topLeft.style.transform     = `scale(-1, -1) translateY(${offset}px)`;
            bottomRight.style.transform = `translateY(${-offset}px)`;
            ticking = false;
        });
        ticking = true;
    }, { passive: true });
}
```

**Propuesta B: Fade-out del cover al hacer scroll**
El contenido del cover se desvanece suavemente cuando empieza el scroll, creando una transición orgánica hacia `welcome`.

- Prioridad: Baja
- Complejidad: Simple

```js
function initCoverScrollFade() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const coverContent = document.querySelector('.cover-content');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            // Fade empieza al 20% del viewport, completo al 60%
            const progress = Math.min(Math.max((scrollY - vh * 0.2) / (vh * 0.4), 0), 1);
            coverContent.style.opacity = 1 - progress;
            coverContent.style.transform = `translateY(${progress * -20}px)`;
            ticking = false;
        });
        ticking = true;
    }, { passive: true });
}
```

---

### 2. WELCOME — Entrada personalizada del nombre del invitado

**Estado actual**: Fade-in genérico de toda la sección. El nombre del invitado aparece sin distinción especial.

**Propuesta A: Reveal del nombre con clip-path (ALTA PRIORIDAD)**
El nombre del invitado se revela con un clip-path de abajo hacia arriba, como texto que emerge. Más elegante que un simple fade.

- Prioridad: Alta
- Complejidad: Simple

```css
/* Cuando la sección se vuelve visible, el nombre tiene su propia animación */
.welcome.visible .guest-name {
    animation: nameReveal 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

@keyframes nameReveal {
    from {
        opacity: 0;
        transform: translateY(24px);
        filter: blur(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}

/* Texto introductorio entra después */
.welcome.visible .section-intro {
    animation: fadeInUp 0.6s ease-out 0.65s both;
}

/* Badge de cupos entra al final */
.welcome.visible .cupos-info {
    animation: fadeInUp 0.5s ease-out 0.9s both;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
    .welcome.visible .guest-name,
    .welcome.visible .section-intro,
    .welcome.visible .cupos-info {
        animation-duration: 0.01ms;
        animation-delay: 0ms;
    }
}
```

**Propuesta B: Shimmer sutil en el nombre (opcional, post A)**
Después de que el nombre entra, un shimmer muy suave pasa por él una sola vez (no infinito).

- Prioridad: Baja
- Complejidad: Moderada

```css
@keyframes nameShimmerOnce {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
}

.welcome.visible .guest-name {
    /* Se aplica UNA VEZ con animation-iteration-count: 1, 2s de delay */
    background: linear-gradient(
        90deg,
        var(--primary-color) 30%,
        var(--verde-sage) 50%,
        var(--primary-color) 70%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: nameReveal 0.7s ease 0.3s both,
               nameShimmerOnce 1.2s linear 1.5s 1 forwards;
}
```

---

### 3. FAMILIES — Entrada escalonada de los grupos familiares

**Estado actual**: Los 3 bloques `.family` entran todos juntos con el fade-in de la sección. No hay diferenciación entre ellos.

**Propuesta: Stagger escalonado por bloque familiar (ALTA PRIORIDAD)**
Cada bloque `.family` entra con un delay creciente, creando sensación de presentación progresiva.

- Prioridad: Alta
- Complejidad: Simple

```css
/* Estado inicial: ocultos */
.families .family {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out,
                transform 0.5s ease-out;
}

/* Cuando la sección es visible, cada familia entra escalonada */
.families.visible .family {
    opacity: 1;
    transform: translateY(0);
}

.families.visible .family:nth-child(1) { transition-delay: 0.2s; }
.families.visible .family:nth-child(2) { transition-delay: 0.4s; }
.families.visible .family:nth-child(3) { transition-delay: 0.6s; }

/* Subtitle y text dentro de cada family con su propio micro-delay */
.families .family .section-subtitle {
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    /* hereda el delay del padre */
}

@media (prefers-reduced-motion: reduce) {
    .families .family {
        transition-duration: 0.01ms;
        transition-delay: 0ms !important;
    }
}
```

**Nota de implementación**: El nth-child se cuenta desde el primer hijo del padre. En el HTML actual, `.family` es hijo directo de `.families`, pero hay otros hijos antes (`.deco-corner`). Usar `nth-of-type` o agregar clase `.family-item` para targeting seguro.

---

### 4. CEREMONY — Entrada de la ilustración de anillos

**Estado actual**: La imagen `.ceremony-rings` entra como parte del fade-in de la sección. Sin animación propia.

**Propuesta A: Scale-in suave en la ilustración de anillos (ALTA PRIORIDAD)**
Los anillos hacen un scale sutil de 0.92 → 1.0 con un ligero delay, como si materializaran.

- Prioridad: Alta
- Complejidad: Simple

```css
.ceremony .ceremony-rings {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.6s ease-out,
                transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    /* cubic-bezier con leve overshoot: más orgánico que ease-out puro */
}

.ceremony.visible .ceremony-rings {
    opacity: 0.85; /* mantener el valor original de opacity */
    transform: scale(1);
    transition-delay: 0.15s;
}

/* Título y detalles de ceremony con stagger */
.ceremony.visible .section-title {
    animation: fadeInDown 0.5s ease-out 0s both;
}

.ceremony.visible .event-details {
    animation: fadeInUp 0.5s ease-out 0.25s both;
}

@media (prefers-reduced-motion: reduce) {
    .ceremony .ceremony-rings {
        transition-duration: 0.01ms;
        opacity: 0.85;
        transform: scale(1);
    }
}
```

**Propuesta B: Hover en el botón "Ver ubicación" con micro-elevación (MEDIA PRIORIDAD)**
Mejorar el hover actual (solo cambia background) para incluir `translateY(-2px)`.

- Prioridad: Media
- Complejidad: Simple

```css
/* Reemplaza o extiende el .map-link:hover existente */
.map-link {
    transition: background 0.25s ease,
                transform 0.25s ease-out,
                box-shadow 0.25s ease;
}

.map-link:hover {
    background: rgba(63, 79, 34, 0.06);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(63, 79, 34, 0.2);
}

.map-link:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(63, 79, 34, 0.25);
}
```

---

### 5. AFTER-CEREMONY — Reveal de la silueta de pareja

**Estado actual**: Sección con imagen de silueta de pareja al 0.45 de opacidad. Sin animación propia beyond el fade general.

**Propuesta: Fade-in diferenciado: texto primero, silueta después**
La silueta entra más lentamente y con un delay mayor al texto, como si surgiera del fondo.

- Prioridad: Media
- Complejidad: Simple

```css
/* Silueta empieza invisible */
.after-ceremony .after-ceremony-img {
    opacity: 0;
    transform: scale(1.04);
    transition: opacity 1s ease-out,
                transform 1s ease-out;
}

/* El overlay (texto) entra antes */
.after-ceremony.visible .after-ceremony-overlay {
    animation: fadeInUp 0.5s ease-out 0.2s both;
}

/* La silueta entra después, más lentamente */
.after-ceremony.visible .after-ceremony-img {
    opacity: 0.45; /* valor original */
    transform: scale(1);
    transition-delay: 0.5s;
}

@media (prefers-reduced-motion: reduce) {
    .after-ceremony .after-ceremony-img {
        transition-duration: 0.01ms;
        opacity: 0.45;
        transform: scale(1);
    }
}
```

---

### 6. RECEPCION — Entrada de las copas + datos

**Estado actual**: Mismo fade genérico. La imagen `.reception-glasses` no tiene animación propia.

**Propuesta A: Float suave en las copas de champagne (MEDIA PRIORIDAD)**
Las copas hacen un float muy sutil (4px arriba/abajo) después de entrar. Celebratorio sin ser excesivo.

- Prioridad: Media
- Complejidad: Simple

```css
/* Las copas entran con scale suave */
.recepcion .reception-glasses {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.recepcion.visible .reception-glasses {
    opacity: 0.85;
    transform: translateY(0);
    transition-delay: 0.1s;
    /* Después de entrar, animación continua muy sutil */
    animation: glassesFloat 4s ease-in-out 0.7s infinite;
}

@keyframes glassesFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-5px); }
}

@media (prefers-reduced-motion: reduce) {
    .recepcion .reception-glasses {
        transition-duration: 0.01ms;
        animation: none;
        opacity: 0.85;
        transform: translateY(0);
    }
}
```

**Propuesta B: Mismo hover mejorado para el mapa de recepción**
Idéntico a la propuesta del mapa en ceremony. Consistencia.

- Prioridad: Media
- Complejidad: Simple (igual a Ceremony B)

---

### 7. COUNTDOWN — Animación flip de los dígitos

**Estado actual**: Los números se actualizan con `textContent` puro cada segundo. Sin transición visual entre valores.

**Propuesta: Flip animado de dígitos al cambiar (ALTA PRIORIDAD)**
Cuando un dígito cambia, sale hacia arriba con fade y el nuevo entra desde abajo. Usando WAAPI.

- Prioridad: Alta
- Complejidad: Moderada

```js
// Reemplaza la lógica de actualización en updateCountdown()
// Requiere añadir perspective al .time-unit en CSS

function flipNumber(element, newValue) {
    const formatted = String(newValue).padStart(2, '0');
    if (element.textContent === formatted) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
        element.textContent = formatted;
        return;
    }

    // Salida
    element.animate(
        [
            { opacity: 1, transform: 'translateY(0px)' },
            { opacity: 0, transform: 'translateY(-14px)' }
        ],
        { duration: 180, easing: 'ease-in', fill: 'forwards' }
    ).finished.then(() => {
        element.textContent = formatted;
        // Entrada
        element.animate(
            [
                { opacity: 0, transform: 'translateY(14px)' },
                { opacity: 1, transform: 'translateY(0px)' }
            ],
            { duration: 220, easing: 'ease-out', fill: 'forwards' }
        );
    });
}

// CSS complementario para el contenedor
/*
.time-unit {
    overflow: hidden; -- evita que el texto saliente sea visible
}
.time-unit span {
    display: block; -- necesario para que overflow: hidden funcione con translateY
}
*/
```

**Propuesta adicional: Entrada escalonada del countdown al hacerse visible**
Los 4 time-units entran con stagger de 0.1s.

- Prioridad: Media
- Complejidad: Simple

```css
.countdown .time-unit {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.countdown.visible .time-unit:nth-child(1) { /* days */
    opacity: 1; transform: translateY(0); transition-delay: 0.1s;
}
.countdown.visible .time-unit:nth-child(2) { /* Nota: separadores son spans.separator */
    opacity: 1; transform: translateY(0); transition-delay: 0.2s;
}
/* ... etc para hours, minutes, seconds */

/* Separadores ":" también con fade */
.countdown .separator {
    opacity: 0;
    transition: opacity 0.4s ease-out 0.05s;
}
.countdown.visible .separator {
    opacity: 0.4; /* valor original */
}

@media (prefers-reduced-motion: reduce) {
    .countdown .time-unit {
        transition-duration: 0.01ms;
        transition-delay: 0ms !important;
        opacity: 1;
        transform: translateY(0);
    }
    .countdown .separator {
        opacity: 0.4;
    }
}
```

---

### 8. CONFIRMACION — CTA con hover mejorado

**Estado actual**: El botón `.whatsapp-btn` tiene hover básico (background + opacity). Sin `transform`.

**Propuesta A: Micro-elevación en hover del CTA (ALTA PRIORIDAD)**
Elevar el botón `translateY(-3px)` al hacer hover, con sombra más pronunciada. Patrón ya documentado en `subtle-movements.md`.

- Prioridad: Alta
- Complejidad: Simple

```css
/* Extiende la transición existente */
.whatsapp-btn {
    transition: background 0.25s ease,
                transform 0.25s ease-out,
                box-shadow 0.25s ease;
    /* quita 'opacity' de la transición — usar transform es mejor */
}

.whatsapp-btn:hover {
    background: rgba(63, 79, 34, 0.06);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(63, 79, 34, 0.3);
}

.whatsapp-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(63, 79, 34, 0.25);
}

/* Touch feedback en móvil */
@media (hover: none) and (pointer: coarse) {
    .whatsapp-btn:active {
        transform: scale(0.98);
    }
}
```

**Propuesta B: Entrada del botón con delay para que sea lo último en aparecer**
El botón CTA llega después del título, como un remate.

- Prioridad: Media
- Complejidad: Simple

```css
.confirmacion .section-title {
    animation: none; /* hereda el fade-in de la sección */
}

.confirmacion .whatsapp-btn {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
    transition: opacity 0.5s ease-out,
                transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
                background 0.25s ease,
                box-shadow 0.25s ease;
}

.confirmacion.visible .whatsapp-btn {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition-delay: 0.35s;
}

.confirmacion .confirm-text {
    opacity: 0;
    transition: opacity 0.4s ease-out 0.6s;
}

.confirmacion.visible .confirm-text {
    opacity: 0.8; /* mantiene el valor original */
}

@media (prefers-reduced-motion: reduce) {
    .confirmacion .whatsapp-btn,
    .confirmacion .confirm-text {
        transition-duration: 0.01ms;
        transition-delay: 0ms;
        opacity: 1;
        transform: none;
    }
}
```

---

### 9. SECTION-DIVIDER — Animación de los 3 puntos

**Estado actual**: Los 3 puntos del `.section-divider` son estáticos.

**Propuesta: Entrada escalonada de los puntos (Baja prioridad, alto charm)**
Los 3 puntos del divisor aparecen uno a uno, como un "..." que respira.

- Prioridad: Baja
- Complejidad: Simple

```css
.section-divider span {
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

/* Se activa cuando la sección padre tiene .visible */
.visible .section-divider span:nth-child(1) {
    opacity: 0.5;
    transform: scale(1);
    transition-delay: 0.6s;
}
.visible .section-divider span:nth-child(2) {
    opacity: 0.5;
    transform: scale(1);
    transition-delay: 0.75s;
}
.visible .section-divider span:nth-child(3) {
    opacity: 0.5;
    transform: scale(1);
    transition-delay: 0.9s;
}

@media (prefers-reduced-motion: reduce) {
    .section-divider span {
        opacity: 0.5;
        transform: scale(1);
        transition-duration: 0.01ms;
    }
}
```

---

## Resumen de prioridades

| # | Sección       | Propuesta                             | Prioridad | Complejidad |
|---|---------------|---------------------------------------|-----------|-------------|
| 1 | Welcome       | Reveal del nombre con filtro blur     | Alta      | Simple      |
| 2 | Families      | Stagger escalonado por familia        | Alta      | Simple      |
| 3 | Ceremony      | Scale-in suave en anillos             | Alta      | Simple      |
| 4 | Countdown     | Flip de dígitos al cambiar            | Alta      | Moderada    |
| 5 | Confirmacion  | Micro-elevación hover en CTA          | Alta      | Simple      |
| 6 | Ceremony      | Hover mejorado en "Ver ubicación"     | Media     | Simple      |
| 7 | Recepcion     | Float suave en copas de champagne     | Media     | Simple      |
| 8 | After-ceremony| Silueta entra después del texto       | Media     | Simple      |
| 9 | Countdown     | Entrada escalonada de time-units      | Media     | Simple      |
| 10| Confirmacion  | Entrada retardada del botón CTA       | Media     | Simple      |
| 11| Cover         | Parallax sutil en corners florales    | Media     | Simple      |
| 12| Divider       | Entrada escalonada de 3 puntos        | Baja      | Simple      |
| 13| Cover         | Fade-out del cover al hacer scroll    | Baja      | Simple      |
| 14| Welcome       | Shimmer único en nombre               | Baja      | Moderada    |

---

## Notas de implementación

### Orden recomendado de implementación
1. **Sprint inmediato**: Prioridades Altas (1-5) — son todas simples, máximo impacto
2. **Sprint siguiente**: Prioridades Medias (6-11) — enriquecen sin saturar
3. **Sprint posterior**: Prioridades Bajas (12-14) — detalles de refinamiento

### Compatibilidad
- Todo el código propuesto usa `transform` y `opacity` únicamente (excepto `filter: blur()` puntual en #1)
- Las propuestas no usan Scroll-Driven Animations CSS (solo Chrome 115+) — se usa IntersectionObserver como base
- WAAPI usado en Countdown Flip (#4) — soporte universal en todos los navegadores modernos

### Interacción con el sistema existente
- Las propuestas para elementos DENTRO de las secciones (`.family`, `.ceremony-rings`, etc.) complementan el `.animate-on-scroll.visible` existente — no lo reemplazan
- El `.animate-on-scroll` de la sección sigue siendo la llave que activa el estado `.visible`
- Los elementos hijos se animan CON DELAY respecto a la sección, creando jerarquía visual

### Riesgo de performance
- `filter: blur(4px→0)` en Welcome propuesta A: puede causar repaint. Alternativa: solo usar opacity + translateY si se detectan problemas en móvil gama baja.
- `animation: glassesFloat infinite` en Recepcion: verificar que no consuma CPU en scroll-snap con múltiples secciones visibles. Alternativa: pausar con `animation-play-state: paused` cuando la sección no está visible.
