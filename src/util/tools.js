import axios from 'axios';
import { history } from '../index';
export const config = {
  setCookie: (name, value, days) => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: (name) => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name, value) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  clearStore: (name) => {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    }
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(CART_LIST);
    history.push("/login");
    window.location.reload();
  },
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN: 'userLogin',
  CART_LIST: 'cartList',
};

export const {
  setCookie,
  getCookie,
  getStore,
  setStore,
  setStoreJson,
  getStoreJson,
  ACCESS_TOKEN,
  USER_LOGIN,
  CART_LIST,
  clearStore,
  logout,
} = config;

const DOMAIN = 'https://shop.cyberlearn.vn/api';
const TOKEN_CYBERSOFT =
  '1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU';

// c???u h??nh request cho t???t c??? api - response cho t???t c??? k???t qu??? t??? api tr??? v???

// c???u h??nh domain g???i ??i
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000, //5 phut
});
// c???u h??nh request header
http.interceptors.request.use(
  (config) => {
    const token = getStore(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    };

    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// c???u h??nh k???t qu??? tr??? v???
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 400 || err.response.status === 404) {
      alert(err.response.data.message);
      history.push('/login');
      window.location.reload()
      return Promise.reject(err);
    }
    if (err.response.status === 500) {
      alert(err.response.data.message);
      history.push('/login');
      window.location.reload()
      return Promise.reject(err);
    }

    if (err.response.status === 401 || err.response.status === 403) {
      alert(err.response.data.message);
      history.push('/login');
      window.location.reload()
      return Promise.reject(err);
    }
  },
);

/**
 * status code
 * 400: tham s??? g???i l??n kh??ng h???p l??? => k???t qu??? kh??ng t??m ???????c (badrequest);
 * 404: tham s??? g???i l??n h???p l??? nh??ng kh??ng t??m th???y => c?? th??? b??? x??a r???i (Not found)...
 * 200: th??nh c??ng, ok
 * 201: ???? ???????c t???o th??nh c??ng => (m??nh ???? t???o r???i, sau ???? request ti???p th?? s??? tr??? 201 ) (Created)
 * 401: kh??ng c?? quy???n truy c???p v??o api ???? (Unauthorize -  c?? th??? do token kh??ng h???p l??? ho???c b??? admin ch???n)
 * 403: ch??a ????? quy???n truy c???p v??o api ???? (Forbiden - token h???p l??? tuy nhi??n token ???? ch??a ????? quy???n truy c???p v??o api)
 * 500: l???i x??yr ra t???i server (c?? th??? frontend g???i d??? li???u kh??ng h???p l??? => backend trong qu?? tr??nh x??? l?? code g??y ra l???i ho???c do backend code b??? l???i => Error in server )
 */
