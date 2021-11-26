import { useState, useEffect } from "react";
import Header from "../../src/components/header/Header";
import ProfileHero from "../../src/components/profile/ProfileHero";
import ProfileUser from "../../src/components/profile/ProfileUser";
import ProfileCollection from "../../src/components/profile/ProfileCollection";
import Footer from "../../src/components/footer/Footer";
import dataProfile from "../../data/profile.json";

const filtersData = {
  sort: [
    {
      label: "Date (Ascending)",
      value: 1,
    },
    {
      label: "Date (Descending)",
      value: 2,
    },
    {
      label: "Name (Ascending)",
      value: 3,
    },
    {
      label: "Name (Descending)",
      value: 4,
    },
    {
      label: "Price (Ascending)",
      value: 5,
    },
    {
      label: "Price (Descending)",
      value: 6,
    },
  ],
  price: [
    {
      label: "0 - 0.01 ETH",
      value: 7,
    },
    {
      label: "0.01 - 0.04 ETH",
      value: 8,
    },
    {
      label: "0.04 - 0.07 ETH",
      value: 9,
    },
  ],
};

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setProfileData({
      image: dataProfile.avatar.url,
      name: dataProfile.username,
      info: "Profile info goes here!",
      avatar: dataProfile.avatar.url,
      verified: dataProfile.verified,
      user: {
        verified: dataProfile.verified,
        avatar: dataProfile.avatar.url,
      },
      items: [...dataProfile.nfts],
      filters: filtersData,
    });
  }, []);

  return (
    <div>
      <Header />
      {profileData && (
        <>
          <ProfileHero image={profileData.image} />
          <ProfileUser
            name={profileData.name}
            info={profileData.info}
            avatar={profileData.avatar}
            verified={profileData.verified}
          />
          <ProfileCollection
            user={profileData.user}
            filters={profileData.filters}
            items={profileData.items}
          />
        </>
      )}
      <Footer />
    </div>
  );
}
