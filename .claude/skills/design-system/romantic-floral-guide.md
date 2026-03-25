# Guía de Estilo Romántico Floral - Invitación de Boda

Guía completa del estilo visual para la invitación de boda de Julian & Yessica.

## Definición del Estilo

**Romántico Floral** es un estilo de diseño caracterizado por:

- **Naturaleza suave**: Flores delicadas, tonos pastel, texturas orgánicas
- **Elegancia minimalista**: Decoración sutil, sin recargar
- **Calidez nostálgica**: Vintage paper, acuarelas, tonos cálidos
- **Sofisticación atemporal**: Clásico, no sigue tendencias pasajeras

## Paleta de Colores Completa

### Colores Principales

```css
/* Verde Oliva (identidad de marca) */
--verde-oliva: #6B7B59;
--primary-color: #3f4f22;    /* Verde oliva oscuro */
--accent-color: #556b2f;     /* Verde oliva medio */

/* Neutros */
--white: #FDFBF7;            /* Crema blanco */
--beige: #F5F0E6;            /* Beige cálido */
--text-color: #8a7f6a;       /* Marrón suave */
```

### Colores Romántico Floral (Nuevos)

```css
/* Rosas */
--rosa-suave: #F4E8E9;       /* Rosa pálido casi blanco */
--rosa-polvo: #E8D5D7;       /* Rosa polvo */
--rosa-vintage: #DCC5C7;     /* Rosa vintage */

/* Verdes Adicionales */
--verde-sage: #9CAF88;       /* Sage suave */
--verde-eucalipto: #A8BFA0;  /* Eucalipto */
--verde-menta: #C5D9C0;      /* Menta pálido */

/* Acentos */
--dorado-suave: #D4AF37;     /* Dorado antiguo (opcional) */
--blanco-floral: #FFFEF9;    /* Blanco cálido */
--crema-papel: #F9F6F0;      /* Crema papel vintage */

/* Sombras */
--sombra-floral: rgba(107, 123, 89, 0.1);
--sombra-rosa: rgba(244, 232, 233, 0.15);
```

## Uso de Colores por Sección

### Cover (Portada)
```css
.cover {
    background-color: var(--white);
    /* O imagen con overlay rosa suave */
}

.cover .section-title {
    color: var(--primary-color);
}

.cover .decoration {
    fill: var(--verde-sage);
    opacity: 0.35;
}
```

### Welcome (Bienvenida)
```css
.welcome {
    background-color: var(--rosa-suave); /* Fondo rosa muy sutil */
}

.welcome .section-intro {
    color: var(--accent-color);
}
```

### Families (Familias)
```css
.families {
    background-color: var(--white);
}

.families .family {
    background: var(--crema-papel);
    border: 1px solid var(--verde-menta);
}
```

### Ceremony & Recepción (Eventos)
```css
.ceremony, .recepcion {
    background-image: url('...');
    /* Overlay blanco o beige */
}

.event-icon {
    color: var(--verde-oliva);
}
```

## Tipos de Flores Apropiadas

### ✅ Flores Recomendadas

**Rosas**:
- Rosas blancas (pureza, elegancia)
- Rosas rosa pálido (romanticismo)
- Rosas crema (sofisticación)

**Peonías**:
- Peonías blancas o rosas (volumen suave)

**Eucalipto/Olivo**:
- Ramas de eucalipto (verde sage)
- Ramas de olivo (conexión con paleta)

