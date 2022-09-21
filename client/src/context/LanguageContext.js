import { useState, createContext } from "react";
import English from "../languages/en.json";
import Greek from "../languages/gr.json";
import useLocaleState from "../utils/useLocaleState";
import { IntlProvider } from "react-intl";

export const LanguageContext = createContext();

const localeMessages = { "en-GB": English, "el-GR": Greek };

export function LanguageProvider(props) {
  const { storageLocale } = useLocaleState();
  const [messages, setMessages] = useState(localeMessages[storageLocale]);

  return (
    <LanguageContext.Provider value={{ setMessages }}>
      <IntlProvider locale={storageLocale} messages={messages}>
        {props.children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
