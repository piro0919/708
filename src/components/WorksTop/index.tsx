import { useWindowWidth } from "@react-hook/window-size";
import ReactHtmlParser from "react-html-parser";
import ImageGallery from "react-image-gallery";
import useBreakpoint from "use-breakpoint";
import styles from "./style.module.scss";
import Article from "components/Article";

const BREAKPOINTS = { desktop: 980, mobile: 375, tablet: 740, wide: 1300 };

type Work = {
  description: string;
  images: string[];
  title: string;
};

export type WorksTopProps = {
  works: Work[];
};

function WorksTop({ works }: WorksTopProps): JSX.Element {
  const onlyWidth = useWindowWidth();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <div className={styles.wrapper}>
      <Article heading="WORKS">
        <ul className={styles.list}>
          {works.map(({ description, images, title }) => (
            <li key={title}>
              <article className={styles.article}>
                <div
                  className={styles.imageGalleryWrapper}
                  style={{
                    width: `${
                      onlyWidth - (breakpoint === "mobile" ? 32 : 48)
                    }px`,
                  }}
                >
                  <ImageGallery
                    additionalClass={
                      // eslint-disable-next-line css-modules/no-undef-class
                      styles.imageGallery
                    }
                    infinite={true}
                    items={images.map((image) => ({
                      original: image,
                      thumbnail: image,
                    }))}
                    showFullscreenButton={false}
                    showPlayButton={false}
                  />
                </div>
                <div className={styles.textsWrapper}>
                  <h3 className={styles.heading3}>{title}</h3>
                  {
                    // eslint-disable-next-line new-cap
                    ReactHtmlParser(description)
                  }
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Article>
    </div>
  );
}

export default WorksTop;
