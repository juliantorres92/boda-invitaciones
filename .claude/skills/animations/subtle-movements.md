# Subtle Movements - Invitación de Boda

Movimientos sutiles apropiados para bodas.

## Durations Recomendadas

```css
/* Muy rápido (hover, clicks) */
--duration-quick: 200ms;

/* Rápido (transiciones simples) */
--duration-fast: 300ms;

/* Normal (fade-in, slide-up) */
--duration-normal: 500ms;

/* Lento (animaciones elaboradas) */
--duration-slow: 800ms;

/* Muy lento (animaciones infinitas sutiles) */
--duration-gentle: 2000ms;
```

## Animaciones Apropiadas

### Fade In (Entrada de Sección)
```css
.section {
    animation: fadeIn 500ms ease-out;
}
```

### Slide Up Sutil (Texto)
```css
.text {
    animation: slideUp 600ms ease-out;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### Scale Sutil (Hover Botón)
```css
.btn:hover {
    transform: scale(1.02);
    transition: transform 300ms ease-out;
}
```

### Float Gentle (Decoración)
```css
.decoration {
    animation: floatGentle 3s ease-in-out infinite;
}

@keyframes floatGentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}
```

## Animaciones INAPROPIADAS

### ❌ NO Usar

**Bounce Exagerado**:
```css
/* ❌ Muy juguetón para bodas */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-50px); }
}
```

**Spin Rápido**:
```css
/* ❌ Mareante */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

**Shake**:
```css
/* ❌ Agresivo */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
```

## Hover States Elegantes

### Botón WhatsApp
```css
.whatsapp-btn {
    transition: transform 0.3s ease-out,
                box-shadow 0.3s ease-out;
}

.whatsapp-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 123, 89, 0.3);
}

.whatsapp-btn:active {
    transform: translateY(0);
}
```

### Map Link
```css
.map-link {
    transition: color 0.3s ease,
                border-color 0.3s ease,
                transform 0.3s ease;
}

.map-link:hover {
    color: var(--white);
    background: var(--accent-color);
    border-color: var(--accent-color);
    transform: translateY(-1px);
}
```

## Touch Feedback (Móvil)
```css
.btn:active {
    transform: scale(0.98);
}

@media (hover: none) and (pointer: coarse) {
    .btn:active {
        background: var(--primary-color);
    }
}
```

## Checklist de Sutileza

- [ ] Movimiento ≤30px (translate)
- [ ] Escala ≤1.05 (scale)
- [ ] Duration 300-600ms
- [ ] Easing suave (ease-out)
- [ ] No múltiples animaciones simultáneas

---

Menos es más. Elegancia sobre espectacularidad.
