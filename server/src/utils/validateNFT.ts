import { CurrenciesAbbreviationsMap } from "../entities/Currency";
import { Input } from "src/resolvers/NFTInput";

export const validateNFT = (options: Input) => {
  if (options.name.length < 2) {
    return [
      {
        field: "Name",
        message: "Lenght must be greather than 2",
      },
    ];
  }

  if (options.price <= 0) {
    return [
      {
        field: "Price",
        message: "Price cannot be 0",
      },
    ];
  }

  const currency = CurrenciesAbbreviationsMap.find((curr) => {
    return curr.name === options.currency;
  });

  if (currency === undefined) {
    return [
      {
        field: "Currency",
        message: "Not supported currency.",
      },
    ];
  }

  return null;

  //   const date = new Date();
  //   if (date.getTime() < options.auction_end.getTime()) {
  //     return [
  //       {
  //         field: "Set",
  //         message: "Lenght must be greather than 2",
  //       },
  //     ];
  //   }
};

export const NFTErrors = (err: any) => {
  if (err.code === "23505") {
    if (err.detail.includes("name")) {
      return {
        errors: [
          {
            field: "Name",
            message: "Name was already taken",
          },
        ],
      };
    }
  }
  return null;
};
