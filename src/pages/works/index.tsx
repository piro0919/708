import { createClient } from "contentful";
import { GetStaticProps } from "next";
import noScroll from "no-scroll";
import { useEffect, useState } from "react";
import Lightbox, { LightboxProps } from "components/Lightbox";
import Seo from "components/Seo";
import WorksTop, { WorksTopProps } from "components/WorksTop";

export type WorksProps = Pick<WorksTopProps, "works">;

function Works({ works }: WorksProps): JSX.Element {
  const [images, setImages] = useState<LightboxProps["images"]>();
  const [photoIndex, setPhotoIndex] = useState<number>();

  useEffect(() => {
    if (typeof photoIndex === "number") {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [photoIndex]);

  useEffect(() => {
    if (typeof photoIndex !== "undefined") {
      return;
    }

    setPhotoIndex(undefined);
  }, [photoIndex]);

  return (
    <>
      <Seo title="WORKS" />
      <WorksTop
        setImages={setImages}
        setPhotoIndex={setPhotoIndex}
        works={works}
      />
      {Array.isArray(images) && typeof photoIndex === "number" ? (
        <Lightbox
          images={images}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      ) : null}
    </>
  );
}

export const getStaticProps: GetStaticProps<WorksProps> = async () => {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    space: process.env.CONTENTFUL_SPACE_ID || "",
  });
  const { works } = await client
    .getEntries<Contentful.IWorksFields>({
      content_type: "works" as Contentful.CONTENT_TYPE,
    })
    .then(({ items }) => ({
      works: items.map(({ fields: { description, images, title } }) => ({
        description,
        title,
        images: images.map(
          ({
            fields: {
              file: { url },
            },
          }) => url
        ),
      })),
    }));

  return {
    props: {
      works,
    },
    revalidate: 60 * 60 * 1,
  };
};

export default Works;
