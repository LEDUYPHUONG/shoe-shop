import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { store } from './redux/configStore';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import Index from './pages/Index/Index'
import Detail from './pages/Detail/Detail'
import Login from './pages/Login/Login'
import Carts from './pages/carts/Carts'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Search from './pages/Search/Search'
import '../src/assets/scss/styles.scss'
import AdminTemplate from './templates/AdminTemplate'

export const history = createBrowserHistory({ window });
const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path='' element={<App />}>
            <Route index element={<Index />}></Route>
            <Route path='detail'>
              <Route path=':id' element={<Detail/>}></Route>
            </Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='carts' element={<Carts />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='search' element={<Search />}></Route>
            <Route path='*' element={<Navigate to=''/>}></Route>
          </Route>
          <Route path='admin' element={<AdminTemplate />}></Route>
        </Routes>
    </HistoryRouter>
  </Provider>
);
