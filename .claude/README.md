# Claude Code - Configuración del Proyecto

Este directorio contiene la configuración de Skills y Subagentes para Claude Code en el proyecto de invitación de boda.

## Estructura

```
.claude/
├── skills/
│   └── boda-dev/               # Skill con convenciones del proyecto
│       ├── SKILL.md            # Documento principal
│       ├── css-conventions.md  # Guía completa de CSS
│       ├── html-structure.md   # Patrones HTML
│       └── js-patterns.md      # Patrones JavaScript
│
├── agents/
│   └── boda-lead.md            # Subagente líder de desarrollo
│
└── agent-memory/               # Memoria persistente del subagente (se crea automáticamente)
    └── boda-lead/
        └── MEMORY.md           # Se genera cuando el agente aprende
```

## Skill: boda-dev

**Propósito**: Documentar todas las convenciones de desarrollo del proyecto (CSS, HTML, JavaScript).

**Cuándo se activa**: Automáticamente cuando Claude detecta trabajo en archivos CSS, HTML o JS del proyecto.

**Invocación manual**:
```
/boda-dev
```

**Contenido**:
- Paleta de colores y variables CSS
- Tipografías del proyecto
- Clases CSS principales
- Estructura de secciones HTML
- Patrones JavaScript (countdown, animaciones, etc.)
- Referencias a documentación detallada

## Subagente: boda-lead

**Propósito**: Líder de desarrollo frontend especializado en este proyecto.

**Características**:
- ✅ Skill `boda-dev` precargada en su contexto
- ✅ Memoria persistente a nivel proyecto
- ✅ Acceso a herramientas: Read, Edit, Write, Glob, Grep, Bash
- ✅ Modelo heredado de la sesión principal
- ✅ Modo de permisos: default (pide confirmación)

**Cuándo usarlo**:
- Modificar diseño o estilos CSS
- Cambiar contenido o estructura HTML
- Actualizar funcionalidad JavaScript
- Agregar o modificar invitados
- Cualquier tarea de desarrollo frontend

### Formas de Invocación

#### 1. Mención directa (@-mention)
```
@boda-lead agrega una sección de dress code
@boda-lead revisa los estilos responsive del countdown
@boda-lead modifica el color del botón de WhatsApp
```

#### 2. Delegación natural
```
"Usa el agente boda-lead para revisar los cambios en el CSS"
"Delega al boda-lead la tarea de agregar un nuevo invitado"
```

#### 3. Sesión completa como agente principal
```bash
claude --agent boda-lead
```

O en `.claude/settings.json`:
```json
{
  "agent": "boda-lead"
}
```

## Memoria Persistente

El subagente `boda-lead` tiene memoria persistente configurada en modo `project`.

**Ubicación**: `.claude/agent-memory/boda-lead/MEMORY.md`

**Qué guarda**:
- Decisiones de diseño importantes
- Cambios significativos en la estructura
- Problemas encontrados y soluciones
- Patrones nuevos que emergen
- Referencias a archivos clave

**Ventaja**: El agente "recuerda" decisiones entre sesiones, mejorando con el tiempo.

## Workflow Típico

### Ejemplo 1: Agregar nueva sección

```
Usuario: @boda-lead necesito agregar una sección de "Dress Code" después de la recepción

Boda-lead: 
1. Lee index.html para entender el contexto
2. Crea la sección siguiendo el patrón estándar
3. Aplica las clases correctas (animate-on-scroll, section-divider)
4. Usa las variables CSS apropiadas
5. Verifica que funcione en responsive
6. Sugiere pruebas
```

### Ejemplo 2: Modificar estilos

```
Usuario: @boda-lead cambia el color del botón de WhatsApp a un verde más oscuro

Boda-lead:
1. Lee styles.css
2. Identifica .whatsapp-btn
3. Usa una variable CSS existente o sugiere crear una nueva
4. Mantiene el patrón de hover
5. Verifica contraste de accesibilidad
6. Documenta el cambio en su memoria si es significativo
```

