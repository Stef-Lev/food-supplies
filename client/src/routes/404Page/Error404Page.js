import React from "react";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import brandBtnStyle from "../../utils/brandBtnStyle";
import styles from "./Error404Page.module.css";

function Error404Page() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div>
        <div>
          <img src="/404_cat.svg" alt="cat error" />
          <h2 className={styles.subtitle}>
            <FormattedMessage
              id="generic.error.page.message"
              defaultMessage="Page not found"
            />
          </h2>
          <Button
            variant="contained"
            color="primary"
            style={{
              ...brandBtnStyle,
              background: "#4A76CF",
              margin: "32px 0",
            }}
            onClick={() => navigate("/")}
          >
            <FormattedMessage
              id="generic.error.page.button"
              defaultMessage="Home"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error404Page;
