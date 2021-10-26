import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Card from "../card/Card";
import styles from "./Trending.module.scss";
import classNames from "classnames";

const options = ["Today", "This week", "This month"];

export default function Trending({ cards = [] }) {
  const [timeOption, setTimeOption] = useState(options[0]);

  const handleChange = (event) => {
    setTimeOption(event.target.value);
  };

  return (
    <>
      <Container className={classNames(styles.container)} maxWidth="xl">
        <Grid container spacing={2} justifyContent="space-between" width="100%">
          <Grid item xs={8}>
            <Typography variant="h2">Trending</Typography>
          </Grid>
          <Grid item xs={4} className={classNames(styles.selectGrid)}>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
              <Select
                value={timeOption}
                onChange={handleChange}
                className={classNames(styles.select)}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <Container className={classNames(styles.container)} maxWidth="xl">
        <Grid container spacing={2} justifyContent="space-around">
          {cards.map((card, idx) => {
            const key = `${idx}_${card.name}`;
            return (
              <Grid item xs={3} key={key}>
                <Card {...card} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
