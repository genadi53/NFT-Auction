import { Typography } from "@mui/material";
import styles from "./ProductInfoTitle.module.scss";
import classNames from "classnames";

export default function ProductInfoTitle({ text }) {
  return (
    <div className={styles["product-info-title"]}>
      <Typography variant={"h1"} className={classNames(styles.title)}>
        {text}
      </Typography>
    </div>
  );
}
