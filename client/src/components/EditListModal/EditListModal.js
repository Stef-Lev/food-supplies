import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./EditListModal.module.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import textFieldStyle from "../../utils/textFieldStyle";
import brandBtnStyle from "../../utils/brandBtnStyle";

function EditListModal({
  isOpen,
  onClose,
  list,
  onInputChange,
  onSave,
  onRemoveList,
}) {
  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();
  const listId = list._id;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.overlay}
      open={isOpen}
      onClose={onClose}
    >
      <div className={styles.container}>
        <p className="page-title">
          <FormattedMessage id="modal.edit.title" defaultMessage="Edit list" />
        </p>
        <div className={styles.column}>
          <div className={styles.row}>
            <TextField
              id="edit-list-name"
              label={
                <FormattedMessage
                  id="modal.edit.input.text"
                  defaultMessage="List name"
                />
              }
              variant="outlined"
              autoComplete="off"
              size="medium"
              classes={{
                root: classes.root,
              }}
              value={list.listName}
              onChange={(e) => onInputChange(e, "listName")}
              style={{ marginBottom: "16px", width: "70%" }}
            />
            <IconButton
              style={{ height: "56px", color: "#ed5f5f" }}
              onClick={() => onRemoveList(list._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            color="primary"
            style={{ ...brandBtnStyle, background: "#064960", margin: "0" }}
            onClick={() => onSave(listId)}
          >
            <FormattedMessage
              id="modal.edit.button.save"
              defaultMessage="Save"
            />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ ...brandBtnStyle, background: "#ed5f5f", margin: "0" }}
            onClick={onClose}
          >
            <FormattedMessage
              id="modal.edit.button.cancel"
              defaultMessage="Cancel"
            />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditListModal;
