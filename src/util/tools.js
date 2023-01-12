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

// cấu hình request cho tất cả api - response cho tất cả kết quả từ api trả về

// cấu hình domain gửi đi
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000, //5 phut
});
// cấu hình request header
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

// cấu hình kết quả trả về
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
 * 400: tham số gửi lên không hợp lệ => kết quả không tìm được (badrequest);
 * 404: tham số gửi lên hợp lệ nhưng không tìm thấy => có thể bị xóa rồi (Not found)...
 * 200: thành công, ok
 * 201: đã được tạo thành công => (mình đã tạo rồi, sau đó request tiếp thì sẽ trả 201 ) (Created)
 * 401: không có quyền truy cập vào api đó (Unauthorize -  có thể do token không hợp lệ hoặc bị admin chặn)
 * 403: chưa đủ quyền truy cập vào api đó (Forbiden - token hợp lệ tuy nhiên token đó chưa đủ quyền truy cập vào api)
 * 500: lỗi xãyr ra tại server (có thể frontend gửi dữ liệu không hợp lệ => backend trong quá trình xữ lý code gây ra lỗi hoặc do backend code bị lỗi => Error in server )
 */
