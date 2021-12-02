import { Typography } from "@mui/material";
import Avatar from "../avatar/Avatar.jsx";
import styles from "./ProfileUser.module.scss";
import classNames from "classnames";

export default function ProfileUser({ name, info, avatar, verified }) {
  return (
    <div className={classNames(styles["profile-user"])}>
      <Avatar url={avatar} verified={verified} size={192} />
      <Typography variant={"h3"} className={classNames(styles.name)}>
        {name}
      </Typography>
      <Typography variant={"body1"} className={classNames(styles.info)}>
        {info}
      </Typography>
    </div>
  );
}
