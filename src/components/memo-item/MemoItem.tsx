"use client";
import { useRouter } from "next/navigation";
import { Button, ErrorAlert } from "@/components";
import styles from "./MemoItem.module.scss";
import { useMutation } from "@apollo/client";
import { COMPLETE_SESSION } from "@/graphql";
import { useLocalStorage } from "usehooks-ts";
import { STORAGE_SESSION_GAME } from "@/constants";

type MemoItemProps = {
  memoTest: MemoTest;
  inProgressSession?: number;
};

export const MemoItem = ({ memoTest, inProgressSession }: MemoItemProps) => {
  const router = useRouter();
  const [sessionValue, setSessionValue] = useLocalStorage<number[]>(
    STORAGE_SESSION_GAME,
    []
  );

  const [
    completeSession,
    {
      error: completeSessionError,
      data: completeSessionData,
      loading: completeSessionLoading,
    },
  ] = useMutation<{ completeSession: GameSession }>(COMPLETE_SESSION, {
    variables: { id: inProgressSession },
  });

  const onStartClickHandler = () => {
    if (inProgressSession) {
      completeSession().then(() => {
        const updatedSessionValue = [...sessionValue];
        const gameSessionIndex = updatedSessionValue.indexOf(inProgressSession);
        updatedSessionValue.splice(gameSessionIndex, 1);
        setSessionValue(updatedSessionValue);

        router.push(`/memo/${memoTest.id}`);
      });
    } else {
      router.push(`/memo/${memoTest.id}`);
    }
  };

  const onContinueClickHandler = () => {
    router.push(`/memo/${memoTest.id}`);
  };

  if (completeSessionError)
    return <ErrorAlert title="Oops :(" text={completeSessionError.message} />;

  return (
    <div className={styles.memoItem}>
      <h3 className={styles["memoItem-title"]}>{memoTest.name}</h3>
      <p className={styles["memoItem-score"]}>
        Highest score: {memoTest.highest_score}
      </p>
      <Button
        disabled={completeSessionLoading}
        wide
        onClick={onStartClickHandler}
      >
        Start
      </Button>
      <Button
        disabled={completeSessionLoading || !inProgressSession}
        wide
        onClick={onContinueClickHandler}
      >
        Continue
      </Button>
    </div>
  );
};
