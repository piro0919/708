"use client";
import { motion } from "framer-motion";
import { useGifController } from "gif-tsx";
import queryString from "query-string";
import { type JSX, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { TwitterShareButton } from "react-share";
import styles from "./style.module.scss";
import fubumikuji from "@/lib/fubumikuji";

export type FubumikujiProps = {
  initialResult?: string;
  year: 2021 | 2022 | 2023 | 2024;
};

export default function Fubumikuji({
  initialResult,
  year,
}: FubumikujiProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvasProps, ...controller } = useGifController(
    `/fubumikuji${year}.gif`,
    canvasRef,
    typeof initialResult !== "string",
  );

  useEffect(() => {
    if (controller.state !== "resolved" || typeof initialResult !== "string") {
      return;
    }

    const frame = fubumikuji[year].indexOf(initialResult);

    controller.renderFrame(frame);
  }, [controller, initialResult, year]);

  return (
    <>
      <h2 className={styles.h2}>{`フブみくじ${year}`}</h2>
      <div className={styles.wrapper}>
        {controller.state === "resolved" ? (
          <div className={styles.inner}>
            <motion.div
              animate={{
                clipPath: `inset(0% ${
                  controller.state === "resolved" ? 0 : 100
                }% ${controller.state === "resolved" ? 0 : 100}% 0%)`,
              }}
              className={styles.fubumikujiWrapper}
              initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
              transition={{
                duration: 0.75,
                ease: "circInOut",
              }}
            >
              <div
                className={`${styles.fubumikujiBlock} pattern-cross-dots-md`}
              >
                <div className={styles.fubumikujiInner}>
                  <motion.div
                    animate={{ scale: 1 }}
                    className={styles.canvasBlock}
                    initial={{ scale: 0 }}
                    onClick={
                      controller.playing ? controller.pause : controller.play
                    }
                    transition={{
                      delay: 0.5,
                      duration: 0.5,
                      ease: "backOut",
                    }}
                  >
                    <canvas
                      {...canvasProps}
                      className={styles.canvas}
                      ref={canvasRef}
                    />
                  </motion.div>
                  <div className={styles.fubumikujiFooter}>
                    {controller.playing ? (
                      <button
                        className={styles.button}
                        onClick={controller.pause}
                      >
                        おみくじをひく
                      </button>
                    ) : (
                      <>
                        <button
                          className={styles.button}
                          onClick={controller.play}
                        >
                          おみくじをふる
                        </button>
                        <TwitterShareButton
                          className={styles.button}
                          hashtags={["絵フブキ", `フブみくじ${year}`]}
                          title={`${fubumikuji[year].at(
                            controller.frameIndex.current +
                              1 -
                              fubumikuji[year].length,
                          )}！`}
                          url={queryString.stringifyUrl({
                            query: {
                              result: fubumikuji[year].at(
                                controller.frameIndex.current +
                                  1 -
                                  fubumikuji[year].length,
                              ),
                            },
                            url: `https://www.nbhyakuhati.com/fubumikuji/${year}`,
                          })}
                        >
                          <div className={styles.button}>ツイートする</div>
                        </TwitterShareButton>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <Oval color="#49abb8" />
        )}
      </div>
    </>
  );
}
