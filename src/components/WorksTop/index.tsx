import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { useWindowWidth } from "@react-hook/window-size";
import { Dispatch, SetStateAction } from "react";
import ImageGallery from "react-image-gallery";
import useBreakpoint from "use-breakpoint";
import styles from "./style.module.scss";
import Article from "components/Article";

const BREAKPOINTS = { desktop: 980, mobile: 375, tablet: 740, wide: 1300 };

type Work = {
  description: Document;
  images: string[];
  title: string;
};

export type WorksTopProps = {
  setImages: Dispatch<SetStateAction<string[] | undefined>>;
  setPhotoIndex: Dispatch<SetStateAction<number | undefined>>;
  works: Work[];
};

function WorksTop({
  setImages,
  setPhotoIndex,
  works,
}: WorksTopProps): JSX.Element {
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
                    onClick={({ target }): void => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const src = (target as any).src;
                      const index = images.findIndex((image) =>
                        (src as string).endsWith(image)
                      );

                      setImages(images);
                      setPhotoIndex(index);
                    }}
                    showFullscreenButton={false}
                    showPlayButton={false}
                  />
                </div>
                <div className={styles.textsWrapper}>
                  <h3 className={styles.heading3}>{title}</h3>
                  <div>{documentToReactComponents(description)}</div>
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
