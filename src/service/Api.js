import axios from "axios";

const instance = axios.create({
  baseURL: `https://min-api.cryptocompare.com/data/`,
  method: "get",
});

function getCryptoTickers(currentCrypto) {
  return instance(`price`, {
    params: {
      fsym: currentCrypto.name,
      tsyms: "USD",
      api_Key: process.env.VUE_APP__API_KEY,
    },
  }).then((response) => {
    return response.data;
  });
};

function getCryptoAll() {
  return instance(`all/coinlist?summary=true`).then((response) => {
    return response.data;
  });
}

export const subscribeToTicker = async (currentCrypto, cb) => {
  const result = await getCryptoTickers(currentCrypto);
  cb(result);
};

export const requireCryptoAll = async (cb) => {
  const result = await getCryptoAll();
  cb(result.Data);
};
