import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import styles from "./How.module.scss";
import classNames from "classnames";

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
      title: "Crypto Wallet",
      description:
        "A crypto wallet, such as MetaMask, stores your ETH and processes transactions on the Ethereum blockchain.",
    },
    {
      title: "BUM.",
      description:
        "Let's connect your wallet to BUM, edit your profile, and begin interacting in the space.",
    },
  ],
  link: "https://app.boom.dev/",
};

export default function Header() {
  return (
    <Container>
      <Grid container justifyContent="space-between" spacing={2} width="100%">
        <Grid item alignSelf="flex-start" alignSelf="center" xs={2}>
          <Logo />
        </Grid>

        <Grid item xs={5} alignSelf="center">
          <OutlinedInput
            className={classNames(styles.headerInput)}
            variant="outlined"
            autoComplete="off"
            fullWidth
            placeholder="Find items, users and activities..."
            startAdornment={
              <InputAdornment position="start">
                <Search className={classNames(styles.headerButton)} />
              </InputAdornment>
            }
          />
        </Grid>

        <Grid item flexDirection="row" alignSelf="center" flexWrap="wrap">
          <Button className={classNames(styles.headerButton)}>Home</Button>
          <Button className={classNames(styles.headerButton)}>Activity</Button>
          <Button
            variant="contained"
            className={classNames(styles.headerButton)}
          >
            Explore
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
