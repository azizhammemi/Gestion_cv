import React from 'react';
import { Route, Routes } from "react-router-dom";

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./footer.css";



export const Footer = () => {
    return (
        <footer className="footer-area footer-bg footer-padding">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    {/* About Us */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>About Us</h4>
                                <div className="footer-pera">
                                    <p>Your path to the perfect job starts here. We specialize in crafting standout CVs tailored to your dream position.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact Info */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Contact Info</h4>
                                <ul>
                                    <li>
                                        <p>Address: Recnov company sidi Mansour km 4</p>
                                    </li>
                                    
                                    <li><a href="#">Email: service@rec-inov.com</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Important Link */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Important Link</h4>
                                <ul>
                                    <li><NavLink to="/Home">Home</NavLink></li>
                                    <li><NavLink to="/About">About</NavLink></li>
                                    <li><NavLink to="/Compare">Compare</NavLink></li>
                                    <li><NavLink to="/Services">Generate Cv</NavLink></li>



                                    
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Newsletter */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Developers Team</h4>
                                <div id="containerImage">

                                    <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1713434436/image/c1g8chqppmb0dms91tci.jpg" className='imgg' ></img>
                                    <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1715544767/aziz_latboe.jpg" className='imgg'></img>
                                    <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1715545678/oussema_dg37s2.jpg" className='imgg'></img>
                                    <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1715546219/mahdi1_x7u83i.png" className='imgg'></img>


                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
               </div>
            {/* Footer Bottom */}
            <div className="footer-bottom-area footer-bg">
                <div className="container">
                    <div className="footer-border">
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-xl-10 col-lg-10">
                                <div className="footer-copy-right">
                                    <p>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> 
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


