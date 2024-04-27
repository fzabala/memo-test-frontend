import { Game, Title } from "@/components";
import styles from "./page.module.scss";

type MemoGameProps = {
  params: {
    id: string;
  };
};

export default function MemoGame({ params }: MemoGameProps) {
  return (
    <main className={styles.main}>
      <Title text="Game #1" />
      <Game id={parseInt(params.id)} />
    </main>
  );
}
