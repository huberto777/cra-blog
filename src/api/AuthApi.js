import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const AuthAPI = {
  async login(credentials) {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    const result = response.data;
    return result;
  },
  async getAuthUser(accessToken) {
    const response = await axios.post(`${BASE_URL}/me`, accessToken);
    const result = response.data;
    return result;
  },
};

export default AuthAPI;
