import styles from "./style.module.scss";

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>&copy; 2022 7:08</div>
    </footer>
  );
}

export default Footer;
