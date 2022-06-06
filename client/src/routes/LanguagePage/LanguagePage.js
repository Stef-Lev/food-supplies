import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import textFieldStyle from "../../utils/textFieldStyle";
import useStorageLocale from "../../utils/useStorageLocale";
import styles from "./LanguagePage.module.css";

function LanguagePage() {
  const { storageLocale, setLocale, languages } = useStorageLocale();
  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();

  const handleLanguageSelect = (e) => {
    setLocale(e.target.value);
  };

  return (
    <div>
      <h2 className={`page-title ${styles.language_title}`}>
        <FormattedMessage
          id="language.page.select"
          defaultMessage="Select your language"
        />
      </h2>
      <div>
        <FormControl
          variant="outlined"
          className={styles.language}
          classes={{
            root: classes.filters,
          }}
        >
          <Select
            id="demo-simple-select-outlined"
            value={storageLocale}
            onChange={handleLanguageSelect}
          >
            {languages.map((item, index) => (
              <MenuItem key={index + 1} value={item.locale}>
                {item.language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default LanguagePage;
