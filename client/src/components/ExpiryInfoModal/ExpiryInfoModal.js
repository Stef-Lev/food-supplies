import React from "react";
import styles from "./ExpiryInfoModal.module.css";
import Modal from "@material-ui/core/Modal";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import { format } from "date-fns";
import { FormattedMessage } from "react-intl";

function ExpiryInfoModal({ isOpen, onClose, products }) {
  console.log(products);

  const showAboutToExpire = (items) => {
    return items.map((item, index) => (
      <div key={`list_${index + 1}`} className={styles.list}>
        <p className={styles.list_title}>{item.name}</p>
        {item.products.map((item, index) => (
          <p key={`product_${index + 1}`}>
            {item.product.title}
            {" - "}
            <span className={styles.list_expiry}>
              {format(new Date(item.expires), "dd/MM/yyyy")}
            </span>
          </p>
        ))}
      </div>
    ));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.overlay}
      open={isOpen}
      onClose={onClose}
      style={{ outline: "none" }}
    >
      <div className={styles.container}>
        <div className={styles.close_icon_wrapper}>
          <CloseIcon
            style={{ width: "22px", height: "22px" }}
            onClick={onClose}
          />
        </div>
        <div className={styles.warning_icon}>
          <WarningIcon style={{ width: "50px", height: "50px" }} />
        </div>
        <p className={styles.list_title}>
          <FormattedMessage
            id="modal.expiry.title"
            defaultMessage="The following products are going to expire soon"
          />
        </p>
        <hr />
        {showAboutToExpire(products)}
      </div>
    </Modal>
  );
}

export default ExpiryInfoModal;
