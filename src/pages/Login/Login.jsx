import React from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { loginApi, loginFacebook } from "../../redux/reducers/userReducer";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import FacebookLogin from 'react-facebook-login'; this is button login faccebook default

export default function Login(props) {
  const [showPassWord,setShowPassword] = useState(true)
  const dispatch = useDispatch();
  const frm = useFormik({
      initialValues: {
          email:'',
          password:'',
      },
      validationSchema: Yup.object().shape({
          email:Yup.string().required('email không được bỏ trống!').email('email không đúng định dạng!'),
          password:Yup.string().required('password không được bỏ trống!').min(1,'password từ 1-32 ký tự!').max(32,'password từ 1-32 ký tự!'),

      }),
      onSubmit: (values) => {
        dispatch(loginApi(values))
      }
  })

  const responseFacebook = (response) => {
    dispatch(loginFacebook(response.accessToken))
  }

  return (
    <form className="login" onSubmit={frm.handleSubmit}>
      <div className="login-container">
        <div className="login-title">
          <p className="login-title-text">Login</p>
        </div>
        <div className="horizontal-line"></div>
        <div className="form-default">
          <div className="form-item-container">
            <div className="form-item">
              <p className="form-item-title">Email</p>
              <div className="input-default">
                <i className="fa-solid fa-envelope"></i>
                <input type="text" placeholder="email" id="email" name="email" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              </div>
              <div className="span-danger">
                {frm.errors.email ? <span className="text-danger text-err">{frm.errors.email}</span>: ''}
              </div>
            </div>
            <div className="form-item">
              <p className="form-item-title">Password</p>
              <div className="input-default">
                <i className="fa-solid fa-key"></i>
                <input type={showPassWord ? 'password' : 'text'} placeholder="password" id="password" name="password" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                <div className="eye-input">
                  <div className="eye">
                    <i className={showPassWord ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={() =>{
                      setShowPassword(!showPassWord)
                    }}></i>
                  </div>
                </div>
              </div>
              <div className="span-danger">
                  {frm.errors.password ? <span className="text-danger text-err">{frm.errors.password}</span>: ''}
                </div>
            </div>
          </div>
        </div>
        <div className="form-group register-now">
          <NavLink to="/register"><span className="register-now-question">Register now ?</span></NavLink>
          <button className="button-login" type="submit">LOGIN</button>
        </div>
        <div className="login-with-facebook">     
          <FacebookLogin
            appId="1135304574089308"
            autoLoad={false}
            fields="name,email,picture"
            render={renderProps => (
                <button onClick={renderProps.onClick} className="border-0 button-facebook-out">
                  <span className="button-facebook">
                    <i className="fa-brands fa-facebook"></i> Continue with Facebook
                  </span>
              </button>
            )}
            callback={responseFacebook} />
        </div>
        
      </div>
    </form>
  );
}
