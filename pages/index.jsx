import { useState, useEffect } from "react";
import {
  TrendingFiltersContext,
  CollectorsFiltersContext,
  ActionsFiltersContext,
} from "../src/context/Contexts";
import Header from "../src/components/header/Header";
import Featured from "../src/components/featured/Featured";
import Trending from "../src/components/trending/Trending";
import How from "../src/components/how/How";
import TopCollectors from "../src/components/collectors/TopCollectors";
import Auctions from "../src/components/auctions/Auctions";
import Footer from "../src/components/footer/Footer";

const howProps = {
  title: "How it works",
  description: `Discover, collect, and sell extraordinary NFTs
      on the world's first & largest NFT marketplace. There are  three things you'll need in place to open your account and start buying or selling NFTs on BUM.`,
  items: [
    {
      title: "Digital Currency",
      description:
        "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
    },
    {
      title: "Crypto Wallet",
      description:
        "A crypto wallet, such as MetaMask, stores your ETH and processes transactions on the Ethereum blockchain.",
    },
    {
      title: "BUM.",
      description:
        "Let's connect your wallet to BUM, edit your profile, and begin interacting in the space.",
    },
  ],

  // link: "https://app.boom.dev/",
  link: "https://google.com",
};

export default function Index() {
  const [featuredCards, setFeaturedCards] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const [trendingFilters, setTrendingFilters] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [collectorFilters, setCollectorFilters] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [auctionFilters, setAuctionFilters] = useState([]);
  const [trendingTimePeriod, setTrendingTimePeriod] = useState(0);
  const [topCollectorsFilter, setTopCollectorsFilter] = useState(0);
  const [liveAuctionsFilterValue, setLiveAuctionsFilterValue] = useState(0);

  useEffect(() => {
    fetchFeaturedData();
    fetchTrendingData();
    fetchTopCollectorsData();
    fetchLiveAuctionsData();

    async function fetchFeaturedData() {
      const res = await fetch(`${process.env.apiUrl}/featured`);
      const data = await res.json();
      setFeaturedCards(data);
    }

    async function fetchTrendingData() {
      const res = await fetch(`${process.env.apiUrl}/trending`);
      const data = await res.json();
      setTrendingItems(data.nfts);
      setTrendingFilters(data.filters.sort);
    }

    async function fetchTopCollectorsData() {
      const res = await fetch(`${process.env.apiUrl}/top-collectors`);
      const data = await res.json();
      setCollectors(data.users);
      setCollectorFilters(data.filters.sort);
    }

    async function fetchLiveAuctionsData() {
      const res = await fetch(`${process.env.apiUrl}/live-auctions`);
      const data = await res.json();
      setAuctions(data.nfts);
      setAuctionFilters(data.filters.price);
    }
  }, []);

  useEffect(() => {
    async function fetchTrendingFilteredData(path) {
      console.log(path);
      const res = await fetch(`${process.env.apiUrl}${path}`);
      if (res.status === 200) {
        const data = await res.json();
        setTrendingItems(data.nfts);
      }
    }

    if (trendingTimePeriod !== 0) {
      fetchTrendingFilteredData(`/trending?sort=${trendingTimePeriod}`);
    }
  }, [trendingTimePeriod]);

  useEffect(() => {
    async function fetchTopCollectorsFilteredData(path) {
      console.log(path);
      const res = await fetch(`${process.env.apiUrl}${path}`);
      if (res.status === 200) {
        const data = await res.json();
        setCollectors([...data.users]);
      }
    }

    if (topCollectorsFilter !== 0) {
      fetchTopCollectorsFilteredData(
        `/top-collectors?sort=${topCollectorsFilter}`
      );
    }
  }, [topCollectorsFilter]);

  useEffect(() => {
    async function fetchLiveAuctionsFilteredData(path) {
      console.log(path);
      const res = await fetch(`${process.env.apiUrl}${path}`);
      if (res.status === 200) {
        const data = await res.json();
        setAuctions(data.nfts);
      }
    }

    if (liveAuctionsFilterValue !== 0) {
      fetchLiveAuctionsFilteredData(
        `/live-auctions?price=${liveAuctionsFilterValue}`
      );
    }
  }, [liveAuctionsFilterValue]);

  return (
    <>
      <Header />
      {featuredCards && <Featured items={featuredCards.nfts} />}
      {trendingItems && trendingFilters && (
        <TrendingFiltersContext.Provider value={{ setTrendingTimePeriod }}>
          <Trending cards={trendingItems} filters={trendingFilters} />
        </TrendingFiltersContext.Provider>
      )}
      {collectors && collectorFilters && (
        <CollectorsFiltersContext.Provider value={{ setTopCollectorsFilter }}>
          <TopCollectors
            collectors={collectors.slice(0, 12)}
            filters={collectorFilters}
          />
        </CollectorsFiltersContext.Provider>
      )}
      <How {...howProps} />
      {auctions && auctionFilters && (
        <ActionsFiltersContext.Provider value={{ setLiveAuctionsFilterValue }}>
          <Auctions cards={auctions} filters={auctionFilters} />
        </ActionsFiltersContext.Provider>
      )}
      <Footer />
    </>
  );
}
