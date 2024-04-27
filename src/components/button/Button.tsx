import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {};

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
