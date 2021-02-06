import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../api/constants';

const SUCCESS_STATUS_CODES = [200, 201, 202, 203, 204, 205, 206];

axios.defaults.baseURL = API_BASE_URL;

export const http = (url: string, options: AxiosRequestConfig): Promise<any> =>
  axios({
    url,
    ...options,
  })
    .then(
      (response) =>
        SUCCESS_STATUS_CODES.includes(response.status)
          ? response.data
          : Promise.reject(response),
      (error) => Promise.reject(error)
    )
    .then(
      (response) => ({ response }),
      (error) => ({ error })
    )
    .catch((error) => error);

export const setToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default http;
