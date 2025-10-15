
# Bitácora y Estado del Proyecto: App de Insectos

Este documento sirve como una memoria persistente del proyecto, detallando el estado actual, las decisiones clave y la hoja de ruta.

## Estado Actual (15 de Octubre de 2025)

- **Proyecto Inicializado:** Se ha creado un proyecto base usando `Expo SDK 54`.
- **Navegación:** La arquitectura de navegación ha sido refactorizada. Se abandonó el sistema por defecto `expo-router` debido a un bug de caché persistente e irresoluble en el entorno de desarrollo. En su lugar, se implementó una navegación manual utilizando las librerías `@react-navigation/native` y `@react-navigation/bottom-tabs`.
- **Estructura de Archivos:**
    - El punto de entrada de la aplicación es `index.js` -> `App.js`.
    - `App.js` contiene el `NavigationContainer` y el `Tab.Navigator`.
    - Las pantallas se encuentran en el directorio `src/screens/`.
    - La carpeta `app/` de `expo-router` ha sido eliminada.
- **UI Implementada (Maquetación):**
    - Se ha implementado la maquetación estática para las 4 pantallas principales de la barra de navegación: `Inicio`, `Colecciones`, `Comunidad` y `Mapa`.
    - El estilo se ha implementado con el sistema `StyleSheet` estándar de React Native, traduciendo los diseños HTML proporcionados.
    - Se ha solucionado el problema de solapamiento de la UI con la barra de estado del dispositivo mediante el uso correcto de `SafeAreaView` de `react-native-safe-area-context`.
- **Dependencias Clave Añadidas:**
    - `react-navigation` (native, bottom-tabs)
    - `react-native-maps`
    - `react-native-svg`
    - `openai`
    - `express` (para el futuro backend)

## Problemas Conocidos

- **Pantalla del Mapa:** Aunque la pantalla ya no crashea, el layout en el emulador del usuario no es el deseado. La tarea de ajustar el diseño fino del mapa está **aparcada** para no bloquear el desarrollo.

## Hoja de Ruta del Proyecto (Resumen)

- **Fase 0: Preparación del Terreno (Completada)**
- **Fase 1: La Cimentación y la "Prueba de Fuego" (Completada)**
- **Fase 2: El "Circuito Mágico" (Siguiente)**
    - Activar la cámara/galería desde la pantalla de "Inicio".
    - Construir el "Puente": enviar la imagen al backend.
    - Conectar el backend con la API de OpenAI.
    - Crear la pantalla de Resultados y mostrar la información.
- **Fase 3: Amueblando la Casa**
    - Implementar Login/Registro de usuarios.
    - Dar funcionalidad a "Colecciones" (guardar y leer de la BBDD).
    - Implementar la "Conexión Híbrida" Diario-Colecciones.
- **Fase 4: Abriendo las Puertas (La Comunidad)**
    - Implementar la publicación de posts, likes y comentarios.
- **Fase 5: Limpieza y Decoración Final**
    - Implementar la pantalla de "Ajustes".
    - Pulido general de diseño y experiencia de usuario.
    - Pruebas y preparación para las tiendas de aplicaciones.
