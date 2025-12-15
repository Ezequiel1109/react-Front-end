import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
i18n
  .use(HttpBackend) // carga las traducciones desde archivos JSON
  .use(LanguageDetector)
  .use(ICU)
  .use(initReactI18next) // pasa i18n a react-i18next
  .init({
    fallbackLng: "en", // idioma por defecto
    supportedLngs: ["en", "es"], // idiomas soportados
    debug: true,
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // ruta a los archivos de traducción
    },
    interpolation: {
      escapeValue: false, // react ya se encarga de esto
    },
    react: { useSuspense: false },
  });
export default i18n;