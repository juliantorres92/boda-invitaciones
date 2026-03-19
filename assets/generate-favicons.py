#!/usr/bin/env python3
"""
Genera favicons PNG desde SVG usando cairosvg.
Si cairosvg no está disponible, usa Pillow para crear un placeholder.
"""
import os

try:
    import cairosvg
    HAS_CAIRO = True
except ImportError:
    HAS_CAIRO = False
    try:
        from PIL import Image, ImageDraw, ImageFont
        HAS_PIL = True
    except ImportError:
        HAS_PIL = False

def generate_with_cairo():
    """Genera PNGs desde SVG usando cairosvg"""
    svg_file = 'favicon.svg'
    
    sizes = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'apple-touch-icon.png': 180,
        'favicon-192x192.png': 192,
        'favicon-512x512.png': 512
    }
    
    for filename, size in sizes.items():
        cairosvg.svg2png(
            url=svg_file,
            write_to=filename,
            output_width=size,
            output_height=size
        )
        print(f'✓ Generado: {filename} ({size}x{size})')

def generate_with_pillow():
    """Genera PNGs usando Pillow (fallback)"""
    from PIL import Image, ImageDraw, ImageFont
    
    sizes = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'apple-touch-icon.png': 180,
        'favicon-192x192.png': 192,
        'favicon-512x512.png': 512
    }
    
    for filename, size in sizes.items():
        # Crear imagen con fondo verde oliva
        img = Image.new('RGB', (size, size), color='#6B7B59')
        draw = ImageDraw.Draw(img)
        
        # Dibujar círculo
        margin = int(size * 0.02)
        draw.ellipse([margin, margin, size-margin, size-margin], 
                     fill='#6B7B59', outline='#3f4f22', width=max(1, int(size * 0.02)))
        
        # Calcular tamaño de fuente
        font_size = int(size * 0.4)
        try:
            # Intentar usar una fuente serif del sistema
            font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', font_size)
        except:
            try:
                font = ImageFont.truetype('/Library/Fonts/Georgia.ttf', font_size)
            except:
                font = ImageFont.load_default()
        
        # Dibujar texto
        text = "J&Y"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - int(size * 0.05)
        
        draw.text((x, y), text, fill='#FDFBF7', font=font)
        
        # Guardar
        img.save(filename)
        print(f'✓ Generado: {filename} ({size}x{size})')

def main():
    if HAS_CAIRO:
        print("Usando cairosvg para generar PNGs...")
        generate_with_cairo()
    elif HAS_PIL:
        print("cairosvg no disponible. Usando Pillow (fallback)...")
        generate_with_pillow()
    else:
        print("ERROR: Ni cairosvg ni Pillow están instalados.")
        print("Instala uno de ellos:")
        print("  pip install cairosvg")
        print("  pip install Pillow")
        return 1
    
    print("\n✅ Favicons generados exitosamente!")
    return 0

if __name__ == '__main__':
    exit(main())
