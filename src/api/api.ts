import axios from 'axios';
import getEnvironment from 'lib/getEnvironment';

// TODO: Wire to api endpoint
const api = axios.create({
  baseURL: getEnvironment().dbUrl,
  timeout: 90 * 1000,
});

export default api;
