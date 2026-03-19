# 📋 BACKLOG - Invitación de Boda Digital

**Proyecto**: Invitación de Boda Julian & Yessica  
**Fecha del Evento**: 02 de Mayo de 2026  
**Última Actualización**: 19 de Marzo de 2026  
**Metodología**: Agile - Sprints con HUs (Historias de Usuario)

---

## 📊 Resumen Ejecutivo

| Estado | Cantidad | Descripción |
|:-------|:---------|:------------|
| 🔄 En Progreso | 0 | HUs actualmente en desarrollo |
| ⬜ TODO | 23 | HUs pendientes |
| ✅ Completadas | 0 | HUs finalizadas |
| **TOTAL** | **23** | Issues identificados |

### Progreso por Prioridad

| Prioridad | Cantidad | Completadas | Pendientes |
|:----------|:---------|:------------|:-----------|
| 🔴 Crítica | 4 | 0 | 4 |
| 🟡 Alta | 5 | 0 | 5 |
| 🟠 Media | 8 | 0 | 8 |
| 🟢 Baja | 6 | 0 | 6 |

---

## 🏃 SPRINT 1: FOUNDATION

> **Rama**: `sprint/1-foundation`  
> **Objetivo**: Establecer base sólida - Corregir errores críticos y seguridad  
> **Fecha inicio**: 19 de Marzo de 2026  
> **Fecha fin estimada**: 19 de Marzo de 2026  
> **Estado**: 🔄 EN PROGRESO  
> **HUs**: 3 historias de usuario (4 issues agrupados)

### Convenciones de Commits
```
Formato: <tipo>(<alcance>): <descripción>
Tipos: fix, feat, security, style, refactor, docs, chore
```

### HU-1: Corregir Errores de Sintaxis CSS

> **Rama**: `hu/1-fix-css-errors`  
> **Issues**: #1 + #2  
> **Prioridad**: 🔴 CRÍTICA  
> **Estado**: ✅ DONE  
> **Archivos**: `styles.css`  
> **Estimación**: 7 min  
> **Tiempo real**: 5 min  
> **Asignado a**: Claude (Agent)  
> **Fecha completado**: 19 de Marzo de 2026  
> **Commit**: `748782a`

---

#### Issue #1: Error de Sintaxis CSS (Línea 150-152)
- **Archivos**: `styles.css`
- **Línea**: 150-152

**Descripción**:
Existe código CSS huérfano que rompe la sintaxis:
```css
/* PROBLEMA ACTUAL */
.welcome .section-intro {
    /* ... */
    margin-bottom: 1rem;
}
    opacity: 0.85;  /* ← LÍNEA HUÉRFANA */
}
```

**Solución**:
```css
.welcome .section-intro {
    font-family: var(--font-subtitle);
    font-size: clamp(1rem, 4vw, 1.8rem);
    font-weight: 600;
    font-style: normal;
    color: var(--accent-color);
    margin-bottom: 1rem;
    opacity: 0.85;
}
```

**Criterios de Aceptación**:
- [ ] CSS válido sin errores de sintaxis
- [ ] Opacity aplicada correctamente al selector
- [ ] Validar con herramienta de linting CSS

---

#### Issue #2: Llave de Cierre Extra (Línea 272)
- **Archivos**: `styles.css`
- **Línea**: 272

**Descripción Conjunta HU-1**:
Ambos issues son errores de sintaxis CSS que rompen el archivo de estilos.

**Solución**:
1. Mover `opacity: 0.85;` dentro del selector `.welcome .section-intro`
2. Eliminar llave extra en línea 272

**Criterios de Aceptación HU-1**:
- [ ] CSS válido sin errores de sintaxis
- [ ] Opacity aplicada correctamente al selector
- [ ] Llave extra eliminada
- [ ] Validar con linter CSS

---

### HU-2: Agregar Seguridad a Enlaces Externos

> **Rama**: `hu/2-secure-external-links`  
> **Issue**: #3  
> **Prioridad**: 🔴 CRÍTICA  
> **Estado**: ⬜ TODO  
> **Archivos**: `index.html`  
> **Estimación**: 10 min  
> **Asignado a**: Claude (Agent)

---

