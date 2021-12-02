import { Grid, Container } from "@mui/material";
import ProductImage from "./ProductImage.jsx";
import ProductInfo from "./ProductInfo.jsx";
import ProductTabs from "./ProductTabs.jsx";
import ProductActions from "./ProductActions.jsx";
import styles from "./ProductContainer.module.scss";
import classNames from "classnames";

export default function ProductContainer({
  name,
  owner,
  price,
  currency,
  likes,
  auction_end,
  details,
  bids,
  source,
  isLive,
  buyAmount,
  bidAmount,
  onBuy,
  onBid,
  onTimeEnd,
}) {
  return (
    <div className={classNames(styles["product-container"])}>
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <ProductImage url={source.url} />
          </Grid>
          <Grid item xs={5}>
            <ProductInfo
              title={name}
              creator={{
                name: owner.username,
                avatar: owner.avatar.url,
                verified: owner.verified,
              }}
              price={price}
              currency={currency}
              likes={likes}
              timeEnd={auction_end}
              onTimeEnd={onTimeEnd}
              isLive={isLive}
            />
            <ProductTabs text={details} bids={bids} />
            <ProductActions
              isLive={isLive}
              buyAmount={buyAmount}
              bidAmount={bidAmount}
              currency={currency}
              onBuy={onBuy}
              onBid={onBid}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
