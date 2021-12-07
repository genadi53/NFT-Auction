import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { isAuth } from "../middleware/isAuth";
import { User } from "../entities/User";
import { Bid } from "../entities/Bid";
import { NFT } from "../entities/NFT";
// import { Currency } from "../entities/Currency";
import { creteCurrency } from "../utils/createCurrency";
import { MyContext } from "../types";

@Resolver(Bid)
export class BidsResolver {
  @Mutation(() => Bid)
  @UseMiddleware(isAuth)
  async makeBid(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("nft_id") nft_id: string,
    @Ctx() { req }: MyContext
  ): Promise<Bid | undefined> {
    const { userId } = req.session;

    const nft = await NFT.findOne({ id: nft_id });
    const user = await User.findOne({ id: userId });
    const currency_obj = await creteCurrency(currency);
    let bid;

    if (nft && user) {
      let maxBid = 0;
      nft.bids.forEach((bid) => {
        if (bid.amount > maxBid) maxBid = bid.amount;
      });
      if (maxBid > amount) throw Error(`Cannot bid lower than ${maxBid}`);

      await getConnection().transaction(async () => {
        bid = await Bid.create({
          amount,
          currency: currency_obj,
          user,
          nft,
        }).save();
        bid = await Bid.findOne({ amount }, { relations: ["nft", "user"] });
      });
      return bid;
    } else throw Error("No such user/nft");
    // return undefined;
  }

  @Query(() => [Bid])
  async getAllBids(): Promise<Bid[] | undefined> {
    const res = await Bid.find({ relations: ["nft", "user"] });
    // const res = await getConnection()
    // .createQueryBuilder()
    // .select("bid")
    // .from(Bid, "bid")
    // .leftJoinAndSelect("bid.nft", "nft")
    // .leftJoinAndSelect("bid.user", "user")
    // .getMany();
    return res;
  }

  @Query(() => [Bid])
  async getBidsForNFT(
    @Arg("nft_id") nft_id: string
  ): Promise<Bid[] | undefined> {
    const res = await getConnection()
      .createQueryBuilder()
      .select("bid")
      .from(Bid, "bid")
      .leftJoinAndSelect("bid.nft", "nft")
      .leftJoinAndSelect("bid.user", "user")
      .where('bid."nftId" = :nft_id', { nft_id })
      .getMany();
    return res;
  }

  @Query(() => Bid)
  async getBidsById(@Arg("id") id: string): Promise<Bid | undefined> {
    const res = await Bid.findOne({ id }, { relations: ["user", "nft"] });
    return res;
  }

  @Query(() => [Bid])
  async getBidsByUser(
    @Arg("user_id") user_id: string
  ): Promise<Bid[] | undefined> {
    const res = await getConnection()
      .createQueryBuilder()
      .select("bid")
      .from(Bid, "bid")
      .leftJoinAndSelect("bid.user", "user")
      .leftJoinAndSelect("bid.nft", "nft")
      .where('bid."userId" = :user_id', { user_id })
      .getMany();
    return res;
  }
}
