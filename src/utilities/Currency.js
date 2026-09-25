
export const CURRENCIES = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flagCode: "NG", locale: "en-NG" },
  { code: "USD", symbol: "$", name: "US Dollar", flagCode: "US", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", flagCode: "EU", locale: "en-IE" },
  { code: "GBP", symbol: "£", name: "British Pounds", flagCode: "GB", locale: "en-GB" },
];

export function getCurrency(code) {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}


export function formatMoney(amount, code) {
  const { symbol, locale } = getCurrency(code);
  return `${symbol}${Math.abs(amount).toLocaleString(locale)}`;
}