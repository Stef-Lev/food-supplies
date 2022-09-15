import React from "react";
import styles from "./BackButton.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useNavigate } from "react-router-dom";

function BackButton({ title }) {
  const navigate = useNavigate();
  return (
    <div className={styles.back_container}>
      <div className={styles.back_icon}>
        <ArrowBackIosIcon onClick={() => navigate(-1)} />
      </div>
      <div className={styles.title}>{title && <h2>{title}</h2>}</div>
    </div>
  );
}

export default BackButton;
