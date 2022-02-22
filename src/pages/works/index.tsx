import { createClient } from "contentful";
import { GetStaticProps } from "next";
import Seo from "components/Seo";
import WorksTop, { WorksTopProps } from "components/WorksTop";

export type WorksProps = Pick<WorksTopProps, "works">;

function Works({ works }: WorksProps): JSX.Element {
  return (
    <>
      <Seo title="WORKS" />
      <WorksTop works={works} />
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
