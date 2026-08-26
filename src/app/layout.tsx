// eslint-disable-next-line filenames/match-exported
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import type { Metadata } from "next";
import { Noto_Sans_JP as NotoSansJP } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "pattern.css";
import type { JSX } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "ress";
import "yet-another-react-lightbox/styles.css";
import "./globals.scss";
import "./mq-settings.scss";
import Layout from "@/components/Layout";
import defaultMetadata from "@/lib/defaultMetadata";

const notoSansJP = NotoSansJP({ subsets: ["latin"], weight: "900" });
const url = "https://www.nbhyakuhati.com";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: defaultMetadata.description,
  metadataBase: new URL(url),
  openGraph: defaultMetadata.openGraph,
  title: {
    default: defaultMetadata.siteName,
    template: `%s | ${defaultMetadata.siteName}`,
  },
  twitter: defaultMetadata.twitter,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <NextTopLoader color="#49abb8" />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
