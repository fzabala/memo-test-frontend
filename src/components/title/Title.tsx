import React from "react";
import styles from "./Title.module.scss";

type TitleProps = {
  text: string;
};

export const Title = ({ text }: TitleProps) => {
  return <h1 className={styles.title}>{text}</h1>;
};
