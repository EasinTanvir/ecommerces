import React,{useRef} from 'react';
import Link from 'next/link';
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '../Constext/StateContext';
import {urlFor} from '../lib/client'

export default function Cart() {

  const cartRef = useRef()
  const {setShowCart,showCart,cartItem,totalPrice,totalQuantites,toggleCartItem,onRemove} = useStateContext()
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
        type='button'
         className='cart-heading'
         onClick={()=>setShowCart(!showCart)}
          >
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>{totalQuantites} items</span>
          </button>
          {cartItem.length===0 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150}/>
              <h3>Your shopping bag is empty</h3>
              <Link href='/'>
                <button className='btn' type='button' onClick={()=>setShowCart(!showCart)}>Continue Shopping</button>
              </Link>
            </div>
          )}

          <div className='product-container'>
            {cartItem.length>=1 && cartItem.map((item)=>(

              <div className='product' key={item._id}>
                <img className='cart-product-image' src={urlFor(item?.image[0])}/>
                <div className='item-desc'>
                <div className='flex-top'>
                <h5>{item.name}</h5>    
                <h4>${item.price}</h4>            
                </div>
                <div className='flex-bottom'>
                <div>
                  <p className='quantity-desc'>
                 
                      <span className='minus' onClick={()=>toggleCartItem(item._id,'dec')} ><AiOutlineMinus /></span>
                      <span className='num' >{item.quantity}</span>
                      <span className='minus'  onClick={()=>toggleCartItem(item._id,'inc')}><AiOutlinePlus /></span>
                      
                  </p>
                </div>
                <button type='button' className='remove-item' onClick={()=>onRemove(item)}>
                  <TiDeleteOutline />
                </button>
                </div>
                </div>
              </div>

            ))}
          </div>

          {cartItem.length>=1 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>SubTotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button type='btn' className='btn' onClick=''>Pay with Stripe</button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
