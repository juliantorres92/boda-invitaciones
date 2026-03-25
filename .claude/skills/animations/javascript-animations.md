# JavaScript Animations

Patrones JS para animaciones que CSS no puede manejar solo: física, timelines complejas, animaciones dinámicas.

---

## Web Animations API (WAAPI)

API nativa del navegador. Más potente que CSS puro, sin dependencias.

```js
// Fade-in básico con WAAPI
element.animate(
    [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ],
    {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
    }
);

// Con control de playback (pause, reverse, cancel)
const animation = element.animate(keyframes, options);
animation.pause();
animation.play();
animation.reverse();
animation.cancel();

// Esperar a que termine (promise)
await animation.finished;
nextStep();

// Verificar preferencias de movimiento
function getReducedDuration(duration) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : duration;
}
```

---

## Stagger Dinámico

Calcular delays según número real de elementos (no nth-child hardcodeado).

```js
function staggerElements(elements, options = {}) {
    const {
        delay = 120,        // ms entre cada elemento
        duration = 500,
        easing = 'ease-out',
        from = 'start',     // 'start' | 'center' | 'end'
        y = 20
    } = options;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elements.forEach((el, i) => {
        let staggerDelay;
        if (from === 'center') {
            const mid = Math.floor(elements.length / 2);
            staggerDelay = Math.abs(i - mid) * delay;
        } else if (from === 'end') {
            staggerDelay = (elements.length - 1 - i) * delay;
        } else {
            staggerDelay = i * delay;
        }

        el.animate(
            [
                { opacity: 0, transform: `translateY(${y}px)` },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            {
                duration: reduced ? 0 : duration,
                delay: reduced ? 0 : staggerDelay,
                easing,
                fill: 'forwards'
            }
        );
    });
}

// Uso con IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const items = entry.target.querySelectorAll('.item');
        staggerElements([...items], { delay: 150, from: 'start' });
        observer.unobserve(entry.target);
    });
}, { threshold: 0.2 });

document.querySelectorAll('.stagger-container').forEach(el => observer.observe(el));
```

---

## requestAnimationFrame con Física

Animaciones con spring, decay e inercia — sin librerías.

```js
// Spring physics (rebote natural)
function springAnimate(element, target, options = {}) {
    const {
        stiffness = 120,
        damping = 14,
        mass = 1,
        property = 'translateY'
    } = options;

    let position = 0;
    let velocity = 0;
    let rafId;

    function tick() {
        const force = -stiffness * (position - target);
        const dampingForce = -damping * velocity;
        const acceleration = (force + dampingForce) / mass;

        velocity += acceleration * (1 / 60);
        position += velocity;

        element.style.transform = `${property}(${position}px)`;

        if (Math.abs(position - target) < 0.1 && Math.abs(velocity) < 0.1) {
            element.style.transform = `${property}(${target}px)`;
            return; // settled
        }
        rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
}

// Easing exponencial (decay)
function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
}

function animateValue(from, to, duration, onUpdate, onComplete) {
    const start = performance.now();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
        onUpdate(to);
        onComplete?.();
        return;
    }

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = from + (to - from) * easeOut(progress);
        onUpdate(value);
        if (progress < 1) requestAnimationFrame(tick);
        else onComplete?.();
    }
    requestAnimationFrame(tick);
}
```

---

## Countdown Flip Animation

Animación de números para el contador de la invitación.

```js
// Flip suave de dígito (CSS + JS coordinado)
function flipNumber(element, newValue) {
    const current = element.textContent;
    if (current === String(newValue).padStart(2, '0')) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
        element.textContent = String(newValue).padStart(2, '0');
        return;
    }

    // Animación de salida
    element.animate(
        [
            { opacity: 1, transform: 'translateY(0) rotateX(0deg)' },
            { opacity: 0, transform: 'translateY(-20px) rotateX(30deg)' }
        ],
        { duration: 200, easing: 'ease-in', fill: 'forwards' }
    ).finished.then(() => {
        element.textContent = String(newValue).padStart(2, '0');
        // Animación de entrada
        element.animate(
            [
                { opacity: 0, transform: 'translateY(20px) rotateX(-30deg)' },
                { opacity: 1, transform: 'translateY(0) rotateX(0deg)' }
            ],
            { duration: 250, easing: 'ease-out', fill: 'forwards' }
        );
    });
}

// Integrar con el countdown existente del proyecto
function updateCountdownAnimated() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    flipNumber(document.getElementById('days'),    days);
    flipNumber(document.getElementById('hours'),   hours);
    flipNumber(document.getElementById('minutes'), minutes);
    flipNumber(document.getElementById('seconds'), seconds);
}
```

---

## Scroll-Linked Animations (rAF)

Animar basado en posición de scroll sin scroll events costosos.

```js
// Parallax real con rAF (no scroll event directo)
function initParallax(selector, speed = 0.3) {
    const elements = document.querySelectorAll(selector);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !elements.length) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    function update() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const offset = (window.scrollY - el.offsetTop) * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
}

// Opacidad ligada a scroll (fade-out al salir de sección)
function initScrollFade(element, options = {}) {
    const { fadeStart = 0.6, fadeEnd = 1.0 } = options;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = 1 - (rect.top / viewH);
            const opacity = progress < fadeStart ? 1
                : progress > fadeEnd ? 0
                : 1 - ((progress - fadeStart) / (fadeEnd - fadeStart));
            element.style.opacity = Math.max(0, Math.min(1, opacity));
            ticking = false;
        });
        ticking = true;
    }, { passive: true });
}
```

---

## Timeline Coordinada (sin librerías)

Secuenciar animaciones complejas con promises.

```js
// Encadenar animaciones en secuencia
async function runSequence(steps) {
    for (const step of steps) {
        await step();
    }
}

// Ejecutar animaciones en paralelo
async function runParallel(steps) {
    await Promise.all(steps.map(step => step()));
}

// Ejemplo: animación de entrada de sección cover
async function animateCoverEntrance() {
    const title    = document.querySelector('.cover h1');
    const subtitle = document.querySelector('.cover .section-subtitle');
    const divider  = document.querySelector('.cover .section-divider');

    await runSequence([
        // 1. Título entra
        () => title.animate(
            [{ opacity: 0, transform: 'translateY(30px)' },
             { opacity: 1, transform: 'translateY(0)' }],
            { duration: 600, easing: 'ease-out', fill: 'forwards' }
        ).finished,

        // 2. Subtítulo entra (con pequeño overlap)
        () => new Promise(resolve => {
            setTimeout(() => {
                subtitle.animate(
                    [{ opacity: 0 }, { opacity: 1 }],
                    { duration: 400, fill: 'forwards' }
                ).finished.then(resolve);
            }, 100);
        }),

        // 3. Divisor aparece
        () => divider.animate(
            [{ opacity: 0, transform: 'scaleX(0)' },
             { opacity: 1, transform: 'scaleX(1)' }],
            { duration: 400, easing: 'ease-out', fill: 'forwards' }
        ).finished
    ]);
}
```

---

## Accesibilidad (obligatorio)

```js
// Helper reutilizable
const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wrapper seguro para cualquier animación
function safeAnimate(element, keyframes, options) {
    if (prefersReducedMotion()) {
        // Aplicar estado final directamente
        const finalFrame = keyframes[keyframes.length - 1];
        Object.assign(element.style, finalFrame);
        return Promise.resolve();
    }
    return element.animate(keyframes, options).finished;
}
```
