# Patrones JavaScript - Invitación de Boda

Guía completa de JavaScript para el proyecto.

## Constantes Globales

```javascript
const WEDDING_DATE = new Date('2026-05-02T16:00:00');
const PHONE_NUMBER = '573013092189';
```

**Uso**:
- `WEDDING_DATE`: Fecha y hora de la boda para el countdown
- `PHONE_NUMBER`: WhatsApp para confirmaciones (formato internacional sin +)

## Estructura del Archivo script.js

```javascript
// 1. Constantes globales
const WEDDING_DATE = new Date('2026-05-02T16:00:00');
const PHONE_NUMBER = '573013092189';

// 2. Carga de datos de invitado
async function loadGuestData() { ... }

// 3. Configuración de WhatsApp
function setupWhatsappLink(guest) { ... }

// 4. Countdown
function updateCountdown() { ... }

// 5. Animaciones
function initAnimations() { ... }

// 6. Barra de progreso
function initScrollProgress() { ... }

// 7. Inicialización
document.addEventListener('DOMContentLoaded', () => { ... });
```

## Función: loadGuestData()

```javascript
async function loadGuestData() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('f');

    if (!guestId) {
        document.getElementById('guestName').textContent = '¡Bienvenido!';
        document.getElementById('cuposInfo').textContent = 'Comparte este enlace con el invitado esperado';
        setupWhatsappLink(null);
        return;
    }

    try {
        const response = await fetch('guests.json');
        const guests = await response.json();
        const guest = guests.find(g => g.id === guestId);

        if (guest) {
            document.getElementById('guestName').textContent = `${guest.name}`;
            document.getElementById('cuposInfo').textContent = guest.display;
            setupWhatsappLink(guest);
        } else {
            document.getElementById('guestName').textContent = 'Invitado no encontrado';
            document.getElementById('cuposInfo').textContent = 'Por favor verifica tu enlace de invitación';
        }
    } catch (error) {
        console.error('Error loading guest data:', error);
        document.getElementById('guestName').textContent = 'Error al cargar datos';
    }
}
```

**Características**:
- Función asíncrona con `async/await`
- Lee parámetro URL `?f=ID`
- Carga `guests.json` dinámicamente
- Actualiza DOM con datos del invitado
- Manejo de errores con try/catch

**Estados posibles**:
1. Sin parámetro `f`: Muestra mensaje genérico
2. Con invitado válido: Muestra nombre y cupos
3. ID no encontrado: Mensaje de error
4. Error de carga: Mensaje de error

## Función: setupWhatsappLink()

```javascript
function setupWhatsappLink(guest) {
    const btn = document.getElementById('whatsappBtn');
    let message = 'Hola, confirmamos nuestra asistencia a la boda de Yessica y Julian. ';
    
    if (guest) {
        message += `Nombre: ${guest.name}. Acompañantes: ${guest.display}. `;
    }
    
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    btn.href = whatsappUrl;
}
```

**Características**:
- Genera URL de WhatsApp Web/App
- Pre-rellena mensaje con datos del invitado
- Usa `encodeURIComponent()` para caracteres especiales
- Funciona con o sin datos de invitado

**Formato URL WhatsApp**:
```
https://wa.me/573013092189?text=Mensaje%20codificado
```

