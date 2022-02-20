import { createClient, MicroCMSListResponse } from "microcms-js-sdk";
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
    apiKey: process.env.MICRO_CMS_API_KEY || "",
    serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN || "",
  });
  const { works } = await client
    .get<MicroCMSListResponse<MicroCMS.Work>>({
      endpoint: "works",
      queries: { limit: 6 },
    })
    .then(({ contents }) => ({
      works: contents.map(({ description, illustrations, title }) => {
        return {
          description,
          title,
          images: illustrations.map(({ image: { url } }) => `${url}?w=1080`),
        };
      }),
    }));

  return {
    props: {
      works,
    },
    revalidate: 60 * 60 * 6,
  };
};

export default Works;
