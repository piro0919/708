import { createClient, MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps } from "next";
import noScroll from "no-scroll";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "react-image-lightbox";
import Seo from "components/Seo";
import Top, { TopProps } from "components/Top";

type Work = {
  src: string;
};

export type PagesProps = Pick<TopProps, "topImages"> & {
  works: Work[];
};

function Pages({ topImages, works: propWorks }: PagesProps): JSX.Element {
  const [photoIndex, setPhotoIndex] = useState<number>();
  const works = useMemo<TopProps["works"]>(
    () =>
      propWorks.map((image, index) => ({
        ...image,
        onClick: (): void => {
          setPhotoIndex(index);
        },
      })),
    [propWorks]
  );

  useEffect(() => {
    if (typeof photoIndex === "number") {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [photoIndex]);

  return (
    <>
      <Seo />
      <Top topImages={topImages} works={works} />
      {typeof photoIndex === "number" ? (
        <Lightbox
          enableZoom={false}
          mainSrc={works[photoIndex].src}
          nextSrc={works[(photoIndex + 1) % works.length].src}
          onCloseRequest={(): void => {
            setPhotoIndex(undefined);
          }}
          onMoveNextRequest={(): void =>
            setPhotoIndex((photoIndex + 1) % works.length)
          }
          onMovePrevRequest={(): void =>
            setPhotoIndex((photoIndex + works.length - 1) % works.length)
          }
          prevSrc={works[(photoIndex + works.length - 1) % works.length].src}
        />
      ) : null}
    </>
  );
}

export const getStaticProps: GetStaticProps<PagesProps> = async () => {
  const client = createClient({
    apiKey: process.env.MICRO_CMS_API_KEY || "",
    serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN || "",
  });
  const [{ topImages }, { works }] = await Promise.all([
    client
      .get<MicroCMSListResponse<MicroCMS.TopIllustration>>({
        endpoint: "top_illustrations",
      })
      .then(({ contents }) => ({
        topImages: contents.map(({ image: { url }, objectPosition }) => ({
          objectPosition,
          src: `${url}?w=1080`,
        })),
      })),
    client
      .get<MicroCMSListResponse<MicroCMS.Work>>({
        endpoint: "works",
        queries: { limit: 6 },
      })
      .then(({ contents }) => ({
        works: contents.map(({ illustrations }) => {
          const {
            image: { url },
          } = illustrations[0];

          return {
            src: url,
          };
        }),
      })),
  ]);

  return {
    props: {
      topImages,
      works,
    },
    revalidate: 60 * 60 * 6,
  };
};

export default Pages;
