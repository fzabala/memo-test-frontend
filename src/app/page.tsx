import { MemoGrid, Title } from "@/components";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Title text="Memo test" />
      <MemoGrid />
    </main>
  );
}
