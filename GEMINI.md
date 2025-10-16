
# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (17 de Octubre de 2025 - MVP Estable)

- **MVP 1.0 Estable y Funcional:** La aplicación ha alcanzado un estado de "Mínimo Producto Viable" robusto. Todos los flujos de trabajo principales (identificación, guardado, consulta, actualización y eliminación) funcionan correctamente tras una intensa fase de depuración.
- **Lógica de Datos Refinada:**
    - Se ha implementado un sistema de "autoguardado inteligente" que persiste las conversaciones con la IA sin requerir una acción manual del usuario.
    - Se ha refactorizado la lógica de guardado y actualización para ser "defensiva", previniendo la creación de registros duplicados.
    - Se ha solucionado el bug de "fuga de datos", asegurando que la información del usuario (comentarios, fecha) viaja correctamente a través de todo el sistema.
- **Mejoras de UI/UX:**
    - Se ha rediseñado la pantalla `Identificar` (`HomeScreen`).
    - Se ha mejorado la tarjeta de `Colecciones` para mostrar más datos (Fecha, Riesgo).
    - Se ha corregido un bug de desbordamiento de texto en la pantalla de `Resultados`.

## Problemas Conocidos

- **Pantalla del Mapa:** El layout sigue aparcado.
- **UI de Colecciones:** Los botones de búsqueda y filtros no son funcionales.
- **Botón "Scanner":** Funcionalidad no definida.

## Hoja de Ruta del Proyecto (Resumen)

- **Fase 0-3 (Completadas)**
- **Fase 4: Abriendo las Puertas (La Comunidad) (Siguiente)**
- **Fase 5: Limpieza y Decoración Final**
