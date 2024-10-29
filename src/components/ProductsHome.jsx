import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductsHome.css';
export default function ProductsHome (){
    const settings = {
        dots: true,           
        infinite: false,        
        speed: 500,           
        slidesToShow: 3,        
        slidesToScroll: 1,    
        arrows: true,           
        swipeToSlide: true,   
        adaptiveHeight: true, 
      };
    
      const products = [
        { id: 1, name: "Tomato", img: "//ofruity-store-demo.myshopify.com/cdn/shop/files/cate_5-1.jpg?v=1614305668", link: "/shop" },
        { id: 2, name: "Corn", img: "//ofruity-store-demo.myshopify.com/cdn/shop/files/cate_4.jpg?v=1614305667", link: "/shop" },
        { id: 3, name: "Dragon Fruit", img: "//ofruity-store-demo.myshopify.com/cdn/shop/files/cate_2.jpg?v=1614305667", link: "/shop" },
        { id: 4, name: "Cherry", img: "//ofruity-store-demo.myshopify.com/cdn/shop/files/cate_1.jpg?v=1614305667", link: "/shop" },
        { id: 5, name: "Mango", img: "//ofruity-store-demo.myshopify.com/cdn/shop/files/cate_3.jpg?v=1614305667", link: "/shop" }
      ];
    return(
        <div className="wrap-bread-crumb breadcrumb_collection style3">
            <div className='bg-breadcrumb text-center'>
            <div className="title-page">
                <h2 className="">Products</h2>
            </div>
            <div class="bread-crumb">
                <a href="/" title="Back to the frontpage" className='text-decoration-none text-dark'>Home<i class="bi bi-chevron-right"></i></a>
                <strong>Products</strong>
            </div>
            <div className='container d-flex flex-row justify-content-center list_col'>
        <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="slider-item">
            <div className="img_banner">
              <a href={product.link} style={{width: 'max-content'}}>
                <img src={product.img} alt={product.name} className="w-100" style={{ width: '80%', maxWidth: '150px', height: 'auto' }} />
              </a>
            </div>
            <div className="banner_title text-center">
              <a href={product.link}>{product.name}</a>
            </div>
          </div>
        ))}
      </Slider>
            </div>
            </div>
        </div>
    )
}