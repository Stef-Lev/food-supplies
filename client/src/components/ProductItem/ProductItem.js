import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./ProductItem.module.css";

function ProductItem({ item }) {
  return (
    <div className={styles.product_item}>
      <div>
        <h3>{item.product.title}</h3>
        <p>Expires:{item.expires}</p>
      </div>
      <DeleteForeverIcon />
    </div>
  );
}

export default ProductItem;
