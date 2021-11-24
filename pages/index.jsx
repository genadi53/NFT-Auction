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

const productContainerProps = {
  name: "Ergonomic Concrete Tuna",
  owner: {
    username: "Justen_King18",
    verified: true,
    avatar: {
      url: "https://nft-auction.herokuapp.com/uploads/thumbnail_0x7d9debcf75a71bbb5c533804c9845d313fe3f6aa_ec98dd79b9.jpg",
    },
  },
  price: 20,
  currency: "ETH",
  likes: 25,
  auction_end: "2022-09-02T20:43:19.149Z",
  details: "asdasdads",
  source: {
    url: "https://nft-auction.herokuapp.com/uploads/thumbnail_0x7d9debcf75a71bbb5c533804c9845d313fe3f6aa_ec98dd79b9.jpg",
  },
  bids: [
    {
      user: {
        info: 20,
        name: "John",
        verified: true,
        avatar:
          "https://nft-auction.herokuapp.com/uploads/thumbnail_0xa6dbe6b4f8e2905c26e123ec6fd08a8f7200dbc1_64120a76f4.jpg",
      },
      date: "2021-10-22T08:29:23.382Z",
      amount: 20,
    },
  ],
};

export default function Index() {
  const [featuredCards, setFeaturedCards] = useState([]);
  const [topCollectors, setTopCollectors] = useState([]);
  const [trendingCards, setTrendingCards] = useState([]);
  const [liveAuctionCards, setLiveAuctionCards] = useState([]);

  useEffect(() => {
    const cardsForFeatured = dataFeatured.map((card) => {
      return { image: card.source.url, title: card.name, href: "/about" };
    });
    cardsForFeatured[0] = { ...cardsForFeatured[0], cols: 3, rows: 2 };

    const cardsForTrending = dataTrending.map((card) => {
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
