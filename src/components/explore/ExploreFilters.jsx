import { useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./ExploreFilters.module.scss";
import classNames from "classnames";

export default function ExploreFilters({ filters }) {
  const [sortFilter, setSortFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  return (
    <div className={classNames(styles["explore-filters"])}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <FormControl sx={{ width: "220px" }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            color={"primary"}
            sx={{ minWidth: "170px" }}
            value={sortFilter}
            onChange={(event) => {
              setSortFilter(event.target.value);
            }}
          >
            {filters.sort.map((filter, idx) => {
              return (
                <MenuItem value={filter.value} key={idx}>
                  {filter.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "220px" }}>
          <InputLabel id="price-range-label">Price range</InputLabel>
          <Select
            labelId="price-range-label"
            color={"primary"}
            sx={{ minWidth: "170px" }}
            value={priceFilter}
            onChange={(event) => {
              setPriceFilter(event.target.value);
            }}
          >
            {filters.price.map((price, idx) => {
              return (
                <MenuItem key={idx} value={price.value}>
                  {price.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "340px" }}>
          <TextField
            fullWidth
            className={classNames(styles.search)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  color="secondary"
                  variant="standard"
                >
                  <SearchIcon className={classNames(styles["search-icon"])} />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Stack>
    </div>
  );
}
