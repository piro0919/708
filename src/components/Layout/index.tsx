import { useWindowHeight } from "@react-hook/window-size";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Footer from "components/Footer";
import Header from "components/Header";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const onlyHeight = useWindowHeight();
  const [style, setStyle] = useState<CSSProperties>();

  useEffect(() => {
    setStyle({ minHeight: `${onlyHeight}px` });
  }, [onlyHeight]);

  return (
    <div className={styles.wrapper} style={style}>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
