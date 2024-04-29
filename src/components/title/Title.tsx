import React from "react";
import styles from "./Title.module.scss";

type TitleProps = {
  text: string;
  altText?: string;
};

export const Title = ({ text, altText }: TitleProps) => {
  return (
    <div className={styles.title}>
      <h1 className={styles["title-main"]}>{text}</h1>
      {altText && <h2 className={styles["title-altText"]}>{altText}</h2>}
    </div>
  );
};
