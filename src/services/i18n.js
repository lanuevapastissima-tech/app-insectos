import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '../locales/es.json';
import en from '../locales/en.json';

i18next
  .use(initReactI18next) // Pasa la instancia de i18next a react-i18next.
  .init({
    compatibilityJSON: 'v3', // Para compatibilidad con React Native
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es', // Idioma de respaldo si una traducción no existe
    interpolation: {
      escapeValue: false, // React ya se encarga de la protección contra XSS
    },
  });

export default i18next;
