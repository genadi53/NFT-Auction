import MaterialCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Countdown from "react-countdown";
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
  timeLeft, //= 1000 * 60 * 60 * 24,
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
      <div className={classNames(styles.cardMedia)}>
        {timeLeft && (
          <div className={classNames(styles.badge)}>
            <FiberManualRecordIcon /> LIVE
          </div>
          // <Button
          //   className={classNames(styles.badge)}
          //   variant="contained"
          //   color="success"
          //   size="small"
          //   startIcon={<FiberManualRecordIcon />}
          // >
          //   LIVE
          // </Button>
        )}
        <img
          className={classNames(styles.media)}
          src={mediaUrl}
          alt="NFT image"
        />
        {timeLeft && (
          <Countdown
            className={classNames(styles.liveCountdown)}
            date={Date.now() + timeLeft}
          />
        )}
      </div>
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
