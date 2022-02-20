import "../styles/breakpoints.scss";
import "../styles/globals.scss";
import "../styles/react-burger-menu.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-lightbox/style.css";
import "ress";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import ReactBurgerMenu from "components/ReactBurgerMenu";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactBurgerMenu />
    </>
  );
}

export default MyApp;
