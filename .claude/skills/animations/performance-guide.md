# Performance Guide - Animations

Guía para mantener 60fps en todas las animaciones.

## Objetivo: 60fps = 16.67ms por frame

## Propiedades por Performance

### ✅ Performantes (GPU accelerated)
```css
transform: translate()
transform: scale()
transform: rotate()
opacity
filter (con moderación)
```

### ❌ NO Performantes (causan reflow/repaint)
```css
width, height
top, left, right, bottom
margin, padding
font-size
```

## Will-Change

**Cuándo usar**:
```css
.element-will-animate {
    will-change: transform, opacity;
}

.element-will-animate:hover {
    transform: scale(1.05);
}
```

**Cuándo NO usar**:
```css
/* ❌ NO - Todo el tiempo */
* {
    will-change: transform;
}

/* ✅ SÍ - Solo cuando va a animar */
.btn:hover {
    will-change: transform;
}
```

## Debugging Performance

### Chrome DevTools

1. Abrir DevTools → Performance
2. Click Record
3. Hacer scroll/interactuar
4. Stop recording
5. Buscar:
   - FPS graph (debe ser ~60fps)
   - Layout/Paint events (minimizar)

### FPS Monitor en Código

```javascript
let lastTime = performance.now();
let fps = 60;

function measureFPS() {
    const now = performance.now();
    fps = 1000 / (now - lastTime);
    lastTime = now;
    
    if (fps < 55) {
        console.warn(`Low FPS: ${fps.toFixed(1)}`);
    }
    
    requestAnimationFrame(measureFPS);
}

measureFPS();
```

## Optimizaciones Específicas

### Usar requestAnimationFrame

```javascript
// ❌ NO - setTimeout
setTimeout(() => {
    element.style.transform = 'translateX(100px)';
}, 16);

// ✅ SÍ - requestAnimationFrame
requestAnimationFrame(() => {
    element.style.transform = 'translateX(100px)';
});
```

### Batch DOM Reads/Writes

```javascript
// ❌ NO - Read/Write alternado
el1.style.height = el1.offsetHeight + 10 + 'px'; // Read + Write
el2.style.height = el2.offsetHeight + 10 + 'px'; // Read + Write

// ✅ SÍ - Batch reads, luego writes
const height1 = el1.offsetHeight; // Read
const height2 = el2.offsetHeight; // Read
el1.style.height = height1 + 10 + 'px'; // Write
el2.style.height = height2 + 10 + 'px'; // Write
```

## Checklist de Performance

- [ ] Solo anima transform/opacity
- [ ] will-change usado apropiadamente
- [ ] Probado en Chrome DevTools (60fps)
- [ ] Probado en móvil (iPhone/Android)
- [ ] requestAnimationFrame para JS animations
- [ ] Batch DOM operations

---

Performance NO es negociable. 60fps o no shipear.
