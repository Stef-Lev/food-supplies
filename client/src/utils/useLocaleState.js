import { useLocalStorage } from "./useLocalStorage";

const useLocaleState = () => {
  const [storageLocale, setStorageLocale] = useLocalStorage(
    "amalthea_language",
    "en-GB"
  );

  const languages = [
    { language: "English", locale: "en-GB" },
    { language: "Ελληνικά", locale: "el-GR" },
  ];

  return { storageLocale, setStorageLocale, languages };
};

export default useLocaleState;
