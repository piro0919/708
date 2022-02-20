import { MouseEventHandler } from "react";
import styles from "./style.module.scss";

export type ButtonProps = {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
