import { Card, Container, Typography } from "@mui/material";
import User from "../../components/user/User";
import classNames from "classnames";
import styles from "./ProductInfoCreator.module.scss";

// const props = {
//   name: "George",
//   avatar:
//     "https://nft-auction.herokuapp.com/uploads/0xa6dbe6b4f8e2905c26e123ec6fd08a8f7200dbc1_64120a76f4.jpg",
//   verified: true,
// };

export default function ProductInfoCreator({ name, avatar, verified = false }) {
  return (
    <div className={classNames(styles["product-info-creator"])}>
      <Card className={classNames(styles.card)}>
        <Container
          disableGutters
          className={classNames(styles["title-container"])}
          sx={{
            backgroundColor: "#1D193c",
            padding: "3% 10%",
            display: "flex",
          }}
        >
          <Typography className={classNames(styles.title)}>Creator</Typography>
        </Container>
        <Container
          disableGutters
          className={classNames(styles["user-container"])}
          sx={{ display: "flex" }}
        >
          <User avatar={avatar} verified={verified} name={name}></User>
        </Container>
      </Card>
    </div>
  );
}