### Ejemplo 3: Agregar invitado

```
Usuario: @boda-lead agrega a "María García" con 2 acompañantes

Boda-lead:
1. Lee guests.json
2. Genera ID único siguiendo patrón (18-garcia)
3. Crea objeto con estructura correcta
4. Valida JSON resultante
5. Sugiere regenerar enlaces con generate-links.js
```

## Verificación de Instalación

Para verificar que todo está configurado correctamente:

1. **Verifica que existen los archivos**:
```bash
ls -R .claude/
```

2. **Lista skills disponibles**:
```
/skills
```
Deberías ver `boda-dev` en la lista.

3. **Lista agentes disponibles**:
```
/agents
```
Deberías ver `boda-lead` en la lista.

4. **Prueba la skill**:
```
/boda-dev
```

5. **Prueba el agente**:
```
@boda-lead hola, cuéntame sobre el proyecto
```

## Archivos del Proyecto

El subagente conoce estos archivos principales:

- `index.html` (135 líneas) - Estructura de la invitación
- `styles.css` (428 líneas) - Estilos y variables CSS
- `script.js` (111 líneas) - Countdown, animaciones, invitados
- `guests.json` (87 líneas) - 17 grupos de invitados
- `generate-links.js` (13 líneas) - Generador de enlaces

## Convenciones Rápidas

### Colores
```css
--verde-oliva: #6B7B59
--primary-color: #3f4f22
--accent-color: #556b2f
--text-color: #8a7f6a
--beige: #F5F0E6
--white: #FDFBF7
```

### Tipografías
```css
--font-title: 'Playfair Display'
--font-subtitle: 'Cinzel'
--font-text: 'Montserrat'
```

### Clases HTML
```css
.section-title       /* Títulos */
.section-subtitle    /* Subtítulos */
.section-text        /* Texto de cuerpo */
.animate-on-scroll   /* Animaciones */
.section-divider     /* 3 puntos al final */
```

## Comandos Útiles

```bash
# Validar guests.json
python -m json.tool guests.json

# Generar enlaces de invitados
node generate-links.js

# Ver estado de git
git status

# Listar agentes
claude agents
```

## Notas Importantes

1. **No reinventar**: El subagente prioriza seguir patrones existentes sobre crear nuevos.

2. **Mobile-first**: Todo debe funcionar primero en móvil (breakpoint: 600px).

3. **Validaciones**: El agente sugiere validaciones pero no las ejecuta automáticamente (modo: default).

4. **Memoria compartida**: La memoria del agente se guarda en `.claude/agent-memory/` y puede ser versionada en git para compartir conocimiento con el equipo.

5. **Skill precargada**: A diferencia de invocar skills bajo demanda, `boda-lead` siempre tiene `boda-dev` cargada en su contexto desde el inicio.

## Troubleshooting

### El agente no aparece

1. Reinicia la sesión de Claude Code
2. Verifica que `.claude/agents/boda-lead.md` existe
3. Ejecuta `/agents` para ver agentes disponibles

### La skill no se activa

1. Verifica que `.claude/skills/boda-dev/SKILL.md` existe
2. Ejecuta `/skills` para ver skills disponibles
3. Prueba invocarla manualmente con `/boda-dev`

### El agente no recuerda cosas

1. Verifica que `memory: project` está en el frontmatter
2. Revisa si existe `.claude/agent-memory/boda-lead/MEMORY.md`
3. Pide explícitamente al agente que actualice su memoria

## Contribuir

Si mejoras las convenciones o el agente:

1. Actualiza los archivos correspondientes en `.claude/`
2. Haz commit de los cambios
3. El equipo compartirá las mejoras via git

---

**Creado**: 18 de Marzo de 2026
**Proyecto**: Invitación de Boda - Julian & Yessica
**Fecha del evento**: 02 de Mayo de 2026
