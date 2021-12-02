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
      <Avatar size={55} url={user.avatarUrl} verified={user.verified} />
      <div className={classNames(styles.info)}>
        <p className={classNames(styles.text)}>
          <span className={classNames(styles.username)}>{user.username}</span>
          <span> {type === "like" ? "liked" : "bought"} </span>
          <Link href={"#"} className={classNames(styles.link)}>
            {nft.name}
          </Link>
          <span> by </span>
          <Link href={"#"} className={classNames(styles.link)}>
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

// return (
//     <div className={styles["activity-list-item"]}>
//       <Avatar size={56} url={user.avatarUrl} verified={user.verified} />
//       <div className={styles["activity-info"]}>
//         <p className={styles.text}>
//           <span className={styles.name}>{user.name}</span>
//           <span> {activity} </span>
//           <Link href={"#"} className={styles.link}>
//             {nft.name}
//           </Link>
//           <span> by </span>
//           <Link href={"#"} className={styles.link}>
//             {nft.user.name}
//           </Link>
//         </p>
//         <p className={styles.elapsed}>
//           {formatDistance(Date.now(), parseISO(created_at))}
//         </p>
//       </div>
//     </div>
//   );
