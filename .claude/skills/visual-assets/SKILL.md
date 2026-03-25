---
name: visual-assets
description: Gestión de assets visuales para la invitación de boda. Incluye optimización de imágenes, SVGs, backgrounds CSS y biblioteca de recursos florales.
---

# Skill: Visual Assets - Invitación de Boda

Gestión completa de assets visuales para el proyecto.

## Directorio de Assets

```
assets/
├── favicons/           (favicons existentes)
├── images/
│   ├── backgrounds/    (fondos de secciones, 1920x1080, WebP, <150KB)
│   ├── florals/        (flores PNG/WebP con transparencia)
│   └── textures/       (texturas papel/acuarela, <50KB)
├── svg/
│   ├── decorations/    (ornamentos florales)
│   ├── dividers/       (divisores de sección)
│   └── patterns/       (patrones repetibles)
└── generate-favicons.py
```

## Nomenclatura de Archivos

```
backgrounds/cover-bg.webp
backgrounds/ceremony-bg.webp
florals/rose-bouquet.webp
florals/eucalyptus-branch.png
svg/decorations/floral-corner-tl.svg
svg/dividers/floral-divider-simple.svg
```

## Archivos de Soporte

- **[image-optimization.md](image-optimization.md)** - Optimización y conversión WebP
- **[svg-patterns.md](svg-patterns.md)** - Creación de SVGs decorativos
- **[css-backgrounds.md](css-backgrounds.md)** - Implementación de backgrounds perfectos
- **[floral-assets-library.md](floral-assets-library.md)** - Catálogo de recursos

## Fuentes de Imágenes

- Unsplash (https://unsplash.com)
- Pexels (https://www.pexels.com)
- Pixabay (https://pixabay.com)

## Checklist

- [ ] Optimizada (<150KB fondos, <50KB texturas)
- [ ] Formato WebP
- [ ] Dimensiones correctas
- [ ] Guardada en subdirectorio apropiado
- [ ] CSS con overlay implementado
- [ ] Fuente documentada
