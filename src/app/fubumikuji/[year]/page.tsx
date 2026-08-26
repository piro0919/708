import { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import type { JSX } from "react";
import Fubumikuji from "@/components/Fubumikuji";
import defaultMetadata from "@/lib/defaultMetadata";

const title = "フブみくじ";
const url = "/fubumikuji";

export type PageProps = {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  const { result } = await searchParams;

  return typeof result === "string"
    ? {
        alternates: {
          canonical: queryString.stringify({
            result,
            url: `${url}/${year}`,
          }),
        },
        openGraph: {
          ...defaultMetadata.openGraph,
          images: [
            `https://www.nbhyakuhati.com/fubumikuji${year}${result}.png`,
          ],
          title: `${title}${year}`,
          type: "article",
          url: queryString.stringify({
            result,
            url: `${url}/${year}`,
          }),
        },
        title: `${title}${year}`,
        twitter: {
          ...defaultMetadata.twitter,
          title: `${title}${year}`,
        },
      }
    : {
        alternates: {
          canonical: `${url}/${year}`,
        },
        openGraph: {
          ...defaultMetadata.openGraph,
          title: `${title}${year}`,
          type: "article",
          url: `${url}/${year}`,
        },
        title: `${title}${year}`,
        twitter: {
          ...defaultMetadata.twitter,
          title: `${title}${year}`,
        },
      };
}

export default async function Page({
  params,
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const { year: paramYear } = await params;
  const { result } = await searchParams;
  const year = parseInt(paramYear, 10);

  if (
    (year !== 2021 && year !== 2022 && year !== 2023 && year !== 2024) ||
    (typeof result !== "undefined" && typeof result !== "string")
  ) {
    notFound();
  }

  return <Fubumikuji initialResult={result} year={year} />;
}
