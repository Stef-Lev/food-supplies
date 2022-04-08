import React from "react";
import styles from "./AddIconButton.module.css";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btn: {
    backgroundColor: "#f7717d",
    boxShadow:
      "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(161,161,161,0.25)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f7717d",
    },
  },
  icon: {
    height: "40px",
    width: "40px",
  },
});

function AddIconButton({ handleClick }) {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <IconButton className={classes.btn} onClick={handleClick}>
        <AddIcon className={classes.icon} />
      </IconButton>
    </div>
  );
}

export default AddIconButton;
