import React from 'react'

export default function AdminTemplate() {
    const arrBeautifullAdminPages = [
        {
            img: '/img/adminPages01.jpg'
        },
        {
            img: '/img/adminPages02.png'
        },
        {
            img: '/img/adminPages03.png'
        },
        {
            img: '/img/adminPages04.png'
        },
        {
            img: '/img/adminPages05.png'
        },
        {
            img: '/img/adminPages06.jpg'
        },
        {
            img: '/img/adminPages07.jpg'
        },
        {
            img: '/img/adminPages08.jpg'
        },
        {
            img: '/img/adminPages09.png'
        },
        {
            img: '/img/adminPages10.png'
        },
        {
            img: '/img/adminPages11.png'
        },
        {
            img: '/img/adminPages12.jpg'
        },
        {
            img: '/img/adminPages13.png'
        },
        {
            img: '/img/adminPages14.png'
        },
        {
            img: '/img/adminPages15.png'
        },
        {
            img: '/img/adminPages16.jpg'
        },
        {
            img: '/img/adminPages17.jpg'
        },
        {
            img: '/img/adminPages18.jpg'
        },
        {
            img: '/img/adminPages19.jpg'
        },
        {
            img: '/img/adminPages20.jpg'
        },
        {
            img: '/img/adminPages21.jpg'
        },
        {
            img: '/img/adminPages22.jpg'
        },
        {
            img: '/img/adminPage23.jpg'
        },
        {
            img: '/img/adminPages24.jpg'
        },
        {
            img: '/img/adminPages25.jpg'
        },
        {
            img: '/img/adminPages26.jpg'
        },
        {
            img: '/img/adminPages27.jpg'
        },
        {
            img: '/img/adminPages28.jpg'
        },
        {
            img: '/img/adminPages29.jpg'
        },
        {
            img: '/img/adminPages30.jpg'
        },
    ]

  return (
    <div>
        {arrBeautifullAdminPages.map((imgPages,index) =>{
            return <div key={index}>
                <img width={'800px'} style={{padding:'10px'}} src={imgPages.img} alt="..." />
            </div>
        })}
    </div>
  )
}
