# PRD 004 — Refinamientos UI/UX: Mejoras Puntuales Post v1
**Estado**: Propuesta
**Fecha**: 2026-03-30
**Agente**: boda-designer
**Audiencia primaria**: 95%+ móvil vía WhatsApp
**Alcance**: Refinamientos sobre v1 final — sin rediseño, mejoras puntuales

---

## Contexto

La invitación alcanzó su diseño v1 final el 2026-03-26. Las animaciones de Fase 1 están implementadas (PRD 003). Los assets tienen problemas de fondos incorrectos documentados en PRD 006. Este PRD se enfoca exclusivamente en refinamientos de UI/UX: espaciados, jerarquía visual, accesibilidad, consistencia de estilo y detalles de interacción que no fueron cubiertos en sprints anteriores.

---

## Hallazgos UI/UX — Organizados por prioridad

### Prioridad Alta (afectan legibilidad o experiencia directa)

**H1 — Color hardcodeado en labels del countdown**
- **Archivo**: styles.css línea 432
- **Problema**: `.time-unit label { color: #888; opacity: 0.5; }` usa valor hardcodeado en lugar de la variable `--text-color` del sistema de diseño. Inconsistente con el resto del proyecto.
- **Impacto**: Rompe el sistema de tokens CSS. Si se actualiza la paleta, este elemento queda desincronizado.
- **Riesgo de contraste**: #888 con opacity 0.5 sobre fondo blanco produce contraste ~2.1:1, muy por debajo del mínimo WCAG AA (4.5:1). Las etiquetas "Días", "Horas", "Min", "Seg" son casi ilegibles en condiciones de luz ambiental.

**H2 — user-scalable=no bloquea accesibilidad de zoom**
- **Archivo**: index.html línea 5
- **Problema**: `maximum-scale=1.0, user-scalable=no` en el meta viewport impide que usuarios con baja visión amplíen el contenido.
- **Impacto**: Viola WCAG 1.4.4 (Resize Text, nivel AA). En dispositivos de pantalla pequeña, el texto puede ser ilegible sin zoom.
- **Contexto**: El scroll-snap no se rompe al permitir zoom, es un temor común pero infundado en iOS/Android modernos.

**H3 — og:image y twitter:image ausentes**
- **Archivo**: index.html líneas 9-15
- **Problema**: No hay `og:image` ni `twitter:card` con imagen. Al compartir el enlace por WhatsApp, Facebook o cualquier red social, la previsualización aparece sin imagen, reduciendo el impacto visual de la invitación en el momento más crítico: la entrega.
- **Impacto**: El 100% de los invitados recibirán el link por WhatsApp. La preview sin imagen hace la invitación indistinguible de cualquier enlace genérico.

**H4 — Sección closing: tipografía y semántica mezcladas**
- **Archivo**: styles.css líneas 513-516 / index.html (sección .closing ausente del HTML actual)
- **Problema**: La clase `.closing-names` está definida en CSS pero no existe en el HTML. La sección closing completa ha desaparecido del index.html entre sprints. El CSS tiene código muerto sin uso correspondiente en el DOM.
- **Impacto**: El flujo narrativo de la invitación termina abruptamente en la sección de confirmación, sin cierre emocional.

**H5 — Countdown: setInterval no se detiene al llegar a cero**
- **Archivo**: script.js línea 180
- **Problema**: `setInterval(updateCountdown, 1000)` corre indefinidamente después de la boda. Cuando `diff <= 0`, la función retorna temprano pero el intervalo sigue ejecutándose cada segundo hasta que el usuario cierra la pestaña.
- **Impacto**: Desperdicio de recursos en un device móvil de gama baja. Además, si la función escala, podría producir comportamientos inesperados post-evento.

---

### Prioridad Media (afectan coherencia visual y calidad de estilo)

**H6 — Clases CSS sin uso en el DOM (dead code)**
- **Archivo**: styles.css líneas 270-295
- **Problema**: Las clases `.save-the-date`, `.names`, `.event-place` y `.closing-names` están definidas en CSS pero no tienen ningún elemento HTML correspondiente. Son residuos de versiones anteriores del diseño.
- **Impacto**: Aumentan el tamaño del archivo CSS, dificultan el mantenimiento y confunden al lector del código.

**H7 — Sección after-ceremony: min-height 100dvh desproporcionada para su contenido**
- **Archivo**: styles.css (hereda de `section`)
- **Problema**: La sección `after-ceremony` hereda `min-height: 100dvh` del selector genérico `section`. Sin embargo, su contenido es solo un título ("Después del sí") y un subtítulo sobre una imagen de silueta. La sección queda visualmente vacía con demasiado espacio muerto.
- **Impacto**: Experiencia de scroll degradada — el usuario siente que "no pasa nada" en esa sección.
- **Propuesta**: Reducir a `min-height: 60dvh` o aplicar un tratamiento especial similar al de `.closing`.

