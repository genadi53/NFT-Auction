import { Card, Container, Typography } from "@mui/material";
import Countdown, { zeroPad } from "react-countdown";
import styles from "./ProductInfoTimer.module.scss";
import classNames from "classnames";

export default function ProductInfoTimer({ timeEnd, onTimeEnd }) {
  return (
    <div className={classNames(styles["product-info-timer"])}>
      <Card className={classNames(styles.card)}>
        <Container
          disableGutters
          className={classNames(
            styles["title-container"],
            timeEnd ? styles.active : ""
          )}
        >
          <Typography className={classNames(styles.title)} variant="h5">
            ENDS IN
          </Typography>
        </Container>
        <div className={classNames(styles.timer, timeEnd ? styles.active : "")}>
          {timeEnd && (
            <Countdown
              onComplete={onTimeEnd}
              className={classNames(styles.countdown)}
              date={timeEnd}
              renderer={({ hours, minutes, seconds }) => (
                <span suppressHydrationWarning={true}>
                  {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
              )}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
