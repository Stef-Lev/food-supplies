import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { MessageContext } from "../../context/MessageContext";
import { headerData } from "../../utils/headerData";
import { FormattedMessage } from "react-intl";
import useLogout from "../../utils/useLogout";

const useStyles = makeStyles({
  header: {
    backgroundColor: "#064960",
    color: "#fff",
  },
});

const Header = () => {
  const [mobileView, setMobileView] = useState(false);
  const { showMessage } = useContext(MessageContext);
  const classes = useStyles();
  const { logoutUser } = useLogout();

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const isLogoutButton = (intlId) => {
    return intlId.includes("logout");
  };

  const displayHeader = () => {
    return (
      <Toolbar>
        <div style={{ width: "100%" }}>
          <div>{getMenuButtons()}</div>
        </div>
      </Toolbar>
    );
  };

  const warnBeforeDeleting = () => {
    showMessage(
      "warning",
      <FormattedMessage
        id="generic.logout.warning"
        defaultMessage="Do you want to logout?"
      />,
      () => logoutUser()
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ intlId, defaultMsg, href, icon }) => {
      if (mobileView) {
        return !isLogoutButton(intlId) ? (
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
        ) : (
          <IconButton
            {...{
              key: intlId,
              color: "inherit",
              onClick: warnBeforeDeleting,
              component: Button,
            }}
          >
            {icon}
          </IconButton>
        );
      } else {
        return !isLogoutButton(intlId) ? (
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
        ) : (
          <Button
            {...{
              key: intlId,
              color: "inherit",
              onClick: warnBeforeDeleting,
              component: Button,
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