**H8 — Jerarquía tipográfica inconsistente: `.event h2` duplica `.section-title`**
- **Archivo**: styles.css líneas 313-322
- **Problema**: `.event h2` tiene sus propios valores de `font-family`, `font-size`, `font-weight`, `text-transform`, `letter-spacing`, `color`, `margin-bottom`, que repiten casi exactamente los mismos valores de `.section-title`. El HTML ya usa `class="section-title"` en los `h2` de ceremony y recepcion, haciendo que `.event h2` sea redundante o conflictivo.
- **Impacto**: Dos reglas compitiendo para el mismo elemento genera comportamiento impredecible cuando se modifican valores. Dificulta cambios globales de tipografía.

**H9 — `section-intro` tiene dos definiciones contradictorias para welcome**
- **Archivo**: styles.css líneas 158-172
- **Problema**: `.section-intro` define `font-family: var(--font-title)` y `font-style: italic`, pero `.welcome .section-intro` sobreescribe ambas con `font-family: var(--font-subtitle)` y `font-style: normal`. El elemento en welcome usa la clase `.section-intro` pero visualmente no es una introducción en cursiva — es un subtítulo formal en Cinzel.
- **Impacto**: Inconsistencia semántica. La clase no describe lo que hace en ese contexto.

**H10 — Familias: contenido denso sin suficiente separación visual**
- **Archivo**: styles.css línea 155 / index.html líneas 66-78
- **Problema**: Los tres bloques de `.family` (padres del novio, padres de la novia, padrinos) tienen `margin-bottom: 1.5rem` entre sí. En pantallas de 375px, con el título de sección y el padding, el contenido queda muy comprimido. No hay separador visual entre los tres grupos familiares.
- **Impacto**: La información más importante de la invitación (quiénes son los protagonistas) se lee apretada y sin respiro.

**H11 — Botones map-link y whatsapp-btn: área táctil pequeña para móvil**
- **Archivo**: styles.css líneas 352-373 / 457-477
- **Problema**: Los botones tienen `padding: 0.7rem 2.25rem`. En términos de área táctil absoluta, esto produce aproximadamente 44px de alto — justo en el límite mínimo de Apple HIG (44pt). Sin embargo, para una audiencia de adultos mayores (probable en una boda familiar colombiana), el mínimo debería ser 48px de alto.
- **Impacto**: Dificultad de toque preciso en usuarios con menor destreza táctil.

**H12 — Decoraciones de countdown sobredimensionadas en desktop**
- **Archivo**: styles.css línea 745
- **Problema**: `.countdown-deco { width: clamp(324px, 86vw, 486px); }`. En desktop (>600px), las imágenes decorativas de lily-counter ocupan casi toda la sección, dejando poco espacio visual al timer. El ratio decoración/contenido está invertido en desktop.
- **Impacto**: En desktop la sección de countdown se ve dominada por imágenes en lugar de por los números, que son el elemento principal.

---

### Prioridad Baja (pulido fino, sin impacto funcional)

**H13 — rel="noopener noreferrer" ausente en enlaces de mapas (parcialmente corregido)**
- **Archivo**: index.html líneas 93, 120
- **Estado**: Ya corregido en el HTML actual — ambos `.map-link` tienen `rel="noopener noreferrer"`. Este hallazgo del backlog original está resuelto.
- **Nota**: El enlace de WhatsApp (línea 160) tiene el atributo correctamente también.

**H14 — Fuentes Cormorant Garamond: verificar si está realmente en uso**
- **Archivo**: index.html línea 28 / styles.css línea 250
- **Problema**: La fuente `Cormorant Garamond` se carga desde Google Fonts y se usa en `.cover .section-subtitle`. Es la única instancia. Si se decide unificar la tipografía del cover al sistema estándar (Playfair Display + Cinzel), esta fuente puede eliminarse.
- **Impacto**: Un request HTTP menos al cargar la página.
- **Nota**: Esto se superpone con PRD 006 hallazgo P5. Decisión a tomar coordinando con boda-assets.

**H15 — `@keyframes fadeInUp` definido dos veces en styles.css**
- **Archivo**: styles.css líneas 577-580 y 897-900
- **Problema**: El keyframe `fadeInUp` está declarado dos veces con valores ligeramente diferentes (`translateY(20px)` vs `translateY(16px)`). La segunda declaración sobreescribe la primera en la cascada CSS.
- **Impacto**: El primer `fadeInUp` (línea 577) nunca actúa. Genera confusión al depurar animaciones.

---

## Tabla de propuestas

