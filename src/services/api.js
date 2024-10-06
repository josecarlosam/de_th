import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const searchCountries = async (term) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${term}`);
    return response.data;
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
};