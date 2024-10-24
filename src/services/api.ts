import axios from 'axios';

const API_URL = 'https://api.coincap.io/v2';

export const fetchCryptocurrencies = async () => {
    const response = await axios.get(`${API_URL}/assets`, {
        params: { limit: 100 },
    });
    return response.data.data;
};

export const fetchCryptoDetails = async (id: string) => {
    const response = await axios.get(`${API_URL}/assets/${id}`);
    return response.data.data;
};

export const fetchPriceHistory = async (id: string) => {
    const response = await axios.get(`${API_URL}/assets/${id}/history?interval=d1`);
    return response.data.data;
};