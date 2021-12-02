import Header from "../../src/components/header/Header";
import Hero from "../../src/components/hero/Hero";
import ActivityFilters from "../../src/components/activity/ActivityFilters";
import ActivityList from "../../src/components/activity/ActivityList";
import Footer from "../../src/components/footer/Footer";
import dataActivity from "../../data/activity.json";
import dataFilters from "../../data/filtersActivity.json";

import { useEffect, useState } from "react";

export default function Activity() {
  const [activities, setActivities] = useState(null);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    setFilters(dataFilters);
    setActivities(
      dataActivity.map((activity) => {
        return {
          user: {
            username: activity.user.username,
            verified: activity.user.verified,
            avatarUrl: activity.user.avatar.url,
          },
          created_at: activity.created_at,
          nft: {
            name: activity.nft.name,
            owner: {
              username: activity.nft.owner.username,
              avatarUrl: activity.nft.owner.avatar.url,
              verified: activity.nft.owner.confirmed,
            },
          },
          type: activity.type,
        };
      })
    );
  }, []);

  return (
    <div>
      <Header />
      <Hero text={"Activity"} />
      {filters && <ActivityFilters filters={filters} />}
      {activities && <ActivityList items={activities} />}
      <Footer />
    </div>
  );
}
