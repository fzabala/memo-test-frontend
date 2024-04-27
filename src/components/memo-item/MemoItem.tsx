"use client";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import styles from "./MemoItem.module.scss";

type MemoItemProps = {
  memoTest: MemoTest;
};

export const MemoItem = ({ memoTest }: MemoItemProps) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/memo/${memoTest.id}`);
  };

  return (
    <div className={styles.memoItem}>
      <h3 className={styles["memoItem-title"]}>{memoTest.name}</h3>
      <p className={styles["memoItem-score"]}>
        Highest score: {memoTest.highest_score}
      </p>
      <Button onClick={onClickHandler}>Start</Button>
    </div>
  );
};
