import ReactHtmlParser from "react-html-parser";
import styles from "./style.module.scss";
import Article from "components/Article";

export type AboutTopProps = {
  profile: string;
};

function AboutTop({ profile }: AboutTopProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Article heading="ABOUT">
        {
          // eslint-disable-next-line new-cap
          ReactHtmlParser(profile)
        }
      </Article>
    </div>
  );
}

export default AboutTop;
