import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { headerData } from "../../utils/headerData";
import { FormattedMessage } from "react-intl";
const useStyles = makeStyles({
  header: {
    backgroundColor: "#064960",
    color: "#fff",
  },
});

const Header = () => {
  const [mobileView, setMobileView] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 668
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayHeader = () => {
    return (
      <Toolbar>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div>{getMenuButtons()}</div>
        </div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ intlId, defaultMsg, href, icon }) => {
      if (mobileView) {
        return (
          <IconButton
            {...{
              key: intlId,
              color: "inherit",
              to: href,
              component: RouterLink,
            }}
          >
            {icon}
          </IconButton>
        );
      } else {
        return (
          <Button
            {...{
              key: intlId,
              color: "inherit",
              to: href,
              component: RouterLink,
            }}
          >
            <FormattedMessage id={intlId} defaultMessage={defaultMsg} />
          </Button>
        );
      }
    });
  };

  return <AppBar className={classes.header}>{displayHeader()}</AppBar>;
};

export default Header;
