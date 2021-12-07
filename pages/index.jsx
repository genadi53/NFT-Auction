import { useState, useEffect } from "react";
import Header from "../src/components/header/Header";
import Featured from "../src/components/featured/Featured";
import Trending from "../src/components/trending/Trending";
import How from "../src/components/how/How";
import TopCollectors from "../src/components/collectors/TopCollectors";
import Auctions from "../src/components/auctions/Auctions";
import Footer from "../src/components/footer/Footer";
import dataFeatured from "../data/featured.json";
import dataTrending from "../data/trending.json";
import dataUsers from "../data/users.json";
import dataNfts from "../data/nfts.json";

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
  // const [timePeriod, setTimePeriod] = useState(0);
  // const [topCollectorsFilter, setTopCollectorsFilter] = useState("");
  // const [liveAuctionsFilterValue, setLiveAuctionsFilterValue] = useState(0);

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

  /** REMOVED FILTERS */

  // useEffect(() => {
  //   async function fetchTrendingFilteredData(path) {
  //     const res = await fetch(`${process.env.apiUrl}${path}`);
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       setTrendingItems(data.nfts);
  //     }
  //   }

  //   if (timePeriod !== 0) {
  //     fetchTrendingFilteredData(`/trending?sort=${timePeriod}`);
  //   }
  // }, [timePeriod]);

  // useEffect(() => {
  //   async function fetchTopCollectorsFilteredData(path) {
  //     const res = await fetch(`${process.env.apiUrl}${path}`);
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       setCollectors([...data.users]);
  //     }
  //   }

  //   fetchTopCollectorsFilteredData(
  //     `/top-collectors?sort=${topCollectorsFilter}`
  //   );
  // }, [topCollectorsFilter]);

  // useEffect(() => {
  //   async function fetchLiveAuctionsFilteredData(path) {
  //     const res = await fetch(`${process.env.apiUrl}${path}`);
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       setAuctions(data.nfts);
  //       console.log("change");
  //     }
  //   }

  //   fetchLiveAuctionsFilteredData(
  //     `/live-auctions?price=${liveAuctionsFilterValue}`
  //   );
  // }, [liveAuctionsFilterValue]);

  /** STATIC DATA  */
  // const [featuredCards, setFeaturedCards] = useState([]);
  // const [topCollectors, setTopCollectors] = useState([]);
  // const [trendingCards, setTrendingCards] = useState([]);
  // const [liveAuctionCards, setLiveAuctionCards] = useState([]);

  // useEffect(() => {
  //   const cardsForFeatured = dataFeatured.map((card) => {
  //     return { image: card.source.url, title: card.name, href: "/about" };
  //   });
  //   cardsForFeatured[0] = { ...cardsForFeatured[0], cols: 3, rows: 2 };

  //   const cardsForTrending = dataTrending.map((card) => {
  //     return {
  //       mediaUrl: card.source.url,
  //       name: card.name,
  //       user: {
  //         avatarUrl: card.owner.avatar.url,
  //         verified: card.owner.verified,
  //       },
  //       price: card.price,
  //       currency: card.currency,
  //     };
  //   });

  //   const collectors = dataUsers.map((user) => {
  //     return {
  //       name: user.username,
  //       nftsCount: user.nfts.length,
  //       avatar: user.avatar.url,
  //       verified: user.verified,
  //     };
  //   });

  //   const auctionCards = dataNfts.map((nft) => {
  //     return {
  //       name: nft.name,
  //       user: { avatarUrl: nft.owner.avatar.url, verified: nft.owner.verified },
  //       mediaUrl: nft.source.url,
  //       price: nft.price,
  //       currency: nft.currency,
  //       timeLeft: Date.parse(nft.auction_end) - Date.parse(nft.published_at),
  //     };
  //   });

  //   setLiveAuctionCards(auctionCards);
  //   setTopCollectors(
  //     collectors
  //       .sort((user1, user2) => user1.nfts?.length - user2.nfts?.length)
  //       .slice(0, 12)
  //   );
  //   setFeaturedCards(cardsForFeatured);
  //   setTrendingCards(cardsForTrending);
  // }, []);

  return (
    <>
      <Header />
      {featuredCards && <Featured items={featuredCards.nfts} />}
      {trendingItems && trendingFilters && (
        <Trending cards={trendingItems} filters={trendingFilters} />
      )}
      {collectors && collectorFilters && (
        <TopCollectors
          collectors={collectors.slice(0, 12)}
          filters={collectorFilters}
        />
      )}
      <How {...howProps} />
      {auctions && auctionFilters && (
        <Auctions cards={auctions} filters={auctionFilters} />
      )}
      <Footer />
    </>
  );
}
