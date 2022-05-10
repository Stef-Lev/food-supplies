import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btn: {
    backgroundColor: "#4A76CF",
    boxShadow:
      "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(161,161,161,0.25)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#2B52A1",
    },
  },
  icon: {
    height: "40px",
    width: "40px",
  },
});

function ScrollTopButton() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`scroll_top_btn ${showTopBtn ? "visible" : ""}`}>
      <IconButton className={classes.btn} onClick={goToTop}>
        <ArrowUpwardIcon className={classes.icon} />
      </IconButton>
    </div>
  );
}

export default ScrollTopButton;
