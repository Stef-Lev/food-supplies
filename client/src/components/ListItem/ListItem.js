import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AssignmentIcon from "@material-ui/icons/Assignment";
import styles from "./ListItem.module.css";

function ListItem({ item, onClick, isEdited }) {
  return (
    <div className={`${styles.list_item} ${isEdited && styles.edited}`}>
      <div className={styles.info}>
        <div
          className={`${styles.icon_container} ${isEdited && styles.edited}`}
        >
          <AssignmentIcon style={{ color: "white" }} />
        </div>
        <div>
          {isEdited && (
            <input
              className={styles.edited_name}
              type="text"
              value={item.listName}
              onChange={(e) => console.log(e.target.value)}
            />
          )}
          {!isEdited && <h3 className={styles.list_title}>{item.listName}</h3>}

          <p>
            <em>{`${item.items.length || "No"} products`}</em>
          </p>
        </div>
      </div>
      <div>
        <div className={styles.go_to_icon} onClick={() => onClick(item._id)}>
          {isEdited ? <CancelIcon /> : <ChevronRightIcon />}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
