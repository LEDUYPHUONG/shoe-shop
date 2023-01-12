import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../index';
import { clearStore, USER_LOGIN, CART_LIST } from '../../util/tools';

export default function HeaderHome() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { cartListing } = useSelector((state) => state.productReducer);
  const getTotalQuatity = () => {
    let total = 0;
    if (cartListing) {
      cartListing.forEach((item) => {
        total = total + item.quantityOrder;
      });
    }
    return total;
  };
  const renderLoginNavItem = () => {
    if (!userLogin) {
      return (
        <NavLink to="login" className="HeaderHome-Login">
          Login
        </NavLink>
      );
    } else {
      return (
        <>
          <div className="HeaderHome-IconGiohang" onClick={() =>{
            checkQuantityOfCart()
          }}>
            <i className="fa-solid fa-cart-shopping"></i> ( {getTotalQuatity()} )
          </div>
          <NavLink to="profile" className="HeaderHome-NumberCarts">
            Hello, {userLogin.name}{' '}
          </NavLink>
        </>
      );
    }
  };

  const logout = () => {
    clearStore(USER_LOGIN);
    clearStore(CART_LIST);
    localStorage.clear();
    window.location.reload();
  };
  
  const checkQuantityOfCart = () => {
    if (getTotalQuatity() !== 0) {
      history.push('/carts')
    } else {
      alert('Quantity of cart is 0. Please, add some shoes to carts!')
      history.push('/')
    }
  }
  return (
    <div className="HeaderHome-Container">
      <div className="HeaderHome">
        <div className="HeaderHome-Header">
          <NavLink to="">
            <img src="/img/logo-shoe-shop-white.png" alt="logo-shoe-shop-white" />
            <span className='logo-text'>Shoe shop</span>
          </NavLink>
          <div className="Search-Carts-Login-Rigister">
            <NavLink to="search" className="HeaderHome-Search">
              <i className="fa-solid fa-magnifying-glass iconSearch"></i>
            </NavLink>
            <NavLink to="search" className="HeaderHome-TextSearch">
              Search
            </NavLink>
            {renderLoginNavItem()}
            {!userLogin ? (
              <NavLink to="register" className="HeaderHome-Register">
                Register
              </NavLink>
            ) : (
              <button
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 300,
                  fontSize: '16px',
                  lineHeight: '19px',
                  padding: '5px',
                  marginLeft: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  background: '#F2994A',
                  boxShadow: '(0px 38.4869px 71.4756px rgba(0, 0, 0, 0.07))',
                }}
                onClick={() => logout()}
              >
                <NavLink to="login">Logout</NavLink>
              </button>
            )}
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm navbar-white bg-white">
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                to=""
                className="nav-link text-dark active"
                style={{ borderBottom: '1px solid #000' }}
                href="#"
                aria-current="page"
              >
                Home <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className="nav-link text-dark">
                Men
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className="nav-link text-dark">
                Woman
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className="nav-link text-dark">
                Kid
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className="nav-link text-dark">
                Sport
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
