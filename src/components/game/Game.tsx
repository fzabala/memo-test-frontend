"use client";
import { useMutation, useQuery } from "@apollo/client";
import {
  COMPLETE_SESSION,
  CREATE_GAME_SESSION_BY_ID,
  GET_MEMO_TEST_BY_ID,
  UPDATE_PROGRESS,
  UPDATE_RETRIES_IN_SESSION,
} from "@/graphql";
import { CardWrapper, GameOver } from "@/components";
import styles from "./Game.module.scss";
import { useLocalStorage } from "usehooks-ts";
import { STORAGE_SESSION_GAME } from "@/constants";
import { useEffect, useState } from "react";

type GameProps = {
  id: number;
};

export const Game = ({ id }: GameProps) => {
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
    updateRetriesInSession,
    {
      error: updateRetriesInSessionError,
      data: updateRetriesInSessionData,
      loading: updateRetriesInSessionLoading,
    },
  ] = useMutation<{ updateRetriesInSession: GameSession }>(
    UPDATE_RETRIES_IN_SESSION,
    {
      variables: { id: parseInt(gameSession?.id as string) },
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
    if (selectedCard.flipped) return false;
    const updatedCards = [...cards];
    updatedCards[index] = { ...selectedCard, selected: true, flipped: true };
    setCards(updatedCards);

    if (typeof selectedCardIndex === "undefined") {
      setSelectedCardIndex(index);
    } else if (selectedCardIndex !== index) {
      updateRetriesInSession().then(() => {
        setTimeout(() => {
          handleCardMatch(index, selectedCardIndex);
        }, 500);
      });
    }
    setUpdatedCard(updatedCards[index]);
  };

  useEffect(() => {
    if (updatedCard) {
      updateProgress()
        .then((a) => console.log({ a }))
        .catch((e) => console.log({ e }));
    }
  }, [updatedCard]);

  useEffect(() => {
    if (cards.length > 0) {
      const selectedCardIndex = cards.findIndex(
        (card) => card.selected && card.flipped
      );
      setSelectedCardIndex(
        selectedCardIndex === -1 ? undefined : selectedCardIndex
      );
      const isGameOver = cards.filter((card) => !card.flipped).length === 0;
      if (isGameOver) {
        setTimeout(() => {
          completeSession().then((session) => {
            setGameSession(session.data?.completeSession as GameSession);
          });
        }, 1000);
      } else {
      }
    }
  }, [cards, gameSession]);

  const handleCardMatch = (index: number, selectedCardIndex: number) => {
    const updatedCards = [...cards];
    const isMatch = cards[index].image.id === cards[selectedCardIndex].image.id;

    updatedCards[index] = {
      ...updatedCards[index],
      selected: false,
      flipped: isMatch,
    };

    updatedCards[selectedCardIndex] = {
      ...updatedCards[selectedCardIndex],
      selected: false,
      flipped: isMatch,
    };

    setUpdatedCard(updatedCards[selectedCardIndex]);

    setCards(updatedCards);
    setSelectedCardIndex(undefined);
  };

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
      {cards.map((card, index) => (
        <CardWrapper
          key={`card-wrapper-${index}`}
          onClick={() => onClickCardHandler(index)}
          card={card}
        />
      ))}
    </div>
  );
};
