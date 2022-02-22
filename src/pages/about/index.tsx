import { createClient } from "contentful";
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
    accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN || "",
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    space: process.env.CONTENTFUL_SPACE_ID || "",
  });
  const { profile } = await client
    .getEntries<Contentful.IAboutFields>({
      content_type: "about" as Contentful.CONTENT_TYPE,
    })
    .then(({ items }) => {
      const {
        fields: { profile },
      } = items[0];

      return {
        profile,
      };
    });

  return {
    props: {
      profile,
    },
    revalidate: 60 * 60 * 1,
  };
};

export default About;
