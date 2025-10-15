# Resumen Técnico y Hoja de Ruta: App de Insectos

Este documento consolida la visión, arquitectura, funcionalidades y hoja de ruta para el desarrollo de la aplicación de identificación de insectos, basada en los documentos de diseño proporcionados.

## 1. Visión General del Proyecto

- **Nombre de la App:** EcoAlerta (o SafeScan).
- **Propósito Principal:** Una plataforma móvil (iOS/Android) que combina tres pilares:
    1.  **Utilidad Inmediata:** Identificación de insectos asistida por IA para evaluar riesgos y obtener recomendaciones.
    2.  **Valor Colectivo:** Actuar como una herramienta de ciencia ciudadana, mapeando avistamientos para monitoreo ambiental y prevención.
    3.  **Eje Social:** Conectar a una comunidad de usuarios para compartir hallazgos y conocimiento.
- **Público Objetivo:** Ciudadanos de cualquier edad, aficionados o no a la entomología, que necesiten información rápida y referenciada sobre insectos.
- **Valor Añadido:** Transformar la curiosidad individual en inteligencia colectiva, creando un observatorio geográfico de patrones entomológicos.

## 2. Arquitectura y Tecnologías

- **Frontend (App Móvil):**
    - **Plataforma:** React Native con Expo.
    - **Librerías Clave:**
        - **Navegación:** React Navigation.
        - **Iconos:** React Native Vector Icons.
        - **Internacionalización:** i18next con react-i18next.
        - **Formularios:** React Hook Form.
        - **Notificaciones:** React Native Toast Message.
        - **Comunicaciones HTTP:** Axios.
- **Backend (Servidor):**
    - **Entorno:** Node.js con Express.
    - **Función:** Servir como intermediario seguro entre la app y los servicios externos (IA, Base de Datos). Gestionará la lógica de negocio y las API Keys.
- **Base de Datos:**
    - **Sistema:** Supabase (PostgreSQL).
    - **Uso:** Almacenará datos de usuarios, identificaciones (hallazgos), posts de la comunidad, comentarios, likes, etc.
- **Inteligencia Artificial:**
    - **Servicio:** OpenAI API (usando un modelo como GPT-4o o GPT-4 Vision).

## 3. Flujo de Datos Principal: Identificación de Insecto

1.  **Captura (App):** El usuario toma/selecciona una foto.
2.  **Preparación (App):** La app empaqueta la imagen junto con metadatos (ID de usuario, timestamp, geolocalización) en un objeto JSON.
3.  **Envío (App):** Se envía todo al backend en una única petición `multipart/form-data`.
4.  **Recepción (Backend):** El servidor recibe la imagen y los metadatos.
5.  **Llamada a la IA (Backend):** El servidor (nunca la app) envía la imagen a la API de OpenAI de forma segura, usando la API Key almacenada en el servidor.
6.  **Procesamiento (Backend):** El servidor recibe la respuesta de la IA, la procesa, y la almacena en la base de datos (Supabase), asociándola al usuario.
7.  **Respuesta (Backend):** El servidor envía a la app únicamente la información final y procesada, lista para ser mostrada al usuario.

## 4. Estructura de Pantallas y Funcionalidades

- **Inicio / Onboarding:**
    - Pantalla de bienvenida para selección de idioma.
    - Carrusel de 3 pasos para explicar el propósito de la app.
- **Navegación Principal:**
    - **Barra Superior:** Nombre de usuario e icono de menú hamburguesa para navegar a `Ajustes`.
    - **Barra Inferior (Tab Bar con 6 iconos):**
        1.  **Inicio (Identificación):** Pantalla principal para la acción de escanear.
        2.  **Colecciones:** Historial personal de hallazgos.
        3.  **Comunidad:** Feed social.
        4.  **Mapa:** Visualización geográfica de datos.
        5.  **Aprender:** Contenido educativo.
        6.  **Mi Diario:** Diario personal de notas.
- **Detalle de Pantallas Clave:**
    - **Pantalla Principal:** Botón grande "Identificar Ahora", mapa en miniatura ("Alerta de Patrón"), widget de clima.
    - **Pantalla de Resultados:** Ficha detallada post-identificación con nombre, confianza de la IA, riesgos, recomendaciones, contexto ecológico y opciones (guardar, compartir, eliminar).
    - **Colecciones:** Lista cronológica de hallazgos con foto miniatura, fecha e indicador de riesgo. Permite buscar y filtrar.
    - **Mi Diario:** Interfaz para crear/ver notas personales con título, texto (300 car.), estado anímico, tags y geolocalización. Implementa la "Conexión Híbrida" para enlazar notas con hallazgos de `Colecciones`.
    - **Comunidad:** Muro tipo red social para publicar hallazgos, ver, comentar y dar "like" a los de otros.
    - **Mapa:** Mapa interactivo con filtros y capas (mapa de calor, marcadores de alto riesgo).
    - **Ajustes:** Gestión de perfil, cambio de tema (claro/oscuro), tamaño de fuente, idioma, T&C y cierre de sesión.
    - **Autenticación:** Pantallas para Registro, Login y Recuperación de Contraseña.

## 5. Hoja de Ruta del Desarrollo

- **Fase 0: Preparación del Terreno:**
    - Creación del proyecto base (Expo).
    - Inicialización de Git.
- **Fase 1: La Cimentación y la "Prueba de Fuego":**
    - Construir el backend básico (Node.js).
    - **Acción Crítica:** Probar la conexión segura del backend con la API de OpenAI.
    - Diseñar el esquema inicial de la base de datos en Supabase.
    - Crear bocetos de la UI para la pantalla principal.
- **Fase 2: El "Circuito Mágico":**
    - Implementar la funcionalidad completa de identificación: `App -> Backend -> IA -> Backend -> App`.
- **Fase 3: Amueblando la Casa (Funcionalidades Esenciales):**
    - Implementar registro y login de usuarios.
    - Desarrollar las pantallas `Colecciones`, `Mi Diario` (con la conexión híbrida), `Mapa` y `Aprender`.
- **Fase 4: Abriendo las Puertas (La Comunidad):**
    - Implementar el muro de la comunidad y los perfiles de usuario básicos.
- **Fase 5: Limpieza y Decoración Final (Lanzamiento):**
    - Completar la pantalla de `Ajustes`.
    - Pulir el diseño general y la experiencia de usuario.
    - Realizar pruebas intensivas.
    - Preparar la app para su publicación en las tiendas (Google Play Store, Apple App Store).

## 6. Consideraciones Estratégicas Adicionales

- **UI/UX:** Usar tipografía Roboto, paleta de colores coherente y layouts flexibles para soportar internacionalización.
- **Internacionalización (i18n):** Separar todas las cadenas de texto a archivos de recursos desde el inicio.
- **CI/CD:** Configurar una "fábrica automatizada" (ej. GitHub Actions, EAS) para construir y probar la app automáticamente.
- **Monitoreo:** Integrar herramientas de analíticas (ej. Firebase Analytics) y reporte de errores (ej. Sentry, Crashlytics).
- **Legales:** Redactar una Política de Privacidad y Términos y Condiciones detallados, especialmente por el manejo de datos sensibles (GPS, fotos).
