import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import TextField from "@material-ui/core/TextField";
import styles from "./AddProductModal.module.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import textFieldStyle from "../../utils/textFieldStyle";
import brandBtnStyle from "../../utils/brandBtnStyle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function AddProductModal({
  isOpen,
  onClose,
  product,
  scannerOn,
  onScan,
  onInputChange,
  onDateChange,
  addProductToList,
}) {
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
        <p className="page-title">Scan to add product to your list</p>
        {scannerOn && <BarcodeScannerComponent width={260} onUpdate={onScan} />}
        <div className={styles.column}>
          <TextField
            id="new-prd-barcode"
            label="Barcode"
            variant="outlined"
            autoComplete="off"
            size="small"
            classes={{
              root: classes.root,
            }}
            value={product.barcode}
            onChange={(e) => onInputChange(e, "barcode")}
            style={{ marginBottom: "16px" }}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                format="dd/MM/yyyy"
                margin="normal"
                inputVariant="outlined"
                size="small"
                classes={{
                  root: classes.root,
                }}
                id="date-picker-inline"
                label="Expiration date"
                value={product.expires}
                onChange={onDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            color="primary"
            style={{ ...brandBtnStyle, background: "#064960", margin: "0" }}
            onClick={addProductToList}
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

export default AddProductModal;
