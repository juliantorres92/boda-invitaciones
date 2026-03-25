# CSS Animations - Invitación de Boda

Biblioteca de animaciones reutilizables.

## Fade In

```css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
```

## Slide Up

```css
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.slide-up {
    animation: slideUp 0.6s ease-out forwards;
}
```

## Scale In

```css
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.scale-in {
    animation: scaleIn 0.5s ease-out forwards;
}
```

## Pulse Sutil (Infinito)

```css
@keyframes pulseSubtle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.05);
    }
}

.pulse-subtle {
    animation: pulseSubtle 2s ease-in-out infinite;
}
```

## Float Gentle (Decoraciones)

```css
@keyframes floatGentle {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-8px);
    }
}

.float-gentle {
    animation: floatGentle 3s ease-in-out infinite;
}
```

## Stagger Fade In (Listas)

```css
.stagger-container .item {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.5s ease-out forwards;
}

.stagger-container .item:nth-child(1) { animation-delay: 0s; }
.stagger-container .item:nth-child(2) { animation-delay: 0.15s; }
.stagger-container .item:nth-child(3) { animation-delay: 0.3s; }
.stagger-container .item:nth-child(4) { animation-delay: 0.45s; }
```

## Timing Functions Elegantes

```css
/* Suave entrada y salida */
.ease-custom {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Entrada suave */
.ease-in-custom {
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}

/* Salida suave */
.ease-out-custom {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
```

## Hover States

```css
.btn {
    transition: transform 0.3s ease-out,
                box-shadow 0.3s ease-out;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 123, 89, 0.3);
}

.btn:active {
    transform: translateY(0);
}
```

## Accesibilidad

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Ejemplo Completo: Families Section

```css
.families .family {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out,
                transform 0.5s ease-out;
}

.families.visible .family {
    opacity: 1;
    transform: translateY(0);
}

.families.visible .family:nth-child(1) { transition-delay: 0s; }
.families.visible .family:nth-child(2) { transition-delay: 0.15s; }
.families.visible .family:nth-child(3) { transition-delay: 0.3s; }

@media (prefers-reduced-motion: reduce) {
    .families .family {
        transition-duration: 0.01ms;
    }
}
```

---

Usa estas animaciones como base, no reinventes.
