import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/">
          <a>
            <h1 className={styles.heading1}>7:08</h1>
          </a>
        </Link>
        <div className={styles.linksWrapper}>
          <nav>
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
          </nav>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
