import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

export const CurrenciesAbbreviationsMap = [
  { name: "Ethereum", abbreviation: "ETH" },
  { name: "Bitcoin", abbreviation: "BTC" },
  { name: "Binance Coin", abbreviation: "BNB" },
  { name: "Tether", abbreviation: "USDT" },
  { name: "Dogecoin", abbreviation: "DOGE" },
];

export enum CurrenciesTypes {
  ETH = "Ethereum",
  BTC = "Bitcoin",
  BNB = "Binance Coin",
  USDT = "Tether",
  DOGE = "Dogecoin",
}

@ObjectType()
@Entity()
export class Currency extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  abbreviation!: string;

  public get Abbreviation(): any {
    return CurrenciesAbbreviationsMap.find((curr) => {
      if (curr.name === this.name) return curr.abbreviation;
      else return undefined;
    });
  }
}
