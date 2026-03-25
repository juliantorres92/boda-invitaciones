# CSS Backgrounds - Invitación de Boda

Patrón estándar para implementar backgrounds sin pisar textos.

## Patrón Overlay Estándar (USAR SIEMPRE)

```css
.section-name {
    position: relative;
    background-image: url('../assets/images/backgrounds/section-name.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.section-name::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 254, 249, 0.85); /* Overlay */
    z-index: 1;
}

.section-name > * {
    position: relative;
    z-index: 2; /* Contenido SIEMPRE encima */
}
```

## Background Positions

```css
/* Center (default) */
background-position: center;

/* Top para mostrar parte superior */
background-position: center top;

/* Custom */
background-position: 60% 40%;
```

## Background Size

```css
/* Cover (más común) */
background-size: cover;

/* Contain (imagen completa visible) */
background-size: contain;

/* Custom */
background-size: 100% auto;
```

## Object-Fit para <img>

```html
<div class="image-container">
    <img src="flower.webp" alt="Flores">
</div>
```

```css
.image-container {
    width: 300px;
    height: 200px;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cubre sin deformar */
    object-position: center;
}
```

## Gradientes Decorativos

```css
/* Gradiente lineal vertical */
.gradient-vertical {
    background: linear-gradient(
        to bottom,
        var(--rosa-suave) 0%,
        var(--white) 100%
    );
}

/* Gradiente radial (centro más claro) */
.gradient-radial {
    background: radial-gradient(
        circle at center,
        var(--white) 0%,
        var(--beige) 100%
    );
}
```

## Parallax Sutil

```css
.parallax-bg {
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}

@media (max-width: 600px) {
    .parallax-bg {
        background-attachment: scroll; /* Mejor performance móvil */
    }
}
```

## Ejemplos Completos

### Cover con Fondo Floral

```css
.cover {
    position: relative;
    min-height: 100vh;
    background-image: url('../assets/images/backgrounds/cover-bg.webp');
    background-size: cover;
    background-position: center;
}

.cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 254, 249, 0.80);
    z-index: 1;
}

.cover-content {
    position: relative;
    z-index: 2;
}
```

### Ceremony con Textura

```css
.ceremony {
    background-color: var(--crema-papel);
    background-image: url('../assets/images/textures/paper-texture.webp');
    background-blend-mode: multiply;
    opacity: 0.15;
}
```

## Checklist

- [ ] Position: relative en contenedor
- [ ] Background-size: cover
- [ ] Overlay con ::before (z-index: 1)
- [ ] Contenido con z-index: 2
- [ ] Contraste verificado (mínimo 4.5:1)

---

Usa este patrón en TODAS las secciones con background.
