import { Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./ProductInfoLikes.module.scss";
import classNames from "classnames";
import millify from "millify";

export default function ProductInfoLikes({ amount = 0 }) {
  return (
    <div className={styles["product-info-likes"]}>
      <Chip
        icon={<FavoriteIcon className={classNames(styles.icon)} />}
        className={classNames(styles.likes)}
        variant="outlined"
        label={millify(amount)}
      />
    </div>
  );
}
