"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { type JSX, useMemo, useState } from "react";
import { CgExternal } from "react-icons/cg";
import ImageGallery from "react-image-gallery";
import { useCounter } from "usehooks-ts";
import Lightbox from "yet-another-react-lightbox";
import styles from "./style.module.scss";
import useWindowWidth from "@/hooks/useWindowWidth";

type Image = {
  url: string;
};

type Work = {
  description: string;
  images: Image[];
  title: string;
  url?: string;
};

export type WorksProps = {
  works: Work[];
};

export default function Works({ works }: WorksProps): JSX.Element {
  const { width } = useWindowWidth();
  const [workIndex, setWorkIndex] = useState<number>();
  const [photoIndex, setPhotoIndex] = useState<number>();
  const columns = useMemo(() => Math.ceil(width / 720), [width]);
  const { count, increment } = useCounter(0);
  const isLoaded = useMemo(
    () => works.map(({ images }) => images).flat().length * 2 === count,
    [count, works],
  );
  const items = useMemo(
    () =>
      works.map(({ description, images, title, url }, index) => (
        <motion.li
          animate={{
            clipPath: `inset(0% ${isLoaded ? 0 : 100}% ${
              isLoaded ? 0 : 100
            }% 0%)`,
          }}
          className={`${styles.item} pattern-cross-dots-md`}
          initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
          key={title}
          style={{ width: `calc((100% - 8px * ${columns - 1}) / ${columns})` }}
          transition={{
            delay: 0.1 * index,
            duration: 0.75,
            ease: "circInOut",
          }}
        >
          <div className={styles.itemInner}>
            <ImageGallery
              items={images.map(({ url }, imageIndex) => ({
                original: url,
                renderItem: ({ original }) => (
                  <div
                    className={styles.imageBlock}
                    onClick={() => {
                      setWorkIndex(index);
                      setPhotoIndex(imageIndex);
                    }}
                  >
                    <Image
                      alt={`${original}?h=405&w=720&fit=min`}
                      fill={true}
                      loading="eager"
                      onLoad={increment}
                      quality={100}
                      src={`${original}?h=405&w=720&fit=min`}
                    />
                  </div>
                ),
                renderThumbInner: ({ original }) => (
                  <div className={styles.imageBlock}>
                    <Image
                      alt={`${original}?h=60&w=100&fit=min`}
                      fill={true}
                      loading="eager"
                      onLoad={increment}
                      quality={100}
                      src={`${original}?h=60&w=100&fit=min`}
                    />
                  </div>
                ),
                thumbnail: url,
              }))}
              lazyLoad={false}
              showFullscreenButton={false}
              showPlayButton={false}
            />
            <hr className={styles.hr} />
            <div className={styles.textsBlock}>
              <div className={styles.titleBlock}>
                <h3 className={styles.h3}>{title}</h3>
                {typeof url === "string" ? (
                  <a href={url} target="_blank">
                    <CgExternal color="#49abb8" size={24} />
                  </a>
                ) : null}
              </div>
              <p>{description}</p>
            </div>
          </div>
        </motion.li>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, isLoaded, works],
  );

  return (
    <>
      <h2 className={styles.h2}>WORKS</h2>
      <ul className={styles.list}>{items}</ul>
      <Lightbox
        close={() => {
          setWorkIndex(undefined);
          setPhotoIndex(undefined);
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={photoIndex}
        open={typeof workIndex === "number" && typeof photoIndex === "number"}
        slides={
          typeof workIndex === "number"
            ? works[workIndex].images.map(({ url }) => ({ src: url }))
            : undefined
        }
        styles={{
          container: {
            backdropFilter: "blur(2px)",
            background: "rgba(255, 255, 255, 0.5)",
          },
        }}
      />
    </>
  );
}
