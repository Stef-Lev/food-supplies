import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Button from "@material-ui/core/Button";
import soundfile from "../../sounds/blip.mp3";

function AddProductsPage() {
  const [scannerOn, setScannerOn] = useState(false);
  const [code, setCode] = useState([]);
  const audio = new Audio(soundfile);

  const handleUpdate = (error, result) => {
    if (result) {
      setCode(result.text);
      audio.play();
      window.navigator.vibrate(100);
      setScannerOn(false);
    }
  };
  return (
    <div className="home-page">
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
        <div className="camera-frame">
          <BarcodeScannerComponent width={260} onUpdate={handleUpdate} />
        </div>
      )}
      <div>
        <div>{code}</div>
      </div>
    </div>
  );
}

export default AddProductsPage;
