import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProductDetailApi } from '../../redux/reducers/productReducer';
import { setStoreJson, CART_LIST } from '../../util/tools';
import { setCartListing } from '../../redux/reducers/productReducer';

export default function Detail() {
  const { productDetail } = useSelector((state) => state.productReducer);
  const { cartListing } = useSelector((state) => state.productReducer);
  // const { quantityCarts } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const params = useParams();
  const [quantityNumberShoes, setQuantityNumberShoes] = useState(1);

  useEffect(() => {
    let { id } = params;
    dispatch(getProductDetailApi(id));
  }, [params.id]);

  const renderSizeShoe = () => {
    return productDetail.size?.map((sizeNumber, index) => {
      return (
        <button className="btn btn-primary" key={index}>
          {sizeNumber}
        </button>
      );
    });
  };

  const renderRealateShoes = () => {
    return productDetail.relatedProducts?.map((product, index) => {
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
                style={{ display: 'none' }}
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

  const addToCard = () => {
    let cartListingCopy = cartListing ? [...cartListing] : [];
    const { id } = productDetail;
    // tìm kiếm vị trí của sản phẩm trong danh sách cart
    const matchproductIndex =
      cartListingCopy &&
      cartListingCopy.findIndex((item) => {
        return item.id === id;
      });
    // tim kiem neu san pham da ton tai thi tang so luong, nguoc lại thì thêm sản phẩm vào danh sách cart
    // thêm isChecked để xủ lý checked trong trang cart; set relatedProducts : null vì không dùng tới
    if (matchproductIndex !== -1) {
      cartListingCopy[matchproductIndex] = {
        ...cartListingCopy[matchproductIndex],
        quantityOrder:
          cartListingCopy[matchproductIndex].quantityOrder +
          quantityNumberShoes,
        isChecked: false,
        relatedProducts: null,
      };
      // lưu vào redux
      dispatch(setCartListing(cartListingCopy));
      alert(`${cartListingCopy[matchproductIndex].name} is updated quatity`);
    } else {
      cartListingCopy = [
        ...cartListingCopy,
        {
          ...productDetail,
          quantityOrder: quantityNumberShoes,
          isChecked: false,
          relatedProducts: null,
        },
      ];

      // lưu vào redux
      dispatch(setCartListing(cartListingCopy));
      alert(`${productDetail.name} is added to cart`);
    }
    //lưu vào storage
    setStoreJson(CART_LIST, cartListingCopy);
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="detail-product">
          <div className="product-info">
            <div className="product-info-inner">
              <div className="container d-flex justify-content-between">
                <div className="product-img">
                  <div className="product-img-iner">
                    <img src={productDetail.image} alt="..." />
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-name">
                    <p className="product-name-text">{productDetail.name}</p>
                  </div>
                  <div className="product-description">
                    <div className="product-description-text">
                      {productDetail.description}
                    </div>
                    <div className="available-size">
                      <div className="available-size-text">Available size</div>
                      <div className="button-size">{renderSizeShoe()}</div>
                      <div className="price">{productDetail.price}$</div>
                      <div className="quantity">
                        <button
                          className="btn btn-primary btnUp"
                          onClick={() => {
                            if (quantityNumberShoes >= 1) {
                              setQuantityNumberShoes(quantityNumberShoes - 1);
                            } else {
                              return;
                            }
                          }}
                        >
                          -
                        </button>
                        <span className="number-shoes">
                          {quantityNumberShoes}
                        </span>
                        <button
                          className="btn btn-primary btnDown"
                          onClick={() => {
                            setQuantityNumberShoes(quantityNumberShoes + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btnAddToCarts"
                        onClick={() => {
                          addToCard();
                        }}
                      >
                        Add to carts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="title-realate-product">-Realate Product -</p>
        <div className="render-product-detail">
          <div className="container">{renderRealateShoes()}</div>
        </div>
      </div>
    </div>
  );
}
