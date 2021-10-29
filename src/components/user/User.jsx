import Typography from "@mui/material/Typography";
import Avatar from "../avatar/Avatar";

import styles from "./User.module.scss";
import classNames from "classnames";
export default function User({
  name = "",
  info = "",
  avatar = "",
  size = 55,
  verified = false,
}) {
  return (
    <div className={classNames(styles.user)}>
      <Avatar url={avatar} size={size} verified={verified} />
      <div className={classNames(styles.text)}>
        <Typography variant="h5" className={classNames(styles.name)}>
          {name}
        </Typography>
        <Typography variant="body1" className={classNames(styles.info)}>
          {info}
        </Typography>
      </div>
    </div>
  );
}
