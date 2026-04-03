---
name: Prompts video AI — sobre de boda abriendose (splash screen)
description: Prompts para Runway Gen-3, Kling AI y Pika para generar video vertical 9:16 del sobre olive-sage abriendose con sello de cera J|Y. Image-to-Video con envelope.webp como first frame es la ruta recomendada.
type: project
---

Video AI para splash screen: sobre de boda abriendose.

Especificaciones:
- Formato: 9:16 vertical (mobile full-screen)
- Duracion: 2-3 segundos utiles
- Sobre: olive-sage kraft/parchment (coincide con envelope.webp existente)
- Sello: dorado/bronce con iniciales "J|Y"
- Animacion: sello se rompe, solapa triangular se abre hacia arriba, revela tarjeta crema
- Lirios blancos (Lilium candidum) como decoracion sutil
- Camara estatica, iluminacion calida romantica, fondo oscuro
- Assets existentes: envelope.webp, wax-seal.png

Estrategia recomendada: Image-to-Video usando envelope.webp como primer frame.
Prioridad de herramientas: 1) Runway Gen-3, 2) Kling AI v2, 3) Pika.

Post-procesamiento:
- Recortar a 2-3s
- envelope-open.webm (VP9, <500KB) + envelope-open.mp4 (H.264, <800KB)
- Guardar en assets/videos/

**Why:** El splash screen ya tiene HTML preparado para video (envelope-open.webm/mp4) pero los archivos de video aun no existen. El sobre estatico y sello ya estan en produccion.
**How to apply:** Si el usuario pide ajustes a los prompts, iterar manteniendo Image-to-Video como ruta principal. Si el video generado no coincide con el primer frame, considerar overlay de imagen estatica durante transicion.
