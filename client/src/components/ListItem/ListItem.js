import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import { FormattedMessage } from "react-intl";
import styles from "./ListItem.module.css";

function ListItem({ item, onClick, isEdited }) {
  return (
    <div
      className={`${styles.list_item} ${isEdited && styles.edited}`}
      onClick={() => onClick(item._id)}
    >
      <div className={styles.info}>
        <div
          className={`${styles.icon_container} ${isEdited && styles.edited}`}
        >
          <AssignmentIcon style={{ color: "white" }} />
        </div>
        <div>
          <h3 className={styles.list_title}>{item.listName}</h3>
          <p>
            <em>
              {item.items.length === 0 ? (
                <FormattedMessage
                  id="lists.page.button.noProducts"
                  defaultMessage="No Products"
                />
              ) : (
                <FormattedMessage
                  id="lists.page.button.products"
                  defaultMessage="Products"
                  values={{ number: item.items.length }}
                />
              )}
            </em>
          </p>
        </div>
      </div>
      <div>
        <div className={styles.go_to_icon}>
          {isEdited ? <EditIcon /> : <ChevronRightIcon />}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
