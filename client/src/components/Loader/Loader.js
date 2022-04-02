import React from "react";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.loader_container}>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
