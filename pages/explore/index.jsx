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
  const [nfts, setNfts] = useState([]);
  const [filters, setFilters] = useState();
  const [sortByFilter, setSortByFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState(0);

  useEffect(() => {
    fetchExploreData();

    async function fetchExploreData() {
      const res = await fetch(`${process.env.apiUrl}/explore`);
      if (res.status === 200) {
        const data = await res.json();
        setNfts(data.nfts);
        setFilters(data.filters);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchExploreData(path) {
      const res = await fetch(`${process.env.apiUrl}${path}`);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data.filters);
        console.log(data.nfts);
        setNfts(data.nfts);
        setFilters(data.filters);
      }
    }
    if (sortByFilter !== 0 && priceFilter !== 0) {
      fetchExploreData(`/explore?sort=${sortByFilter}&price=${priceFilter}`);
    } else if (sortByFilter !== 0) {
      fetchExploreData(`/explore?sort=${sortByFilter}`);
    } else if (priceFilter !== 0) {
      fetchExploreData(`/explore?price=${priceFilter}`);
    } else {
      fetchExploreData(`/explore`);
    }
  }, [sortByFilter, priceFilter]);

  // useEffect(() => {
  //   setFilters(dataFiltersExplore);
  //   setNfts(
  //     dataNfts.map((nft) => {
  //       return {
  //         name: nft.name,
  //         likes: nft.likes,
  //         mediaUrl: nft.source.url,
  //         user: {
  //           avatarUrl: nft.owner.avatar.url,
  //         },
  //         price: nft.price,
  //         currency: nft.currency,
  //       };
  //     })
  //   );
  // }, []);

  return (
    <div>
      <Header />
      <Container>
        <Grid
          style={{
            marginTop: "50px",
            alignItems: "flex-end",
            marginBottom: "50px",
          }}
          container
          sx={{ alignItems: "baseline" }}
        >
          <Grid item xs={3}>
            <ExploreTitle text={"Explore"} />
          </Grid>
          <Grid item xs={9}>
            {filters && (
              <ExploreFilters
                filters={filters}
                setSortByFilter={setSortByFilter}
                setPriceFilter={setPriceFilter}
              />
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: "4rem" }}>
          {nfts &&
            nfts.map((nft, idx) => {
              return (
                <Grid item md={3} sm={6} xs={12} key={idx}>
                  <Card
                    name={nft.name}
                    price={nft.price}
                    currency={nft.currency}
                    mediaUrl={nft.source.url}
                    user={nft.owner}
                    likes={nft.likes}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
