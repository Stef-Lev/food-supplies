import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeTile.module.css";

function HomeTile({ icon, label, color, href }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div
      className={styles.tile}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <div className={styles.icon_container}>
        <div className={styles.icon}>{icon}</div>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default HomeTile;
