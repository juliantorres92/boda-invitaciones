# Scroll Animations - Invitación de Boda

Animaciones on-scroll con IntersectionObserver.

## Patrón Existente del Proyecto

```javascript
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
```

## Thresholds Apropiados

```javascript
// 10% visible (más rápido)
threshold: 0.1

// 30% visible (balanceado)
threshold: 0.3

// 50% visible (más conservador)
threshold: 0.5
```

## Root Margin

```javascript
// Trigger 100px antes de entrar
rootMargin: '100px 0px 0px 0px'

// Trigger cuando está completamente en viewport
rootMargin: '0px'
```

## Animación Escalonada

```javascript
const observerStagger = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150); // 150ms delay entre items
            });
        }
    });
}, { threshold: 0.2 });
```

## Parallax Sutil

```javascript
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});
```

## CSS Correspondiente

```css
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out,
                transform 0.6s ease-out;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}
```

## Ejemplo: Countdown con Animación

```javascript
const countdownObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Iniciar animación de números
            animateCountdown();
        }
    });
}, { threshold: 0.5 });

countdownObserver.observe(document.querySelector('.countdown'));
```

---

Usa IntersectionObserver, NO scroll events directos.