| ID | Sección | Descripción | Hallazgo | Prioridad | Esfuerzo | Impacto |
|----|---------|-------------|----------|-----------|----------|---------|
| A  | Global  | Reemplazar `#888` por `var(--text-color)` y corregir contraste de labels countdown | H1 | Alta | Bajo | Contraste WCAG AA + coherencia de tokens |
| B  | Global  | Eliminar `maximum-scale=1.0, user-scalable=no` del meta viewport | H2 | Alta | Bajo | Accesibilidad WCAG 1.4.4 |
| C  | Head    | Agregar `og:image` y `twitter:image` con imagen de portada de la invitación | H3 | Alta | Medio | Preview WhatsApp con imagen al compartir |
| D  | Closing | Restaurar sección closing en HTML con `.closing-names` o limpiar CSS muerto | H4 | Alta | Medio | Cierre narrativo + eliminar dead code |
| E  | JS      | Guardar el ID del `setInterval` y limpiarlo cuando `diff <= 0` | H5 | Alta | Bajo | Rendimiento en dispositivos móviles |
| F  | CSS     | Eliminar clases `.save-the-date`, `.names`, `.event-place` sin uso | H6 | Media | Bajo | Limpieza CSS, -~30 líneas de dead code |
| G  | After-ceremony | Reducir `min-height` a `60dvh` y enriquecer el contenido visual | H7 | Media | Medio | Mejor ritmo de scroll y densidad visual |
| H  | CSS     | Eliminar o fusionar `.event h2` con `.section-title` | H8 | Media | Bajo | Eliminar duplicación de reglas tipográficas |
| I  | Welcome | Renombrar o documentar el override de `.section-intro` en welcome | H9 | Media | Bajo | Semántica CSS coherente |
| J  | Families| Agregar `border-top` o divisor sutil entre bloques familiares + aumentar gap | H10 | Media | Bajo | Mejor legibilidad de la sección más importante |
| K  | Global  | Aumentar padding de botones a `0.9rem 2.5rem` (área táctil 48px mínimo) | H11 | Media | Bajo | Usabilidad táctil para adultos mayores |
| L  | Countdown | Ajustar `max-width` de `.countdown-deco` en desktop a `clamp(200px, 40vw, 320px)` | H12 | Baja | Bajo | Mejor balance visual en pantallas grandes |

---

## Fuera de alcance en este PRD

Los siguientes temas están cubiertos en otros PRDs o son decisiones de otro agente:

- **Fondos incorrectos en imágenes decorativas** (H→ PRD 006, propuestas A1-A3): mix-blend-mode y regeneración de assets.
- **champagne-flutes.webp sobredimensionada** (→ PRD 006, propuesta A4): responsabilidad de boda-assets.
- **Fuentes Libre Baskerville y Open Sans sin uso** (→ PRD 006, propuesta A6): ya documentado.
- **Animaciones por sección** (→ PRD 003 y PRD 005): ya implementadas o en cola de boda-animations.
- **Enlace de mapa de recepción** (→ backlog boda-lead): ya corregido con link específico en index.html actual.
- **`rel="noopener noreferrer`** (→ H13): ya corregido en el HTML actual, no requiere acción.

---

## Criterios de aceptación

- [ ] Labels del countdown legibles con contraste mínimo 4.5:1 (verificar con WebAIM Contrast Checker)
- [ ] Meta viewport permite zoom sin `user-scalable=no`
- [ ] Compartir el link por WhatsApp muestra preview con imagen
- [ ] Sección closing presente en HTML o código muerto eliminado del CSS
- [ ] setInterval del countdown se detiene cuando la boda ya ocurrió
- [ ] No hay `@keyframes fadeInUp` duplicado en styles.css
- [ ] Botones tienen área táctil mínima de 48px de alto
- [ ] Sección after-ceremony no tiene espacio vacío excesivo en móvil

---

## Orden de implementación recomendado

1. **E** — Una línea de JS. Sin riesgo.
2. **B** — Un cambio de atributo HTML. Sin riesgo. Mejora accesibilidad inmediatamente.
3. **A** — Dos cambios CSS: reemplazar `#888` por variable y ajustar opacity. Sin riesgo.
4. **L** — Un cambio CSS de width en countdown-deco. Sin riesgo.
5. **H** — Eliminar o fusionar `.event h2`. Riesgo bajo — verificar que `.section-title` ya aplica correctamente antes de eliminar.
6. **F** — Eliminar dead code CSS. Verificar con grep que ningún JS o HTML referencia esas clases.
7. **J** — Separador visual entre familias. Puede ser un `border-top: 1px solid rgba(107, 123, 89, 0.15)` en `.family` + `padding-top: 1.5rem`.
8. **K** — Aumentar padding en botones. Verificar que no desborde en pantallas de 320px.
9. **G** — Ajuste de min-height en after-ceremony. Requiere prueba visual antes y después.
10. **I** — Refactor semántico de `.section-intro` en welcome. Coordinar con boda-assets para no romper animaciones.
11. **D** — Restaurar o limpiar closing. Requiere decisión sobre si la sección debe existir o no.
12. **C** — og:image. Requiere que exista una imagen de portada adecuada (coordinar con boda-assets y boda-prompt-engineer).
