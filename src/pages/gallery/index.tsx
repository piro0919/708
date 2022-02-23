import { createClient } from "contentful";
import { GetStaticProps } from "next";
import noScroll from "no-scroll";
import { useEffect, useMemo, useState } from "react";
import GalleryTop, { GalleryTopProps } from "components/GalleryTop";
import Lightbox from "components/Lightbox";
import Seo from "components/Seo";

export type GalleryProps = {
  images: string[];
};

function Gallery({ images: propImages }: GalleryProps): JSX.Element {
  const [photoIndex, setPhotoIndex] = useState<number>();
  const images = useMemo<GalleryTopProps["images"]>(
    () =>
      propImages.map((src, index) => ({
        src,
        onClick: (): void => {
          setPhotoIndex(index);
        },
      })),
    [propImages]
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
      <Seo title="GALLERY" />
      <GalleryTop images={images} />
      {typeof photoIndex === "number" ? (
        <Lightbox
          images={propImages}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      ) : null}
    </>
  );
}

export const getStaticProps: GetStaticProps<GalleryProps> = async () => {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    space: process.env.CONTENTFUL_SPACE_ID || "",
  });
  const { images } = await client
    .getEntries<Contentful.IIllustrationsFields>({
      content_type: "illustrations" as Contentful.CONTENT_TYPE,
    })
    .then(({ items }) => ({
      images: items.map(
        ({
          fields: {
            image: {
              fields: {
                file: { url },
              },
            },
          },
        }) => url
      ),
    }));

  return {
    props: {
      images,
    },
    revalidate: 60 * 60 * 1,
  };
};

export default Gallery;
