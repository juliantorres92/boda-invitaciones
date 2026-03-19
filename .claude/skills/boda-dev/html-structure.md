# Estructura HTML - Invitación de Boda

Patrones y convenciones de HTML para el proyecto.

## Estructura General del Documento

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Invitación de Boda - Julian & Yessica</title>
    
    <!-- Meta tags Open Graph -->
    <meta property="og:title" content="Invitación de Boda - Julian & Yessica">
    <meta property="og:description" content="02 de Mayo de 2026">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://juliantorres92.github.io/boda-invitaciones">
    
    <!-- Hojas de estilo y fuentes -->
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
</head>
<body>
    <main class="invitation">
        <!-- Secciones aquí -->
    </main>
    <script src="script.js"></script>
</body>
</html>
```

## Patrón de Sección Estándar

Cada sección sigue esta estructura:

```html
<section class="nombre-seccion animate-on-scroll">
    <h2 class="section-title">Título Principal</h2>
    <p class="section-subtitle">Subtítulo o Contexto</p>
    <p class="section-text">Contenido de texto</p>
    
    <!-- Divisor al final de cada sección -->
    <div class="section-divider">
        <span></span>
        <span></span>
        <span></span>
    </div>
</section>
```

**Elementos clave**:
- `animate-on-scroll`: Clase para animaciones al hacer scroll
- `section-divider`: Siempre 3 spans vacíos (se estilizan con CSS)
- Posición absoluta del divisor (bottom: 3rem)

## Secciones del Proyecto

### 1. Cover (Portada)

```html
<section class="cover animate-on-scroll">
    <div class="cover-content">
        <h1 class="section-title">Julian & Yessica</h1>
        <p class="section-subtitle">Nos casamos</p>
        <p class="date section-text">02 · Mayo · 2026</p>
    </div>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

### 2. Welcome (Bienvenida)

```html
<section class="welcome animate-on-scroll">
    <p class="guest-name section-title" id="guestName">Estimado invitado</p>
    <p class="section-intro section-subtitle">Nos sentimos muy felices de poder compartir este momento contigo</p>
    <p class="cupos-info" id="cuposInfo"></p>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**IDs dinámicos**:
- `#guestName`: Se rellena con JavaScript desde guests.json
- `#cuposInfo`: Muestra información de acompañantes

### 3. Families (Familias)

```html
<section class="families animate-on-scroll">
    <h2 class="section-title">Nuestras Familias</h2>
    
    <div class="family">
        <p class="section-subtitle">Padres del novio</p>
        <p class="section-text">Luis Fernando Torres Núñez<br>Alba Rocío Perdomo Salas</p>
    </div>
    
    <div class="family">
        <p class="section-subtitle">Padres de la novia</p>
        <p class="section-text">Omar Dussán Coronado<br>Lucélida Ipuz García</p>
    </div>
    
    <div class="family">
        <p class="section-subtitle">Padrinos</p>
        <p class="section-text">Luis Fernando Torres Perdomo<br>Andrea Katherine Ipuz García</p>
    </div>
    
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**Patrón**: Cada grupo familiar en un `div.family`

### 4. Event - Ceremony (Ceremonia)

```html
<section class="event ceremony animate-on-scroll">
    <h2 class="section-title">Ceremonia</h2>
    <div class="event-details">
        <p class="section-subtitle">Parroquia<br>Santa María de la Paz</p>
        <p class="event-time">Hora: 04:00 PM</p>
        <p class="event-address">Dirección: Calle 51 # 20B - 01, Barrio Álamos</p>
        <a href="https://maps.app.goo.gl/47BLqJi5N9GzJrqaA" target="_blank" class="map-link">Ver ubicación</a>
    </div>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**Clases específicas de evento**:
- `.event`: Clase base para eventos
- `.ceremony` o `.recepcion`: Tipo específico
- `.event-details`: Contenedor de información
- `.event-time`: Información de hora
- `.event-address`: Dirección del lugar
- `.map-link`: Enlace a Google Maps

### 5. After Ceremony

```html
<section class="after-ceremony animate-on-scroll">
    <h2 class="section-title">Después del sí</h2>
    <p class="section-subtitle">continuaremos celebrando</p>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**Uso**: Transición visual entre ceremonia y recepción

### 6. Event - Reception (Recepción)

```html
<section class="event recepcion animate-on-scroll">
    <h2 class="section-title">Recepción</h2>
    <div class="event-details">
        <p class="section-subtitle">Salón de eventos<br>Casa Carmelo</p>
        <p class="event-time">Hora: 06:00 PM</p>
        <p class="event-address">Dirección: Carrera 4 # 11 - 69</p>
        <a href="https://maps.google.com/?q=Casa+Carmelo+eventos" target="_blank" class="map-link">Ver ubicación</a>
    </div>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**Mismo patrón que Ceremony**, diferente contenido.

### 7. Countdown (Cuenta Regresiva)

