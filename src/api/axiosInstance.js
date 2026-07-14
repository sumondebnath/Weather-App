import axios from 'axios';
import { GENERIC_ERROR_MESSAGES } from '../constants';

const axiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 15000,
  params: {
    key: import.meta.env.VITE_WEATHER_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      message: GENERIC_ERROR_MESSAGES.unknown,
      code: null,
      isNetworkError: false,
      isApiError: false,
      original: error,
    };

    if (!error.response) {
      normalized.isNetworkError = true;
      normalized.message = GENERIC_ERROR_MESSAGES.network;
      return Promise.reject(normalized);
    }

    const { status, data } = error.response;
    normalized.isApiError = true;

    if (status === 401 || status === 403) {
      normalized.code = status;
      normalized.message = 'Unable to authenticate with the weather service.';
    } else if (status === 400 && data?.error?.code) {
      normalized.code = data.error.code;
      normalized.message = data.error.message || GENERIC_ERROR_MESSAGES.api;
    } else if (status === 429) {
      normalized.code = 9001;
      normalized.message = 'Too many requests. Please slow down.';
    } else {
      normalized.code = status;
      normalized.message = GENERIC_ERROR_MESSAGES.api;
    }

    return Promise.reject(normalized);
  },
);

export default axiosInstance;
