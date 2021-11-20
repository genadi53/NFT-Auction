import { Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import styles from "./ProductInfoStatus.module.scss";
import classNames from "classnames";

export default function ProductInfoStatus() {
  return (
    <div className={styles["product-info-status"]}>
      <Chip
        icon={<FiberManualRecordIcon className={classNames(styles.icon)} />}
        className={classNames(styles.status)}
        variant="filled"
        label={"LIVE"}
      />
    </div>
  );
}