#### Issue #3: Seguridad en Enlaces Externos
- **Prioridad**: 🔴 CRÍTICA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`
- **Líneas**: 63, 80, 114
- **Asignado a**: -
- **Estimación**: 10 min

**Descripción**:
Enlaces con `target="_blank"` sin `rel="noopener noreferrer"` son vulnerables a ataques de tabnabbing.

**Solución**:
```html
<!-- Línea 63 -->
<a href="https://maps.app.goo.gl/47BLqJi5N9GzJrqaA" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="map-link">Ver ubicación</a>

<!-- Línea 80 -->
<a href="https://maps.google.com/?q=Casa+Carmelo+eventos" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="map-link">Ver ubicación</a>

<!-- Línea 114 -->
<a href="#" 
   class="whatsapp-btn" 
   id="whatsappBtn" 
   target="_blank" 
   rel="noopener noreferrer">
```

**Criterios de Aceptación**:
- [ ] Todos los enlaces externos tienen `rel="noopener noreferrer"`
- [ ] Sin vulnerabilidades de seguridad

---

### HU-3: Crear e Implementar Favicon

> **Rama**: `hu/3-add-favicon`  
> **Issue**: #4  
> **Prioridad**: 🔴 CRÍTICA  
> **Estado**: ⬜ TODO  
> **Archivos**: `index.html`, crear directorio `assets/` con imágenes  
> **Estimación**: 45 min  
> **Asignado a**: Claude (Agent)

---

#### Issue #4: Agregar Favicon

**Descripción**:
El sitio no tiene favicon, afectando la profesionalidad y branding.

**Diseño seleccionado**: Iniciales "J&Y" en círculo verde oliva

**Solución**:
```html
<!-- Añadir en <head> después de línea 15 -->
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
<link rel="manifest" href="assets/site.webmanifest">
```

**Tareas**:
1. Crear o conseguir imagen para favicon (mínimo 512x512px)
2. Generar tamaños: 16x16, 32x32, 180x180
3. Crear manifest para PWA (opcional pero recomendado)
4. Agregar tags al HTML

**Criterios de Aceptación**:
- [ ] Favicon visible en pestaña del navegador
- [ ] Apple touch icon para iOS
- [ ] Imágenes optimizadas

---

## 🎯 SPRINT 1: MEJORAS DE CONTENIDO

> **Objetivo**: Agregar secciones esenciales de información  
> **Fecha inicio**: 20 de Marzo de 2026  
> **Fecha fin**: 27 de Marzo de 2026  
> **Estado**: ⬜ TODO

### Issue #5: Sección de Dress Code
- **Prioridad**: 🟡 ALTA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`
- **Ubicación**: Entre línea 72 (after-ceremony) y línea 74 (recepción)
- **Asignado a**: -
- **Estimación**: 45 min

**Descripción**:
Los invitados necesitan saber qué tipo de vestimenta usar.

**Implementación HTML**:
```html
<section class="dress-code animate-on-scroll">
    <h2 class="section-title">Código de Vestuario</h2>
    <p class="section-subtitle">Formal Elegante</p>
    
    <div class="dress-guidelines">
        <div class="dress-item">
            <span class="dress-icon">👔</span>
            <p class="section-text">Hombres: Traje formal</p>
        </div>
        <div class="dress-item">
            <span class="dress-icon">👗</span>
            <p class="section-text">Mujeres: Vestido largo o coctel</p>
        </div>
    </div>
    
    <p class="section-text" style="margin-top: 2rem; opacity: 0.7;">
        Por favor evita usar blanco o beige total
    </p>
    
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**CSS Necesario**:
```css
.dress-guidelines {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 2rem auto;
}

.dress-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: var(--beige);
    border-radius: 8px;
}

.dress-icon {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
}

@media (min-width: 600px) {
    .dress-guidelines {
        flex-direction: row;
        gap: 2rem;
    }
}
```

**Criterios de Aceptación**:
- [ ] Sección visible entre "After Ceremony" y "Recepción"
- [ ] Responsive en móvil y desktop
- [ ] Sigue convenciones de diseño (colores, tipografías)
- [ ] Animación on-scroll funcional

---

### Issue #6: Sección de Mesa de Regalos
- **Prioridad**: 🟡 ALTA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`
- **Ubicación**: Entre línea 119 (confirmación) y línea 121 (closing)
- **Asignado a**: -
- **Estimación**: 1 hora

**Descripción**:
Información sobre preferencias de regalos para evitar preguntas frecuentes.

