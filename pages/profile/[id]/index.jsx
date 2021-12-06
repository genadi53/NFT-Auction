import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Header from "../../../src/components/header/Header";
import ProfileHero from "../../../src/components/profile/ProfileHero";
import ProfileUser from "../../../src/components/profile/ProfileUser";
import ProfileCollection from "../../../src/components/profile/ProfileCollection";
import Footer from "../../../src/components/footer/Footer";
import dataProfile from "../../../data/profile.json";
import dataFiltersProfile from "../../../data/filtersProfile.json";

export default function Profile() {
  const [user, setUser] = useState();
  const [filters, setFilters] = useState();
  const [sortByFilter, setSortByFilter] = useState();
  const [priceRangeFilter, setPriceRangeFilter] = useState();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchUserData();

    async function fetchUserData() {
      const res = await fetch(`${process.env.apiUrl}/users/${id}`);
      if (res.status === 200) {
        const data = await res.json();
        setUser(data.user);
        setFilters(data.filters);
      }
    }
  }, [id]);

  useEffect(() => {
    async function fetchExploreData(path) {
      const res = await fetch(`${process.env.apiUrl}${path}`);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setUser(data.user);
      }
    }
    if (sortByFilter !== 0 && priceRangeFilter !== 0) {
      fetchExploreData(
        `/users/${id}?sort=${sortByFilter}&price=${priceRangeFilter}`
      );
    } else if (sortByFilter !== 0) {
      fetchExploreData(`/users/${id}?sort=${sortByFilter}`);
    } else if (priceRangeFilter !== 0) {
      fetchExploreData(`/users/${id}?price=${priceRangeFilter}`);
    } else {
      fetchExploreData(`/users/${id}`);
    }
  }, [sortByFilter, priceRangeFilter]);

  // useEffect(() => {
  //   setFilters({ ...dataFiltersProfile });

  //   setProfile({
  //     image: "images/nft.jpg",
  //     name: dataProfile.username,
  //     info: "Profile info goes here!",
  //     avatar: dataProfile.avatar.url,
  //     verified: dataProfile.verified,
  //     user: {
  //       verified: dataProfile.verified,
  //       avatar: dataProfile.avatar.url,
  //     },
  //     items: [...dataProfile.nfts],
  //     filters: filters,
  //   });
  // }, []);

  return (
    <div>
      <Header />
      {filters && user && (
        <Fragment>
          <ProfileHero image={user.avatar.backgroundUrl} />
          <ProfileUser
            name={user.username}
            info={user.info}
            avatar={user.avatar.url}
            verified={user.verified}
          />
          <ProfileCollection
            user={user}
            filters={filters}
            items={user.nfts}
            setSortByFilter={setSortByFilter}
            setPriceRangeFilter={setPriceRangeFilter}
          />
        </Fragment>
      )}
      <Footer />
    </div>
  );
}
