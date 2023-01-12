// rfc
import React from 'react'
import { NavLink } from 'react-router-dom'
import AdminTemplate from '../../templates/AdminTemplate'

export default function AdminPage(props) {
  return (
    <div className='container'>
        <div className="d-flex" style={{minHeight:'100vh'}}>
            <div className="menu w-25 bg-primary text-light pt-5 mt-2">
                <nav>
                    <NavLink to='profile'><p className='text-light px-5'>Quản lý người dùng <i class="fa-solid fa-caret-down text-dark"></i></p></NavLink>
                    <br />
                    <NavLink to='carts'><p className='text-light px-5'>Quản lý sản phẩm <i class="fa-solid fa-caret-down text-dark"></i></p></NavLink>
                </nav>
            </div>
            <div className="content w-75">
                <AdminTemplate />
            </div>
        </div>
    </div>
  )
}
