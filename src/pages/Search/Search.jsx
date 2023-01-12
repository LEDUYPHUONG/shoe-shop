import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

export default function Search(props) {
  let keywordRef = useRef("");
  let [searchParams, setSearchParams] = useSearchParams();
  let [arrProduct, setArrProduct] = useState([]);
  let timeoutRef = useRef({});
  const getProductByKeyword = async () => {
    try {
      // lấy keyword từ trên url: url?keyword=abc&type=nike
      let keyword = searchParams.get("keyword");
      if (keyword.trim() !== "" && keyword != null) {
        let result = await axios({
          url: "https://shop.cyberlearn.vn/api/Product?keyword=" + keyword,
          method: "GET",
        });
        setArrProduct(result.data.content);
        clearTimeout(timeoutRef.current);
      } else {
        setArrProduct([]);
      }
    } catch (err) {
    }
  };
  
  useEffect(() => {
    // Khi từ khóa có giá trị thì mới chạy
    getProductByKeyword();
  }, [keywordRef.current]);

  const handleChange = (e) => {
    keywordRef.current = e.target.value;
    timeoutRef.current = setTimeout(() => {
      setSearchParams({ keyword: keywordRef.current });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // đưa dữ liệu keyword người dùng nhập lên url
    setSearchParams({ keyword: keywordRef.current });
  };

  const renderProductByKeyword = () => {
    return arrProduct.map((product, index) => {
      return (
        <div className="item-product" key={index}>
          <div className="item-product-inner">
            <div className="product-img">
              <img src={product.image} alt="..." />
            </div>
            <div className="product-name">
              <p className="name">{product.name}</p>
            </div>
            <div className="product-description">
              <p className="description">{product.shortDescription}</p>
            </div>
            <div className="icon-heart">
              <i className="fa-solid fa-heart"></i>
              <i
                className="fa-regular fa-heart"
                style={{ display: "none" }}
              ></i>
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
        </div>
      );
    });
  };

  return (
    <form className="container-search" onSubmit={handleSubmit}>
      <div className="search-SearchArea">
        <div className="container">
          <p className="search-text">Search</p>
          <div className="search-menu">
            <div className="input-default">
              <input
                type="text"
                placeholder="product name..."
                id="keywordRef"
                onChange={handleChange}
              />
            </div>
            <div className="search-button">
              <button>
                <span>SEARCH</span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-search-result">
        <div className="search-result-table">
          <div className="search-title">
            <img src="./img/daymauindex.png" alt="..." />
            <p className="search-title-text">Search result</p>
          </div>
          <div className="container">
            <div className="search-price">
              <p className="search-price-title">Price</p>
              <div className="input-default">
                <input type="text" placeholder="decrease" />
                <div className="icon-decrease">
                  <i className="fa-solid fa-caret-down"></i>
                </div>
              </div>
              <div className="input-default search-input-ascending">
                <input type="text" placeholder="ascending" />
                <div className="icon-ascending">
                  <i className="fa-solid fa-caret-down"></i>
                </div>
              </div>
            </div>
            <div className="render-product-search">
              <div className="container">{renderProductByKeyword()}</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
