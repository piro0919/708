import useSwitch from "@react-hook/switch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import styles from "./style.module.scss";

function ReactBurgerMenu(): JSX.Element {
  const [isOpen, { off: offIsOpen, on: onIsOpen }] = useSwitch(false);
  const { asPath } = useRouter();

  useEffect(() => {
    offIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <div className={styles.wrapper}>
      <Menu
        burgerButtonClassName={styles.burgerButton}
        className={styles.menu}
        crossClassName={styles.cross}
        isOpen={isOpen}
        menuClassName={styles.menu2}
        onClose={offIsOpen}
        onOpen={onIsOpen}
        overlayClassName={styles.overlay}
        right={true}
      >
        <ul className={styles.list}>
          <li>
            <Link href="/works">
              <a>WORKS</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>CONTACT</a>
            </Link>
          </li>
        </ul>
      </Menu>
    </div>
  );
}

export default ReactBurgerMenu;
