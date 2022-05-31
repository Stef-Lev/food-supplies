import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./ProductItem.module.css";
import { format } from "date-fns";

function ProductItem({ item, onClick }) {
  return (
    <div className={styles.product_item}>
      <div>
        <h3 className={styles.product_title}>{item.product.title}</h3>
        <p className={styles.product_subtitle}>
          Added:{" "}
          <span className={styles.product_value}>
            {format(new Date(item.added), "dd/MM/yyyy")}
          </span>
        </p>
        <p className={styles.product_subtitle}>
          Expires:{" "}
          <span className={styles.product_value}>
            {format(new Date(item.expires), "dd/MM/yyyy")}
          </span>
        </p>
      </div>
      <DeleteForeverIcon onClick={() => onClick(item._id)} />
    </div>
  );
}

export default ProductItem;
