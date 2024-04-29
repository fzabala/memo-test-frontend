import React from "react";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <div
        className={styles["loading-circle"]}
        style={{ animationDelay: "-3s" }}
      ></div>
      <div
        className={styles["loading-circle"]}
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className={styles["loading-circle"]}
        style={{ animationDelay: "-1s" }}
      ></div>
      <div
        className={styles["loading-circle"]}
        style={{ animationDelay: "-0s" }}
      ></div>
      <p>Loading...</p>
    </div>
  );
};
