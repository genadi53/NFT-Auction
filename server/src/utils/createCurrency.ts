import { Currency, CurrenciesAbbreviationsMap } from "../entities/Currency";

export const creteCurrency = async (
  currencyName: string
): Promise<Currency | undefined> => {
  const currencyData = CurrenciesAbbreviationsMap.find((curr) => {
    return curr.name === currencyName;
  });
  const currency = await Currency.findOne({
    name: currencyData!.name,
  });
  return currency;
};
