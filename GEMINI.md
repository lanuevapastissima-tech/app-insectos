# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (18 de Octubre de 2025 - Fin de Fase 4.1)

- **Fase 4.1 Completada y Estable (Autenticación):** Se ha implementado y depurado un flujo de autenticación de usuarios completo. Esto incluye las pantallas de Bienvenida (con selección de idioma), Onboarding, Registro, Login y Recuperación de Contraseña. La navegación de la app es condicional y funciona correctamente con la sesión de Supabase.
- **Internacionalización (i18n):** La infraestructura para una aplicación multilingüe (español/inglés) está implementada y funcional en todo el flujo de autenticación.
- **Estabilidad y Mantenimiento:** Se han corregido bugs de conexión, estado, importaciones y layout que surgieron durante el desarrollo. El código se ha actualizado para seguir las buenas prácticas (ej. `SafeAreaView`). Se ha documentado un problema de caché persistente en el Emulador de Android que no afecta a los dispositivos físicos.
- **Fase de Pulido (Colecciones) Completada:** Se finalizó la mejora de la pantalla `Colecciones`, implementando funcionalidades completas de búsqueda y filtros.

## Problemas Conocidos

- **Pantalla del Mapa:** El layout sigue aparcado.
- **Botón "Scanner":** Funcionalidad no definida.
- **Caché del Emulador de Android:** Puede no reflejar los cambios en los archivos de traducción (`.json`) de inmediato.

## Hoja de Ruta del Proyecto (Resumen)

- **Fase 0-3 (Completadas)**
- **Fase 4: Abriendo las Puertas (La Comunidad) (En curso)**
    - **Sub-fase 4.1: Sistema de Autenticación (Completada)**
    - **Sub-fase 4.2: El Muro - Ver Publicaciones (Siguiente)**
- **Fase 5: Limpieza y Decoración Final**