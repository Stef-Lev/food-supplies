import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
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
    <div>
      <LinearProgress color="primary" className={classes.root} />
    </div>
  );
}

export default AnimatedLoader;
