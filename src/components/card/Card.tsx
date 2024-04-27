"use client";
import React, { useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import marioImage from "../../assets/img/mario.png";

type CardProps = {
  flipped?: boolean;
};

export const Card = ({}: CardProps) => {
  const [selected, setSelected] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const onClickHandler = () => {
    if (selected) {
      setFlipped(!flipped);
    } else {
    }
    // if (selected) return false;
    setSelected(!selected);
  };

  return (
    <div
      className={`${styles.card} ${
        selected ? styles["card--selected"] : null
      } ${flipped ? styles["card--flipped"] : null}`}
      onClick={onClickHandler}
    >
      <div className={styles["card-background"]}>?</div>
      <div className={styles["card-front"]}>
        <Image alt="" src={marioImage} fill priority={false} sizes="100vw" />
      </div>
    </div>
  );
};
