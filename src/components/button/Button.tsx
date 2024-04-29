import React from "react";
import styles from "./Button.module.scss";

type ButtonSizeType = "small" | "medium" | "large";
type ButtonVariantType = "primary" | "secondary";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  disabled?: boolean;
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
};

export const Button = ({
  children,
  size = "medium",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[`button-size--${size}`]} ${styles[`button-variant--${variant}`]}`}
    >
      {children}
    </button>
  );
};
