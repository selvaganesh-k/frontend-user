import React, { useState } from "react";
import './BestSeller.css';
import CardList from "./CardList";
export default function BestSeller(){
    const [activeTab, setactiveTab] = useState("New");
    const handleTab =(tab)=>{
        setactiveTab(tab);
    }
    return(
        <div id="section-products px-4">
            <div className="container-fluid">
                <div className="text-center">
                    <h3 className="title_heading text-center mb-4">
                        Our Best Seller
                    </h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <ul className="nav title-tab justify-content-center mb-4">
                            <li><a href="#" className={activeTab=== "New" ? 'active' : ''} onClick={()=>handleTab("New")}>New</a></li>
                            <li><a href="#" className={activeTab=== "Sale" ? 'active' : ''} onClick={()=>handleTab("Sale")}>Sale</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <CardList/>
        </div>
    )
}