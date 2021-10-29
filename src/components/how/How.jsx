import { Grid, Container, Button, Typography, Stack } from "@mui/material";
import HowStep from "./HowStep";
import styles from "./How.module.scss";
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
  link: "https://app.boom.dev/",
};

export default function How({ title, description, link, items = [] }) {
  return (
    <Container className={classNames(styles.container)}>
      <div className={classNames(styles.wrapper)}>
        <Grid container justifyContent="space-between">
          <Grid
            item
            sm={6}
            xs={12}
            className={classNames(styles.leftContainer)}
          >
            <div className={classNames(styles.leftContainerContentWrapper)}>
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
            <div className={classNames(styles.stepsContainer)}>
              {props.items.map((item, idx) => {
                return <HowStep {...item} number={idx + 1} />;
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
// <Typography
//   className={classNames(styles.title)}
//   variant="h2"
//   component="div"
// >
//   {props.title}
// </Typography>
// <Typography
//   className={classNames(styles.description)}
//   variant="body1"
//   component="div"
// >
//   {props.description}
// </Typography>
