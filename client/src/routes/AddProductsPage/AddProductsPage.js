import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Button from "@material-ui/core/Button";
import NewProductForm from "../../components/NewProductForm/NewProductForm";
import TextField from "@material-ui/core/TextField";
import { fetchMethod } from "../../utils/fetchMethod";
import soundfile from "../../sounds/blip.mp3";
import styles from "./AddProductsPage.module.css";

function AddProductsPage() {
  const [scannerOn, setScannerOn] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    barcode: "",
    imageUrl: "",
  });
  const audio = new Audio(soundfile);

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

  const submitProduct = (e) => {
    e.preventDefault();
    fetchMethod("post", "/api/product/add", product).then((res) => {
      console.log(res);
      setProduct({
        title: "",
        barcode: "",
        imageUrl: "",
      });
    });
  };

  return (
    <div className={styles.color}>
      <Button
        variant="contained"
        color="primary"
        style={{ background: "green" }}
        onClick={() => setScannerOn(true)}
      >
        SCAN
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setScannerOn(false)}
      >
        CANCEL
      </Button>
      {scannerOn && (
        <div className={styles.camera_frame}>
          {/* <div className={styles.barcode_target}>
            <div className={styles.target_frame}></div>
          </div> */}

          <div className={styles.barcode_input}>
            <BarcodeScannerComponent width={260} onUpdate={handleUpdate} />
            <TextField
              id="barcode-manual"
              label="Add barcode manually"
              variant="outlined"
              autoComplete="off"
              value={product.barcode}
              onChange={(e) => handleInputChange(e, "barcode")}
              fullWidth
            />
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
