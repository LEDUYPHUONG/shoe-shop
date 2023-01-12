import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, getStoreJson, http, setStore, setStoreJson, USER_LOGIN } from '../../util/tools';
import { history } from '../../index';

const initialState = {
    userLogin: getStoreJson(USER_LOGIN) // có thể null hoặc object
    
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    getProfileAction: (state,action) => {
        state.userLogin = action.payload;
    },

  }
});

export const {getProfileAction} = userReducer.actions

export default userReducer.reducer

// login
export const loginApi = (userLogin) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/users/signin',userLogin)
            setStore(ACCESS_TOKEN,result.data.content.accessToken);
            dispatch(getProfileApi());
            const MoveProfilePage = () =>{
                alert('Logged in successfully!')
                history.push('/profile');
                clearTimeout(loginTimeout);
            }
            const loginTimeout = setTimeout(MoveProfilePage, 500);
        } catch (err) {
            console.log(err);
        }
    }
    
}
// login fb
export const loginFacebook = (accessToken) => {
    return async (dispatch) => {
        try {
            const result = await http.post('/Users/facebooklogin',{facebookToken:accessToken});
            dispatch(getProfileApi())
            const MoveProfilePage = () =>{
                setStore(ACCESS_TOKEN,result.data.content.accessToken);
                if (result.data.content.accessToken){
                    history.push('/profile')
                }
                clearTimeout(loginFBTimeout);
            }
            const loginFBTimeout = setTimeout(MoveProfilePage, 1000);  
        } catch (err) {
            console.log(err);
        }
    }
    
}
// index
export const getProfileApi = () => {
    return async dispatch => {
        try {
            const result = await http.post('/users/getProfile');
            const action = getProfileAction(result.data.content);
            dispatch(action);
            setStoreJson(USER_LOGIN,result.data.content)
        } catch (err) {
            
        }
    }
}
// register
export const createProfileApi = (formData) => {
    return async () => {
      try {
        delete formData.passwordConfirm;
        const response = await http.post('/users/signup', formData);
        if (response && response.data) {
          alert(response.data.message);
          history.push('/login');
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 400 && err.response.data) {
          alert(err.response.data.message);
        }
      }
    };
};
// profile
export const updateProfileApi = (formData) => {
    return async (dispatch) => {
        try {
            const response = await http.post('/users/updateProfile',formData)
           
            if (response && response.data) {
                dispatch(getProfileApi())
                alert(response.data.content);
                window.location.reload()
            }
        } catch (err) {
            console.log(err);

            if (err.response.status === 400 && err.response.data) {
                alert(err.response.data.content);
            }
        }
    }
    
}
// carts
export const getUserOderApi = () => {
    return async dispatch => {
        try {
            await http.post('/users/order');
        } catch (err) {
            
        }
    }
}

