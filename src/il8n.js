import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {};

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources,
});

// Dynamically load translations for each supported language
const languages = ["en", "ro"]; // Add or remove languages as needed

const loadTranslations = async (language) => {
  // Load translations from the public folder
  const response = await fetch(`/locales/${language}/translation.json`);
  const translation = await response.json();
  return { translation };
};

languages.forEach(async (language) => {
  const translation = await loadTranslations(language);
  resources[language] = translation;
});

export default i18n;
