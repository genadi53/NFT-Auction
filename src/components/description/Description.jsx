import { Typography, Container } from "@mui/material";
import classNames from "classnames";
import styles from "./Description.module.scss";

export default function Description({ text, image }) {
  return (
    <div className={classNames(styles.description)}>
      <Container className={classNames(styles.container)}>
        <Typography variant={"body1"} className={classNames(styles.text)}>
          {text}
        </Typography>
        <img src={image} className={classNames(styles.image)} />
      </Container>
    </div>
  );
}
