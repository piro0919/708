import { NextSeo, NextSeoProps } from "next-seo";

export type SeoProps = Pick<NextSeoProps, "title">;

function Seo({ title }: SeoProps): JSX.Element {
  return <NextSeo title={`${title ? `${title} - ` : ""}7:08`} />;
}

export default Seo;
