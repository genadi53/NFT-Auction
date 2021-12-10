import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Header from "../../../src/components/header/Header";
import ProfileHero from "../../../src/components/profile/ProfileHero";
import ProfileUser from "../../../src/components/profile/ProfileUser";
import ProfileCollection from "../../../src/components/profile/ProfileCollection";
import Footer from "../../../src/components/footer/Footer";
import { ProfileFiltersContext } from "../../../src/context/Contexts";

export default function Profile() {
  const [user, setUser] = useState();
  const [filters, setFilters] = useState();
  const [sortByFilter, setSortByFilter] = useState(0);
  const [priceRangeFilter, setPriceRangeFilter] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
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
    if (!id) return;
    async function fetchExploreData(path) {
      const res = await fetch(`${process.env.apiUrl}${path}`);
      if (res.status === 200) {
        const data = await res.json();
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
          <ProfileFiltersContext.Provider
            value={{ setSortByFilter, setPriceRangeFilter }}
          >
            <ProfileCollection
              user={user}
              filters={filters}
              items={user.nfts}
            />
          </ProfileFiltersContext.Provider>
        </Fragment>
      )}
      <Footer />
    </div>
  );
}
