// rxslice
import { createSlice } from '@reduxjs/toolkit';
import {
  http,
  getStoreJson,
  CART_LIST,
  clearStore,
  setStoreJson,
} from '../../util/tools';

const initialState = {
  arrProduct: [],
  productDetail: [],
  cartListing: getStoreJson(CART_LIST),
  quantityCarts: 0,
  arrProductCarts: [],
  infoOrder: [
    {
      productId: '',
      quantity: 0,
    },
  ],
};

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    setCartListing: (state, action) => {
      state.cartListing = action.payload;
    },
    getArrProductAfterDelete: (state, action) => {
      state.arrProductCarts = action.payload;
      state.quantityCarts = state.arrProductCarts.length;
    },
    setInfoOrder: (state, action) => {
      // if(state.infoOrder.find(prod => prod.productId === action.payload.id )){
      //     state.infoOrder[].quantity =
      // }
      // state.infoOrder[].productId = action.payload
    },
  },
});

//............action type,payload ....................

export const {
  setInfoOrder,
  getProductAction,
  getProductDetailAction,
  setCartListing,
  getArrProductAfterDelete,
} = productReducer.actions;

export default productReducer.reducer;

// ............action Api (action thunk) ....................

export const getProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.get('/product');
      let arrProduct = result.data.content;
      const action = getProductAction(arrProduct);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const getProductDetailApi = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get(`/Product/getbyid?id=${id}`);
      let arrProduct = result.data.content;
      const action = getProductDetailAction(arrProduct);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const orderProducts = (useParams) => {
  return async (dispatch) => {
    try {
      const response = await http.post('/Users/order', {
        orderDetail: useParams.orderDetail,
        email: useParams.email,
      });
      if (response) {
        // xóa localstograge và show thong bao sau khi thanh cong
        alert(response.data.content);
        // lọc lại cart lisitng, chỉ giữ lại product với isChecked: false
        let newCartListing = null;
        const { orderDetail, cartListing } = useParams;
        const orderDetailIds = []; // dùng cho filter lại cartListing theo id
        orderDetail.forEach((element) => {
          orderDetailIds.push(element.productId);
        });
        if (orderDetailIds.length > 0) {
          newCartListing = cartListing.filter((item) => {
            return !orderDetailIds.includes(item.id.toString());
          });
          setStoreJson(CART_LIST, newCartListing);
        } else {
          clearStore(CART_LIST);
        }
        dispatch(setCartListing(newCartListing));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