## Función: updateCountdown()

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

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
```

**Características**:
- Calcula diferencia entre ahora y fecha de boda
- Detiene countdown cuando llega a 0
- Convierte milisegundos a días/horas/minutos/segundos
- Formatea con `padStart(2, '0')` para 2 dígitos

**Cálculos**:
```javascript
1 día = 1000 * 60 * 60 * 24 milisegundos
1 hora = 1000 * 60 * 60 milisegundos
1 minuto = 1000 * 60 milisegundos
1 segundo = 1000 milisegundos
```

**Uso de módulo (`%`)**:
- `diff % (1000 * 60 * 60 * 24)`: Resto después de restar días completos
- Se usa para obtener solo las horas/minutos/segundos restantes

## Función: initAnimations()

```javascript
function initAnimations() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}
```

**Características**:
- Usa `IntersectionObserver` API moderna
- Detecta cuando sección entra en viewport
- Agrega clase `.visible` para activar animación CSS
- Threshold 0.3 = 30% del elemento visible

**Flujo**:
1. Selecciona todas las secciones con `.animate-on-scroll`
2. Crea observer con callback
3. Cuando sección es 30% visible → agrega clase `.visible`
4. CSS maneja la transición (opacity, transform)

**Por qué IntersectionObserver**:
- Más eficiente que scroll events
- No bloquea el hilo principal
- Detecta visibilidad automáticamente

## Función: initScrollProgress()

```javascript
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateProgress);
    }, { passive: true });
    
    updateProgress();
}
```

**Características**:
- Crea elemento dinámicamente en JavaScript
- Calcula progreso de scroll como porcentaje
- Usa `requestAnimationFrame` para optimizar rendimiento
- Event listener pasivo para mejor scroll performance

**Cálculo de progreso**:
```javascript
scrollTop = Pixels scrolleados desde arriba
docHeight = Altura total scrollable (altura documento - altura viewport)
progress = (scrollTop / docHeight) * 100
```

**Optimizaciones**:
- `requestAnimationFrame`: Sincroniza con repaint del navegador
- `{ passive: true }`: Indica que no llamará preventDefault()

## Event Listener Principal

```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadGuestData();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initAnimations();
    initScrollProgress();
});
```

**Orden de ejecución**:
1. `DOMContentLoaded`: Espera que HTML esté parseado
2. `loadGuestData()`: Carga datos de invitado (async)
3. `updateCountdown()`: Primer render del countdown
4. `setInterval(updateCountdown, 1000)`: Actualiza cada segundo
5. `initAnimations()`: Configura IntersectionObserver
6. `initScrollProgress()`: Crea barra de progreso

## APIs Web Utilizadas

### URLSearchParams

```javascript
const urlParams = new URLSearchParams(window.location.search);
const guestId = urlParams.get('f');
```

**Función**: Parsear query strings de URL

### Fetch API

```javascript
const response = await fetch('guests.json');
const guests = await response.json();
```

**Función**: Cargar archivos JSON de forma asíncrona

### IntersectionObserver

```javascript
const observer = new IntersectionObserver(callback, options);
observer.observe(element);
```

**Función**: Detectar cuando elementos entran/salen del viewport

### RequestAnimationFrame

```javascript
window.addEventListener('scroll', () => {
    requestAnimationFrame(updateProgress);
});
```

**Función**: Optimizar animaciones sincronizando con repaint

## Manipulación del DOM

### Selección de elementos

```javascript
document.getElementById('elementId')           // Por ID
document.querySelectorAll('.className')        // Por clase (todos)
```

### Modificación de contenido

```javascript
element.textContent = 'Nuevo texto';           // Cambiar texto
element.classList.add('className');            // Agregar clase
element.style.width = '50%';                   // Modificar estilo inline
```

### Creación de elementos

```javascript
const newElement = document.createElement('div');
newElement.className = 'className';
document.body.appendChild(newElement);
```

## Patrones de Manejo de Fechas

### Crear fecha

```javascript
const date = new Date('2026-05-02T16:00:00');  // ISO 8601 format
```

### Calcular diferencia

```javascript
const diff = futureDate - currentDate;         // Resultado en milisegundos
```

### Extraer componentes

```javascript
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
```

## Manejo de Strings

### Template literals

```javascript
const message = `Nombre: ${guest.name}. Acompañantes: ${guest.display}. `;
```

### Padding

```javascript
String(days).padStart(2, '0')  // "7" → "07"
```

### URL encoding

```javascript
encodeURIComponent(message)    // "Hola mundo" → "Hola%20mundo"
```

## Patrones Async/Await

```javascript
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
```

**Ventajas**:
- Código más legible que Promises
- Manejo de errores con try/catch
- Más fácil de debuggear

## Timers

### setInterval

```javascript
setInterval(updateCountdown, 1000);  // Ejecuta cada 1000ms (1 segundo)
```

**Uso**: Countdown que se actualiza continuamente

### Consideraciones de Performance

1. **Passive event listeners**: Mejoran scroll performance
2. **RequestAnimationFrame**: Sincroniza con repaint del navegador
3. **IntersectionObserver**: Más eficiente que scroll events
4. **Async/await**: No bloquea el hilo principal

## Debugging

### Console methods

```javascript
console.log('Variable:', variable);
console.error('Error message:', error);
```

### Breakpoints

```javascript
debugger;  // Pausa ejecución si DevTools está abierto
```

## Extensibilidad

### Para agregar nueva funcionalidad

1. Definir función en scope global
2. Llamarla desde `DOMContentLoaded` si necesita DOM
3. Seguir patrones existentes (async/await, error handling)
4. Documentar con comentarios

### Ejemplo: Nueva sección con animación

```javascript
function initNewFeature() {
    const elements = document.querySelectorAll('.new-feature');
    elements.forEach(element => {
        // Lógica de la feature
    });
}

// Agregar a DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... funciones existentes
    initNewFeature();
});
```
