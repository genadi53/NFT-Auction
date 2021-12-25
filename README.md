![banner.png](https://boomcdn.fra1.digitaloceanspaces.com/eb1541cf817d1c7ba6d621bbfdad316a.png)

## Introduction

BUM is an NFT Auction Platform. The goal of the platform is to make selling NFT's accessible to a wider audience. In the platform, users have profiles that show their collection of NFT's which they've purchased. Users can also place bids in Ethereum on the NFT's. You can also discover popular and trending auctions on the Home and on the Explore page. It is a single-page web app built with React, Next.js, JavaScript, and HTML & SASS.

Make sure you develop the project with version 16.13.0 of Node and version 8.1.0 of NPM.

## Pages

The project is split into Next.js pages.

<img src="public/images/home.png" align="center" heigth="">
<br></br>

### Home

The main goal of the Home page is to showcase the most important NFT's available on the platform. It contains a "Featured" section that shows all featured NFT's by the platform administrators. It also has trending sections which show the most visited and bet on NFT's and "Top Collectors" section which shows the users with the most items in their collection. Also present is an info section on how the platform works and a "Live Auctions" section which shows the auctions which are currently open.

<hr />
<br></br>
<img src="public/images/product.png" align="center" width="" heigth="">
<br></br>

### Product

The product page shows detailed information about the NFT like - its creator, its description, and all the bids that have been made. The product section has basically two states - "ended" and "live". When the auction for the NFT is open the state is "live" and a time left on the auction is shown. Users can also like the NFT and place bids on it via their respective buttons.

<hr />
<br></br>
<img src="public/images/profile.png" align="center" width="" heigth="">
<br></br>

### Profile

The profile page shows basic information about the user like his or her username, description, avatar, cover image, and collection. The collection is displayed by a list of cards and can be sorted, filtered by a price range, and searched by name.

<hr />
<br></br>
<img src="public/images/activity.png" align="center" width="" heigth="">
<br></br>

### Activity

The activity page shows all the actions performed by the users. Actions include likes, bids, and purchases. The activity list can be filtered by type, sorted and searched by name. All user activity is public and is shown in the activity list.

<hr />
<br></br>
<img src="public/images/explore.png" align="center" width="" heigth="">
<br></br>

### Explore

On the explore page you can browse all available NFT's in the platform. NFT's can be filtered by name, whether they are active or not, sorted by price, title, and likes. The explore page shows NFT which currently has active auctions as well as the ones which have ended auctions.

<hr />
<br></br>

## 🤔 How to use

```sh
npm i
npm run dev
```

## 😏 Some tips

- Use the colors from the `src/styles/colors.scss` file
- Use the custom `Link` component provided in the example
- Define pages in separate folders
- Use the classNames module when adding multiple (or single) classes
- Define components in the `/components` folder
- You shouldn't delete files from the boilerplate. You can only delete the Example component or build on top of it.

## 💡 The idea

The project uses [Next.js](https://github.com/zeit/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.
If you prefer, you can [use styled-components instead](https://mui.com/guides/interoperability/#styled-components).
