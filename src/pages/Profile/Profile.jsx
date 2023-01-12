import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileApi } from "../../redux/reducers/userReducer";

export default function Profile(props) {
  const { userLogin } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      email: userLogin.email,
      phone: userLogin.phone,
      gender: userLogin.gender,
      name: userLogin.name,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email không được bỏ trống!")
        .email("email không đúng định dạng!"),
      phone: Yup.string()
        .required("phone không được bỏ trống!")
        .min(9, "phone từ 9-11 số!")
        .max(11, "phone từ 9-11 số!"),
      name: Yup.string()
        .required("name không được bỏ trống!")
        .min(1, "password từ 1-32 ký tự!")
        .max(32, "password từ 1-32 ký tự!"),
      gender:Yup.string()
        .required('gender không được bỏ trống!'),
    }),
    onSubmit: (values) => {
      if (values.gender === "true") {
        values.gender = true;
      } else {
        values.gender = false;
      }
      dispatch(updateProfileApi(values));
    },
  });

  const checkGender = () =>{
    if (userLogin.gender) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className="profile">
        <div className="profile-img">
          <div className="profile-img-out">
            <img src="./img/daymauindex.png" alt="..." />
          </div>
          <p className="profile-text">Profile</p>
        </div>
        <div className="profile-container">
          <div className="profile-avata">
            <img src="./img/avataProfile.png" alt="..." />
          </div>
          <div className="form-default">
            <form className="form-default" onSubmit={frm.handleSubmit}>
              <div className='form-item-input row'>
                <div className="form-item col-md-6">
                  <p className='form-item-title'>Email</p>
                  <div className="input-default">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" placeholder="email" id="email" name="email" defaultValue={frm.initialValues.email} onChange={frm.handleChange} onBlur={frm.handleBlur} disabled />
                  </div>
                  <div className="span-danger">
                    {frm.errors.email ? <span className="text-danger text-err">{frm.errors.email}</span>: ''}
                  </div>
                </div>
                <div className="form-item col-md-6">
                  <p className='form-item-title'>Name</p>
                  <div className="input-default">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder="name" id="name" name="name" defaultValue={frm.initialValues.name} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                  </div>
                  <div className="span-danger">
                    {frm.errors.name ? <span className="text-danger text-err">{frm.errors.name}</span>: ''}
                  </div>
                </div>
                <div className="form-item col-md-6">
                  <p className='form-item-title'>Phone</p>
                  <div className="input-default">
                    <i className="fa-solid fa-phone"></i>
                    <input type="text" placeholder="phone" id="phone" name="phone" defaultValue={frm.initialValues.phone} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                  </div>
                  <div className="span-danger">
                      {frm.errors.phone ? <span className="text-danger text-err">{frm.errors.phone}</span>: ''}
                    </div>
                </div>
                <div className="form-item col-md-6" id="gender">
                  <p className='form-item-title'>Gender</p>
                  <div className="option-gender">
                    <div className="option">
                      <input type="radio" id="male" name="gender" value={true} onClick={frm.handleChange} defaultChecked={checkGender() === true ? true : false}/>
                      <label htmlFor='css'>Male</label>
                    </div>
                    <div className="option">
                      <input type="radio" id="female" name="gender" value={false} onClick={frm.handleChange} defaultChecked={checkGender() === false ? true : false} />
                      <label htmlFor="css">Female</label>
                    </div>
                  </div>
                  <div className="span-danger">
                    {frm.errors.gender ? <span className="text-danger text-err">{frm.errors.gender}</span>: ''}
                  </div>
                </div>
              </div>
              <div className="submit-button">
                <button className='button-submit' type="submit">Update</button>
              </div>
            </form>  
          </div>
        </div>
        <div className="horizontal-line"></div>
        <div className="container-order-history-favourite">
          <div className="order-history-favourite">
            <div className="line-left-order-history"></div>
            <span className="order-history">Order history</span>
            <div className="line-between-order-history"></div>
            <span className="favourite">Favourite</span>
            <div className="line-right-order-history"></div>
          </div>
          <div className="line-under-order-history-favourite"></div>
        </div>

        <div className="render-order-history">
          <div className="item-table">
            <p className="time-order">
              + Orders have been placed on 09 - 19 - 2020
            </p>
            <table className="table-default">
              <thead className="title-table">
                <tr>
                  <th className="id">id</th>
                  <th className="img">img</th>
                  <th className="name">name</th>
                  <th className="price">price</th>
                  <th className="quantity">quantity</th>
                  <th className="total">total</th>
                </tr>
              </thead>
              <tbody className="row-table">
                <tr>
                  <td className="id-product">1</td>
                  <td className="img-product">
                    <img
                      widtd={50}
                      height={50}
                      src="./img/Giay.png"
                      alt="..."
                    />
                  </td>
                  <td className="name-product">product 1</td>
                  <td className="price-product">1000</td>
                  <td className="quantity-product">
                    <button className="btn btn-primary">1</button>
                  </td>
                  <td className="total-product">1000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="item-table">
            <p className="time-order">
              + Orders have been placed on 09 - 19 - 2020
            </p>
            <table className="table-default">
              <thead className="title-table">
                <tr>
                  <th className="id">1</th>
                  <th className="img">img</th>
                  <th className="name">name</th>
                  <th className="price">price</th>
                  <th className="quantity">quantity</th>
                  <th className="total">total</th>
                </tr>
              </thead>
              <tbody className="row-table">
                <tr>
                  <td className="id-product">id</td>
                  <td className="img-product">
                    <img
                      widtd={50}
                      height={50}
                      src="./img/Giay.png"
                      alt="..."
                    />
                  </td>
                  <td className="name-product">product 1</td>
                  <td className="price-product">1000</td>
                  <td className="quantity-product">
                    <button className="btn btn-primary">1</button>
                  </td>
                  <td className="total-product">1000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="quantity-table">
            <button className="btn prev-icon-table">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn number-table">1</button>
            <button className="btn number-table">2</button>
            <button className="btn number-table">...</button>
            <button className="btn number-table">9</button>
            <button className="btn number-table">10</button>
            <button className="btn next-icon-table">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
