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

// const featuredProps = {
//   items: [
//     {
//       image:
//         "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500&h=500",
//       title: "Breakfast",
//       rows: 2,
//       cols: 3,
//       href: "/about",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&h=500",
//       title: "Burger",
//       href: "/about",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=500&h=500",
//       title: "Camera",
//       href: "/about",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=500&h=500",
//       title: "Coffee",
//       href: "/about",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=500&h=500",
//       title: "Hats",
//       href: "/about",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=500",
//       title: "Honey",
//       href: "/about",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=500&h=500",
//       title: "Basketball",
//       href: "/about",
//     },
//   ],
// };

// const collectorsColumnProps = {
//   items: [
//     {
//       id: 1,
//       name: "Peter",
//       nftsCount: 12312,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       id: 2,
//       name: "John",
//       nftsCount: 1111,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       id: 3,
//       name: "Steven",
//       nftsCount: 432,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//   ],
// };

// const TopCollectorsProps = {
//   collectors: [
//     {
//       name: "Peter",
//       nftsCount: 12312,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "John",
//       nftsCount: 1111,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Steven",
//       nftsCount: 52,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Antonio Banderas",
//       nftsCount: 3,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Donald",
//       nftsCount: 12,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Peter",
//       nftsCount: 12312,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "John",
//       nftsCount: 1111,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Steven",
//       nftsCount: 52,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Antonio Banderas",
//       nftsCount: 3,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Donald",
//       nftsCount: 12,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Antonio Banderas",
//       nftsCount: 3,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//     {
//       name: "Donald",
//       nftsCount: 12,
//       avatar: "/images/avatar.png",
//       verified: true,
//     },
//   ],
// };

// const auctionProps = {
//   cards: [
//     {
//       name: "Clock",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 200,
//       currency: "BTC",
//       timeLeft: 3.6e6,
//     },
//     {
//       name: "DOGE",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 200,
//       currency: "BTC",
//       timeLeft: 3.6e6,
//     },
//     {
//       name: "BTC",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 100,
//       currency: "BTC",
//       timeLeft: 3.6e6,
//     },
//     {
//       name: "Litecoin",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 300,
//       currency: "BTC",
//       timeLeft: 3.6e6,
//     },
//   ],
// };

// const userProps = {
//   name: "Okay",
//   info: "boomer",
//   avatar: "/images/avatar.png",
//   verified: true,
//   size: 55,
// };

// const cardProps = {
//   name: "Clock",
//   user: { avatarUrl: "images/avatar.png", verified: true },
//   mediaUrl: "images/nft.jpg",
//   price: 200,
//   currency: "BTC",
//   likes: 20,
// };

// const trendingProps = {
//   cards: [
//     {
//       name: "Clock",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 200,
//       currency: "BTC",
//     },
//     {
//       name: "DOGE",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 200,
//       currency: "BTC",
//     },
//     {
//       name: "BTC",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 100,
//       currency: "BTC",
//     },
//     {
//       name: "Litecoin",
//       user: { avatarUrl: "images/avatar.png", verified: true },
//       mediaUrl: "images/nft.jpg",
//       price: 300,
//       currency: "BTC",
//     },
//   ],
// };

export default function Index() {
  const [featuredCards, setFeaturedCards] = useState([]);
  const [topCollectors, setTopCollectors] = useState([]);
  const [trendingCards, setTrendingCards] = useState([]);
  const [liveAuctionCards, setLiveAuctionCards] = useState([]);

  useEffect(() => {
    const cardsForFeatured = dataTrending.map((card) => {
      return { image: card.source.url, title: card.name, href: "/about" };
    });
    cardsForFeatured[0] = { ...cardsForFeatured[0], cols: 3, rows: 2 };

    const cardsForTrending = dataFeatured.map((card) => {
      return {
        mediaUrl: card.source.url,
        name: card.name,
        user: {
          avatarUrl: card.owner.avatar.url,
          verified: card.owner.verified,
        },
        price: card.price,
        currency: card.currency,
      };
    });

    const collectors = dataUsers.map((user) => {
      return {
        name: user.username,
        nftsCount: user.nfts.length,
        avatar: user.avatar.url,
        verified: user.verified,
      };
    });

    const auctionCards = dataNfts.map((nft) => {
      return {
        name: nft.name,
        user: { avatarUrl: nft.owner.avatar.url, verified: nft.owner.verified },
        mediaUrl: nft.source.url,
        price: nft.price,
        currency: nft.currency,
        timeLeft: Date.parse(nft.auction_end) - Date.parse(nft.published_at),
      };
    });

    setLiveAuctionCards(auctionCards);
    setTopCollectors(
      collectors
        .sort((user1, user2) => user1.nfts?.length - user2.nfts?.length)
        .slice(0, 12)
    );
    setFeaturedCards(cardsForFeatured);
    setTrendingCards(cardsForTrending);
  }, []);

  return (
    <>
      <Header />
      <Featured items={featuredCards} />
      <Trending cards={trendingCards} />
      <TopCollectors collectors={topCollectors} />
      <How {...howProps} />
      <Auctions cards={liveAuctionCards} />
      <Footer />
    </>
  );
}
