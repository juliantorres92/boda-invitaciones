---
name: Auditoría de assets 2026-03-30
description: Estado de los assets visuales auditados: fondos incorrectos en florals, champagne-flutes sobredimensionada, audio preload agresivo, fuentes sin uso
type: project
---

Auditoría completa documentada en PRD 006 (.claude/prd/006-assets-optimizacion.md). Estado al 2026-03-30:

**Fondos incorrectos en imágenes decorativas:**
- lily-corner-welcome/family/assistent.webp tienen fondo negro (pesados: 508-588 KB c/u)
- lily-corner-ceremony.webp y reception-corner.webp tienen fondo verde (408-300 KB)
- Solución rápida aprobada: `mix-blend-mode: multiply` en `.deco-corner img`
- Solución definitiva pendiente: regenerar con fondo transparente (coordinar con boda-prompt-engineer)

**champagne-flutes.webp:** 1.8 MB con fondo oscuro sobre sección blanca. Requiere reemplazo obligatorio.

**Why:** Los assets fueron generados sin fondo transparente y la sección de imágenes usa fondos claros, haciendo visible el fondo artificial.

**How to apply:** Antes de implementar cualquier decoración floral nueva, verificar que el asset tenga fondo transparente o aplicar mix-blend-mode: multiply como solución provisional.
