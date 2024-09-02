import React, { createContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';


export const ShopContext = createContext(null);
const getDefaultCart=()=>{
  let cart={};
  for(let index=0;index<300+1;index++){
     cart[index]=0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [allProduct,setAll_product]=useState([]);
  const [cartItem,setCartItem]=useState(getDefaultCart()); 
  useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_product(data))
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/getcart',{
        method:'POST',
        headers:{
          Accept:'application/from-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:"",
      }).then((response)=>response.json())
      .then((data)=>setCartItem(data));
    }
  },[])
  const addToCart=(ItemId)=>{
    setCartItem((prev)=>({...prev,[ItemId]:prev[ItemId]+1}))
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/from-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"ItemId":ItemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data));
    }
  }
  const removeFromCart=(ItemId)=>{
    setCartItem((prev)=>({...prev,[ItemId]:prev[ItemId]-1}))
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/from-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"ItemId":ItemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data));
    }
  }
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let iteminfo = allProduct.find((product) => product.id === Number(item));
        totalAmount = totalAmount + iteminfo.new_price * cartItem[item];
      }
    }
    console.log(totalAmount);
    return totalAmount;
  }
  const getTotalCartItem=()=>{
    let totalItem=0;
    for(const item in cartItem){
      if(cartItem[item]>0){
        totalItem+=cartItem[item];
      }
    }
    return totalItem;
  }
  const contextValue = {getTotalCartItem,getTotalCartAmount ,allProduct,cartItem,addToCart,removeFromCart};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;