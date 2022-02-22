import "../styles/breakpoints.scss";
import "../styles/globals.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-lightbox/style.css";
import "ress";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { setConfiguration } from "react-grid-system";
import Layout from "components/Layout";

setConfiguration({ breakpoints: [375, 740, 980, 1300] });

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