**Implementación HTML**:
```html
<section class="gifts animate-on-scroll">
    <h2 class="section-title">Mesa de Regalos</h2>
    <p class="section-subtitle">Tu presencia es nuestro mejor regalo</p>
    <p class="section-text">
        Si deseas obsequiarnos algo, contamos con opciones en:
    </p>
    
    <div class="gift-options">
        <a href="URL_LIVERPOOL" target="_blank" rel="noopener noreferrer" class="gift-link">
            <span class="gift-icon">🏬</span>
            Liverpool
        </a>
        <a href="URL_AMAZON" target="_blank" rel="noopener noreferrer" class="gift-link">
            <span class="gift-icon">📦</span>
            Amazon
        </a>
    </div>
    
    <p class="section-text" style="margin-top: 2rem; opacity: 0.7; font-size: 0.9rem;">
        O si prefieres, una contribución para nuestra luna de miel
    </p>
    
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**CSS Necesario**:
```css
.gift-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto;
}

.gift-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: var(--white);
    border: 2px solid var(--accent-color);
    color: var(--primary-color);
    text-decoration: none;
    border-radius: 50px;
    font-family: var(--font-text);
    font-size: var(--text-size);
    font-weight: 500;
    transition: all 0.3s ease;
}

.gift-link:hover {
    background: var(--accent-color);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(85, 107, 47, 0.3);
}

.gift-link:active {
    transform: translateY(0);
}

.gift-icon {
    font-size: 1.5rem;
}

@media (min-width: 600px) {
    .gift-options {
        flex-direction: row;
        max-width: 600px;
        gap: 1.5rem;
    }
}
```

**Tareas Previas**:
- [ ] Conseguir URLs de mesa de regalos (Liverpool, Amazon, etc.)
- [ ] Decidir si incluir opción de transferencia/sobre

**Criterios de Aceptación**:
- [ ] Sección visible antes de "Closing"
- [ ] Enlaces funcionales a mesas de regalos
- [ ] Responsive y consistente con diseño
- [ ] Animación funcional

---

### Issue #7: Botón "Agregar al Calendario"
- **Prioridad**: 🟡 ALTA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`, `script.js`
- **Ubicación**: Sección countdown, después de línea 108
- **Asignado a**: -
- **Estimación**: 1.5 horas

**Descripción**:
Facilitar que invitados agreguen el evento a su calendario personal.

**Implementación HTML**:
```html
<!-- Agregar después del <p class="section-text">Contamos los días...</p> -->
<a href="#" class="calendar-btn" id="calendarBtn">
    <span class="calendar-icon">📅</span>
    Agregar al Calendario
</a>
```

**CSS**:
```css
.calendar-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--primary-color);
    color: var(--white);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-family: var(--font-text);
    font-size: clamp(0.85rem, 2.5vw, 0.95rem);
    font-weight: 500;
    margin-top: 2rem;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(63, 79, 34, 0.3);
}

.calendar-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(63, 79, 34, 0.4);
}

.calendar-btn:active {
    transform: translateY(0);
}

.calendar-icon {
    font-size: 1.2rem;
}
```

**JavaScript**:
```javascript
function generateICS() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Boda Julian & Yessica//ES
BEGIN:VEVENT
DTSTART:20260502T160000
DTEND:20260502T230000
SUMMARY:Boda de Julian & Yessica
LOCATION:Parroquia Santa María de la Paz, Calle 51 # 20B - 01
DESCRIPTION:Ceremonia 4:00 PM - Recepción 6:00 PM Casa Carmelo (Carrera 4 # 11 - 69)
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Recordatorio: Boda de Julian & Yessica mañana
END:VALARM
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'boda-julian-yessica.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Agregar en DOMContentLoaded
document.getElementById('calendarBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    generateICS();
});
```

**Criterios de Aceptación**:
- [ ] Botón visible en sección countdown
- [ ] Click genera archivo .ics
- [ ] Archivo compatible con Google Calendar, Apple Calendar, Outlook
- [ ] Incluye alarma 1 día antes
- [ ] Información completa del evento

---

### Issue #8: Iconos en Secciones de Eventos
- **Prioridad**: 🟡 ALTA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`
- **Ubicación**: Secciones ceremony (línea 57) y recepcion (línea 74)
- **Asignado a**: -
- **Estimación**: 30 min

**Descripción**:
Añadir iconos para mejorar comprensión visual rápida de cada evento.

**Implementación HTML**:
```html
<!-- Línea 57 -->
<section class="event ceremony animate-on-scroll">
    <span class="event-icon">⛪</span>
    <h2 class="section-title">Ceremonia</h2>
    <!-- resto igual -->
