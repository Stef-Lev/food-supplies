import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./ProductItem.module.css";

function ProductItem({ item, onClick }) {
  return (
    <div className={styles.product_item}>
      <div>
        <h3>{item.product.title}</h3>
        <p>Expires:{item.expires}</p>
      </div>
      <DeleteForeverIcon onClick={() => onClick(item._id)} />
    </div>
  );
}

export default ProductItem;
