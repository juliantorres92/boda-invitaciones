---
name: boda-dev
description: Convenciones de desarrollo frontend para la invitación de boda de Julian & Yessica. Usar cuando se modifiquen estilos CSS, contenido HTML o funcionalidad JavaScript del proyecto.
---

# Skill: Desarrollo Frontend - Invitación de Boda

Convenciones y patrones de desarrollo para el proyecto de invitación digital de boda.

## Información del Proyecto

- **Evento**: Boda de Julian & Yessica
- **Fecha**: 02 de Mayo de 2026
- **Ceremonia**: Parroquia Santa María de la Paz, 4:00 PM
- **Recepción**: Casa Carmelo, 6:00 PM
- **URL**: https://juliantorres92.github.io/boda-invitaciones
- **WhatsApp**: 573013092189

## Paleta de Colores (Variables CSS)

```css
--beige: #F5F0E6
--avena: #E8DFD0
--verde-oliva: #6B7B59
--blanco-crema: #FDFBF7
--primary-color: #3f4f22
--accent-color: #556b2f
--text-color: #8a7f6a
--white: #FDFBF7
```

## Tipografías

```css
--font-title: 'Playfair Display', Georgia, serif
--font-subtitle: 'Cinzel', serif
--font-text: 'Montserrat', Arial, sans-serif
--text-size: clamp(0.85rem, 3vw, 1.25rem)
```

**Uso:**
- **Títulos principales**: `.section-title` (Playfair Display)
- **Subtítulos**: `.section-subtitle` (Cinzel)
- **Texto de cuerpo**: `.section-text` (Montserrat)

## Clases CSS Principales

### Secciones

```css
.section-title       /* Títulos de sección, uppercase, 2-4rem */
.section-subtitle    /* Subtítulos, uppercase, 1-1.8rem */
.section-text        /* Texto de cuerpo, tamaño responsivo */
.section-intro       /* Texto introductorio en cursiva */
.section-divider     /* Divisor con 3 puntos al final de sección */
```

### Animaciones

```css
.animate-on-scroll   /* Aplica fade-in al hacer scroll */
.visible             /* Estado visible después de animación */
```

### Componentes Específicos

```css
.countdown-timer     /* Contador regresivo */
.time-unit           /* Unidad de tiempo (días, horas, etc.) */
.whatsapp-btn        /* Botón de confirmación WhatsApp */
.map-link            /* Enlaces a ubicaciones */
```

## Responsive Design

- Usa `clamp()` para tipografía responsiva
- Breakpoint principal: `@media (max-width: 600px)`
- Viewport units: `vh`, `svh`, `dvh` para altura completa
- Safe area insets: `env(safe-area-inset-left/right)`

## Estructura HTML

Cada sección sigue este patrón:

```html
<section class="nombre-seccion animate-on-scroll">
    <h2 class="section-title">Título</h2>
    <p class="section-subtitle">Subtítulo</p>
    <p class="section-text">Texto de contenido</p>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

## JavaScript

### Funciones Principales

- `loadGuestData()`: Carga datos del invitado desde guests.json usando parámetro URL `?f=ID`
- `setupWhatsappLink(guest)`: Configura enlace de confirmación por WhatsApp
- `updateCountdown()`: Actualiza el countdown cada segundo
- `initAnimations()`: Configura IntersectionObserver para animaciones
- `initScrollProgress()`: Barra de progreso de scroll

### Constantes

```javascript
const WEDDING_DATE = new Date('2026-05-02T16:00:00');
const PHONE_NUMBER = '573013092189';
```

## Archivos de Soporte

Para detalles completos sobre convenciones específicas:

- **[css-conventions.md](css-conventions.md)** - Variables CSS completas, clases, responsive design
- **[html-structure.md](html-structure.md)** - Estructura de secciones, patrones de eventos, guests.json
- **[js-patterns.md](js-patterns.md)** - Countdown, animaciones, manejo de invitados

## Principios de Desarrollo

1. **Consistencia visual**: Mantener paleta de colores y tipografías
2. **Responsive first**: Todo debe funcionar en móviles
3. **Animaciones suaves**: Usar `transition` y `will-change` apropiadamente
4. **Scroll-snap**: Secciones de altura completa con snap
5. **Accesibilidad**: Mantener contraste de colores adecuado

## Validaciones Sugeridas

- Verificar que `guests.json` sea válido JSON
- Probar en diferentes tamaños de pantalla (móvil, tablet, desktop)
- Verificar enlaces de WhatsApp y mapas
- Comprobar countdown funciona correctamente
- Validar que animaciones no afecten rendimiento