</section>

<!-- Línea 74 -->
<section class="event recepcion animate-on-scroll">
    <span class="event-icon">🎉</span>
    <h2 class="section-title">Recepción</h2>
    <!-- resto igual -->
</section>
```

**CSS**:
```css
.event-icon {
    font-size: clamp(2.5rem, 6vw, 4rem);
    display: block;
    margin-bottom: 1rem;
    opacity: 0.7;
    filter: grayscale(20%);
}
```

**Criterios de Aceptación**:
- [ ] Iconos visibles y centrados
- [ ] Tamaño responsive
- [ ] No rompe diseño existente

---

### Issue #9: Mejorar Estados de Carga y Errores
- **Prioridad**: 🟡 ALTA
- **Estado**: ⬜ TODO
- **Archivos**: `script.js`
- **Función**: `loadGuestData()`
- **Asignado a**: -
- **Estimación**: 45 min

**Descripción**:
Mejorar mensajes y feedback durante la carga de datos de invitados.

**Implementación**:
```javascript
async function loadGuestData() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('f');

    if (!guestId) {
        document.getElementById('guestName').textContent = '¡Bienvenido!';
        document.getElementById('cuposInfo').textContent = 'Para una invitación personalizada, solicita tu enlace único a los novios';
        setupWhatsappLink(null);
        return;
    }

    // Mostrar loading
    const guestNameEl = document.getElementById('guestName');
    const cuposInfoEl = document.getElementById('cuposInfo');
    
    guestNameEl.textContent = 'Cargando...';
    guestNameEl.style.opacity = '0.5';
    cuposInfoEl.textContent = '';

    try {
        const response = await fetch('guests.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const guests = await response.json();
        const guest = guests.find(g => g.id === guestId);

        guestNameEl.style.opacity = '1';

        if (guest) {
            guestNameEl.textContent = guest.name;
            cuposInfoEl.textContent = guest.display;
            setupWhatsappLink(guest);
        } else {
            guestNameEl.textContent = 'Invitado no encontrado';
            cuposInfoEl.textContent = 'Por favor verifica tu enlace de invitación o contacta a los novios';
        }
    } catch (error) {
        console.error('Error loading guest data:', error);
        guestNameEl.style.opacity = '1';
        guestNameEl.textContent = 'Error al cargar invitación';
        cuposInfoEl.textContent = 'Por favor recarga la página. Si el problema persiste, contacta a los novios.';
    }
}
```

**Criterios de Aceptación**:
- [ ] Muestra "Cargando..." mientras fetch está en progreso
- [ ] Mensajes de error claros y accionables
- [ ] Transiciones suaves de opacity
- [ ] Manejo correcto de todos los casos de error

---

## 🎨 SPRINT 2: MEJORAS DE UX Y ANIMACIONES

> **Objetivo**: Mejorar experiencia de usuario e interactividad  
> **Fecha inicio**: 28 de Marzo de 2026  
> **Fecha fin**: 10 de Abril de 2026  
> **Estado**: ⬜ TODO

### Issue #10: Scroll Indicator en Primera Sección
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`
- **Ubicación**: Sección cover
- **Asignado a**: -
- **Estimación**: 30 min

**Descripción**:
Indicador visual que sugiere al usuario hacer scroll para ver más contenido.

**Implementación**:
```html
<!-- Añadir en sección cover, después de section-divider -->
<div class="scroll-indicator">
    <span>↓</span>
</div>
```

```css
.scroll-indicator {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
    z-index: 10;
}

.scroll-indicator span {
    font-size: clamp(1.5rem, 4vw, 2rem);
    color: var(--accent-color);
    opacity: 0.6;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@media (max-width: 600px) {
    .scroll-indicator {
        bottom: 0.5rem;
    }
}
```

**Criterios de Aceptación**:
- [ ] Visible solo en primera sección
- [ ] Animación suave de rebote
- [ ] No interfiere con section-divider

---

### Issue #11: Animaciones Escalonadas en Familias
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Sección**: .families
- **Asignado a**: -
- **Estimación**: 30 min

