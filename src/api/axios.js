import axios from 'axios';

const api = axios.create({
    baseURL: 'http://51.68.140.22:10350',
})
export default api;