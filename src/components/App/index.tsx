"use client";
import arrayShuffle from "array-shuffle";
import { motion } from "framer-motion";
import { M_PLUS_1 as MPlus1 } from "next/font/google";
import Image from "next/image";
import { type JSX, useMemo } from "react";
import Spacer from "react-spacer";
import styles from "./style.module.scss";
import useRenderdStore from "@/hooks/useRenderdStore";

const mPlus1 = MPlus1({ subsets: ["latin"], weight: "700" });

export default function App(): JSX.Element {
  const index = useMemo(
    () =>
      arrayShuffle(
        Array(16)
          .fill(undefined)
          .map((_, index) => index),
      )[0],
    [],
  );
  const { renderd } = useRenderdStore();

  return (
    <div className={styles.wrapper}>
      <motion.div
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        transition={{
          delay: 1 - (renderd ? 1 : 0),
          duration: 0.75,
          ease: "circInOut",
        }}
      >
        <div className={styles.topBlock}>
          <div className={styles.upperBlock}>
            <div className={styles.titleBlock}>
              <motion.div
                animate={{ transform: "translate(0, 0)" }}
                className={styles.titleInner}
                initial={{ transform: "translate(0, -100%)" }}
                transition={{
                  delay: 1.2 - (renderd ? 1 : 0),
                  duration: 0.75,
                  ease: "backOut",
                }}
              >
                <div className={`${styles.title} ${mPlus1.className}`}>
                  Lv40代
                </div>
              </motion.div>
            </div>
            <Spacer grow={2} />
            <motion.div
              animate={{ scale: 1 }}
              className={styles.imageBlock}
              initial={{ scale: 0 }}
              transition={{
                delay: 1.8 - (renderd ? 1 : 0),
                duration: 0.5,
                ease: "backOut",
              }}
            >
              <Image
                alt={`/top${index}.jpg`}
                fill={true}
                quality={100}
                src={`/top${index}.jpg`}
              />
            </motion.div>
            <Spacer grow={1} />
          </div>
          <motion.hr
            animate={{ width: "100%" }}
            className={styles.hr}
            initial={{ width: 0 }}
            transition={{
              delay: 1.2 - (renderd ? 1 : 0),
              duration: 0.75,
              ease: "circInOut",
            }}
          />
          <div className={styles.subTitleBlock}>
            <motion.div
              animate={{ transform: "translate(0, 0)" }}
              initial={{ transform: "translate(0, -100%)" }}
              transition={{
                delay: 1.5 - (renderd ? 1 : 0),
                duration: 0.5,
                ease: "backOut",
              }}
            >
              <div className={styles.subTitle}>
                イラストレーター 7:08 オフィシャルサイト
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
