import { useTranslation } from "react-i18next";

const useCustomTranslation = () => {
  const { t, i18n, ready } = useTranslation();
  if (!ready) return "loading translations...";
  return { t, i18n, ready };
};

export default useCustomTranslation;