**Implementación**:
```css
.families .family {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
}

.families.visible .family {
    opacity: 1;
    transform: translateY(0);
}

.families.visible .family:nth-child(2) {
    transition-delay: 0.2s;
}

.families.visible .family:nth-child(3) {
    transition-delay: 0.4s;
}

.families.visible .family:nth-child(4) {
    transition-delay: 0.6s;
}
```

**Criterios de Aceptación**:
- [ ] Cada familia aparece con delay progresivo
- [ ] Animación suave y profesional
- [ ] Compatible con animaciones existentes

---

### Issue #12: Mejorar Estados Hover en Botones
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Asignado a**: -
- **Estimación**: 45 min

**Descripción**:
Mejorar feedback visual en hover de botones y enlaces.

**Implementación**:
```css
/* WhatsApp Button */
.whatsapp-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--verde-oliva);
    color: var(--white);
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-family: var(--font-text);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    font-weight: 500;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
    box-shadow: 0 4px 15px rgba(107, 123, 89, 0.3);
}

.whatsapp-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 123, 89, 0.4);
    background: var(--accent-color);
}

.whatsapp-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(107, 123, 89, 0.3);
}

/* Map Links */
.map-link {
    display: inline-block;
    margin-top: 1rem;
    font-family: var(--font-text);
    font-size: var(--text-size);
    color: var(--accent-color);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--accent-color);
    border-radius: 25px;
    transition: all 0.3s ease;
}

.map-link:hover {
    background: var(--accent-color);
    color: var(--white);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(85, 107, 47, 0.3);
}

.map-link:active {
    transform: translateY(0);
}
```

**Criterios de Aceptación**:
- [ ] Transiciones suaves en todos los botones
- [ ] Feedback visual claro al hover
- [ ] Estado active para click
- [ ] Consistente con diseño general

---

### Issue #13: Touch Feedback para Móviles
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Asignado a**: -
- **Estimación**: 20 min

**Implementación**:
```css
.whatsapp-btn:active,
.map-link:active,
.calendar-btn:active,
.gift-link:active {
    transform: scale(0.95);
}

@media (hover: none) and (pointer: coarse) {
    .whatsapp-btn:active {
        background: var(--primary-color);
    }
    
    .map-link:active {
        background: var(--primary-color);
        border-color: var(--primary-color);
    }
}
```

**Criterios de Aceptación**:
- [ ] Feedback visual en dispositivos táctiles
- [ ] No afecta experiencia en desktop
- [ ] Escala suave al tocar

---

### Issue #14: Breakpoint para Tablets
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Asignado a**: -
- **Estimación**: 1 hora

**Descripción**:
Optimizar diseño para tablets (768px-1024px).

**Implementación**:
```css
@media (min-width: 601px) and (max-width: 1024px) {
    section {
        padding: 4rem 2.5rem;
    }
    
    .section-title {
        font-size: clamp(2.5rem, 6vw, 3.5rem);
    }
    
    .countdown-timer {
        gap: 1rem;
    }
    
    .time-unit {
        min-width: 80px;
    }
    
    .family {
        margin-bottom: 2rem;
    }
}
```

**Criterios de Aceptación**:
- [ ] Diseño optimizado en tablets (iPad, etc.)
- [ ] Espaciados apropiados
- [ ] Tipografía legible

---

### Issue #15: Optimizar Scroll-Snap
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Asignado a**: -
- **Estimación**: 15 min

**Descripción**:
Cambiar scroll-snap de `mandatory` a `proximity` para dar más control al usuario.

**Implementación**:
```css
html {
    scroll-behavior: smooth;
    scroll-padding-top: 10px;
    scroll-snap-type: y proximity; /* Cambiar de mandatory */
}
```

**Criterios de Aceptación**:
- [ ] Scroll más natural y menos restrictivo
- [ ] Mantiene alineación de secciones

---

### Issue #16: Animación en Countdown
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`, `script.js`
- **Asignado a**: -
- **Estimación**: 1 hora

**Descripción**:
Transición suave cuando cambian los números del countdown.

**Implementación JavaScript**:
```javascript
function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateCountdownValue('days', days);
    updateCountdownValue('hours', hours);
    updateCountdownValue('minutes', minutes);
    updateCountdownValue('seconds', seconds);
}

