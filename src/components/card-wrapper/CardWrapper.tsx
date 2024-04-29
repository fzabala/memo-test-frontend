"use client";
import React from "react";
import styles from "./CardWrapper.module.scss";
import Image from "next/image";
import marioImage from "../../assets/img/mario.png";

type CardProps = {
  number: number;
  card: CardGameSession;
  onClick: () => void;
};

export const CardWrapper = ({ card, onClick, number }: CardProps) => {
  const onClickHandler = () => {
    onClick();
  };

  return (
    <div
      className={`${styles.card} ${
        card.selected ? styles["card--selected"] : null
      } ${card.flipped ? styles["card--flipped"] : null}`}
      onClick={onClickHandler}
    >
      <div className={styles["card-background"]}>{number}</div>
      <div className={styles["card-front"]}>
        <Image alt="" src={marioImage} fill priority={false} sizes="100vw" />
      </div>
    </div>
  );
};
