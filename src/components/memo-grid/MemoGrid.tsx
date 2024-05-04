"use client";
import { useQuery } from "@apollo/client";
import { GET_MEMO_TESTS } from "@/graphql";
import styles from "./MemoGrid.module.scss";
import { MemoItem, Loading, ErrorAlert } from "@/components";
import { useLocalStorage } from "usehooks-ts";
import { STORAGE_SESSION_GAME } from "@/constants";
import { useEffect } from "react";

type MemoGridProps = {
  id?: number;
  cards?: CardGameSession[];
};

export const MemoGrid = ({}: MemoGridProps) => {
  const [sessionValue] = useLocalStorage<number[]>(STORAGE_SESSION_GAME, []);
  const { data, loading, error, refetch } = useQuery<{
    getMemoTests: MemoTest[];
  }>(GET_MEMO_TESTS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Loading />;
  if (error) return <ErrorAlert title="Oops :(" text={error.message} />;

  return (
    <div className={styles.memoGrid}>
      {data?.getMemoTests.map((memoTest) => (
        <MemoItem
          inProgress={
            typeof memoTest.active_game_session !== "undefined" &&
            memoTest.active_game_session &&
            sessionValue.indexOf(parseInt(memoTest.active_game_session.id)) !==
              -1
          }
          key={`memo-item-${memoTest.id}`}
          memoTest={memoTest}
        />
      ))}
    </div>
  );
};
