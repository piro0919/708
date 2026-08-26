"use client";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

export type AboutProps = { profile: string };

export default function About({ profile }: AboutProps): JSX.Element {
  return (
    <>
      <h2 className={styles.h2}>ABOUT</h2>
      <div className={styles.wrapper}>
        <motion.div
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
          transition={{
            duration: 0.75,
            ease: "circInOut",
          }}
        >
          <div className={`${styles.profileBlock} pattern-cross-dots-md`}>
            <div className={styles.profileInner}>
              <div>{profile}</div>
              <hr className={styles.hr} />
              <div className={styles.iconsBlock}>
                <motion.div
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.5,
                    ease: "backOut",
                  }}
                >
                  <SocialIcon
                    className={styles.icon}
                    target="_blank"
                    url="https://www.pixiv.net/users/18209835"
                  />
                </motion.div>
                <motion.div
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.5,
                    ease: "backOut",
                  }}
                >
                  <SocialIcon
                    className={styles.icon}
                    target="_blank"
                    url="https://x.com/708_nhh"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
