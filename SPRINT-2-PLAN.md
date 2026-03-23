# Sprint 2: Design Hero — Plan de Implementación

**Rama principal**: `sprint/2-design-hero`
**Objetivo**: Mejorar el diseño visual de las secciones 1 (Cover) y 2 (Welcome)
**Fecha inicio**: 20 de Marzo de 2026
**Fecha fin estimada**: 27 de Marzo de 2026
**Estado**: ⬜ PENDIENTE

---

## Estructura de ramas

```
main
  └── sprint/2-design-hero
        ├── hu/4-cover-background
        ├── hu/5-cover-typography
        ├── hu/6-cover-animations
        └── hu/7-welcome-redesign
```

## Setup inicial

```bash
git checkout main
git checkout -b sprint/2-design-hero
```

---

## HU-4: Background visual Cover

**Rama**: `hu/4-cover-background`
**Archivos**: `styles.css`
**Asset**: `assets/images/backgrounds/cover-bg.webp` (ya está en el proyecto, 129KB)

### Pasos

```bash
git checkout sprint/2-design-hero
git checkout -b hu/4-cover-background
```

### Cambios en `styles.css`

Buscar el bloque `.cover { ... }` y reemplazar/ampliar con:

```css
.cover {
    position: relative;
    background-image: url('assets/images/backgrounds/cover-bg.webp');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    /* mantener el resto de propiedades existentes */
}

.cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at center,
        rgba(63, 79, 34, 0.20) 0%,
        rgba(63, 79, 34, 0.55) 100%
    );
    z-index: 1;
}

.cover-content {
    position: relative;
    z-index: 2;
}

.cover .section-divider {
    position: relative;
    z-index: 2;
}
```

### Commit

```bash
git add styles.css
git commit -m "feat(css): agregar imagen floral como fondo sección cover con overlay"
git checkout sprint/2-design-hero
git merge hu/4-cover-background
```

---

## HU-5: Tipografía y jerarquía visual Cover

**Rama**: `hu/5-cover-typography`
**Archivos**: `styles.css`

### Pasos

```bash
git checkout sprint/2-design-hero
git checkout -b hu/5-cover-typography
```

### Cambios en `styles.css`

Agregar bloque de overrides específicos para `.cover` (NO modificar estilos globales):

```css
/* ===== COVER — Tipografía ===== */

.cover .section-title {
    font-family: var(--font-title); /* Cinzel */
    color: var(--white);
    letter-spacing: 3px;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    font-size: clamp(2rem, 8vw, 3.5rem);
}

.cover .section-subtitle {
    font-family: var(--font-subtitle); /* Cormorant Garamond */
    font-style: italic;
    color: var(--white);
    opacity: 0.92;
    letter-spacing: 1.5px;
    font-size: clamp(1.2rem, 5vw, 2rem);
}

.cover .date {
    font-family: var(--font-text); /* Montserrat */
    color: var(--white);
    letter-spacing: 5px;
    text-transform: uppercase;
    opacity: 0.85;
    font-size: clamp(0.75rem, 3vw, 1rem);
    font-weight: 500;
}

.cover .section-divider span {
    background: var(--white);
    opacity: 0.5;
}
```

### Commit

```bash
git add styles.css
git commit -m "style(css): mejorar tipografía y jerarquía visual sección cover"
git checkout sprint/2-design-hero
git merge hu/5-cover-typography
```

---

## HU-6: Animaciones de entrada Cover

**Rama**: `hu/6-cover-animations`
**Archivos**: `styles.css`

### Pasos

```bash
git checkout sprint/2-design-hero
git checkout -b hu/6-cover-animations
```

### Cambios en `styles.css`

1. Verificar si ya existen `@keyframes fadeInDown`, `fadeInUp`, `fadeIn`. Si no existen, agregar:

```css
/* ===== KEYFRAMES — Animaciones de entrada ===== */

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-24px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}
```

2. Agregar animaciones escalonadas para los elementos del cover:

```css
/* ===== COVER — Animaciones de entrada ===== */

.cover .section-title,
.cover .section-subtitle,
.cover .date,
.cover .section-divider {
    opacity: 0;
    animation-fill-mode: forwards;
}

.cover .section-title {
    animation: fadeInDown 1s ease 0.3s forwards;
}

.cover .section-subtitle {
    animation: fadeIn 1s ease 0.8s forwards;
}

.cover .date {
    animation: fadeInUp 1s ease 1.2s forwards;
}

.cover .section-divider {
    animation: fadeIn 1s ease 1.6s forwards;
}
```

