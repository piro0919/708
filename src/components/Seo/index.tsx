import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";

export type SeoProps = Pick<NextSeoProps, "title">;

function Seo({ title }: SeoProps): JSX.Element {
  const { asPath } = useRouter();

  return (
    <NextSeo
      canonical="https://www.nbhyakuhati.com/"
      description="イラストレーター7:08のオフィシャルサイトです。"
      openGraph={{
        description: "イラストレーター7:08のオフィシャルサイトです。",
        images: [
          {
            alt: "7:08",
            height: 630,
            type: "image/png",
            url: "https://www.nbhyakuhati.com/og-image-01.png",
            width: 1200,
          },
        ],
        site_name: "イラストレーター 7:08 オフィシャルサイト",
        title: `${
          title ? `${title} - ` : ""
        }イラストレーター 7:08 オフィシャルサイト`,
        url: `https://www.nbhyakuhati.com${asPath}`,
      }}
      title={`${
        title ? `${title} - ` : ""
      }イラストレーター 7:08 オフィシャルサイト`}
      twitter={{
        cardType: "summary_large_image",
        handle: "@708_nhh",
      }}
    />
  );
}

export default Seo;
