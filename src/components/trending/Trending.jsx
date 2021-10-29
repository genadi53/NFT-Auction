import React, { useState } from "react";
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";
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
    <div className={classNames(styles.trendingContainer)}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <h1 className={classNames(styles.title)}>Trending</h1>
          <FormControl sx={{ margin: 1, minWidth: 240 }}>
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
        </Stack>
        <Grid container spacing={2}>
          {cards.slice(0, 4).map((card, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Card {...card} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
