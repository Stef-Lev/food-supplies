import React, { useState, useContext } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Button from "@material-ui/core/Button";
import NewProductForm from "../../components/NewProductForm/NewProductForm";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import { fetchMethod } from "../../utils/fetchMethod";
import textFieldStyle from "../../utils/textFieldStyle";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import soundfile from "../../sounds/blip.mp3";
import brandBtnStyle from "../../utils/brandBtnStyle";
import styles from "./AddProductsPage.module.css";

function AddProductsPage() {
  const [scannerOn, setScannerOn] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    barcode: "",
  });
  const audio = new Audio(soundfile);
  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const handleInputChange = (event, field) => {
    setProduct({ ...product, [field]: event.target.value });
  };

  const handleUpdate = (error, result) => {
    if (result) {
      setProduct({ ...product, barcode: result.text });
      audio.play();
      window.navigator.vibrate(100);
      setScannerOn(false);
    }
  };

  const clearInputs = () => {
    setProduct({
      title: "",
      barcode: "",
    });
  };

  const submitProduct = (e) => {
    e.preventDefault();
    fetchMethod("post", `/api/user/${user._id}/product/add`, product).then(
      (res) => {
        setProduct({
          title: "",
          barcode: "",
        });
      }
    );
  };

  // console.log("USERID", user._id);

  return (
    <div>
      <div>
        <p className={styles.text}>
          <FormattedMessage
            id="addproduct.page.header.text"
            defaultMessage="Click to scan a product with your camera"
          />
        </p>
      </div>
      <div className={styles.buttons_flex}>
        <Button
          variant="contained"
          color="primary"
          style={{ ...brandBtnStyle, background: "#064960" }}
          onClick={() => setScannerOn(true)}
        >
          <FormattedMessage
            id="addproduct.page.button.scan"
            defaultMessage="Scan"
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ ...brandBtnStyle, background: "#ed5f5f" }}
          onClick={() => {
            setScannerOn(false);
            clearInputs();
          }}
        >
          <FormattedMessage
            id="addproduct.page.button.cancel"
            defaultMessage="Cancel"
          />
        </Button>
      </div>
      {scannerOn && (
        <div className={styles.camera_frame}>
          <div className={styles.barcode_input}>
            <BarcodeScannerComponent width={260} onUpdate={handleUpdate} />
            <TextField
              id="barcode-manual"
              label={
                <FormattedMessage
                  id="addproduct.page.input.manual"
                  defaultMessage="Add barcode manually"
                />
              }
              variant="outlined"
              autoComplete="off"
              classes={{
                root: classes.root,
              }}
              value={product.barcode}
              onChange={(e) => handleInputChange(e, "barcode")}
              fullWidth
            />
          </div>
        </div>
      )}
      {!scannerOn && !product.barcode && (
        <div className={styles.camera_frame}>
          <div className={styles.barcode_input}>
            <div className={styles.video_placeholder}>
              <CameraAltIcon className={styles.camera_icon} />
            </div>
          </div>
        </div>
      )}
      <div>
        <div>
          {product.barcode && (
            <NewProductForm
              product={product}
              setProduct={setProduct}
              onSubmit={submitProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductsPage;
