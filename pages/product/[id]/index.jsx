import { useState, useEffect } from "react";
import dataNfts from "../../../data/nfts.json";
import { useRouter } from "next/router";
import Header from "../../../src/components/header/Header.jsx";
import ProductContainer from "../../../src/components/product/ProductContainer.jsx";
import Footer from "../../../src/components/footer/Footer.jsx";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [nft, seNft] = useState(null);

  useEffect(() => {
    fetchProductData();

    async function fetchProductData() {
      const res = await fetch(`${process.env.apiUrl}/nfts/${id}`);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        seNft(data);
      }
    }
  }, [id]);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { id } = router.query;
  //     seNft(dataNfts.find((nft) => nft.id == id));
  //   }
  // }, [router]);

  const mockBids = [
    {
      user: { avatar: "/images/avatar.png", name: "hrisi", verified: true },
      amount: 30,
      date: "2021-10-22T08:29:23.382Z",
    },
    {
      user: { avatar: "/images/avatar.png", name: "maxi", verified: true },
      amount: 1000,
      date: "2021-10-22T08:29:23.382Z",
    },
  ];

  return (
    <div>
      <Header />
      {nft && (
        <ProductContainer
          name={nft.name}
          owner={nft.owner}
          price={nft.price}
          currency={nft.currency}
          likes={nft.likes}
          auction_end={nft.auction_end}
          details={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur, metus lacinia tempus mollis, risus lectus hendrerit ante, non vulputate neque elit quis urna."
          }
          bids={nft.bids}
          source={nft.source}
          isLive={true}
          buyAmount={nft.price + 5}
          bidAmount={nft.price}
          onBuy={() => {}}
          onBid={() => {}}
          onTimeEnd={() => {}}
        ></ProductContainer>
      )}
      <Footer />
    </div>
  );
}
