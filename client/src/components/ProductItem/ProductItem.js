import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { FormattedMessage } from "react-intl";
import styles from "./ProductItem.module.css";
import { format, differenceInDays } from "date-fns";

function ProductItem({ item, onClick }) {
  const checkExpired = () => {
    const today = new Date();
    const expirationDate = new Date(item.expires);
    return differenceInDays(expirationDate, today) < 0;
  };
  const hasExpired = checkExpired();

  const checkAboutToExpire = () => {
    const today = new Date();
    const expirationDate = new Date(item.expires);
    return (
      differenceInDays(expirationDate, today) < 7 &&
      differenceInDays(expirationDate, today) >= 0
    );
  };
  const aboutToExpire = checkAboutToExpire();

  return (
    <div className={styles.product_item}>
      <div>
        <h3 className={styles.product_title}>{item.product.title}</h3>

        <p className={styles.product_subtitle}>
          <FormattedMessage
            id="products.page.item.added"
            defaultMessage="Added"
          />
          {": "}
          <span>{format(new Date(item.added), "dd/MM/yyyy")}</span>
        </p>
        {!hasExpired && !aboutToExpire && (
          <p className={styles.product_subtitle}>
            <FormattedMessage
              id="products.page.item.expires"
              defaultMessage="Expires"
            />
            {": "}
            <span className={styles.product_value}>
              {format(new Date(item.expires), "dd/MM/yyyy")}
            </span>
          </p>
        )}
        {hasExpired && !aboutToExpire && (
          <div className={styles.expired_container}>
            <div className={styles.expired_chip}>
              <FormattedMessage id="generic.expired" defaultMessage="expired" />
            </div>
            <p className={styles.product_value}>
              {format(new Date(item.expires), "dd/MM/yyyy")}
            </p>
          </div>
        )}
        {!hasExpired && aboutToExpire && (
          <div className={styles.expired_container}>
            <div className={styles.about_chip}>about to expire</div>
            <p className={styles.product_value}>
              {format(new Date(item.expires), "dd/MM/yyyy")}
            </p>
          </div>
        )}
      </div>
      <DeleteForeverIcon onClick={() => onClick(item._id, item.product._id)} />
    </div>
  );
}

export default ProductItem;
