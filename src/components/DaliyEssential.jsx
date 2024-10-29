import React, { useState } from "react";
import assets from "../assets/assets";
import './DaliyEssential.css';
export default function DaliyEssential(){
    const [isHovered, setisHovered] = useState(null);
    const handleMouseOver =(banner)=>{setisHovered(banner);}
    const handleMouseLeave=()=>{setisHovered(null);}

    return(
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12 col-sm-1">
                    <div className="banner-box" 
                     onMouseOver={()=>handleMouseOver("Mango")}
                     onMouseLeave={handleMouseLeave}
                    >
                        <div className="box-img">
                            <a href="#">
                                <img src={assets.bannerv41} className="img-fluid" 
                                />
                            </a>
                        </div>
                        <div className="banner-info">
                            <h3 className="title_heading">Fresh Mangoes</h3>
                            <p className="sub_title">DAILY ESSENTIALS</p>
                            <span className={`${isHovered==="Mango" ? 'd-block' : 'd-none'}`}><a href="/shop" className="p-2 text-black text-decoration-none sub_link">Explore all</a></span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 col-sm-12 mt-4 mt-sm-0">
                <div className="banner-box"
                     onMouseOver={()=>handleMouseOver("Kiwi")}
                     onMouseLeave={handleMouseLeave}
                >
                        <div className="box-img">
                            <a href="#">
                                <img src={assets.bannerv42} className="img-fluid"
                                />
                            </a>
                        </div>
                        <div className="banner-info">
                        <h3 className="title_heading">Kiwi sale 10%</h3>
                        <p className="sub_title">DAILY ESSENTIALS</p>
                        <span className={`${isHovered==="Kiwi" ? 'd-block' : 'd-none'}`}><a href="/shop" className="p-2 text-black text-decoration-none sub_link">Explore all</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}