function updateCountdownValue(id, value) {
    const element = document.getElementById(id);
    const newValue = String(value).padStart(2, '0');
    
    if (element.textContent !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.textContent = newValue;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}
```

**CSS**:
```css
.time-unit span {
    font-family: var(--font-title);
    font-size: clamp(2.5rem, 10vw, 5rem);
    font-weight: 600;
    color: var(--primary-color);
    line-height: 1;
    transition: transform 0.3s ease;
}
```

**Criterios de Aceptación**:
- [ ] Animación suave al cambiar números
- [ ] No afecta rendimiento
- [ ] Visualmente elegante

---

### Issue #17: Animación en Separadores
- **Prioridad**: 🟠 MEDIA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Asignado a**: -
- **Estimación**: 20 min

**Implementación**:
```css
.section-divider span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-color);
    opacity: 0.5;
    display: inline-block;
    margin: 0 4px;
    animation: pulse 2s ease-in-out infinite;
}

.section-divider span:nth-child(1) {
    animation-delay: 0s;
}

.section-divider span:nth-child(2) {
    animation-delay: 0.3s;
}

.section-divider span:nth-child(3) {
    animation-delay: 0.6s;
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 0.7;
        transform: scale(1.2);
    }
}
```

**Criterios de Aceptación**:
- [ ] Animación sutil y elegante
- [ ] No distrae del contenido
- [ ] Performance óptimo

---

## 🌟 BACKLOG: MEJORAS FUTURAS

> **Objetivo**: Funcionalidades para versiones futuras  
> **Prioridad**: 🟢 BAJA  
> **Estado**: 💤 BACKLOG

### Issue #18: Foto de Portada
- **Prioridad**: 🟢 BAJA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`, crear imagen optimizada
- **Asignado a**: -
- **Estimación**: 2 horas

**Requisitos Previos**:
- [ ] Conseguir foto profesional de los novios (mínimo 1920x1080px)
- [ ] Optimizar imagen (WebP, compresión)

**Notas**:
Requiere foto de alta calidad. Considerar contratar fotógrafo profesional.

---

### Issue #19: Galería de Fotos
- **Prioridad**: 🟢 BAJA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`, múltiples imágenes
- **Asignado a**: -
- **Estimación**: 3 horas

**Requisitos Previos**:
- [ ] Seleccionar 5-8 fotos de la pareja
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Decidir si usar lightbox o carousel

---

### Issue #20: Mapas Embebidos
- **Prioridad**: 🟢 BAJA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`
- **Asignado a**: -
- **Estimación**: 1 hora

**Descripción**:
Embeber Google Maps en lugar de solo enlaces.

**Notas**:
Considerar impacto en rendimiento (lazy loading de iframe).

---

### Issue #21: Sección FAQ
- **Prioridad**: 🟢 BAJA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, `styles.css`
- **Asignado a**: -
- **Estimación**: 2 horas

**Preguntas sugeridas**:
- ¿Habrá parqueadero?
- ¿Puedo llevar niños?
- ¿Hay opciones vegetarianas?
- ¿A qué hora termina el evento?

---

### Issue #22: Prefers-Reduced-Motion (Accesibilidad)
- **Prioridad**: 🟢 BAJA
- **Estado**: ⬜ TODO
- **Archivos**: `styles.css`
- **Asignado a**: -
- **Estimación**: 30 min

