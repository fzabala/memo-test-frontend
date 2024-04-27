import { Card, GameOver, Title } from "../../../components";
import styles from "./page.module.scss";

export default function MemoGame() {
  const gameOver = false;
  return (
    <main className={styles.main}>
      <Title text="Game #1" />
      {gameOver && <GameOver title="Well done!" text="Your score is 1229" />}
      {!gameOver && (
        <div className={styles["main-grid"]}>
          <Card flipped />
          <Card flipped={false} />
          <Card flipped />
          <Card flipped={false} />
          <Card flipped />
          <Card flipped={false} />
          <Card flipped />
          <Card flipped={false} />
        </div>
      )}
    </main>
  );
}
