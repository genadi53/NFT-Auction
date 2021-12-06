import Header from "../../src/components/header/Header";
import ExploreTitle from "../../src/components/explore/ExploreTitle";
import ExploreFilters from "../../src/components/explore/ExploreFilters";
import Card from "../../src/components/card/Card";
import { Grid, Container } from "@mui/material";
import Footer from "../../src/components/footer/Footer";
import dataFiltersExplore from "../../data/filtersExplore.json";
import dataNfts from "../../data/nfts.json";

import { useState, useEffect } from "react";

export default function Explore() {
  const [filters, setFilters] = useState(null);
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    setFilters(dataFiltersExplore);
    setNfts(
      dataNfts.map((nft) => {
        return {
          name: nft.name,
          likes: nft.likes,
          mediaUrl: nft.source.url,
          user: {
            avatarUrl: nft.owner.avatar.url,
          },
          price: nft.price,
          currency: nft.currency,
        };
      })
    );
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Grid
          style={{
            marginTop: "50px",
            marginBottom: "50px",
          }}
          sx={{
            marginTop: "50px",
            // alignItems: "flex-end",
            marginBottom: "50px",
          }}
          container
          sx={{ alignItems: "baseline" }}
        >
          <Grid item xs={3}>
            <ExploreTitle text={"Explore"} />
          </Grid>
          <Grid item xs={9}>
            {filters && <ExploreFilters filters={filters} />}
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: "3.563rem" }}>
          {nfts &&
            nfts.map((nft) => {
              return (
                <Grid item sm={3} xs={6}>
                  <Card {...nft} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
