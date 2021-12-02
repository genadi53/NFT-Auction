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
import styles from "./ActivityFilters.module.scss";
import classNames from "classnames";

export default function ActivityFilters({ filters }) {
  const [sortBy, setSortBy] = useState("");
  const [type, setType] = useState("");

  return (
    <div className={classNames(styles["activity-filters"])}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <FormControl sx={{ minWidth: "12.5rem" }}>
          <InputLabel id="sort-by-label" sx={{ paddingLeft: "10px" }}>
            Sort by
          </InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            color={"primary"}
            className={classNames(styles.select)}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {filters.sort.map((filter) => {
              return (
                <MenuItem key={filter.label} value={filter.value}>
                  {filter.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: "12.5rem" }}>
          <InputLabel
            id="type-label"
            sx={{ paddingLeft: "10px" }}
            className={classNames(styles.label)}
          >
            Type
          </InputLabel>
          <Select
            labelId="type-label"
            value={type}
            color={"primary"}
            className={classNames(styles.select)}
            onChange={(e) => setType(e.target.value)}
          >
            {filters.type.map((filter) => {
              return (
                <MenuItem key={filter.label} value={filter.value}>
                  {filter.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: "15rem" }}>
          <TextField
            fullWidth
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
              className: styles.search,
            }}
          />
        </FormControl>
      </Stack>
    </div>
  );
}
