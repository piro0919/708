import { MicroCMSListResponse } from "microcms-js-sdk";
import { Metadata } from "next";
import type { JSX } from "react";
import Gallery, { GalleryProps } from "@/components/Gallery";
import client from "@/lib/client";
import defaultMetadata from "@/lib/defaultMetadata";

const title = "GALLERY";
const description =
  "イラストレーター7:08のイラストギャラリーです。これまでに描いた作品をまとめてご覧いただけます。";
const url = "/gallery";

export const metadata: Metadata = {
  alternates: {
    canonical: url,
  },
  description,
  openGraph: {
    ...defaultMetadata.openGraph,
    description,
    title,
    type: "article",
    url,
  },
  title,
  twitter: {
    ...defaultMetadata.twitter,
    description,
    title,
  },
};

type GetGalleryListData = MicroCMSListResponse<MicroCMS.Illustrations>;

async function getGalleryList(): Promise<GetGalleryListData> {
  const response = await client.getList<MicroCMS.Illustrations>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "illustrations",
    queries: {
      fields: "image",
      limit: 100,
      orders: "-tweetDate",
    },
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { contents } = await getGalleryList();
  const images: GalleryProps["images"] = contents.map(({ image: { url } }) => ({
    url,
  }));

  return <Gallery images={images} />;
}
