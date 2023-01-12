import React from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { createProfileApi } from "../../redux/reducers/userReducer";
import { useState } from "react";

export default function Register() {
  const [showPassWord,setShowPassword] = useState(true);
  const [showPassWordCF,setShowPasswordCF] = useState(true);

  const dispatch = useDispatch();
  const frm = useFormik({
      initialValues: {
          email:'',
          password:'',
          phone:'',
          name:'',
          gender: true,
          passwordConfirm:'',
      },
      validationSchema: Yup.object().shape({
          email:Yup.string().required('email không được bỏ trống!').email('email không đúng định dạng!'),
          password:Yup.string().required('password không được bỏ trống!').min(1,'password từ 1-32 ký tự!').max(32,'password từ 1-32 ký tự!'),
          phone:Yup.string().required('phone không được bỏ trống!').min(9,'phone từ 9-11 số!').max(11,'phone từ 9-11 số!'),
          name:Yup.string().required('name không được bỏ trống!').min(1,'password từ 1-32 ký tự!').max(32,'password từ 1-32 ký tự!'),
          passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'passwordConfirm phải giống với password!').required('passwordConfirm không được bỏ trống!'),
          gender:Yup.string().required('gender không được bỏ trống!')
      }),
      onSubmit: (values) => {
          if(values.gender === 'true'){
            values.gender = true
          }else{
            values.gender = false
          }
        dispatch(createProfileApi(values))
      }
  });

  return (
    <div className="register">
      <div className="container">
        <div className="register-title">
          <p className="register-title-text">Register</p>
        </div>
        <div className='register-container'>
          <form className="form-default" onSubmit={frm.handleSubmit}>
            <div className='form-item-input row'>
              <div className="form-item col-md-6">
                <p className='form-item-title'>Email</p>
                <div className="input-default">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="text" placeholder="email" id="email" name="email" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                </div>
                <div className="span-danger">
                  {frm.errors.email ? <span className="text-danger text-err">{frm.errors.email}</span>: ''}
                </div>
              </div>
              <div className="form-item col-md-6">
                <p className='form-item-title'>Name</p>
                <div className="input-default">
                  <i className="fa-solid fa-user"></i>
                  <input type="text" placeholder="name" id="name" name="name" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                </div>
                <div className="span-danger">
                  {frm.errors.name ? <span className="text-danger text-err">{frm.errors.name}</span>: ''}
                </div>
              </div>
              <div className="form-item col-md-6">
                <p className='form-item-title'>Phone</p>
                <div className="input-default">
                  <i className="fa-solid fa-phone"></i>
                  <input type="text" placeholder="phone" id="phone" name="phone" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                </div>
                <div className="span-danger">
                    {frm.errors.phone ? <span className="text-danger text-err">{frm.errors.phone}</span>: ''}
                  </div>
              </div>
              <div className="form-item col-md-6">
                <p className='form-item-title'>Password</p>
                <div className="input-default">
                  <i className="fa-solid fa-key"></i>
                  <input type={showPassWord ? "password" : 'text'} placeholder="password" id="password" name="password" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                  <div className="eye-input">
                    <div className="eye">
                      <i className={showPassWord ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() =>{
                        setShowPassword(!showPassWord)
                      }}></i>
                    </div>
                  </div>
                </div>
                <div className="span-danger">
                  {frm.errors.password ? <span className="text-danger text-err">{frm.errors.password}</span>: ''}
                </div>
              </div>
              <div className="form-item col-md-6">
                <p className='form-item-title'>Password confirm</p>
                <div className="input-default">
                  <i className={frm.errors.passwordConfirm ? "fa-solid fa-unlock": "fa-solid fa-lock"}></i>
                  <input type={showPassWordCF ? 'password' : 'text'} placeholder="password confirm" id="passwordConfirm" name="passwordConfirm" onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                  <div className="eye-input">
                    <div className="eye">
                      <i className={showPassWordCF ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() =>{
                        setShowPasswordCF(!showPassWordCF)
                      }}></i>
                    </div>
                  </div>
                </div>
                <div className="span-danger">
                  {frm.errors.passwordConfirm ? <span className="text-danger text-err">{frm.errors.passwordConfirm}</span>: ''}
                </div>
              </div>
              <div className="form-item col-md-6" id="gender">
                <p className='form-item-title'>Gender</p>
                <div className="option-gender">
                  <div className="option">
                    <input type="radio" id="male" name="gender" value={true} onClick={frm.handleChange}/>
                    <label htmlFor='css'>Male</label>
                  </div>
                  <div className="option">
                    <input type="radio" id="female" name="gender" value={false} onClick={frm.handleChange}/>
                    <label htmlFor="css">Female</label>
                  </div>
                </div>
                <div className="span-danger">
                  {frm.errors.gender ? <span className="text-danger text-err">{frm.errors.gender}</span>: ''}
                </div>
              </div>
            </div>
            <div className={frm.errors.passwordConfirm ? "submit-button opacity-0" : "submit-button"}>
                  <button className='button-submit' type="submit">Submit</button>
              </div>
          </form>          
        </div>
      </div>
    </div>
  )
}
