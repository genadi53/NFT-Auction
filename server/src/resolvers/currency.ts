import { Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Currency, CurrenciesAbbreviationsMap } from "../entities/Currency";
// import { MyContext } from "../types";

@ObjectType()
class AllCurrencies {
  @Field(() => [Currency])
  currencies: Currency[];
}

@Resolver(Currency)
export class CurrencyResolver {
  @Mutation(() => Boolean)
  async setAllCurrencies(): Promise<Boolean> {
    try {
      CurrenciesAbbreviationsMap.map(async (curr) => {
        await Currency.delete({ abbreviation: curr.abbreviation });
        await Currency.create({
          name: curr.name,
          abbreviation: curr.abbreviation,
        }).save();
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Query(() => AllCurrencies)
  async getAllCurrencies(): Promise<AllCurrencies> {
    const currencies = await Currency.find();
    // console.log(currencies);
    return { currencies };
  }
}
