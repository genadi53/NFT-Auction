import { formatDistance, parseISO } from "date-fns";
import Avatar from "../avatar/Avatar.jsx";
import Link from "../link/Link.jsx";
import styles from "./ActivityListItem.module.scss";
import classNames from "classnames";

export default function ActivityListItem({
  user,
  created_at,
  nft,
  type = "like",
}) {
  return (
    <div className={classNames(styles.container)}>
      <Avatar size={55} url={user.avatar.url} verified={user.verified} />
      <div className={classNames(styles.info)}>
        <p className={classNames(styles.text)}>
          <span className={classNames(styles.username)}>{user.username}</span>
          <span> {type === "like" ? "liked" : "bought"} </span>
          <Link href={`/product/${nft.id}`} className={classNames(styles.link)}>
            {nft.name}
          </Link>
          <span> by </span>
          <Link
            href={`/profile/${nft.owner.id}`}
            className={classNames(styles.link)}
          >
            {nft.owner.username}
          </Link>
        </p>
        <p className={classNames(styles.time)}>
          {formatDistance(Date.now(), parseISO(created_at))} ago
        </p>
      </div>
    </div>
  );
}
