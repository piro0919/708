import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import styles from "./style.module.scss";
import Article from "components/Article";

export type AboutTopProps = {
  profile: Document;
};

function AboutTop({ profile }: AboutTopProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Article heading="ABOUT">
        <div>{documentToReactComponents(profile)}</div>
      </Article>
    </div>
  );
}

export default AboutTop;
