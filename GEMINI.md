
# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (17 de Octubre de 2025)

- **Rediseño de `HomeScreen`:** La pantalla "Identificar" ha sido completamente rediseñada con una nueva interfaz de usuario más moderna y funcional.
- **Nuevos Campos de Datos:** Se han añadido y activado los campos para "Comentarios" y "Fecha" (con selector de calendario), permitiendo al usuario añadir más contexto a cada identificación.
- **Funcionalidad de "Subir" Activada:** El botón para subir una imagen desde la galería del dispositivo es ahora completamente funcional.
- **Integración de Nuevos Datos:** El backend y el servicio de almacenamiento han sido actualizados para procesar y guardar los nuevos campos de comentario y fecha.
- **Proyecto Funcional (MVP del Core Loop):** La aplicación mantiene su ciclo funcional completo (Identificar -> Guardar -> Coleccionar) con las nuevas mejoras.

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
