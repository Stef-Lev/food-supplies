import { useState, useEffect } from "react";
import English from "../languages/en.json";
import Greek from "../languages/gr.json";

const useStorageLocale = () => {
  const [storageLocale, setStorageLocale] = useState("en-GB");
  const [messages, setMessages] = useState(English);
  const languages = [
    { language: "English", locale: "en-GB" },
    { language: "Ελληνικά", locale: "el-GR" },
  ];

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getLocale();
    }
    return () => (mounted = false);
  }, [storageLocale]);

  const getMessages = (lang) => {
    const extracted = lang.split("-")[0];
    switch (extracted) {
      case "el":
        return Greek;
      case "en":
        return English;
      default:
        return English;
    }
  };

  const getLocale = () => {
    const storedLocale = localStorage.getItem("amalthea_language");
    const browserLocale = navigator.language;
    if (storedLocale && storedLocale !== "undefined") {
      setStorageLocale(storedLocale);
      setMessages(getMessages(storedLocale));
    } else {
      localStorage.setItem("amalthea_language", browserLocale);
      setStorageLocale(browserLocale);
      setMessages(getMessages(browserLocale));
    }
  };

  const setLocale = (locale) => {
    localStorage.setItem("amalthea_language", locale);
    setStorageLocale(locale);
    setMessages(getMessages(locale));
    window.location.reload();
  };
  return { storageLocale, setLocale, messages, languages };
};

export default useStorageLocale;
