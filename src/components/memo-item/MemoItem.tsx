import { Button } from "../button";
import styles from "./MemoItem.module.scss";

type MemoItemProps = {
  name: string;
};

export const MemoItem = ({ name }: MemoItemProps) => {
  return (
    <div className={styles.memoItem}>
      <h3 className={styles["memoItem-title"]}>{name}</h3>
      <p className={styles["memoItem-score"]}>Highest score: 500</p>
      <Button>Start</Button>
    </div>
  );
};
