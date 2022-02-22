import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

function Menu(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/">
              <a>TOP</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/gallery">
              <a>GALLERY</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/works">
              <a>WORKS</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact">
              <a>CONTACT</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <div className={styles.iconsWrapper}>
          <SocialIcon
            className={styles.icon}
            target="_blank"
            url="https://www.pixiv.net/users/18209835"
          />
          <SocialIcon
            className={styles.icon}
            target="_blank"
            url="https://twitter.com/708_nhh"
          />
        </div>
        <footer className={styles.footer}>&copy; 2022 7:08</footer>
      </div>
    </div>
  );
}

export default Menu;
