import MaterialCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import millify from "millify";
import Avatar from "../avatar/Avatar";

import styles from "./Card.module.scss";
import classNames from "classnames";

export default function Card({
  name,
  likes = 0,
  mediaUrl,
  user,
  price,
  currency,
}) {
  const { avatarUrl, verified } = user;
  const totalPrice = `~${price} ${currency}`;
  return (
    <MaterialCard
      sx={{ maxWidth: 345, maxHeight: 720 }}
      className={classNames(styles.card)}
    >
      <CardHeader
        avatar={<Avatar url={avatarUrl} size={55} verified={verified} />}
      ></CardHeader>
      <CardMedia
        className={classNames(styles.media)}
        component="img"
        image={mediaUrl}
        alt="NFT image"
      />
      <CardContent className={classNames(styles.cardContent)}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h5" className={classNames(styles.title)}>
              {name}
            </Typography>
            <Typography variant="body1" className={classNames(styles.price)}>
              {totalPrice}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Chip
              className={classNames(styles.likes)}
              variant="outlined"
              color="success"
              icon={<FavoriteIcon color="success" />}
              label={millify(likes)}
              onClick={() => console.log("click")}
            />
          </Grid>
        </Grid>
      </CardContent>
    </MaterialCard>
  );
}

// <CardHeader
//   avatar={<Avatar url={avatarUrl} size={70} verified={verified} />}
// ></CardHeader>
