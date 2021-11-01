import { Grid, Container } from "@mui/material";
import User from "../user/User";
import classNames from "classnames";
import styles from "./Collector.module.scss";

export default function Collector({
  id,
  name,
  nftsCount,
  avatar,
  verified,
  type,
}) {
  const containerBgStyle = type === "light" ? "rgba(78, 36, 242, 0.25)" : null;
  const idBgStyle = type === "light" ? "rgba(78, 36, 242, 0.4)" : null;
  // background-color: rgba(78, 36, 242, 0.25);
  return (
    <div
      className={classNames(styles.container)}
      style={{ backgroundColor: containerBgStyle }}
    >
      <Grid container className={classNames(styles.grid)}>
        <Grid
          item
          xs={3}
          className={classNames(styles.id)}
          style={{ backgroundColor: idBgStyle }}
        >
          {id}
        </Grid>
        <Grid item xs={9} className={classNames(styles.userContainer)}>
          <User
            name={name}
            info={`${nftsCount} item${nftsCount > 1 ? "s" : ""}`}
            avatar={avatar}
            verified={verified}
            size={50}
          />
        </Grid>
      </Grid>
    </div>
  );
}
