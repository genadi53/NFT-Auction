import { useState, useContext } from "react";
import { ProfileFiltersContext } from "../../context/Contexts";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import classNames from "classnames";
import styles from "./ProfileCollectionFilters.module.scss";

export default function ProfileCollectionFilters({ filters }) {
  const [sortFilter, setSortFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const { setSortByFilter, setPriceRangeFilter } = useContext(
    ProfileFiltersContext
  );

  return (
    <div className={classNames(styles["profile-collection-filters"])}>
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
            sx={{ minWidth: "170px" }}
            value={sortFilter}
            onChange={(event) => {
              setSortFilter(event.target.value);
              setSortByFilter(event.target.value);
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
            sx={{ minWidth: "170px" }}
            value={priceFilter}
            onChange={(event) => {
              setPriceFilter(event.target.value);
              setPriceRangeFilter(event.target.value);
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
                  <Search className={classNames(styles["search-icon"])} />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Stack>
    </div>
  );
}
