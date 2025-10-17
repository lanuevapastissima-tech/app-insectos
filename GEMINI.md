# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (18 de Octubre de 2025 - Parte 2)

- **Fase 4.1 Completada (Autenticación):** Se ha implementado un flujo de autenticación de usuarios completo y robusto. Esto incluye las pantallas de Bienvenida (con selección de idioma), Onboarding, Registro, Login y Recuperación de Contraseña. La navegación de la app ahora es condicional, mostrando el flujo de autenticación o la app principal según el estado de la sesión del usuario.
- **Internacionalización (i18n):** Se ha establecido la infraestructura para una aplicación multilingüe (español/inglés) usando `i18next`, y las nuevas pantallas de autenticación ya son completamente bilingües.
- **Estabilidad y Mantenimiento:** Se han corregido diversos bugs de conexión, estado y dependencias que surgieron durante el desarrollo, y se ha actualizado el código para seguir las buenas prácticas (ej. `SafeAreaView`).
- **Fase de Pulido (Colecciones) Completada:** Se finalizó la mejora de la pantalla `Colecciones`, implementando funcionalidades completas de búsqueda y filtros.

## Problemas Conocidos

- **Pantalla del Mapa:** El layout sigue aparcado.
- **Botón "Scanner":** Funcionalidad no definida.

## Hoja de Ruta del Proyecto (Resumen)

- **Fase 0-3 (Completadas)**
- **Fase 4: Abriendo las Puertas (La Comunidad) (En curso)**
    - **Sub-fase 4.1: Sistema de Autenticación (Completada)**
    - **Sub-fase 4.2: El Muro - Ver Publicaciones (Siguiente)**
- **Fase 5: Limpieza y Decoración Final**
