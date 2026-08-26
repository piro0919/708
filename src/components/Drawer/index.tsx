import NoSSR from "@mpth/react-no-ssr";
import usePrevious from "@react-hook/previous";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Righteous } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, type JSX, useEffect } from "react";
import ReactModernDrawer from "react-modern-drawer";
import styles from "./style.module.scss";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const prevPathname = usePrevious(pathname);

  useEffect(() => {
    if (!onClose || pathname === prevPathname) {
      return;
    }

    onClose();
  }, [onClose, pathname, prevPathname]);

  return (
    <NoSSR>
      <ReactModernDrawer
        className={styles.drawer}
        direction="top"
        onClose={onClose}
        open={open}
      >
        <nav>
          <ul className={`${styles.list} ${righteous.className}`}>
            <li>
              <Link className={pathname === "/" ? styles.current : ""} href="/">
                TOP
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/gallery" ? styles.current : ""}
                href="/gallery"
              >
                GALLERY
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/works" ? styles.current : ""}
                href="/works"
              >
                WORKS
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/about" ? styles.current : ""}
                href="/about"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/contact" ? styles.current : ""}
                href="/contact"
              >
                CONTACT
              </Link>
            </li>
            <li>
              <Menu
                align="center"
                arrow={true}
                direction="bottom"
                menuButton={<MenuButton>⛩️</MenuButton>}
                transition={true}
              >
                <MenuItem
                  className={`${styles.menuItem} ${
                    pathname === "/fubumikuji/2023" ? styles.current : ""
                  }`}
                  onClick={() => {
                    router.push("/fubumikuji/2023");
                  }}
                >
                  2023
                </MenuItem>
                <MenuItem
                  className={`${styles.menuItem} ${
                    pathname === "/fubumikuji/2022" ? styles.current : ""
                  }`}
                  onClick={() => {
                    router.push("/fubumikuji/2022");
                  }}
                >
                  2022
                </MenuItem>
                <MenuItem
                  className={`${styles.menuItem} ${
                    pathname === "/fubumikuji/2021" ? styles.current : ""
                  }`}
                  onClick={() => {
                    router.push("/fubumikuji/2021");
                  }}
                >
                  2021
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </nav>
      </ReactModernDrawer>
    </NoSSR>
  );
}
