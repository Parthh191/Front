import React, { useContext, useRef, useState } from 'react'
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';
const Navbar = () => {
    const [menu,setMenu]=useState("shop");
    const {getTotalCartItem}=useContext(ShopContext);
    const menuRef=useRef();
    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="shpper_logo" />
            <p>Shopper</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu('shop')}}><Link className='link'  to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('mens')}}><Link className='link' to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('women')}}><Link className='link' to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('kids')}}><Link className='link' to='/kids'>Kid</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="login-cart">
            {localStorage.getItem('auth-token')
            ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>
            }
            <Link to='/cart'> <img src={cart_icon} alt="cart" /> </Link>
            <div className="nav-cart-count">{getTotalCartItem()}</div>
        </div>
    </div>
  )
}

export default Navbar
