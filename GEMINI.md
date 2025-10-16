# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (16 de Octubre de 2025)

- **Proyecto Funcional (MVP del Core Loop):** La aplicación ha alcanzado su primer hito funcional importante. El ciclo completo de identificación y colección está implementado y operativo.
- **Circuito Mágico (Completo):** Se ha implementado el flujo completo desde la captura de una imagen con la cámara, el envío a un backend local, el análisis por parte de la API de OpenAI (GPT-4o) y la visualización de los resultados en una pantalla de detalles.
- **Persistencia de Datos (Implementada):** Se ha creado un servicio de almacenamiento (`StorageService`) que utiliza `AsyncStorage` para guardar las identificaciones de insectos localmente en el dispositivo.
- **Gestión de Colecciones (Implementada):** La pantalla "Colecciones" ahora es dinámica. Lee las identificaciones guardadas y las muestra en una lista. Es posible navegar desde un ítem de la colección de vuelta a la pantalla de detalles para revisar la información.
- **IA Interactiva (Implementada):** La pantalla de resultados incluye una funcionalidad para hacer preguntas de seguimiento a la IA sobre el insecto identificado, con un modal para la entrada de texto y visualización de la respuesta.
- **Bugs Solucionados:** Se han corregido errores de navegación (pantalla de resultados no encontrada), de estado (la conversación de la IA persistía entre identificaciones) y de refresco de datos (la pantalla de colecciones no se actualizaba).

## Problemas Conocidos

- **Pantalla del Mapa:** El layout en el emulador del usuario no es el deseado. La tarea de ajustar el diseño fino del mapa está **aparcada**.
- **UI de Colecciones:** Los botones de búsqueda y filtros en la pantalla de colecciones están maquetados pero no son funcionales.

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