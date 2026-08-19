import { Metadata } from "next";
import Client from "./client";
import defaultMetadata from "@/lib/defaultMetadata";

const title = "CONTACT";
const description =
  "イラストレーター7:08へのお仕事のご依頼・お問い合わせはこちらからお願いします。";
const url = "/contact";

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

export default function Page(): JSX.Element {
  return <Client />;
}
