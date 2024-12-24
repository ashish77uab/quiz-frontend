const devEnv = process.env.NODE_ENV !== "production";


export const imageRender = (url) => {
  return `${url}`;
};
export const numberWithCommas = (number = 0) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 20,
  }).format(number);
};
