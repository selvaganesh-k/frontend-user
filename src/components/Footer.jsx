import React from "react";
import './Footer.css';
import assets from "../assets/assets";
export default function Footer(){
    return(
        <footer className="container-fluid footer">
            <div className="top-footer">
                <div className="container-foot m-0">
                    <div className="row">
                        <div className="col-lg-2 col-sm-3">
                            <div className="info_footer">
                                <div className="title_footer">
                                    <h4 className="mb-0 title_border">Shop</h4>
                                </div>
                                    <ul className="list-unstyled mb-2">
                                        <li><a href="#">Fruits</a></li>
                                        <li><a href="#">New Fruits</a></li>
                                        <li><a href="#">Product-Deal</a></li>
                                        <li><a href="#">Top Sale</a></li>
                                        <li><a href="#">Vegetable</a></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-3">
                        <div className="info_footer">
                                <div className="title_footer">
                                    <h4 className="mb-0 title_border">Information</h4>
                                </div>
                                    <ul className="list-unstyled mb-2">
                                        <li><a href="#">Pagination</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
                                        <li><a href="#">Contact</a></li>
                                        <li><a href="#">Accessories</a></li>
                                        <li><a href="#">Term of use</a></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-3">
                        <div className="info_footer">
                                <div className="title_footer">
                                    <h4 className="mb-0 title_border">About</h4>
                                </div>
                                    <ul className="list-unstyled mb-2">
                                        <li><a href="#">Help Center</a></li>
                                        <li><a href="#">Address Store</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Receiver & Amplifiers</a></li>
                                        <li><a href="#">Clothings</a></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-3">
                        <div className="info_footer">
                                <div className="title_footer">
                                    <h4 className="mb-0 title_border">Follow Us</h4>
                                </div>
                                    <ul className="list-unstyled mb-2">
                                        <li><a href="#"><i class="bi bi-telephone-fill"></i>(646) 663-4575</a></li>
                                        <li><a href="#"><i class="bi bi-pip-fill"></i>(646) 968-0608 </a></li>
                                        <li><a href="#"><i class="bi bi-envelope-fill"></i>help@engotheme.com</a></li>
                                        <li><a href="#"><i class="bi bi-geo-alt-fill"></i>1201 Broadway Suite 600</a></li>
                                    </ul>
                                    <div className="mt-3">
                                        <ul className="list-inline list-unstyled mb-0">
                                            <li className="list-inline-item">
                                                <a href="#" className="social-media"><i class="bi bi-twitter-x"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#" className="social-media"><i class="bi bi-facebook"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                            <a href="#" className="social-media"><i class="bi bi-linkedin"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                            <a href="#" className="social-media"><i class="bi bi-instagram"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="info_footer end">
                                <div className="title_footer ">
                                    <h4 className="mb-0 title_border">Newsleters</h4>
                                </div>
                                <p className="mb-0 content_footer">
                                Be the first who learns about our<br/>
                                great promotions!
                                </p>
                                <form method="post">
                                    <div className="form-group mb-0 d-inline">
                                    <input type="email" name="EMAIL" class="text-input" placeholder="Enter your email..." />
                                    </div>
                                    <button class="subbtn" type="submit">SUBSCRIBE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-rights">
                <div className="containerv2">
                    <div className="row align-items-center">
                        <div className="col-md-4 text-center text-md-left text-lg-start text-xl-start text-xxl-start mb-2">
                            <h3>Furit Shop</h3>
                        </div>
                        <div className="col-md-4  text-center mb-2">
                            <img src={assets.payments3} alt="" />
                        </div>
                        <div className="col-md-4  text-md-left  text-center mb-2">
                            <div className="text-copyright mb-0">
                                <p>
                                © Copyright 2020 | 
                                <a href="#" className="text-dark"> ofruityStore </a>
                                By
                                <a href="#" className="Engo"> EngoTheme. </a>
                                <a href="#" className="Powered"> Powered by Shopify.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}