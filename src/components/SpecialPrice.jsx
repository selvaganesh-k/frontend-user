import React from "react";
import assets from "../assets/assets";
import './SpecialPrice.css';

export default function SpecialPrice(){
    return(
        <div className="container-fluid my-5 p-0">
            <div className="banner-box" id="banner-box"
                >
                    <div className="box-img" id="box-img">
                        <a href="#">
                            <img src={assets.bannerv6} className="img-fluid" />
                        </a>
                    </div>
                        <div id="banner-info" className="banner-info border border-white p-4 w-75 h-75 border-5">
                            <h3 className="title_heading text-white mb-5">SPECIAL PRICE</h3>
                            <p className="sub_title text-white ">COLLECTION NEW</p>
                        <span id="sub_link"><a href="#">SHOP NOW</a></span>
                    </div>
            </div>
        </div>
    )
}