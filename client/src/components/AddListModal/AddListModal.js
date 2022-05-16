import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./AddListModal.module.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import textFieldStyle from "../../utils/textFieldStyle";
import brandBtnStyle from "../../utils/brandBtnStyle";

function AddListModal({ isOpen, onClose, list, onInputChange, addList }) {
  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.overlay}
      open={isOpen}
      onClose={onClose}
    >
      <div className={styles.container}>
        <p className="page-title">Add list</p>
        <div className={styles.column}>
          <TextField
            id="new-list-name"
            label="List name"
            variant="outlined"
            autoComplete="off"
            size="medium"
            classes={{
              root: classes.root,
            }}
            value={list.listName}
            onChange={(e) => onInputChange(e, "listName")}
            style={{ marginBottom: "16px" }}
            fullWidth
          />
        </div>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            color="primary"
            style={{ ...brandBtnStyle, background: "#064960", margin: "0" }}
            onClick={addList}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ ...brandBtnStyle, background: "#ed5f5f", margin: "0" }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddListModal;
