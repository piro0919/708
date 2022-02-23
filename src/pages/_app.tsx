import "../styles/breakpoints.scss";
import "../styles/globals.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-lightbox/style.css";
import "ress";
import type { AppProps } from "next/app";
import Head from "next/head";
import { setConfiguration } from "react-grid-system";
import { Toaster } from "react-hot-toast";
import Layout from "components/Layout";

setConfiguration({ breakpoints: [375, 740, 980, 1300] });

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </Layout>
    </>
  );
}

export default MyApp;
