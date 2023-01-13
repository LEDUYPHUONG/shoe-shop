import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreJson, CART_LIST } from "../../util/tools";
import {
  orderProducts,
  setCartListing,
} from "../../redux/reducers/productReducer";

export default function Carts() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { cartListing } = useSelector((state) => state.productReducer);

  const [checkedState, setCheckedState] = useState(false);
  const dispatch = useDispatch();

  const deleteProductCarts = (product) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm không?")) {
      const cartListCopy = JSON.parse(JSON.stringify(cartListing)); // copy to new array; use JSON parse for not change orgin array
      const matchpProductIndex = cartListCopy.findIndex((item) => {
        return item.id === product.id;
      });
      cartListCopy.splice(matchpProductIndex, 1);
      dispatch(setCartListing(cartListCopy));
      setStoreJson(CART_LIST, cartListCopy);
    }
  };

  const updateQuatity = (product, newQuantity) => {
    const cartListCopy = JSON.parse(JSON.stringify(cartListing));
    const matchproductIndex =
      cartListCopy &&
      cartListCopy.findIndex((item) => {
        return item.id === product.id;
      });
    if (matchproductIndex !== -1) {
      cartListCopy[matchproductIndex] = {
        ...cartListCopy[matchproductIndex],
        quantityOrder: newQuantity,
      };
    }
    dispatch(setCartListing(cartListCopy));
    //lưu vào storage
    setStoreJson(CART_LIST, cartListCopy);
  };

  // giảm số lương
  const decreaseProduct = (product) => {
    // nếu số lượng lớn hơn 1 thì mới cho giảm
    if (product.quantityOrder > 1) {
      const newQuantity = product.quantityOrder - 1;
      updateQuatity(product, newQuantity);
    }
  };

  // tăng số lương
  const increaseProduct = (product) => {
    const newQuantity = product.quantityOrder + 1 || 1;
    if (product.quantity > newQuantity) {
      updateQuatity(product, newQuantity);
    }
  };

  // xủ lý checked sản phẩm khi checkbox all change
  const onCheckboxAllChange = () => {
    if (checkedState) {
      setCheckedState(false);
    } else {
      setCheckedState(true);
    }
  };

  // xủ lý checked sản phẩm khi checkbox change
  const onCheckboxChange = (product) => {
    const cartListCopy = JSON.parse(JSON.stringify(cartListing));
    const matchproductIndex =
      cartListCopy &&
      cartListCopy.findIndex((item) => {
        return item.id === product.id;
      });
    if (matchproductIndex !== -1) {
      cartListCopy[matchproductIndex] = {
        ...cartListCopy[matchproductIndex],
        isChecked: !product.isChecked,
      };
    }
    dispatch(setCartListing(cartListCopy));
    //lưu vào storage
    setStoreJson(CART_LIST, cartListCopy);
  };

  // nếu checkedState thay đồi thì update mảng cart
  useEffect(() => {
    let cartListCopy = JSON.parse(JSON.stringify(cartListing));
    // hàm map để chình sủa lại mảng
    cartListCopy = cartListCopy.map((item) => {
      item.isChecked = checkedState;
      return item;
    });
    dispatch(setCartListing(cartListCopy));
    setStoreJson(CART_LIST, cartListCopy);
    // eslint-disable-next-line
  }, [checkedState]);

  const renderProductCarts = () => {
    return (
      <>
        <table className="table-default mb-5 b-t b-light">
          <thead className="title-table">
            <tr>
              <th className="icon-check">
                <input
                  type="checkbox"
                  onChange={() => onCheckboxAllChange()}
                  value={checkedState}
                />
              </th>
              <th className="id">id</th>
              <th className="img">img</th>
              <th className="name">name</th>
              <th className="price">price</th>
              <th className="quantity">quantity</th>
              <th className="total">total</th>
              <th className="action">action</th>
            </tr>
          </thead>
          <tbody className="row-table">
            {cartListing && cartListing.length > 0 ? (
              cartListing.map((product, index) => {
                return (
                  <tr key={product.id}>
                    <td className="checkbox">
                      <span className="checkbox-out">
                        <input
                          type="checkbox"
                          id="checkbox"
                          checked={product.isChecked}
                          onChange={() => onCheckboxChange(product)}
                        />
                      </span>
                    </td>
                    <td className="id-product">{product.id}</td>
                    <td className="img-product">
                      <img
                        widtd={75}
                        height={75}
                        src={product.image}
                        alt="..."
                      />
                    </td>
                    <td className="name-product">{product.name}</td>
                    <td className="price-product">{product.price}</td>
                    <td className="quantity-product">
                      <button
                        className="btn btnDown"
                        type="button"
                        onClick={() => decreaseProduct(product)}
                      >
                        -
                      </button>
                      <button className="btn btn-primary" type="button">
                        {product.quantityOrder}
                      </button>
                      <button
                        className="btn btnUp"
                        type="button"
                        onClick={() => increaseProduct(product)}
                      >
                        +
                      </button>
                    </td>
                    <td className="total-product">
                      {product.price * product.quantityOrder}
                    </td>
                    <td className="action-button">
                      <button className="btn btnEdit" type="button">
                        EDIT
                      </button>
                      <button
                        className="btn btnDelete"
                        type="button"
                        onClick={() => deleteProductCarts(product)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7}>Your cart is empty</td>
              </tr>
            )}
          </tbody>
        </table>

      </>
    );
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (cartListing && cartListing.length) {
      // copy thành mảng mới để ko làm thay đổi mảng cũ
      const cartListCopy = JSON.parse(JSON.stringify(cartListing));
      // lọc lại mảng để lấy những sản phẩm được check
      const cartListIsChecked = cartListCopy.filter((item) => item.isChecked);

      const orderDetailIds = cartListIsChecked.map((item) => {
        return {
          productId: item.id.toString(),
          quantity: item.quantityOrder,
        };
      });
      dispatch(
        orderProducts({
          orderDetail: orderDetailIds,
          email: userLogin.email,
          cartListing, // cái này dùng để lọc lại mảng sau khi đặt hàng thành công
        })
      );
    }
  };

  return (
    <div>
      <form className="carts">
        <div className="container">
          <div className="carts-title">
            <p className="carts-title-text">Carts</p>
          </div>
          <div className="horizontal-line"></div>
          <div className="table-responsive">
            {renderProductCarts()}
            
          </div>
          <div className="Submit-oder">
              <button
                className="btn btnSubmitOder"
                type="submit"
                onClick={submitOrder}
              >
                SUBMIT ODER
              </button>
            </div>
        </div>
      </form>
    </div>
  );
}
