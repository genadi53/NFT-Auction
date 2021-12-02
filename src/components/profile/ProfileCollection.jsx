import classNames from "classnames";
import styles from "./ProfileCollection.module.scss";
import { Container, Grid, Typography } from "@mui/material/";
import ProfileCollectionFilters from "./ProfileCollectionFilters.jsx";
import Card from "../card/Card.jsx";

export default function ProfileCollection({ user, filters, items = [] }) {
  return (
    <div className={classNames(styles["profile-collection"])}>
      <Container>
        <Grid container sx={{ alignItems: "baseline" }}>
          <Grid item xs={3}>
            <Typography variant={"h3"}>Collection</Typography>
          </Grid>
          <Grid item xs={9}>
            <ProfileCollectionFilters filters={filters} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "50px" }}>
          {items.map((item, idx) => {
            return (
              <Grid item xs={3} key={idx}>
                <Card
                  user={{
                    verified: user.verified,
                    avatarUrl: user.avatar,
                  }}
                  name={item.name}
                  price={item.price}
                  likes={item.likes}
                  currency={item.currency}
                  mediaUrl={item.source.url}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
