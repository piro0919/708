"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { type JSX, useMemo, useState } from "react";
import { useCounter } from "usehooks-ts";
import Lightbox from "yet-another-react-lightbox";
import styles from "./style.module.scss";
import useWindowWidth from "@/hooks/useWindowWidth";

type Image = {
  url: string;
};

export type GalleryProps = {
  images: Image[];
};

export default function Gallery({ images }: GalleryProps): JSX.Element {
  const { count, increment } = useCounter(0);
  const [index, setIndex] = useState<number>();
  const { width } = useWindowWidth();
  const columns = useMemo(() => Math.ceil(width / 360), [width]);
  const items = useMemo(
    () =>
      images.map(({ url }, index) => (
        <li key={url}>
          <motion.div
            animate={{ scale: count === images.length ? 1 : 0 }}
            className={styles.imageBlock}
            initial={{ scale: 0 }}
            onClick={() => {
              setIndex(index);
            }}
            transition={{
              delay: 0.1 * index,
              duration: 0.5,
              ease: "backOut",
            }}
          >
            <Image
              alt={`${url}?h=360&w=360&fit=min`}
              fill={true}
              loading="eager"
              onLoad={increment}
              quality={100}
              src={`${url}?h=360&w=360&fit=min`}
            />
          </motion.div>
        </li>
      )),
    [count, images, increment],
  );

  return (
    <>
      <h2 className={styles.h2}>GALLERY</h2>
      <ul
        className={styles.list}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {items}
      </ul>
      <Lightbox
        close={() => {
          setIndex(undefined);
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={index}
        open={typeof index === "number"}
        slides={images.map(({ url }) => ({ src: url }))}
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
