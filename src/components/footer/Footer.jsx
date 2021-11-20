import { Grid, Button } from "@mui/material";
import Logo from "../logo/Logo";
import styles from "./Footer.module.scss";
import classNames from "classnames";

export default function Footer() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      padding={0}
    >
      <Grid item>
        <Logo type={"muted"} />
      </Grid>

      <Grid item textAlign="center">
        <p className={classNames(styles.copyright)}>All Rights Reserved 2021</p>
      </Grid>

      <Grid item>
        <Button
          sx={{
            paddingLeft: "0px",
            paddingRight: "10px",
          }}
          className={classNames(styles.footerButton)}
        >
          Privacy Policy
        </Button>
        <Button
          sx={{
            paddingLeft: "10px",
            paddingRight: "0px",
          }}
          className={classNames(styles.footerButton)}
        >
          Cookie Policy
        </Button>
      </Grid>
    </Grid>
  );
}