**Flores Silvestres**:
- Flores de campo delicadas
- Gypsophila (baby's breath)
- Lavanda (tonos pastel)

### ❌ Flores a Evitar

- ❌ Girasoles (demasiado bold)
- ❌ Orquídeas tropicales (muy moderno)
- ❌ Flores oscuras (rosas rojas intensas, dalias oscuras)
- ❌ Flores geométricas (proteas, king proteas)
- ❌ Flores muy saturadas (geranios, petunias brillantes)

## Composiciones Florales

### Esquinas Decorativas

```
┌─────────────────────────────┐
│  🌿 Rama floral             │  ← Esquina superior izquierda
│     pequeña (120x80px)      │     Opacidad 0.30-0.40
│                             │
│      [CONTENIDO]            │
│                             │
│              Rama floral 🌿 │  ← Esquina inferior derecha
│             (opcional)      │     Opacidad 0.25-0.35
└─────────────────────────────┘
```

### Marcos Florales

```
     🌸 ─── 🌸 ─── 🌸
    │                │
    │   [CONTENIDO]  │
    │                │
     🌸 ─── 🌸 ─── 🌸
```

**CSS:**
```css
.floral-frame {
    border: 2px solid var(--verde-menta);
    border-radius: 8px;
    padding: 32px;
    position: relative;
}

.floral-frame::before,
.floral-frame::after {
    content: '🌸';
    position: absolute;
    font-size: 20px;
    opacity: 0.5;
}

.floral-frame::before {
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
}

.floral-frame::after {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
}
```

### Divisores Florales

```
     ────  🌿  ────
```

**SVG:**
```svg
<svg width="100" height="20" viewBox="0 0 100 20">
  <line x1="0" y1="10" x2="40" y2="10" 
        stroke="#9CAF88" stroke-width="1"/>
  <circle cx="50" cy="10" r="4" 
          fill="#9CAF88" opacity="0.5"/>
  <line x1="60" y1="10" x2="100" y2="10" 
        stroke="#9CAF88" stroke-width="1"/>
</svg>
```

## Texturas y Patrones

### Textura de Papel Vintage

**Características**:
- Color base: Crema (#F9F6F0)
- Grano sutil (noise)
- Manchas muy ligeras (sepia 5%)
- Opacidad: 0.10-0.20 cuando se usa como overlay

**CSS:**
```css
.paper-texture {
    background-color: var(--crema-papel);
    background-image: 
        url('../assets/images/textures/paper-grain.png');
    background-blend-mode: multiply;
}
```

### Patrón de Acuarela

**Características**:
- Manchas suaves de rosa y verde
- Bordes difuminados (no definidos)
- Opacidad: 0.08-0.15
- Uso: Fondos de sección, overlays artísticos

### Patrón de Puntos Florales

```css
.dotted-pattern {
    background-image: radial-gradient(
        circle,
        var(--verde-sage) 1.5px,
        transparent 1.5px
    );
    background-size: 24px 24px;
    opacity: 0.10;
}
```

## Referencias Visuales

### Mood Board de Keywords

**Fotografía**:
- soft focus, bokeh effect, dreamy
- natural daylight, golden hour
- film photography, analog
- vintage tones, muted colors

**Estilo**:
- romantic, elegant, timeless
- minimalist, delicate, subtle
- ethereal, whimsical, nostalgic
- sophisticated, refined

**Texturas**:
- watercolor, paper grain, linen
- soft fabric, silk, chiffon
- vintage paper, parchment

**Composición**:
- negative space, breathing room
- centered, balanced, harmonious
- asymmetric florals, organic flow

### Pinterest Boards Sugeridos

Buscar en Pinterest:
- "romantic floral wedding invitation minimalist"
- "soft pastel wedding web design"
- "olive green blush pink wedding aesthetic"
- "vintage paper wedding invitation texture"
- "eucalyptus olive branch wedding decor"

### Dribbble / Behance Tags

- romantic wedding invitation
- floral minimalist design
- soft pastel color palette
- elegant botanical illustration
- vintage wedding graphics

## Ejemplos de Combinaciones de Colores

### Combinación 1: Romántico Clásico
```css
Background: var(--white);
Primary Text: var(--primary-color); /* Verde oliva oscuro */
Secondary Text: var(--text-color); /* Marrón suave */
Decorations: var(--verde-sage); /* Sage suave */
Accent: var(--rosa-suave); /* Rosa muy sutil */
```

### Combinación 2: Cálido Vintage
```css
Background: var(--crema-papel);
Primary Text: var(--primary-color);
Secondary Text: var(--accent-color);
Decorations: var(--rosa-polvo); /* Rosa polvo */
Accent: var(--dorado-suave); /* Dorado sutil */
```

### Combinación 3: Naturaleza Fresca
```css
Background: var(--blanco-floral);
Primary Text: var(--primary-color);
Secondary Text: var(--verde-oliva);
Decorations: var(--verde-eucalipto);
Accent: var(--verde-menta);
```

## Tipografía Romántica

### Fuentes Actuales (Mantener)
```css
--font-title: 'Playfair Display';    /* Serif clásica, elegante */
--font-subtitle: 'Cinzel';            /* Serif moderna, sofisticada */
--font-text: 'Montserrat';            /* Sans-serif limpia */
```

### Uso de Cursivas (Énfasis Romántico)
```css
.romantic-text {
    font-family: var(--font-title);
    font-style: italic;
    font-weight: 400;
    color: var(--accent-color);
}
```

**Cuándo usar cursivas**:
- Mensajes introductorios ("Nos sentimos muy felices...")
- Citas o frases especiales
- Nombres de pareja en contextos específicos
- **NO usar**: Títulos principales, información crítica (hora, fecha, lugar)

## Elementos Decorativos SVG

### Rama Floral Esquina (120x80px)

```svg
<svg width="120" height="80" viewBox="0 0 120 80" fill="none">
  <!-- Rama principal -->
  <path d="M10 70 Q 40 50, 70 30 T 110 10" 
        stroke="#9CAF88" 
        stroke-width="2" 
        fill="none"
        opacity="0.4"/>
  
  <!-- Hojas -->
  <ellipse cx="30" cy="55" rx="8" ry="12" 
           fill="#9CAF88" 
           opacity="0.3"
           transform="rotate(-20 30 55)"/>
  <ellipse cx="55" cy="38" rx="8" ry="12" 
           fill="#9CAF88" 
           opacity="0.3"
           transform="rotate(15 55 38)"/>
  <ellipse cx="85" cy="22" rx="8" ry="12" 
           fill="#9CAF88" 
           opacity="0.3"
           transform="rotate(-30 85 22)"/>
  
  <!-- Flores pequeñas -->
  <circle cx="35" cy="50" r="4" 
          fill="#F4E8E9" 
          opacity="0.6"/>
  <circle cx="60" cy="33" r="4" 
          fill="#F4E8E9" 
          opacity="0.6"/>
  <circle cx="90" cy="18" r="4" 
          fill="#F4E8E9" 
          opacity="0.6"/>
</svg>
```

### Divisor Floral Horizontal (200x40px)

```svg
<svg width="200" height="40" viewBox="0 0 200 40" fill="none">
  <!-- Líneas laterales -->
  <line x1="0" y1="20" x2="70" y2="20" 
        stroke="#9CAF88" 
        stroke-width="1" 
        opacity="0.4"/>
  <line x1="130" y1="20" x2="200" y2="20" 
        stroke="#9CAF88" 
        stroke-width="1" 
        opacity="0.4"/>
  
  <!-- Elemento central -->
  <circle cx="100" cy="20" r="6" 
          fill="#F4E8E9" 
          opacity="0.5"/>
  <ellipse cx="90" cy="20" rx="4" ry="6" 
           fill="#9CAF88" 
           opacity="0.3"
           transform="rotate(-30 90 20)"/>
  <ellipse cx="110" cy="20" rx="4" ry="6" 
           fill="#9CAF88" 
           opacity="0.3"
           transform="rotate(30 110 20)"/>
</svg>
```

## Reglas de Estilo

### ✅ Hacer

- Usar tonos pastel y suaves
- Mantener overlays para legibilidad
- Decoraciones sutiles (opacidad 0.25-0.40)
- Espaciado generoso (white space)
- Flores en esquinas o como divisores
- Texturas suaves como acuarela o papel
- Combinaciones verde oliva + rosa suave

### ❌ Evitar

- Colores saturados o vibrantes
- Decoraciones que compiten con texto
- Flores centradas o simétricas (muy rígido)
- Múltiples tipos de flores en una sección
- Gradientes bold o modernos
- Sombras duras o muy marcadas
- Fuentes script exageradas

## Checklist de Estilo Romántico Floral

Antes de aprobar un diseño:

- [ ] Paleta usa colores de la guía (verde oliva, rosa suave, beige, crema)
- [ ] Flores son apropiadas (rosas, peonías, eucalipto, no tropicales)
- [ ] Decoraciones son sutiles (opacidad 0.25-0.40)
- [ ] Texturas son suaves (papel, acuarela, no geométrico)
- [ ] Overlays mantienen legibilidad (mínimo 4.5:1)
- [ ] Composición es elegante y minimalista
- [ ] Estilo es consistente con secciones previas
- [ ] No hay elementos bold o saturados

---

Usa esta guía como referencia en TODAS las decisiones de diseño visual del proyecto.
