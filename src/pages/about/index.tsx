import { createClient, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticProps } from "next";
import AboutTop, { AboutTopProps } from "components/AboutTop";
import Seo from "components/Seo";

export type AboutProps = Pick<AboutTopProps, "profile">;

function About({ profile }: AboutProps): JSX.Element {
  return (
    <>
      <Seo title="ABOUT" />
      <AboutTop profile={profile} />
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const client = createClient({
    apiKey: process.env.MICRO_CMS_API_KEY || "",
    serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN || "",
  });
  const { profile } = await client
    .get<MicroCMSDate & MicroCMS.About>({
      endpoint: "about",
    })
    .then(({ profile }) => ({
      profile,
    }));

  return {
    props: {
      profile,
    },
    revalidate: 60 * 60 * 6,
  };
};

export default About;
