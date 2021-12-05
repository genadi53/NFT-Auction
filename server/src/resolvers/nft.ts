import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { NFT } from "../entities/NFT";
import { FieldError, Input } from "./NFTInput";
import { validateNFT, NFTErrors } from "../utils/validateNFT";
import { getConnection } from "typeorm";
import { creteCurrency } from "../utils/createCurrency";
import { User } from "../entities/User";
import { Bid } from "../entities/Bid";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@ObjectType()
class NFTResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => NFT, { nullable: true })
  nft?: NFT;
}

@ObjectType()
class PaginatedNFTs {
  @Field(() => [NFT])
  nfts: NFT[];
  @Field()
  hasMore: boolean;
}

@Resolver(NFT)
export class NFTResolver {
  @FieldResolver(() => [Bid])
  bids(@Root() nft: NFT) {
    const bids: Promise<Bid | undefined>[] = [];
    nft.bids.forEach((bid) => {
      const foundBid = Bid.findOne({ id: bid.id });
      bids.push(foundBid);
    });
    return bids;
  }

  @FieldResolver(() => User, { nullable: true })
  owner(@Root() nft: NFT) {
    //, @Ctx() { userLoader }: MyContext) {
    if (nft.owner) {
      // return userLoader.load(nft.owner?.id);
      return User.findOne({ id: nft.owner.id });
    } else return null;
  }

  @Mutation(() => NFTResponse)
  @UseMiddleware(isAuth)
  async createNFT(@Arg("input") input: Input): Promise<NFTResponse> {
    const errors = validateNFT(input);
    if (errors) {
      return { errors };
    }

    let nft;
    const currency = await creteCurrency(input.currency);
    try {
      nft = await NFT.create({
        name: input.name,
        price: input.price,
        currency: currency!,
        mediaUrl: input.mediaUrl,
        details: input.details,
        auction_end: new Date(input.auction_end),
      }).save();
    } catch (err) {
      console.log(err);
      const response = NFTErrors(err);
      if (response) {
        console.log(response);
        return response;
      }
    }

    // console.log(nft);
    return { nft };
  }

  @Query(() => PaginatedNFTs)
  async getPaginatedNFT(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): // @Info() info: any
  Promise<PaginatedNFTs> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const nfts = await getConnection().query(
      `
        select n.*
        from nft n
        join bid on n.id = bid."nftId"
        ${cursor ? `where n."createdAt" < $2` : ""}
        order by n."createdAt" DESC
        limit $1
        `,
      replacements
    );

    return {
      nfts: nfts.slice(0, realLimit),
      hasMore: nfts.length === realLimitPlusOne,
    };
  }

  @Query(() => NFT, { nullable: true })
  async getNFTById(
    @Arg("id", () => String) id: string
  ): Promise<NFT | undefined> {
    // const res = await NFT.findOne({ id: id }, { relations: ["bids"] });

    const res = await getConnection()
      .createQueryBuilder()
      .select("nft")
      .from(NFT, "nft")
      .leftJoinAndSelect("nft.bids", "bid")
      .leftJoinAndSelect("nft.owner", "user")
      .where('bid."nftId" = :id', { id })
      .getOne();
    console.log(res);
    return res;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async buyNFT(
    @Arg("nft_id", () => String) nft_id: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({ id: req.session.userId });
    const nft = await NFT.findOne({ id: nft_id });

    if (user && nft) {
      user.nftsCount = user.nftsCount + 1;
      nft.isLive = false;
      nft.owner = user;
      console.log(user.nfts);
      user.nfts ? (user.nfts = [...user.nfts, nft]) : (user.nfts = [nft]);
      console.log(user.nfts);
      await user.save();
      await nft.save();
      return true;
    } else return false;
  }

  @Query(() => [NFT], { nullable: true })
  async getAllNFTsOwnedByUser(@Ctx() { req }: MyContext) {
    const user = await User.findOne({ id: req.session.userId });
    if (user) {
      const nfts = await getConnection()
        .createQueryBuilder()
        .select("nft")
        .from(NFT, "nft")
        .leftJoinAndSelect("nft.owner", "user")
        .where('nft."ownerId" = :user_id', { user_id: user.id })
        .getMany();
      console.log(nfts);
      return nfts;
    }
    return null;
  }

  @Mutation(() => NFT, { nullable: true })
  @UseMiddleware(isAuth)
  async updateNFT(
    @Arg("id", () => String) id: string,
    @Arg("input") input: Input
  ): Promise<NFT | undefined> {
    let updatedNFT = await NFT.findOne({ id });
    if (!updatedNFT) {
      return undefined;
    }
    const currency = await creteCurrency(input.currency);
    updatedNFT.currency = currency ? currency : updatedNFT.currency;
    updatedNFT.name = input.name;
    updatedNFT.price = input.price;
    updatedNFT.mediaUrl = input.mediaUrl;
    updatedNFT.details = input.details;
    updatedNFT.auction_end = new Date(input.auction_end);
    return NFT.save(updatedNFT);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNFT(@Arg("id", () => String) id: string): Promise<boolean> {
    const nft = await NFT.findOne({ id });
    if (!nft) {
      return false;
    }

    await NFT.delete({ id });
    return true;
  }
}