```html
<section class="countdown animate-on-scroll">
    <h2 class="section-subtitle">Cada momento nos acerca</h2>
    <div class="countdown-timer" id="countdown">
        <div class="time-unit">
            <span id="days">00</span>
            <label>Días</label>
        </div>
        <span class="separator">:</span>
        <div class="time-unit">
            <span id="hours">00</span>
            <label>Horas</label>
        </div>
        <span class="separator">:</span>
        <div class="time-unit">
            <span id="minutes">00</span>
            <label>Min</label>
        </div>
        <span class="separator">:</span>
        <div class="time-unit">
            <span id="seconds">00</span>
            <label>Seg</label>
        </div>
    </div>
    <p class="section-text">Contamos los días para verte</p>
    <div class="section-divider"><span></span><span></span><span></span></div>
</section>
```

**IDs dinámicos actualizados por JavaScript**:
- `#days`, `#hours`, `#minutes`, `#seconds`

**Estructura**:
- `.countdown-timer`: Contenedor flex
- `.time-unit`: Cada unidad (días, horas, etc.)
- `.separator`: Dos puntos entre unidades

### 8. Confirmation (Confirmación)

```html
<section class="confirmacion animate-on-scroll">
    <h2 class="section-subtitle">Tu confirmación nos ayuda a planificar</h2>
    <a href="#" class="whatsapp-btn" id="whatsappBtn" target="_blank">
        <span class="whatsapp-icon">💬</span>
        Confirmar por WhatsApp
    </a>
    <p class="confirm-text">Por favor confirma tu asistencia<br>antes del 15 de Abril de 2026</p>
</section>
```

**ID dinámico**:
- `#whatsappBtn`: Se configura con JavaScript para incluir datos del invitado

### 9. Closing (Cierre)

```html
<section class="closing animate-on-scroll">
    <p class="closing-message">Gracias por ser parte de nuestra historia</p>
    <p class="closing-invite">Nos encantaría celebrar contigo</p>
    <p class="section-title">Julian & Yessica</p>
</section>
```

**Nota**: Esta sección tiene background verde-oliva (definido en CSS)

### 10. Footer

```html
<footer class="footer">
    <p>Te esperamos para celebrar este día especial</p>
    <p class="hashtag">#BodaYessicaJulian</p>
</footer>
```

## Estructura de datos: guests.json

```json
[
  {
    "id": "01-torres",
    "name": "Luis Fernando Torres Núñez",
    "display": "Fernando Torres, esposa e hija"
  },
  {
    "id": "02-torres",
    "name": "Luis Fernando Torres Perdomo",
    "display": "Luis Torres, novia e hija"
  }
]
```

**Campos**:
- `id`: Identificador único usado en URL (`?f=01-torres`)
- `name`: Nombre del invitado principal
- `display`: Texto que se muestra en la invitación (incluye acompañantes)

**Convención de IDs**:
- Formato: `##-apellido` (ej: `01-torres`, `02-perdomo`)
- Numeración secuencial por familia

## Parámetros URL

```
https://juliantorres92.github.io/boda-invitaciones/index.html?f=01-torres
```

- **Parámetro**: `f` (de "familia" o "invitado")
- **Valor**: ID del invitado desde guests.json
- **Función**: Personaliza la invitación con datos del invitado

## Fuentes Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;500;600&family=Libre+Baskerville:wght@400;700&family=Montserrat:wght@300;400;500&family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

**Familias cargadas**:
- Playfair Display (títulos)
- Cinzel (subtítulos)
- Montserrat (texto de cuerpo)
- Otras como backup/futuro uso

## Meta Tags Open Graph

```html
<meta property="og:title" content="Invitación de Boda - Julian & Yessica">
<meta property="og:description" content="02 de Mayo de 2026">
<meta property="og:type" content="website">
<meta property="og:url" content="https://juliantorres92.github.io/boda-invitaciones">
<meta name="twitter:card" content="summary_large_image">
```

**Función**: Controla cómo se ve la invitación cuando se comparte en redes sociales

## Accesibilidad

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
```

**Configuración**:
- `width=device-width`: Ancho del dispositivo
- `maximum-scale=1.0`: Evita zoom
- `user-scalable=no`: Desactiva zoom de usuario
- `viewport-fit=cover`: Cubre toda la pantalla en dispositivos con notch

### Idioma

```html
<html lang="es">
```

Especifica español como idioma del documento.

## Convenciones de Saltos de Línea

```html
<!-- Usar <br> para saltos de línea en direcciones y nombres -->
<p class="section-text">
    Luis Fernando Torres Núñez<br>
    Alba Rocío Perdomo Salas
</p>

<!-- Usar <br> en subtítulos multilínea -->
<p class="section-subtitle">
    Parroquia<br>
    Santa María de la Paz
</p>
```

## Orden de Secciones

1. Cover (Portada)
2. Welcome (Bienvenida personalizada)
3. Families (Familias)
4. Ceremony (Ceremonia)
5. After Ceremony (Transición)
6. Reception (Recepción)
7. Countdown (Cuenta regresiva)
8. Confirmation (Confirmación WhatsApp)
9. Closing (Cierre)
10. Footer

**Total**: 10 secciones de altura completa + footer
