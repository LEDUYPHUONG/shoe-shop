import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils';

export default function ResponsiveItem({Component, ComponentMobile}) {
    const [screen,setScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    let ComponentRender = Component;
    if(screen.width < 768 && ComponentMobile) {
        ComponentRender = ComponentMobile;
    }
    useEffect(() => {
        // khi người dùng resize
        let resizeFunction = () => {
            // lấy ra kích thước mới của window
            setScreen({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.onresize = resizeFunction;
        return () =>{
            window.removeEventListener('resize', resizeFunction);
        }
    },[])

  return (
    <>
       <ComponentRender /> 
    </>
  )
}
