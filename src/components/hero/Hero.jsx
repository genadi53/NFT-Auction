import { Typography } from "@mui/material";
import classNames from "classnames";
import styles from "./Hero.module.scss";

export default function Hero({ text }) {
  return (
    <div className={classNames(styles.hero)}>
      <Typography variant={"h1"} className={classNames(styles.text)}>
        {text}
      </Typography>
    </div>
  );
}
