import Image from "next/image";
import { MouseEventHandler } from "react";
import { Container, Row, Col } from "react-grid-system";
import styles from "./style.module.scss";
import Article from "components/Article";

type Image = {
  onClick: MouseEventHandler<HTMLDivElement>;
  src: string;
};

export type GalleryTopProps = {
  images: Image[];
};

function GalleryTop({ images }: GalleryTopProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Article heading="GALLERY">
        <Container className={styles.container} fluid={true}>
          <Row className={styles.row} gutterWidth={24}>
            {images.map(({ onClick, src }) => (
              <Col className={styles.col} key={src} md={6} sm={12} xl={4}>
                <div className={styles.imageWrapper} onClick={onClick}>
                  <Image
                    alt={src}
                    layout="fill"
                    objectFit="cover"
                    src={src}
                    unoptimized={true}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Article>
    </div>
  );
}

export default GalleryTop;
