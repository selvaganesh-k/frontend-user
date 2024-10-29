import React from 'react';
import './Carousel.css';
import assets from '../assets/assets.js';
import MainBtn from './MainBtn';
const Carousel = () => {
  const btn ={
    btnName:'Shop Now',
    bgColor:'transparent',
    hoverbgColor:'#fff', 
    textColor:'white', 
    borderColor:'white',
    hoverTextColor:'black'
  };

  return (
    <div id="fruitCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button 
          type="button" 
          data-bs-target="#fruitCarousel" 
          data-bs-slide-to="0" 
          className="active rounded-circle" 
          aria-current="true" 
          aria-label="Slide 1">
        </button>
        <button 
          type="button" 
          className='rounded-circle'
          data-bs-target="#fruitCarousel" 
          data-bs-slide-to="1" 
          aria-label="Slide 2">
        </button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img 
            src={assets.slider1}
            className="d-block w-100" 
            alt="Strawberries"
          />
          <div className="carousel-caption">
            <h5>Style Destination</h5>
            <h1>We Grow Best Food</h1>
            <p>Style Destination</p>
            <MainBtn name={btn.btnName} bgColor={btn.bgColor} textColor={btn.textColor} hoverbgColor={btn.hoverbgColor} hoverTextColor={btn.hoverTextColor} borderColor={btn.borderColor}/>
          </div>
        </div>

        <div className="carousel-item">
          <img 
            src={assets.slider2}
            className="d-block w-100" 
            alt="Bananas"
          />
          <div className="carousel-caption">
            <h5>Style Destination</h5>
            <h1>We Grow Best Food</h1>
            <p>Hanpicked By Eveland</p>
            <MainBtn name={btn.btnName} bgColor={btn.bgColor} textColor={btn.textColor} hoverbgColor={btn.hoverbgColor} hoverTextColor={btn.hoverTextColor} borderColor={btn.borderColor}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
