import React, { useState, useContext } from "react";
import { CollectorsFiltersContext } from "../../context/Contexts";
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Typography,
  InputLabel,
} from "@mui/material";
// import _ from "lodash";
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

export default function TopCollectors({ collectors = [], filters = [] }) {
  const [sortBy, setSortBy] = useState("");
  const { setTopCollectorsFilter } = useContext(CollectorsFiltersContext);
  const collectorChunks = getArrayToChunks(collectors);

  // const res = collectors.map((element, idx) => ({
  //   ...element,
  //   id: idx + 1,
  // }));
  // const collectorChunks = _.chunk(res, 3);

  const handleChange = (event) => {
    setSortBy(event.target.value);
    setTopCollectorsFilter(event.target.value);
  };

  return (
    <div className={classNames(styles.container)}>
      <Container disableGutters>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: "1.25rem" }}
        >
          <Typography variant="h2">Top Collectors</Typography>
          <FormControl sx={{ margin: 1, minWidth: 240 }}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              id="sort-by-label"
              value={sortBy}
              onChange={handleChange}
              className={classNames(styles.select)}
            >
              {filters.map((filter) => {
                return (
                  <MenuItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
