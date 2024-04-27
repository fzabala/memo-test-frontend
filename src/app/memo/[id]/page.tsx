"use client";
import { useState } from "react";
import { Game, GameOver, Title } from "../../../components";
import styles from "./page.module.scss";

type MemoGameProps = {
  params: {
    id: string;
  };
};

export default function MemoGame({ params }: MemoGameProps) {
  const [gameOver, setGameOver] = useState(false);
  const onGameOverHandler = () => {
    setGameOver(true);
  };

  return (
    <main className={styles.main}>
      <Title text="Game #1" />
      {gameOver && <GameOver title="Well done!" text="Your score is 1229" />}
      {!gameOver && (
        <Game id={parseInt(params.id)} onGameOver={onGameOverHandler} />
      )}
    </main>
  );
}
