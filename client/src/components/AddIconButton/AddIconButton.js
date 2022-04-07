import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import styles from "./AddIconButton.module.css";

function AddIconButton() {
  return (
    <div className={styles.container}>
      <IconButton onClick={() => console.log("Clicked")}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default AddIconButton;
