import axios from 'axios';

// Crie uma instância do Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000' // URL base da sua API
});

export default axiosInstance;
