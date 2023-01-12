import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from '../../component/Product/Product'

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselIndex from "../../component/CarouselIndex/CarouselIndex";
import { getProductApi } from "../../redux/reducers/productReducer";



export default function Index() {
  // "start": "set HTTPS=true&&react-scripts start",
  const {arrProduct} = useSelector(state => state.productReducer);
  const arrProductCarousel = arrProduct.filter(prod => prod.id <= 3)
  
  const dispatch = useDispatch();


  useEffect(() => {
    const actionApi = getProductApi();
    dispatch(actionApi);
  },[])

  const renderProduct = () => {
    return arrProduct.map((prod,index) => {
      return <div className="item-product" key={index}>
                <Product product={prod}/>
              </div>   
    })
  }
 
  return (
    <>
      <CarouselIndex arrProductCarousel={arrProductCarousel}/>
      <div className="index-product-feature">
        <div className="product-feature-img">
          <div className="product-feature-img-out">
            <img src="./img/daymauindex.png" alt="..." />
          </div>
          <p className="product-feature-text">Product Feature</p>
        </div>
        <div className="render-product-index">
          <div className="container">
            {renderProduct()}
          </div>
        </div>
      </div>
    </>
  );
}

