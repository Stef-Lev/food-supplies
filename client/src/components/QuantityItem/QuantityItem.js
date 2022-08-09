import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuantityItem.module.css";

function QuantityItem({ list, quantity, href }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };
  return (
    <div className={styles.container} onClick={() => handleClick()}>
      <div className={styles.list_wrapper}>{list}</div>
      <div className={styles.quantity_wrapper}>{quantity}</div>
    </div>
  );
}

export default QuantityItem;
