# Invitación de Boda Digital — Julian & Yessica

## Proyecto

- **Evento**: 02 de Mayo de 2026, 4:00 PM
- **Ceremonia**: Parroquia Santa María de la Paz — Calle 51 # 20B - 01, Barrio Álamos
- **Recepción**: Casa Carmelo — Carrera 4 # 11 - 69
- **Deploy**: GitHub Pages — auto-deploy desde rama `main`
- **Stack**: HTML5 + CSS3 + JavaScript Vanilla (sin frameworks)
- **Invitados**: 18 grupos (~50 personas), personalizados por parámetro URL `?f=ID`

---

## Workflow obligatorio

Todo cambio en el proyecto sigue este proceso sin excepción:

1. **Plan Mode** — planificar antes de implementar
2. **PRD** — construir archivo en `.claude/prd/NNN-descripcion-plan.md`
3. **Aprobación** — el usuario revisa y aprueba el PRD explícitamente
4. **Implementación** — ejecutar solo el plan aprobado

---

## Reglas invariables

### Flor principal

**Los lirios blancos (Lilium candidum) son SIEMPRE la flor protagonista en todas las imágenes del proyecto.**

Si otras flores se mencionan, son secundarias. Si los lirios se pierden visualmente, se añaden flores secundarias con color — nunca se reemplazan los lirios.

### Paleta de colores

No modificar sin aprobación:

| Variable | Valor | Uso |
|----------|-------|-----|
| `--verde-oliva` | `#6B7B59` | Botones, acentos |
| `--primary-color` | `#3f4f22` | Títulos |
| `--accent-color` | `#556b2f` | Subtítulos |
| `--text-color` | `#8a7f6a` | Cuerpo |
| `--white` | `#FDFBF7` | Fondo principal |
| `--beige` | `#F5F0E6` | Fondo secundario |
| `--rosa-suave` | `#F4E8E9` | Acento floral suave |
| `--rosa-vintage` | `#DCC5C7` | Acento floral pronunciado |
| `--verde-sage` | `#9CAF88` | Follaje |

### Tipografía

- Títulos: **Playfair Display**
- Subtítulos: **Cinzel**
- Texto: **Montserrat**

### Estilo visual

- Acuarela botánica romántica, elegancia minimalista
- Las decoraciones nunca pisan textos
- Contraste mínimo WCAG AA (4.5:1)

---

## Constantes (no modificar)

```js
const WEDDING_DATE = new Date('2026-05-02T16:00:00');
const PHONE_NUMBER = '573013092189';
```
