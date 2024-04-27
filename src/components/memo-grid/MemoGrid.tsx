"use client";
import { useQuery } from "@apollo/client";
import { GET_MEMO_TESTS } from "../../graphql";
import styles from "./MemoGrid.module.scss";
import { MemoItem } from "../memo-item";

type MemoGridProps = {
  id?: number;
  cards?: Card[];
};

export const MemoGrid = ({}: MemoGridProps) => {
  const { data, loading, error } = useQuery<{ getMemoTests: MemoTest[] }>(
    GET_MEMO_TESTS
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div className={styles.memoGrid}>
      {data?.getMemoTests.map((memoTest) => (
        <MemoItem key={`memo-item-${memoTest.id}`} memoTest={memoTest} />
      ))}
    </div>
  );
};
