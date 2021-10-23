import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Logo from "../logo/Logo";
import styles from "./Footer.module.scss";
import classNames from "classnames";

export default function Footer({ muted }) {
  return (
    <Container className={classNames(styles.container)} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Logo type={muted} />
        </Grid>

        <Grid item xs={4} textAlign="center">
          <p className={classNames(styles.copyright)}>
            All Rights Reserved 2021
          </p>
        </Grid>

        <Grid item xs={4}>
          <Button className={classNames(styles.footerButton)}>
            Privacy Policy
          </Button>
          <Button className={classNames(styles.footerButton)}>
            Cookie Policy
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
