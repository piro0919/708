import NextImage from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback } from "react";
import { Container, Row, Col } from "react-grid-system";
import Slider from "react-slick";
import useMeasure from "react-use-measure";
import styles from "./style.module.scss";
import Article from "components/Article";
import Button, { ButtonProps } from "components/Button";

type TopImage = {
  objectPosition: string;
  src: string;
};

type Work = {
  onClick: MouseEventHandler<HTMLDivElement>;
  src: string;
};

export type TopProps = {
  topImages: TopImage[];
  works: Work[];
};

function Top({ topImages, works }: TopProps): JSX.Element {
  const [ref, { height }] = useMeasure();
  const router = useRouter();
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(() => {
    router.push("/works");
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderWrapper} style={{ height: `${height}px` }}>
        <Slider
          arrows={false}
          autoplay={true}
          autoplaySpeed={5000}
          className={styles.slider}
          infinite={true}
          slidesToScroll={1}
          slidesToShow={1}
          speed={1000}
        >
          {topImages.map(({ objectPosition, src }) => (
            <div className={styles.imageWrapper} key={src} ref={ref}>
              <NextImage
                layout="fill"
                objectFit="cover"
                objectPosition={objectPosition}
                src={src}
                unoptimized={true}
              />
            </div>
          ))}
        </Slider>
      </div>
      <Article heading="WORKS">
        <div className={styles.worksInner}>
          <Container className={styles.container} fluid={true}>
            <Row className={styles.row} gutterWidth={24}>
              {works.map(({ onClick, src }) => (
                <Col className={styles.col} key={src} lg={4} md={6} sm={12}>
                  <div className={styles.imageWrapper2} onClick={onClick}>
                    <NextImage
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      src={src}
                      unoptimized={true}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
          <div className={styles.buttonWrapper}>
            <Button onClick={handleClick}>もっと見る</Button>
          </div>
        </div>
      </Article>
    </div>
  );
}

export default Top;
