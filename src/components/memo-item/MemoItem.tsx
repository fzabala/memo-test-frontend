"use client";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import styles from "./MemoItem.module.scss";

type MemoItemProps = {
  name: string;
  id: number;
};

export const MemoItem = ({ id, name }: MemoItemProps) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/memo/${id}`);
  };

  return (
    <div className={styles.memoItem}>
      <h3 className={styles["memoItem-title"]}>{name}</h3>
      <p className={styles["memoItem-score"]}>Highest score: 500</p>
      <Button onClick={onClickHandler}>Start</Button>
    </div>
  );
};
