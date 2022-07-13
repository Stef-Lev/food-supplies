import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./ListItem.module.css";

function ListItem({
  data,
  icon,
  onClick,
  isEdited,
  title,
  withDescription,
  description = "",
}) {
  return (
    <div
      className={`${styles.list_item} ${isEdited && styles.edited}`}
      onClick={() => onClick(data._id)}
    >
      <div className={styles.info}>
        <div
          className={`${styles.icon_container} ${isEdited && styles.edited}`}
        >
          {icon}
        </div>
        <div className={styles.text_container}>
          <h3 className={styles.list_title}>{title}</h3>
          {withDescription && (
            <p>
              <em>{description}</em>
            </p>
          )}
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
