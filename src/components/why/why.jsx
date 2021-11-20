import { Grid, Container, Button, Typography, Stack } from "@mui/material";
import styles from "./why.module.scss";
import classNames from "classnames";
import Link from "../link/Link";

const props = {
  title: "How it works",
  description: `Discover, collect, and sell extraordinary NFTs
        on the world's first & largest NFT marketplace. There are  three things you'll need in place to open your account and start buying or selling NFTs on BUM.`,
  items: [
    {
      title: "Digital Currency",
      description:
        "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
    },
    {
      title: "Digital Currency",
      description:
        "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
    },
    {
      title: "Digital Currency",
      description:
        "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
    },
  ],
};

export default function Why() {
  return (
    <div className={classNames(styles.Why_container)}>
      <div className={classNames(styles.wrapper)}>
        <Grid container justifyContent="space-between">
          <Grid
            item
            sm={6}
            xs={12}
            className={classNames(styles.Why_leftColumn)}
          >
            <div>
              <h1>{props.title}</h1>
              <p>{props.description}</p>
              <Button className={classNames(styles.button)} variant="contained">
                <Link href="/about" className={classNames(styles.link)}>
                  Learn More
                </Link>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className={classNames(styles.Why_infoStack)}>
              {props.items.map((item, idx) => {
                return (
                  <div className={classNames(styles.Info_Container)}>
                    <div className={classNames(styles.Info_iconContainer)}>
                      <div className={classNames(styles.Info_icon)}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className={classNames(styles.Info_detailsContainer)}>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
