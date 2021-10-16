import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { TextField, OutlinedInput } from "@mui/material";
import Search from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Logo from "../logo/Logo";
import styles from "./Header.module.scss";
import classNames from "classnames";

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
