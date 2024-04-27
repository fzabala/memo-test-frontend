"use client";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import styles from "./GameOver.module.scss";

type GameOverProps = {
  text: string;
  title: string;
};

export const GameOver = ({ text, title }: GameOverProps) => {
  const router = useRouter();
  const onClickHandler = () => {
    router.push("/");
  };

  return (
    <div className={styles.gameOver}>
      <p className={styles["gameOver-title"]}>{title}</p>
      <p className={styles["gameOver-text"]}>{text}</p>
      <div className={styles["gameOver-buttons"]}>
        <Button onClick={onClickHandler}>Go home</Button>
      </div>
    </div>
  );
};
