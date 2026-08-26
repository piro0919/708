"use client";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import arrayShuffle from "array-shuffle";
import { motion } from "framer-motion";
import { Righteous } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type JSX, ReactNode, useEffect, useMemo, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { ToastContainer } from "react-toastify";
import useBreakpoint from "use-breakpoint";
import { useBoolean, useCounter, useEventListener } from "usehooks-ts";
import styles from "./style.module.scss";
import Drawer from "@/components/Drawer";
import useRenderdStore from "@/hooks/useRenderdStore";
import useWindowWidth from "@/hooks/useWindowWidth";
import breakpoints from "@/lib/breakpoints";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

type TilesBlockProps = {
  callback: () => void;
  initial: boolean;
  shuffled: number[];
};

function TilesBlock({
  callback,
  initial,
  shuffled,
}: TilesBlockProps): JSX.Element {
  const { count, increment } = useCounter(0);

  useEffect(() => {
    if (count !== 16) {
      return;
    }

    callback();
  }, [callback, count]);

  return (
    <>
      {Array(16)
        .fill(undefined)
        .map((_, index) => (
          <motion.div
            animate={{ scale: count === 16 ? 1 : 0 }}
            className={styles.tileBlock}
            initial={{ scale: initial ? 0 : 1 }}
            key={index}
            transition={{
              delay:
                0.1 *
                shuffled.findIndex((shuffledIndex) => index === shuffledIndex),
              duration: 0.5,
              ease: "backOut",
            }}
          >
            <Image
              alt={`/top${index}.jpg`}
              fill={true}
              onLoad={increment}
              quality={100}
              src={`/top${index}.jpg`}
            />
          </motion.div>
        ))}
    </>
  );
}

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { breakpoint } = useBreakpoint(breakpoints);
  const { width } = useWindowWidth();
  const [{ column, row }, setTiles] = useState({ column: 0, row: 0 });
  const shuffled = useMemo<TilesBlockProps["shuffled"]>(
    () =>
      arrayShuffle(
        Array(16)
          .fill(undefined)
          .map((_, index) => index),
      ),
    [],
  );
  const { setFalse: offInitial, value: initial } = useBoolean(true);
  const pathname = usePathname();
  const router = useRouter();
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean(false);
  const items = useMemo(
    () =>
      Array(column * row)
        .fill(undefined)
        .map((_, index) => (
          <div className={styles.tilesWrapper} key={index}>
            <TilesBlock
              callback={offInitial}
              initial={initial}
              shuffled={shuffled}
            />
          </div>
        )),
    [column, initial, offInitial, row, shuffled],
  );
  const { onRenderd } = useRenderdStore();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const height = document.documentElement.clientHeight;

    setHeight(height);
  }, []);

  useEventListener("resize", () => {
    const height = document.documentElement.clientHeight;

    setHeight(height);
  });

  useEffect(() => {
    if (height === 0 || width === 0) {
      return;
    }

    let column = 1;

    switch (breakpoint) {
      case "mobile": {
        column = 2;

        break;
      }
      case "tablet": {
        column = 3;

        break;
      }
      case "desktop": {
        column = 4;

        break;
      }
      case "wide": {
        column = Math.ceil(width / 375);

        break;
      }
    }

    setTiles({ column, row: Math.ceil((height / width) * (column - 1)) + 1 });
    onRenderd();
  }, [breakpoint, height, onRenderd, row, width]);

  return (
    <>
      <h1 className={styles.h1}>
        Lv40代 | イラストレーター 7:08 オフィシャルサイト
      </h1>
      <div className={`${styles.wrapper} pattern-cross-dots-md`}>
        <div
          className={styles.tilesListWrapper}
          key={`${height}${width}`}
          style={{
            gridTemplateColumns: `repeat(${column}, 1fr)`,
            width: `calc(100% / (${column} - 1) * ${column})`,
          }}
        >
          {items}
        </div>
        <div className={styles.frameBackWrapper}>
          <div className={styles.frameBlock} style={{ height }} />
        </div>
        <div className={styles.contentBlock}>
          <header className={`${styles.header} ${righteous.className}`}>
            <nav className={styles.nav}>
              <Link className={pathname === "/" ? styles.current : ""} href="/">
                TOP
              </Link>
              <div className={styles.separator} />
              <Link
                className={pathname === "/gallery" ? styles.current : ""}
                href="/gallery"
              >
                GALLERY
              </Link>
              <div className={styles.separator} />
              <Link
                className={pathname === "/works" ? styles.current : ""}
                href="/works"
              >
                WORKS
              </Link>
              <div className={styles.separator} />
              <Link
                className={pathname === "/about" ? styles.current : ""}
                href="/about"
              >
                ABOUT
              </Link>
              <div className={styles.separator} />
              <Link
                className={pathname === "/contact" ? styles.current : ""}
                href="/contact"
              >
                CONTACT
              </Link>
              <div className={styles.separator} />
              <Menu
                align="center"
                arrow={true}
                direction="bottom"
                menuButton={<MenuButton>⛩️</MenuButton>}
                transition={true}
              >
                <MenuItem
                  className={`${styles.menuItem} ${
                    pathname === "/fubumikuji/2024" ? styles.current : ""
                  }`}
                  onClick={() => {
                    router.push("/fubumikuji/2024");
                  }}
                >
                  2024
                </MenuItem>
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
            </nav>
            <div className={styles.mobileHeaderInner}>
              <button onClick={onIsOpen}>
                <CgMenuRightAlt size={24} />
              </button>
            </div>
          </header>
          <main>{children}</main>
          <footer className={styles.footer}>&copy; 2022 Lv40代</footer>
        </div>
        <div className={styles.frameUpperWrapper}>
          <div className={styles.frameBlock} style={{ height }} />
        </div>
        <div className={styles.frameLowerWrapper}>
          <div className={styles.frameBlock} style={{ height }} />
        </div>
      </div>
      <div className={styles.drawerBlock}>
        <Drawer onClose={offIsOpen} open={isOpen} />
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}
