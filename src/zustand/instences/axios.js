import axios from 'axios';

import { variables } from '../variables/variables';

const axiosInstance = axios.create({
  baseURL: variables.backend_url,
});

export default axiosInstance;
