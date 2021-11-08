import styles from "./How.module.scss";
import classNames from "classnames";

export default function ProductImage({ url }) {
  return (
    <div className={styles["product-image"]}>
      <img className={classNames(styles.image)} src={url} />
    </div>
  );
}
