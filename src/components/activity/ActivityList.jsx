import { Container, Stack } from "@mui/material";
import ActivityListItem from "./ActivityListItem";
import styles from "./ActivityList.module.scss";
import classNames from "classnames";

export default function ActivityList({ items = [] }) {
  return (
    <div className={classNames(styles["activity-list"])}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {items.map((item, idx) => {
          return (
            <ActivityListItem
              key={idx}
              user={item.user}
              nft={item.nft}
              created_at={item.created_at}
              type={item.type}
            />
          );
        })}
      </Stack>
    </div>
  );
}
