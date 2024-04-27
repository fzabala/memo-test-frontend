"use client";
import { Button } from "../button";
import styles from "./GameOver.module.scss";

type GameOverProps = {
  text: string;
  title: string;
};

export const GameOver = ({ text, title }: GameOverProps) => {
  return (
    <div className={styles.gameOver}>
      <p className={styles["gameOver-title"]}>{title}</p>
      <p className={styles["gameOver-text"]}>{text}</p>
      <div className={styles["gameOver-buttons"]}>
        <Button>Go home</Button>
      </div>
    </div>
  );
};
