import React, { useState } from "react";
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";
import { chunk } from "lodash";
import CollectorColumn from "./CollectorColumn";
import styles from "./TopCollectors.module.scss";
import classNames from "classnames";

const options = ["Today", "This week", "This month"];

const getArrayToChunks = (array = []) => {
  const arrayToChunk = array.map((element, idx) => ({
    ...element,
    id: idx + 1,
  }));
  return chunk(arrayToChunk, 3);
};

export default function TopCollectors({ collectors = [] }) {
  const [timeOption, setTimeOption] = useState(options[0]);
  const collectorChunks = getArrayToChunks(collectors);

  const handleChange = (event) => {
    setTimeOption(event.target.value);
  };

  return (
    <div className={classNames(styles.container)}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <h1>Top Collectors</h1>
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
        <Grid
          container
          spacing={2}
          className={classNames(styles.CollectorColumns)}
        >
          {collectorChunks.map((chunk, idx) => {
            return (
              <Grid item md={3} xs={12} key={idx}>
                <CollectorColumn items={chunk} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
