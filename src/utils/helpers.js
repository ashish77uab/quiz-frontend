const devEnv = process.env.NODE_ENV !== "production";


export const imageRender = (url) => {
  return `${url}`;
};
export const numberWithCommas = (number = 0) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 20,
  }).format(number);
};
export const removeParam = (key, searchParams, setSearchParams) => {
  const newParams = new URLSearchParams(searchParams)
  newParams.delete(key)
  setSearchParams(newParams, { replace: true })
}

export const addParam = (key, value, searchParams, setSearchParams) => {
  const newParams = new URLSearchParams(searchParams)
  newParams.set(key, value)
  setSearchParams(newParams, { replace: true })
}
