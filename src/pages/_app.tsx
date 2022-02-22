import "../styles/breakpoints.scss";
import "../styles/globals.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-lightbox/style.css";
import "ress";
import type { AppProps } from "next/app";
import { setConfiguration } from "react-grid-system";
import { Toaster } from "react-hot-toast";
import Layout from "components/Layout";

setConfiguration({ breakpoints: [375, 740, 980, 1300] });

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </Layout>
  );
}

export default MyApp;
