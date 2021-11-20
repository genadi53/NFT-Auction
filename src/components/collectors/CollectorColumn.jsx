import { Container, Grid } from "@mui/material";
import Collector from "./Collector";
import classNames from "classnames";
import styles from "./CollectorColumn.module.scss";

export default function CollectorColumn({ items = [] }) {
  return (
    <Grid container spacing={2} className={classNames(styles.container)}>
      <Grid item xs={12} className={classNames(styles.collectors)}>
        {items.map((item, idx) => {
          return (
            <Collector
              type={(idx + 1) % 2 === 0 ? "light" : ""}
              {...item}
              key={`${idx + 1}${item.name}`}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
