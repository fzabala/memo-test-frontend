"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import styles from "./ErrorAlert.module.scss";

type ErrorAlertProps = {
  text: string;
  title: string;
};

export const ErrorAlert = ({ text, title }: ErrorAlertProps) => {
  const router = useRouter();
  const onClickHandler = () => {
    router.replace("/");
  };

  return (
    <div className={styles.errorAlert}>
      <p className={styles["errorAlert-title"]}>{title}</p>
      <p className={styles["errorAlert-text"]}>{text}</p>
      <div className={styles["errorAlert-buttons"]}>
        <Button onClick={onClickHandler}>Go home</Button>
      </div>
    </div>
  );
};