3. Respetar `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
    .cover .section-title,
    .cover .section-subtitle,
    .cover .date,
    .cover .section-divider {
        animation: none;
        opacity: 1;
    }
}
```

### Commit

```bash
git add styles.css
git commit -m "feat(css): agregar animaciones de entrada escalonadas en sección cover"
git checkout sprint/2-design-hero
git merge hu/6-cover-animations
```

---

## HU-7: Rediseño visual sección Welcome

**Rama**: `hu/7-welcome-redesign`
**Archivos**: `index.html`, `styles.css`

### Pasos

```bash
git checkout sprint/2-design-hero
git checkout -b hu/7-welcome-redesign
```

### Cambios en `index.html`

Buscar la sección `.welcome` y agregar el ornamento decorativo antes del `guest-name`:

**Antes:**
```html
<section class="welcome animate-on-scroll">
    <p class="guest-name section-title" id="guestName">Estimado invitado</p>
```

**Después:**
```html
<section class="welcome animate-on-scroll">
    <div class="welcome-ornament" aria-hidden="true">
        <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="12" x2="30" y2="12" stroke="currentColor" stroke-width="1" opacity="0.4"/>
            <circle cx="36" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            <circle cx="40" cy="12" r="3.5" fill="currentColor" opacity="0.7"/>
            <circle cx="44" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            <line x1="50" y1="12" x2="80" y2="12" stroke="currentColor" stroke-width="1" opacity="0.4"/>
        </svg>
    </div>
    <p class="guest-name section-title" id="guestName">Estimado invitado</p>
```

### Cambios en `styles.css`

Agregar overrides específicos para `.welcome` (sin tocar estilos globales):

```css
/* ===== WELCOME — Rediseño ===== */

.welcome-ornament {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: var(--accent-color);
}

.welcome .guest-name {
    font-family: var(--font-title); /* Cinzel */
    letter-spacing: 1.5px;
    color: var(--primary-color);
    font-size: clamp(1.6rem, 6vw, 2.8rem);
    margin-bottom: 1.2rem;
}

.welcome .section-intro {
    font-family: var(--font-subtitle); /* Cormorant Garamond */
    font-style: italic;
    color: var(--secondary-color);
    line-height: 1.7;
    opacity: 0.92;
    font-size: clamp(1rem, 4vw, 1.5rem);
    max-width: 480px;
    margin: 0 auto;
}

.welcome .cupos-info {
    display: inline-block;
    margin-top: 1.2rem;
    padding: 0.4rem 1.2rem;
    background: var(--beige);
    border: 1px solid rgba(85, 107, 47, 0.25);
    border-radius: 20px;
    font-family: var(--font-text);
    font-size: clamp(0.8rem, 3vw, 0.95rem);
    color: var(--primary-color);
    font-weight: 500;
    min-height: 0; /* colapsa si está vacío */
}

.welcome .cupos-info:empty {
    display: none;
}
```

### Commit

```bash
git add index.html styles.css
git commit -m "style(html,css): rediseñar sección welcome con ornamento y mejores estilos"
git checkout sprint/2-design-hero
git merge hu/7-welcome-redesign
```

---

## Documentación final del sprint

```bash
# Actualizar BACKLOG.md:
# - Sprint 2 Estado: 🔄 EN PROGRESO
# - HU-4, HU-5, HU-6, HU-7: ✅ DONE
# - Fecha inicio: 20 de Marzo de 2026

git add BACKLOG.md
git commit -m "docs(backlog): marcar HU-4 a HU-7 Sprint 2 como completadas"
```

---

## Checklist de QA antes de mergear a main

- [ ] La imagen de fondo cubre toda la sección cover sin desbordarse
- [ ] El texto "Julian & Yessica" es legible sobre el fondo floral
- [ ] Las animaciones de entrada funcionan al cargar la página
- [ ] En móvil (375px) el texto no se superpone a las flores
- [ ] La sección welcome muestra el ornamento SVG correctamente
- [ ] El nombre del invitado se renderiza con la fuente Cinzel
- [ ] `cupos-info` vacío no muestra el badge
- [ ] Animaciones respetan `prefers-reduced-motion`

---

## NO hacer merge a main sin visto bueno del usuario
