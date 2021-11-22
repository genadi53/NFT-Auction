import { Grid, Button } from "@mui/material";
import styles from "./ProductActions.module.scss";
import classNames from "classnames";

export default function ProductActions({
  isLive,
  currency,
  buyAmount,
  bidAmount,
  onBuy,
  onBid,
}) {
  return (
    <div className={classNames(styles["product-action"])}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Button
            className={classNames(styles.buttonBuy)}
            variant="contained"
            disabled={!isLive}
            fullWidth
            onClick={onBuy}
          >
            Buy for {buyAmount} {currency}
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            className={classNames(styles.buttonBid)}
            variant="outlined"
            color={"success"}
            disabled={!isLive}
            fullWidth
            onClick={onBid}
          >
            Place bid for {bidAmount} {currency}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
