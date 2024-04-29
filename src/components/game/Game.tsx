"use client";
import { useMutation, useQuery } from "@apollo/client";
import {
  COMPLETE_SESSION,
  CREATE_GAME_SESSION_BY_ID,
  GET_MEMO_TEST_BY_ID,
  UPDATE_PROGRESS,
} from "@/graphql";
import { CardWrapper, GameOver, Title } from "@/components";
import styles from "./Game.module.scss";
import { useLocalStorage } from "usehooks-ts";
import { STORAGE_SESSION_GAME } from "@/constants";
import { useEffect, useState } from "react";

type GameProps = {
  id: number;
};

export const Game = ({ id }: GameProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameSession, setGameSession] = useState<GameSession | undefined>(
    undefined
  );
  const [value, setValue, removeValue] = useLocalStorage<number[]>(
    STORAGE_SESSION_GAME,
    []
  );

  const [cards, setCards] = useState<CardGameSession[]>([]);
  const [updatedCard, setUpdatedCard] = useState<CardGameSession | undefined>(
    undefined
  );

  const [selectedCardIndex, setSelectedCardIndex] = useState<
    number | undefined
  >(undefined);

  const [
    createGameSession,
    {
      error: gameSessionError,
      data: gameSessionData,
      loading: gameSessionLoading,
    },
  ] = useMutation<{ createGameSession: GameSession }>(
    CREATE_GAME_SESSION_BY_ID,
    {
      variables: { gameId: id },
    }
  );

  const [
    completeSession,
    {
      error: completeSessionError,
      data: completeSessionData,
      loading: completeSessionLoading,
    },
  ] = useMutation<{ completeSession: GameSession }>(COMPLETE_SESSION, {
    variables: { id: parseInt(gameSession?.id as string) },
  });

  const [
    updateProgress,
    {
      error: updateProgressError,
      data: updateProgressData,
      loading: updateProgressLoading,
    },
  ] = useMutation<{ updateProgress: GameSession }>(UPDATE_PROGRESS, {
    variables: {
      id: parseInt(updatedCard?.id as string),
      flipped: updatedCard?.flipped,
      selected: updatedCard?.selected,
    },
  });

  const {
    data: memoTestData,
    loading: memoTestLoading,
    error: memoTestError,
  } = useQuery<{ getMemoTestById: MemoTest }>(GET_MEMO_TEST_BY_ID, {
    variables: { id },
    skip: !gameSession,
  });

  useEffect(() => {
    createGameSession().then((session) => {
      setGameSession(session.data?.createGameSession as GameSession);
    });
  }, [value]);

  useEffect(() => {
    if (gameSession) {
      setCards(gameSession.cardsGameSession);
    }
  }, [gameSession]);

  const onClickCardHandler = (index: number) => {
    const selectedCard = cards[index];
    if (selectedCard.flipped || isAnimating) return false;
    const updatedCards = [...cards];
    updatedCards[index] = { ...selectedCard, selected: true, flipped: true };
    setCards(updatedCards);

    if (typeof selectedCardIndex === "undefined") {
      setSelectedCardIndex(index);
    } else if (selectedCardIndex !== index) {
    }
    setUpdatedCard(updatedCards[index]);
  };

  useEffect(() => {
    if (updatedCard) {
      setIsAnimating(true);
      updateProgress().then((session) => {
        setTimeout(() => {
          setIsAnimating(false);
          setGameSession(session.data?.updateProgress as GameSession);
        }, 500);
      });
    }
  }, [updatedCard]);

  useEffect(() => {
    if (cards.length > 0 && gameSession?.state !== "COMPLETED") {
      const selectedCardIndex = cards.findIndex(
        (card) => card.selected && card.flipped
      );
      setSelectedCardIndex(
        selectedCardIndex === -1 ? undefined : selectedCardIndex
      );
      const isGameOver = cards.filter((card) => !card.flipped).length === 0;
      if (isGameOver) {
        setIsAnimating(true);
        setTimeout(() => {
          completeSession().then((session) => {
            setIsAnimating(false);
            setGameSession(session.data?.completeSession as GameSession);
          });
        }, 1000);
      } else {
      }
    }
  }, [cards, gameSession]);

  const loading = memoTestLoading || gameSessionLoading;
  const error = memoTestError || gameSessionError || gameSessionError;

  if (loading || !gameSession) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  if (gameSession.state === "COMPLETED") {
    return (
      <GameOver
        title="Well done!"
        text={`Your score is ${gameSession.score}`}
      />
    );
  }

  return (
    <div className={styles.memoGame}>
      <Title
        text={`Game #${memoTestData?.getMemoTestById.id}`}
        altText={memoTestData?.getMemoTestById.name}
      />
      <div className={styles["memoGame-wrapper"]}>
        {cards.map((card, index) => (
          <CardWrapper
            number={index + 1}
            key={`card-wrapper-${index}`}
            onClick={() => onClickCardHandler(index)}
            card={card}
          />
        ))}
      </div>
    </div>
  );
};
