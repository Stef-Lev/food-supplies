import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import styles from "./AnimatedLoader.module.css";
import { makeStyles } from "@material-ui/core";

function AnimatedLoader() {
  const useStyles = makeStyles(() => ({
    root: {
      "&.MuiLinearProgress-colorPrimary": {
        backgroundColor: "#ABDFEE",
      },
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#064960",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={styles.loader_container}>
      <LinearProgress color="primary" className={classes.root} />
    </div>
  );
}

export default AnimatedLoader;
