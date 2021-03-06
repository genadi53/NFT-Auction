import { useRouter } from "next/router";
import { Grid, Container, ImageList, ImageListItem } from "@mui/material";
import styles from "./Featured.module.scss";
import classNames from "classnames";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    // src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    src: `${image}`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function How({ items = [] }) {
  const router = useRouter();
  return (
    <Container disableGutters className={classNames(styles.container)}>
      {items && (
        <ImageList
          className={classNames(styles.imageList)}
          sx={{ width: "80vw", marginY: 10 }}
          gap={8}
          variant="quilted"
          cols={6}
          rowHeight={180}
        >
          {items.map((item, idx) => (
            <ImageListItem
              // key={item.image}
              // cols={item.cols || 1}
              // rows={item.rows || 1}
              key={item.id}
              cols={idx === 0 ? 3 : 1}
              rows={idx === 0 ? 2 : 1}
              onClick={() => {
                router.push(`/product/${item.id}`);
              }}
            >
              <img
                //src={item.image} //{`${item.image}?w=164&h=164&fit=crop&auto=format`}
                //   srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                {...srcset(item.image, 180, item.rows, item.cols)}
                alt={item.title}
                onClick={() => router.push(item.href)}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Container>
  );
}
