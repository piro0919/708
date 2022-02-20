import { ReactNode } from "react";
import styles from "./style.module.scss";

export type ArticleProps = {
  children: ReactNode;
  heading: string;
};

function Article({ children, heading }: ArticleProps): JSX.Element {
  return (
    <article className={styles.article}>
      <h2 className={styles.heading2}>{heading}</h2>
      {children}
    </article>
  );
}

export default Article;
