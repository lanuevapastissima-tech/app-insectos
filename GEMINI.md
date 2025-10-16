# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (17 de Octubre de 2025)

- **App Estable y Funcional:** El flujo principal (Identificar, detallar, guardar, coleccionar, eliminar) es robusto. Se han solucionado bugs críticos de flujo de datos y renderizado.
- **Mejoras de UI/UX:**
    - Se ha rediseñado la pantalla `Identificar` (`HomeScreen`) con una nueva interfaz y campos de datos adicionales (Notas, Fecha).
    - Se ha mejorado la tarjeta de `Colecciones` para mostrar información más relevante (Fecha, Nivel de Riesgo).
    - Se ha corregido un bug de desbordamiento de texto en la pantalla de `Resultados`.
- **Funcionalidades Implementadas:**
    - **Circuito Mágico:** Captura (Cámara/Galería) -> Backend -> Análisis con IA -> Visualización.
    - **Persistencia Local:** Guardado, listado y eliminación de identificaciones con `AsyncStorage`.
    - **IA Interactiva:** Conversación de seguimiento con la IA sobre un insecto identificado.

## Problemas Conocidos

- **Pantalla del Mapa:** El layout en el emulador del usuario no es el deseado. La tarea de ajustar el diseño fino del mapa está **aparcada**.
- **UI de Colecciones:** Los botones de búsqueda y filtros en la pantalla de colecciones están maquetados pero no son funcionales.
- **Botón "Scanner":** La funcionalidad del botón "Scanner" en `HomeScreen` no está definida ni implementada.

## Hoja de Ruta del Proyecto (Resumen)

- **Fase 0: Preparación del Terreno (Completada)**
- **Fase 1: La Cimentación y la "Prueba de Fuego" (Completada)**
- **Fase 2: El "Circuito Mágico" (Completada)**
- **Fase 3: Amueblando la Casa (Completada)**
- **Fase 4: Abriendo las Puertas (La Comunidad) (Siguiente)**
    - Implementar la publicación de posts, likes y comentarios.
- **Fase 5: Limpieza y Decoración Final**
    - Implementar la pantalla de "Ajustes".
    - Pulido general de diseño y experiencia de usuario.
    - Pruebas y preparación para las tiendas de aplicaciones.