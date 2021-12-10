import { useState, useEffect } from "react";
import Header from "../../src/components/header/Header";
import ExploreTitle from "../../src/components/explore/ExploreTitle";
import ExploreFilters from "../../src/components/explore/ExploreFilters";
import Card from "../../src/components/card/Card";
import { Grid, Container } from "@mui/material";
import Footer from "../../src/components/footer/Footer";
import { ExploreFiltersContext } from "../../src/context/Contexts";

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
              <ExploreFiltersContext.Provider
                value={{ setPriceFilter, setSortByFilter }}
              >
                <ExploreFilters filters={filters} />
              </ExploreFiltersContext.Provider>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: "4rem" }}>
          {nfts &&
            nfts.map((nft, idx) => {
              return (
                <Grid item md={3} sm={6} xs={12} key={idx}>
                  <Card
                    id={nft.id}
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
