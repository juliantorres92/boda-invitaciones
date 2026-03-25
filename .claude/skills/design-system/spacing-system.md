# Sistema de Espaci

ado - Invitación de Boda

Sistema de espaciado base 8px para mantener consistencia visual.

## Escala Base 8px

```css
/* Escala de espaciado */
--spacing-xs: 4px;    /* 0.25rem */
--spacing-sm: 8px;    /* 0.5rem */
--spacing-md: 16px;   /* 1rem */
--spacing-lg: 24px;   /* 1.5rem */
--spacing-xl: 32px;   /* 2rem */
--spacing-2xl: 48px;  /* 3rem */
--spacing-3xl: 64px;  /* 4rem */
--spacing-4xl: 96px;  /* 6rem */
```

## Reglas de Padding por Tipo de Sección

### Sección Estándar (Cover, Welcome, etc.)
```css
section {
    padding: var(--spacing-3xl) var(--spacing-lg); /* 64px 24px */
}

@media (max-width: 600px) {
    section {
        padding: var(--spacing-2xl) var(--spacing-md); /* 48px 16px */
    }
}
```

### Sección con Imagen de Fondo
```css
.section-with-bg {
    padding: var(--spacing-4xl) var(--spacing-xl); /* 96px 32px - más espacio */
}

@media (max-width: 600px) {
    .section-with-bg {
        padding: var(--spacing-3xl) var(--spacing-lg); /* 64px 24px */
    }
}
```

## Margin entre Elementos

### Títulos
```css
.section-title {
    margin-bottom: var(--spacing-xl); /* 32px */
}

.section-subtitle {
    margin-bottom: var(--spacing-md); /* 16px */
}

.section-text {
    margin-top: var(--spacing-md); /* 16px */
    margin-bottom: var(--spacing-md);
}
```

### Grupos de Elementos (Families, Events)
```css
.family, .event-details {
    margin-bottom: var(--spacing-2xl); /* 48px entre grupos */
}

.family:last-child, .event-details:last-child {
    margin-bottom: 0;
}
```

## Gap en Flex/Grid

### Grid de 2 Columnas (Desktop)
```css
.grid-2-cols {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xl); /* 32px */
}

@media (max-width: 600px) {
    .grid-2-cols {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg); /* 24px */
    }
}
```

### Flex Row (Botones, íconos)
```css
.flex-row {
    display: flex;
    gap: var(--spacing-md); /* 16px */
}
```

## Divisor de Sección

```css
.section-divider {
    position: absolute;
    bottom: var(--spacing-2xl); /* 48px desde abajo */
    left: 50%;
    transform: translateX(-50%);
}

@media (max-width: 600px) {
    .section-divider {
        bottom: var(--spacing-xl); /* 32px desde abajo */
    }
}
```

## Decoraciones SVG

### Esquinas
```css
.decoration-corner {
    position: absolute;
    width: clamp(80px, 15vw, 150px);
    height: auto;
    opacity: 0.4;
}

.decoration-corner.top-left {
    top: var(--spacing-xl); /* 32px */
    left: var(--spacing-xl);
}

.decoration-corner.top-right {
    top: var(--spacing-xl);
    right: var(--spacing-xl);
}

@media (max-width: 600px) {
    .decoration-corner {
        width: clamp(60px, 12vw, 100px);
    }
    
    .decoration-corner.top-left,
    .decoration-corner.top-right {
        top: var(--spacing-md); /* 16px en móvil */
        left: var(--spacing-md);
        right: var(--spacing-md);
    }
}
```

## Sistema de Grid (12 columnas)

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg); /* 24px */
}

.grid-12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--spacing-lg); /* 24px */
}

/* Clases de columnas */
.col-6 {
    grid-column: span 6; /* 50% */
}

.col-4 {
    grid-column: span 4; /* 33.33% */
}

.col-3 {
    grid-column: span 3; /* 25% */
}

@media (max-width: 600px) {
    .grid-12 {
        grid-template-columns: 1fr;
    }
    
    .col-6, .col-4, .col-3 {
        grid-column: span 1; /* 100% en móvil */
    }
}
```

## Espaciado en Botones

```css
.btn {
    padding: var(--spacing-md) var(--spacing-xl); /* 16px 32px */
    margin-top: var(--spacing-lg); /* 24px */
}

.btn-large {
    padding: var(--spacing-lg) var(--spacing-2xl); /* 24px 48px */
}

.btn-small {
    padding: var(--spacing-sm) var(--spacing-md); /* 8px 16px */
}
```

## Ejemplos Prácticos

### Sección Cover con Decoración
```css
.cover {
    padding: var(--spacing-4xl) var(--spacing-xl); /* 96px 32px */
    position: relative;
}

.cover .decoration-top {
    position: absolute;
    top: var(--spacing-xl); /* 32px */
    left: var(--spacing-xl);
    width: 120px;
    opacity: 0.35;
}

.cover .section-title {
    margin-bottom: var(--spacing-2xl); /* 48px */
}

.cover .section-divider {
    bottom: var(--spacing-2xl); /* 48px */
}
```

### Sección Families con Cards
```css
.families {
    padding: var(--spacing-3xl) var(--spacing-lg); /* 64px 24px */
}

.family {
    padding: var(--spacing-xl); /* 32px interior */
    margin-bottom: var(--spacing-2xl); /* 48px entre cards */
    border-radius: var(--spacing-md); /* 16px */
}

.family .section-subtitle {
    margin-bottom: var(--spacing-md); /* 16px */
}

.family .section-text {
    margin-top: var(--spacing-sm); /* 8px */
}
```

## Checklist de Espaciado

Antes de aprobar un diseño:

- [ ] Todos los espaciados usan variables (--spacing-*)
- [ ] Padding de sección mínimo 48px móvil, 64px desktop
- [ ] Margin entre elementos múltiplo de 8px
- [ ] Divisor de sección a 32-48px desde abajo
- [ ] Decoraciones a mínimo 16px de los bordes
- [ ] Grid gaps consistentes (16-32px)
- [ ] Responsive: espaciados reducidos en móvil

---

Usa este sistema en TODAS las secciones para mantener coherencia visual.
