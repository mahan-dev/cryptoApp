import { api } from "../configs/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getMarketApi = async (currency, page) => {
  try {
    const response = await api.get(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x-cg-demo-api-key:${API_KEY}&sparkline=false&price_change_percentage=24h`
    );
    return response;
  } catch (error) {
    if (error.status === 429) {
      alert("too many request error");
    }
    return error;
  }
};

const searchCoin = (query) => api.get(`${BASE_URL}/search?query=${query}`);

const getCoinChart = async (data) => {
  try {
    const response = await api.get(`${BASE_URL}/coins/${data}/market_chart?vs_currency=usd&days=7`);
    console.log({data, response})
    return response
  } catch (error) {
    if(error.status === 429){
      alert("too many request")
    }
    
    return error;
  }
};

export { getMarketApi, searchCoin, getCoinChart };
