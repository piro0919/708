import useSwitch from "@react-hook/switch";
import { useWindowHeight } from "@react-hook/window-size";
import { useRouter } from "next/router";
import noScroll from "no-scroll";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { AiOutlineMenu } from "react-icons/ai";
import { animateScroll as scroll } from "react-scroll";
import styles from "./style.module.scss";
import Menu from "components/Menu";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const onlyHeight = useWindowHeight();
  const [style, setStyle] = useState<CSSProperties>();
  const [isOpen, { off: offIsOpen, on: onIsOpen }] = useSwitch(false);
  const ref = useOnclickOutside(() => {
    offIsOpen();
  });
  const { asPath } = useRouter();

  useEffect(() => {
    setStyle({ minHeight: `${onlyHeight}px` });
  }, [onlyHeight]);

  useEffect(() => {
    if (isOpen) {
      noScroll.on();

      return;
    }

    noScroll.off();

    scroll.scrollToTop({
      duration: 0,
    });
  }, [isOpen]);

  useEffect(() => {
    offIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <div className={styles.wrapper}>
      <main
        className={styles.main}
        style={{ ...style, ...{ opacity: isOpen ? 0.5 : 1 } }}
      >
        <div className={styles.inner}>{children}</div>
      </main>
      <div ref={ref}>
        <div className={styles.buttonWrapper}>
          <button onClick={onIsOpen}>
            <AiOutlineMenu size={48} />
          </button>
        </div>
        <div
          className={styles.menuWrapper}
          style={{ transform: `translate(${isOpen ? 0 : "100%"}, 0)` }}
        >
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Layout;
