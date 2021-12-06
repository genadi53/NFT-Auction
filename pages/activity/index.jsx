import { useEffect, useState } from "react";
import Header from "../../src/components/header/Header";
import Hero from "../../src/components/hero/Hero";
import ActivityFilters from "../../src/components/activity/ActivityFilters";
import ActivityList from "../../src/components/activity/ActivityList";
import Footer from "../../src/components/footer/Footer";
import dataActivity from "../../data/activity.json";
import dataFilters from "../../data/filtersActivity.json";

export default function Activity() {
  const [activities, setActivities] = useState();
  const [filters, setFilters] = useState();
  const [sortByFilter, setSortByFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(0);

  useEffect(() => {
    fetchActivities();

    async function fetchActivities() {
      const res = await fetch(`${process.env.apiUrl}/activities`);
      if (res.status === 200) {
        const data = await res.json();
        setActivities(data.activities);
        setFilters(data.filters);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchActivitiesData(path) {
      const res = await fetch(`${process.env.apiUrl}${path}`);
      console.log();
      if (res.status === 200) {
        const data = await res.json();
        console.log("Not null");
        console.log(data.activities);

        setActivities(data.activities);
      }
    }
    if (sortByFilter !== 0 && typeFilter !== 0) {
      fetchActivitiesData(
        `/activities?sort=${sortByFilter}&type=${typeFilter}`
      );
    } else if (sortByFilter !== 0) {
      fetchActivitiesData(`/activities?sort=${sortByFilter}`);
    } else if (typeFilter !== 0) {
      fetchActivitiesData(`/activities?type=${typeFilter}`);
    }
  }, [sortByFilter, typeFilter]);

  // useEffect(() => {
  //   setFilters(dataFilters);
  //   setActivities(
  //     dataActivity.map((activity) => {
  //       return {
  //         user: {
  //           username: activity.user.username,
  //           verified: activity.user.verified,
  //           avatarUrl: activity.user.avatar.url,
  //         },
  //         created_at: activity.created_at,
  //         nft: {
  //           name: activity.nft.name,
  //           owner: {
  //             username: activity.nft.owner.username,
  //             avatarUrl: activity.nft.owner.avatar.url,
  //             verified: activity.nft.owner.confirmed,
  //           },
  //         },
  //         type: activity.type,
  //       };
  //     })
  //   );
  // }, []);

  return (
    <div>
      <Header />
      <Hero text={"Activity"} />
      {filters && (
        <ActivityFilters
          filters={filters}
          setSortByFilter={setSortByFilter}
          setTypeFilter={setTypeFilter}
        />
      )}
      {activities && <ActivityList items={activities} />}
      <Footer />
    </div>
  );
}
