import React from "react";
import { NavLink } from "react-router-dom";

export default function Product({ product }) {
  return (
    <>
      <div className="item-product-inner">
        <div className="product-img">
          <img src={product.image} alt={product.image} />
        </div>
        <div className="product-name">
          <p className="name">{product.name}</p>
        </div>
        <div className="product-description">
          <p className="description">{product.description}</p>
        </div>
        <div className="icon-heart">
          <i className="fa-solid fa-heart"></i>
          <i className="fa-regular fa-heart" style={{ display: "none" }}></i>
        </div>
        <div className="buton-buynow-price">
          <NavLink to={`/detail/${product.id}`}>
            <button className="buton-buy-now">
              <span>Buy now</span>
            </button>
          </NavLink>

          <div className="button-price">
            <span>{product.price}$</span>
          </div>
        </div>
      </div>
    </>
  );
}
