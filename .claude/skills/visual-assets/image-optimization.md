# Optimización de Imágenes - Invitación de Boda

Guía completa para optimizar imágenes manteniendo calidad visual.

## Herramientas Necesarias

```bash
# Instalar cwebp (WebP)
brew install webp

# Instalar ImageMagick (resize)
brew install imagemagick

# Instalar jpegoptim (opcional)
brew install jpegoptim
```

## Conversión a WebP

### Comando Básico
```bash
cwebp -q 80 input.jpg -o output.webp
```

### Por Tipo de Imagen

**Fondos de sección (1920x1080)**:
```bash
cwebp -q 80 -resize 1920 1080 input.jpg -o background.webp
```

**Texturas (800x600)**:
```bash
cwebp -q 85 -resize 800 600 texture.jpg -o texture.webp
```

**Flores con transparencia**:
```bash
cwebp -q 90 -alpha_q 90 flower.png -o flower.webp
```

## Tabla de Tamaños Target

| Tipo | Dimensiones | Formato | Peso Max | Calidad |
|------|-------------|---------|----------|---------|
| Fondo sección | 1920x1080 | WebP | 150KB | 80% |
| Textura | 800x600 | WebP | 50KB | 85% |
| Flor individual | 400x400 | PNG/WebP | 30KB | 90% |
| Decoración SVG | Variable | SVG | 10KB | N/A |

## Lazy Loading

```html
<img src="placeholder.jpg" 
     data-src="image.webp" 
     loading="lazy"
     alt="Descripción">
```

## Responsive Images (srcset)

```html
<picture>
  <source media="(min-width: 1200px)" srcset="bg-large.webp">
  <source media="(min-width: 768px)" srcset="bg-medium.webp">
  <img src="bg-small.webp" alt="Fondo">
</picture>
```

## Script de Optimización Batch

```bash
#!/bin/bash
# optimize-images.sh

for file in *.jpg *.png; do
    filename="${file%.*}"
    cwebp -q 80 "$file" -o "${filename}.webp"
    echo "Optimizado: ${filename}.webp"
done
```

## Checklist de Optimización

- [ ] Convertido a WebP
- [ ] Resize a dimensiones correctas
- [ ] Peso verificado (<150KB fondos)
- [ ] Calidad visual aceptable (comparar original)
- [ ] Lazy loading implementado
- [ ] Alt text agregado

---

Optimiza TODAS las imágenes antes de commit.
