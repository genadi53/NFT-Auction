import React, { useState } from "react";
import styles from "./Card.module.scss";
import classNames from "classnames";
import Avatar from "../../components/avatar/Avatar";
import MuiCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import millify from "millify";
// import Countdown from "react-countdown";
// import LiveIcon from '@mui/icons-material/IconLive';

export default function Card({
  name = "",
  likes = 0,
  mediaUrl,
  price,
  currency,
  user,
  timeLeft = 22,
}) {
  const [like, setLike] = useState(0);

  return (
    <MuiCard className={classNames(styles.card)} sx={{ maxWidth: 345 }}>
      <CardHeader avatar={<Avatar {...user} />} />

      <div className={classNames(styles.liveWrapper)}>
        {timeLeft > 0 && <div className={classNames(styles.badge)}>Live</div>}

        <img
          className={classNames(styles.media)}
          src="/images/nft.jpg"
          alt="pic"
        />
      </div>

      <CardActions color="text.secondary">
        <CardContent variant="body2" color="text.secondary">
          <div className="Card_title">{name}</div>
          <div className="price">
            ~{price} {currency}
          </div>
        </CardContent>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <span className="likes">{millify(likes)}</span>
        </IconButton>
      </CardActions>
    </MuiCard>
  );
}
