import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import Link from "@material-ui/core/Link";
import { UserContext } from "../../context/UserContext";
// import useLogout from "../../utils/useLogout";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import QueueIcon from "@material-ui/icons/Queue";

const Header = () => {
  const [mobileView, setMobileView] = useState(false);
  const { user } = useContext(UserContext);
  // const { logoutUser } = useLogout();

  const headerData = [
    {
      label: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      label: "Add Product",
      icon: <QueueIcon />,
      href: "/product",
    },
    {
      label: "Products List",
      icon: <FormatListNumberedIcon />,
      href: `/user/${user._id}/list`,
    },
    {
      label: "Logout",
      icon: <ExitToAppIcon />,
      href: "/logout",
    },
  ];

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

  // const isLogoutButton = (label) => {
  //   return label === "Logout";
  // };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <div style={{ width: "100%" }}>
          <div>{getMenuButtons()}</div>
        </div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ label, href, icon }) => {
      if (mobileView) {
        return (
          <IconButton
            {...{
              key: label,
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
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
            }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  console.log("USER", user);
  return (
    <AppBar className="app-bar">
      {mobileView ? displayDesktop() : displayDesktop()}
    </AppBar>
  );
};
export default Header;
