import "reflect-metadata";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import path from "path";
import {
  COOKIE_NAME,
  DB_NAME,
  DB_PASS,
  PORT,
  SECRET,
  USERNAME,
  __prod__,
} from "./constants";
import { BidsResolver } from "./resolvers/bid";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/User";
import { NFT } from "./entities/NFT";
import { Bid } from "./entities/Bid";
import { Currency } from "./entities/Currency";
import { CurrencyResolver } from "./resolvers/currency";
import { NFTResolver } from "./resolvers/nft";
// import { UserAction } from "./entities/UserActions";

const main = async () => {
  createConnection({
    type: "postgres",
    username: USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, NFT, Bid, Currency],
  });
  //   (await connection).runMigrations({ transaction: "all" });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.set("trust proxy", 1);

  app.use(
    cors({
      // origin: "http://localhost:3000",
      origin: "http://localhost:8080",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BidsResolver, UserResolver, CurrencyResolver, NFTResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
