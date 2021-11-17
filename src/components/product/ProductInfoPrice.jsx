import styles from "./ProductInfoPrice.module.scss";
import classNames from "classnames";

export default function ProductInfoPrice({ amount = 0, currency }) {
  return (
    <div className={styles["product-info-price"]}>
      <p className={classNames(styles.priceText)}>
        On Sale For {amount} {currency}
      </p>
    </div>
  );
}
