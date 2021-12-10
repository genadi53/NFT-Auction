import { useEffect, useState } from "react";
import Header from "../../src/components/header/Header";
import Hero from "../../src/components/hero/Hero";
import ActivityFilters from "../../src/components/activity/ActivityFilters";
import ActivityList from "../../src/components/activity/ActivityList";
import Footer from "../../src/components/footer/Footer";
import { ActivityFiltersContext } from "../../src/context/Contexts";

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
      if (res.status === 200) {
        const data = await res.json();
        setActivities(data.activities);
        setFilters(data.filters);
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

  return (
    <div>
      <Header />
      <Hero text={"Activity"} />
      {filters && (
        <ActivityFiltersContext.Provider
          value={{ setSortByFilter, setTypeFilter }}
        >
          <ActivityFilters filters={filters} />
        </ActivityFiltersContext.Provider>
      )}
      {activities && <ActivityList items={activities} />}
      <Footer />
    </div>
  );
}
