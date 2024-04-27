"use client";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GAME_SESSION_BY_ID, GET_MEMO_TEST_BY_ID } from "@/graphql";
import { CardWrapper } from "@/components";
import styles from "./Game.module.scss";
import { useLocalStorage } from "usehooks-ts";
import { STORAGE_SESSION_GAME } from "@/constants";
import { useEffect, useState } from "react";
import { shuffle } from "../../utils";

type GameProps = {
  id: number;
  onGameOver: () => void;
};

export const Game = ({ id, onGameOver }: GameProps) => {
  const [gameSession, setGameSession] = useState<GameSession | undefined>(
    undefined
  );
  const [value, setValue, removeValue] = useLocalStorage<number[]>(
    STORAGE_SESSION_GAME,
    []
  );

  const [cards, setCards] = useState<Card[]>([]);
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
  ] = useMutation<GameSession>(CREATE_GAME_SESSION_BY_ID, {
    variables: { gameId: id },
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
      setGameSession(session.data as GameSession);
    });
  }, [value]);

  useEffect(() => {
    if (memoTestData) {
      const cards = memoTestData.getMemoTestById.images
        .flatMap((e) => [e, e])
        .map((e) => ({ ...e, flipped: false, selected: false }));
      setCards(shuffle<Card>(cards));
    }
  }, [memoTestData]);

  const onClickCardHandler = (index: number) => {
    const selectedCard = cards[index];
    if (selectedCard.flipped) return false;

    if (typeof selectedCardIndex === "undefined") {
      setSelectedCardIndex(index);
      const updatedCards = [...cards];
      updatedCards[index] = { ...selectedCard, selected: true, flipped: true };
      setCards(updatedCards);
    } else if (selectedCardIndex !== index) {
      const updatedCards = [...cards];
      updatedCards[index] = { ...selectedCard, selected: true, flipped: true };
      setCards(updatedCards);

      setTimeout(() => {
        handleCardMatch(index, selectedCardIndex);
      }, 500);
    }
  };

  useEffect(() => {
    if (cards.length > 0) {
      const isGameOver = cards.filter((card) => !card.flipped).length === 0;
      if (isGameOver) {
        setTimeout(() => {
          onGameOver();
        }, 1000);
      }
    }
  }, [cards]);

  const handleCardMatch = (index: number, selectedCardIndex: number) => {
    const updatedCards = [...cards];
    const isMatch = cards[index].id === cards[selectedCardIndex].id;
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
    setCards(updatedCards);
    setSelectedCardIndex(undefined);
  };

  const loading = memoTestLoading || gameSessionLoading;
  const error = memoTestError || gameSessionError || gameSessionError;

  if (loading || !gameSession) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

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
