import React, { useState, useContext } from "react";
import { ActionsFiltersContext } from "../../context/Contexts";
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";
import Card from "../card/Card";
import styles from "./Auctions.module.scss";
import classNames from "classnames";

export default function Auctions({ cards = [], filters = [] }) {
  const [priceRange, setPriceRange] = useState("");
  const { setLiveAuctionsFilterValue } = useContext(ActionsFiltersContext);

  const handleChange = (event) => {
    setPriceRange(event.target.value);
    setLiveAuctionsFilterValue(event.target.value);
  };

  return (
    <div className={classNames(styles.auctionsContainer)}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <h1 className={classNames(styles.title)}>🔥 Live Auctions</h1>
          <FormControl sx={{ margin: 1, minWidth: 240 }}>
            <Select
              label="Price Range"
              value={priceRange}
              onChange={handleChange}
              className={classNames(styles.select)}
            >
              {filters.map((filter) => (
                <MenuItem key={filter.value} value={filter.value}>
                  {filter.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Grid container spacing={2}>
          {cards.slice(0, 4).map((card, index) => {
            return (
              <Grid item md={3} sm={6} xs={12} key={index}>
                <Card
                  key={card.name}
                  id={card.id}
                  name={card.name}
                  likes={card.likes}
                  price={card.price}
                  currency={card.currency}
                  user={card.owner}
                  mediaUrl={card.mediaUrl}
                  timeLeft={card.auction_end}
                ></Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
