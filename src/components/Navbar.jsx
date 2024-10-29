import React from 'react';
import { useEffect, useState } from 'react';
import './Navbar.css';
import { useLocation } from 'react-router-dom';
import LoginIcon from './LoginIcon';
export default function Navbar(){
    const isLoggedUser = JSON.parse(localStorage.getItem('LoginUser'));
    const [loginicon, setloginicon] =useState('');
    useEffect(() => {
      if (isLoggedUser) {
          const firstLetter = isLoggedUser.email.charAt(0).toUpperCase();
          setloginicon(firstLetter);
      }
  }, [isLoggedUser]);

    const[navBarBackground, setnavBarBackground] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        const handleScroll =()=>{
        if(window.scrollY > 50 && window.innerWidth > 1024){
            setnavBarBackground(true);
        }
        else{
            setnavBarBackground(false);
        }
    }
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize',handleScroll)
        return ()=>window.removeEventListener('scroll', handleScroll);

    },[]);

    const isLoginPage = location.pathname === '/login';
    const isShopPage =location.pathname === '/shop';
    const isProductDetailPage =location.pathname.startsWith('/product-detail/');
    const isCartPage = location.pathname.startsWith('/cart')
    return(
<nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${isLoginPage||isShopPage||isProductDetailPage||isCartPage ? 'customNavbar' : navBarBackground ? 'bg-dark' : 'bg-transparent'} transition d-flex`} id='navbar'>
  <div className="container-fluid p-0">
    <span className="navbar-toggler p-0" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"><i class="bi bi-menu-button"></i></span>

    <a className="navbar-brand m-0" href="/">Fruit Shop</a>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto pages">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/shop">Shop</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Featured</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Pages</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Blogs</a>
        </li>
      </ul>
      <ul className="navbar-nav d-flex flex-row">
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="bi bi-search"></i></a>
        </li>
        <li className="nav-item">
          {isLoggedUser ? (<LoginIcon icon={loginicon}/>) : (<a className="nav-link" href="/login"><i className="bi bi-person"></i></a>)}
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="bi bi-heart"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/cart"><i className="bi bi-bag"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}