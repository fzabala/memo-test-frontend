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
  wide?: boolean;
};

export const Button = ({
  children,
  size = "medium",
  variant = "primary",
  wide = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[`button-size--${size}`]} ${wide ? styles[`button--wide`] : ""} ${styles[`button-variant--${variant}`]}`}
    >
      {children}
    </button>
  );
};
