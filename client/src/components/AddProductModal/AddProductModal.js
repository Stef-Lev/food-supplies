import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import TextField from "@material-ui/core/TextField";
import styles from "./AddProductModal.module.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
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
  console.log(product);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.overlay}
      open={isOpen}
      onClose={onClose}
    >
      <div className={styles.container}>
        <p>Scan to add product to your list</p>
        {scannerOn && <BarcodeScannerComponent width={260} onUpdate={onScan} />}
        {product.barcode && (
          <div className={styles.column}>
            <TextField
              id="new-prd-barcode"
              label="Barcode"
              variant="outlined"
              autoComplete="off"
              value={product.barcode}
              onChange={(e) => onInputChange(e, "barcode")}
              style={{ marginBottom: "16px" }}
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={product.expires}
                  onChange={onDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        )}

        <div className={styles.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={addProductToList}
          >
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductModal;
