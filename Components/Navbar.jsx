import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../Constext/StateContext'

export default function Navbar() {

  const {showCart,setShowCart,totalQuantites} = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>JSM HEADphone</Link>
      </p>
      <button type='button' className='cart-icon' onClick={()=>setShowCart(!showCart)} >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantites}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}
