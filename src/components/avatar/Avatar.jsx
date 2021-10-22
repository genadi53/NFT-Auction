// import VerifiedIcon from "@mui/icons-material/Verified";
// import Badge from "@mui/material/Badge";
import styles from "./Avatar.module.scss";
import classNames from "classnames";

export default function Avatar({
  url = "./images/avatar.png",
  size = 90,
  verified = false,
}) {
  return (
    <div
      className={classNames(styles.avatar)}
      style={{ width: size, height: size }}
    >
      <img
        className={classNames(styles.image)}
        src={url}
        // style={{ width: `${size}px; height: ${size}px` }}
        style={{ width: size, height: size }}
      />
      {verified ? (
        // <VerifiedIcon
        //   className={classNames(styles.badge)}
        //   color="success"
        //   role="img"
        // />
        <img
          className={classNames(styles.badge)}
          alt="verified"
          style={{ width: size / 3, height: size / 3 }}
          src={"/images/verified.svg"}
        />
      ) : null}
    </div>
  );
}
