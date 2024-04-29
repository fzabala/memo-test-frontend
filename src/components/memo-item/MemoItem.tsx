"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import styles from "./MemoItem.module.scss";

type MemoItemProps = {
  memoTest: MemoTest;
  inProgress: boolean;
};

export const MemoItem = ({ memoTest, inProgress }: MemoItemProps) => {
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
      <Button onClick={onClickHandler}>
        {inProgress ? "Continue" : "Start"}
      </Button>
    </div>
  );
};
