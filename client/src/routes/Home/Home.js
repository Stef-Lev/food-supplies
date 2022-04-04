import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Home() {
  const [scan, setScan] = useState(false);
  const [logs, setLog] = useState([]);

  const barcodeScannerComponentHandleUpdate = (error, result) => {
    if (result) {
      setLog([...logs, result.text]);
      window.navigator.vibrate(100);
      setScan(false);
    }
  };

  return (
    <div className="home-page">
      <button onClick={() => setScan(true)}>SCAN</button>
      <button onClick={() => setScan(false)}>CANCEL</button>
      {scan && (
        <div className="camera-frame">
          <BarcodeScannerComponent
            width={260}
            onUpdate={barcodeScannerComponentHandleUpdate}
          />
        </div>
      )}
      <div>
        {logs.map((log) => (
          <div key={log}>{log}</div>
        ))}
        <button onClick={() => setLog([])}>CLEAR</button>
      </div>
    </div>
  );
}

export default Home;