**Implementación**:
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    html {
        scroll-behavior: auto;
    }
}
```

---

### Issue #23: Meta Tags Open Graph con Imagen
- **Prioridad**: 🟢 BAJA
- **Estado**: ⬜ TODO
- **Archivos**: `index.html`, crear imagen OG
- **Asignado a**: -
- **Estimación**: 1 hora

**Requisitos**:
- [ ] Crear imagen 1200x630px para compartir en redes
- [ ] Optimizar imagen

**Implementación**:
```html
<meta property="og:image" content="https://juliantorres92.github.io/boda-invitaciones/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="https://juliantorres92.github.io/boda-invitaciones/assets/og-image.jpg">
```

---

## 📈 MÉTRICAS Y SEGUIMIENTO

### Progreso por Sprint

| Sprint | Rama | HUs Totales | Completadas | En Progreso | Pendientes | % Completado |
|:-------|:-----|:------------|:------------|:------------|:-----------|:-------------|
| Sprint 1 (Foundation) | `sprint/1-foundation` | 3 | 0 | 0 | 3 | 0% |
| Sprint 2 | TBD | 5 | 0 | 0 | 5 | 0% |
| Sprint 3 | TBD | 8 | 0 | 0 | 8 | 0% |
| Backlog | - | 7 | 0 | 0 | 7 | 0% |
| **TOTAL** | - | **23** | **0** | **0** | **23** | **0%** |

### Prioridades

| Prioridad | Cantidad | Porcentaje |
|:----------|:---------|:-----------|
| 🔴 Crítica | 4 | 17.4% |
| 🟡 Alta | 5 | 21.7% |
| 🟠 Media | 8 | 34.8% |
| 🟢 Baja | 6 | 26.1% |

---

## 📝 NOTAS Y DECISIONES

### Decisiones de Diseño

1. **Paleta de colores**: Mantener variables CSS existentes sin cambios
2. **Tipografías**: Continuar con Playfair Display, Cinzel y Montserrat
3. **Animaciones**: Preferir sutileza sobre espectacularidad
4. **Responsive**: Mobile-first approach, breakpoint principal en 600px

### Dependencias

- **Issue #5 y #6**: Requieren URLs finales de mesa de regalos
- **Issue #18 y #19**: Requieren fotografías profesionales
- **Issue #20**: Requiere decisión sobre API key de Google Maps

### Riesgos Identificados

1. **Fotografías**: Si no se consiguen fotos profesionales, Issues #18 y #19 quedan bloqueados
2. **Performance**: Múltiples imágenes pueden afectar tiempo de carga (mitigar con WebP y lazy loading)
3. **Navegadores antiguos**: Algunas features CSS modernas (clamp, dvh) no funcionan en navegadores viejos

---

## 🏃 METODOLOGÍA AGILE

### Estructura de Ramas

```
main (producción)
  │
  └── sprint/<numero>-<nombre>
        │
        ├── hu/<numero>-<descripcion>
        ├── hu/<numero>-<descripcion>
        └── hu/<numero>-<descripcion>
```

### Flujo de Trabajo

1. Crear rama `sprint/` desde `main`
2. Por cada HU:
   - Crear rama `hu/` desde `sprint/`
   - Implementar cambios
   - Commit (Conventional Commits)
   - Actualizar BACKLOG (marcar ✅ DONE)
   - Merge `hu/` → `sprint/`
3. Revisión del usuario (diff + PR GitHub)
4. Merge `sprint/` → `main` con visto bueno
5. Limpiar ramas

### Convenciones de Commits

**Formato**: `<tipo>(<alcance>): <descripción>`

**Tipos permitidos**:
- `fix`: Corrección de errores
- `feat`: Nueva funcionalidad
- `security`: Mejoras de seguridad
- `style`: Cambios de formato/estilo
- `refactor`: Refactorización
- `docs`: Documentación
- `chore`: Mantenimiento

**Ejemplos**:
```
fix(css): corregir error de sintaxis en línea 150
feat(html): agregar sección de dress code
security(html): agregar rel="noopener" a enlaces externos
```

### Estrategia de Merge

- **HU → Sprint**: Merge commit (mantiene historial)
- **Sprint → Main**: PR en GitHub + merge commit

### Reglas del Sprint

- ✅ Mínimo 4 HUs por sprint
- ✅ Una rama por sprint
- ✅ Una rama por HU
- ✅ Actualizar BACKLOG en cada HU completada
- ✅ No merge a main sin visto bueno del usuario

---

## 🔄 PROCESO DE ACTUALIZACIÓN

### Cómo marcar un issue como completado

1. Cambiar estado de `⬜ TODO` a `✅ DONE`
2. Actualizar fecha de completado
3. Anotar quien lo completó
4. Actualizar métricas de progreso

### Template para nuevo issue

```markdown
### Issue #XX: [Título del Issue]
- **Prioridad**: 🔴/🟡/🟠/🟢
- **Estado**: ⬜ TODO / 🔄 IN PROGRESS / ✅ DONE / ❌ CANCELLED
- **Archivos**: [lista de archivos]
- **Asignado a**: -
- **Estimación**: [tiempo]
- **Fecha inicio**: -
- **Fecha completado**: -

**Descripción**:
[Descripción detallada]

**Implementación**:
[Código o pasos]

**Criterios de Aceptación**:
- [ ] Criterio 1
- [ ] Criterio 2
```

---

**Última actualización**: 19 de Marzo de 2026  
**Próxima revisión**: 20 de Marzo de 2026  
**Responsable**: Equipo de Desarrollo
