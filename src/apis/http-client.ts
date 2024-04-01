import axios, { AxiosInstance, AxiosResponse, ResponseType } from 'axios';
import i18next from 'i18next';
import { LOCAL_STORAGE_KEYS } from '../constants/app.constants';
import { ROUTE_PATHS } from '../constants/router.constants';
import { LocalUtils } from '../utils/local';
import SnakeBar from '../utils/snackbar';

const toggleLoading = (value: boolean) => {};

// const getHeaders = (contentType: string) => {
//   return {
//     'Content-Type': contentType,
//     Authorization: `Bearer ${LocalUtils.getCookie(LOCAL_COOKIE_KEY.ACCESS_TOKEN)}`,
//   };
// };

const axiosInstance = (
  contentType: string = 'application/json',
  responseType: ResponseType = 'json',
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): AxiosInstance => {
  const baseURL = `${process.env.REACT_APP_API_ENPOINT}/${process.env.REACT_APP_API_PREFIX}`;

  if (isShowLoading) toggleLoading(true);

  const instance = axios.create({
    responseType,
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      if (isShowLoading) toggleLoading(false);

      return response;
    },
    (error) => {
      if (isShowLoading) toggleLoading(false);
      if (error.response.status === 401) {
        handleUnAuthorize();
      } else {
        const data = error.response.data;
        if (isShowErrorMessage) {
          let message = 'An error has occurred please contact the system administrator';

          if (data && data.message) {
            message = data.message;
          }
          else if (data && data.Message) {
            message = data.Message;
          }
          else if (typeof data === 'string' && data !== '') {
            message = data;
          }
          SnakeBar.error(message);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const getAsync = (
  url: string,
  params?: { [key: string]: any },
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).get(url, {
    params,
  });
};

export const postAsync = (
  url: string,
  json?: object,
  params?: { [key: string]: any },
  isShowLoading = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).post(url, json, {
    params,
  });
};

export const putAsync = (
  url: string,
  json?: object,
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).put(url, json);
};

export const deleteAsync = (
  url: string,
  json?: object,
  isShowLoading: boolean = true,
  isShowErrorMessage = true,
  allowAnonymous = false
): Promise<AxiosResponse> => {
  return axiosInstance(
    'application/json',
    'json',
    isShowLoading,
    isShowErrorMessage,
    allowAnonymous
  ).delete(url, { data: json });
};

function handleUnAuthorize() {
  LocalUtils.clear();
  window.location.replace(ROUTE_PATHS.auth.login);
}
