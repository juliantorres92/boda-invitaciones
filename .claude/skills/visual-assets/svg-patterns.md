# SVG Patterns - Invitación de Boda

Guía para crear SVGs decorativos elegantes y optimizados.

## Estructura Básica de SVG

```svg
<svg width="120" height="80" viewBox="0 0 120 80" 
     fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Contenido aquí -->
</svg>
```

## Rama Floral Esquina

```svg
<svg width="120" height="80" viewBox="0 0 120 80" fill="none">
  <path d="M10 70 Q 40 50, 70 30 T 110 10" 
        stroke="var(--verde-sage)" 
        stroke-width="2" 
        fill="none"
        opacity="0.4"/>
  <ellipse cx="30" cy="55" rx="8" ry="12" 
           fill="var(--verde-sage)" 
           opacity="0.3"/>
  <circle cx="35" cy="50" r="4" 
          fill="var(--rosa-suave)" 
          opacity="0.6"/>
</svg>
```

## Divisor Floral

```svg
<svg width="200" height="20" viewBox="0 0 200 20" fill="none">
  <line x1="0" y1="10" x2="80" y2="10" 
        stroke="var(--verde-sage)" 
        stroke-width="1" 
        opacity="0.4"/>
  <circle cx="100" cy="10" r="5" 
          fill="var(--rosa-suave)" 
          opacity="0.5"/>
  <line x1="120" y1="10" x2="200" y2="10" 
        stroke="var(--verde-sage)" 
        stroke-width="1" 
        opacity="0.4"/>
</svg>
```

## Optimización con SVGO

```bash
# Instalar SVGO
npm install -g svgo

# Optimizar SVG
svgo input.svg -o output.svg

# Con opciones custom
svgo --multipass --precision=2 input.svg -o output.svg
```

## Inline vs Archivo Externo

**Inline** (<5KB):
```html
<div class="decoration">
  <svg width="120" height="80">...</svg>
</div>
```

**Externo** (>5KB):
```html
<img src="assets/svg/decorations/floral-corner.svg" alt="">
```

## Uso de Variables CSS en SVG

```svg
<svg>
  <circle fill="var(--verde-oliva)" />
</svg>
```

## Checklist

- [ ] viewBox definido
- [ ] Dimensiones apropiadas
- [ ] Optimizado con SVGO
- [ ] Variables CSS usadas
- [ ] Opacidad 0.25-0.40

---

Usa SVGs para decoraciones en lugar de imágenes pesadas.
