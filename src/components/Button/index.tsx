import { MouseEventHandler } from "react";
import styles from "./style.module.scss";

export type ButtonProps = {
  children: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

function Button({
  children,
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps): JSX.Element {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
