import axios from "axios";

const instance = axios.create({
  baseURL: `https://min-api.cryptocompare.com/data/price`,
  method: "get",
});

function getCryptoTickers(currentCrypto) {
  return instance({
    params: {
      fsym: currentCrypto.name,
      tsyms: "USD",
      api_Key: process.env.VUE_APP__API_KEY,
    },
  }).then((response) => {
    return response.data;
  });
}

export const subscribeToTicker = async (currentCrypto, cb) => {
  const result = await getCryptoTickers(currentCrypto);
  cb(result);
};
