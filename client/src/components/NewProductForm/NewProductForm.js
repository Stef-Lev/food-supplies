import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import brandBtnStyle from "../../utils/brandBtnStyle";
import textFieldStyle from "../../utils/textFieldStyle.js";
import styles from "./NewProductForm.module.css";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";

function NewProductForm({ product, setProduct, onSubmit }) {
  const { title, barcode } = product;

  const handleInputChange = (event, field) => {
    setProduct({ ...product, [field]: event.target.value });
  };
  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));

  const classes = useStyles();
  console.log(classes);

  return (
    <div className={styles.form_container}>
      <form>
        <TextField
          id="new-prd-title"
          label="Title"
          variant="outlined"
          size="small"
          autoComplete="off"
          classes={{
            root: classes.root,
          }}
          value={title}
          onChange={(e) => handleInputChange(e, "title")}
          fullWidth
        />
        <TextField
          id="new-prd-barcode"
          label="Barcode"
          variant="outlined"
          size="small"
          autoComplete="off"
          classes={{
            root: classes.root,
          }}
          value={barcode}
          onChange={(e) => handleInputChange(e, "barcode")}
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          className="auth-btn"
          style={brandBtnStyle}
          onClick={onSubmit}
        >
          ADD PRODUCT
        </Button>
      </form>
    </div>
  );
}

export default NewProductForm;
