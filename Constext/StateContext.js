import React,{createContext,useContext,useState,useEffect} from 'react'
import toast from 'react-hot-toast'

const Context = createContext()
 
export const StateContext = ({children}) =>{

    const [showCart,setShowCart] = useState(false)
    const [cartItem,setCartItem] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalQuantites,setTotalQuantites] = useState(0)
    const [qty,setQty] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product,quantity) => {

        const checkProductInCart =cartItem.find((item)=>item._id===product._id);

        setTotalQuantites((prevTotalQuantites)=>prevTotalQuantites+quantity);
        setTotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity);
        
        if(checkProductInCart){
            
            
            const updateCartItem = cartItem.map((cartProduct)=>{
                if(cartProduct._id===product._id) 
                return {
                    ...cartProduct,
                    quantity:cartProduct.quantity+quantity
                } 
            })


            setCartItem(updateCartItem)
            
        }else{
            
            product.quantity=quantity
            setCartItem([...cartItem,{...product}])
            
            
        }
        toast.success(`${qty} ${product.name} added to the cart` )

    }

    const onRemove = (product) => {
        foundProduct=cartItem.find((item)=>item._id===product._id)
        const newCartItems = cartItem.filter((item)=>item._id !==product._id)

        setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price*foundProduct.quantity)
        setTotalQuantites((prevTotalQuantites)=>prevTotalQuantites-foundProduct.quantity)
        setCartItem(newCartItems)
    }

    const toggleCartItem =(id,value)=>{

        foundProduct=cartItem.find((item)=>item._id===id)
        index = cartItem.findIndex((product)=>product._id===id)
        const newCartItems = cartItem.filter((item)=>item._id !==id)

        if(value==='inc'){

            let newCartItem =[...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}]
            setCartItem(newCartItem)
            setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
            setTotalQuantites((prevTotalQuantites)=>prevTotalQuantites+1)

            
           

        }else if(value==='dec'){

            if(foundProduct.quantity>1){
            
            let newCartItem =[...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}]
            setCartItem(newCartItem)
            setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
            setTotalQuantites((prevTotalQuantites)=>prevTotalQuantites-1)

            }

        }

    }


    const incQty = () => {
        setQty((prev)=>prev+1)
    }

    const decQty = () => {
        setQty((prev)=>{
            if(prev-1<1) return 1

            return prev-1
        })
    }


   



    return (
        <Context.Provider value={{showCart,onRemove,setShowCart,cartItem,totalPrice,totalQuantites,qty,incQty,decQty,onAdd,toggleCartItem}}>{children}</Context.Provider>
    )    
    


}

export const useStateContext =() => useContext(Context)






// const [showCart,setShowCart] = useState(false)
// const [cartItem,setCartItem] = useState()
// const [totalPrice,setTotalPrice] = useState()
// const [totalQuantites,setTotalQuantites] = useState()
// const [qty,setQty] = useState(1)