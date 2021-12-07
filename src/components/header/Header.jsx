import * as React from "react";
import { Grid, Container, Button, Input, InputAdornment } from "@mui/material";
import { TextField, OutlinedInput } from "@mui/material";
import Search from "@mui/icons-material/Search";
import Logo from "../logo/Logo";
import Link from "../link/Link";
import styles from "./Header.module.scss";
import classNames from "classnames";

export default function Header() {
  return (
    <div className={classNames(styles.header)}>
      <Grid container justifyContent="space-evenly" spacing={2} width="100%">
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
          <Button
            href={"/"}
            component={Link}
            className={classNames(styles.headerButton)}
          >
            Home
          </Button>
          <Button
            href={"/activity"}
            component={Link}
            className={classNames(styles.headerButton)}
          >
            Activity
          </Button>
          <Button
            href={"/explore"}
            component={Link}
            variant="contained"
            className={classNames(styles.headerButton)}
          >
            Explore
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
