import React, { useEffect, useState } from 'react';
import { Footer } from './footer';
export const About = () => {


  return (
    <div>

      <main>


        <div className="slider-area " >
          <div className="single-slider section-overly slider-height2 d-flex align-items-center" style={{ backgroundImage: `url('https://res.cloudinary.com/dimj6qkuf/image/upload/v1715367209/about_qeosnb.jpg')` }}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap text-center">
                    <h2>About us</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="support-company-area fix section-padding2" style={{ marginTop: '-15%' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="right-caption">
                  
                  <div className="section-tittle section-tittle2" >
                    <span>What we are doing</span>
                    <h2>Welcome to CvBooster</h2>
                  </div>
                  <div className="support-caption">
                    <p className="pera-top">We are passionate about simplifying the job application process and maximizing your chances of success in the competitive job market. Our platform is designed to bridge the gap between your skills and the requirements of your dream job. Whether you're aiming for opportunities in Canada, Europe, or beyond, our tool assesses your CV against industry standards, ensuring it meets the criteria employers are looking for.</p>
                    <p>Our innovative CV scoring system evaluates both hard and soft skills, offering tailored feedback to enhance your profile's strength. Additionally, our platform allows you to effortlessly input job descriptions, enabling us to identify any missing skills from your CV and suggest improvements.

                    Gone are the days of feeling uncertain about your application materials. With CvBooster, you'll receive personalized recommendations to optimize your CV, empowering you to stand out in the competitive job market. Start crafting your path to success today!</p>
                    
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="support-location-img">
                  <img src="https://res.cloudinary.com/dimj6qkuf/image/upload/v1715441472/image/cv_exwhbr.jpg" alt=""/>
                    <div className="support-img-cap text-center">
                      <p>Bost</p>
                      <span>Your cv</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="apply-process-area apply-bg pt-150 pb-150" style={{ backgroundImage: `url('https://res.cloudinary.com/dimj6qkuf/image/upload/v1715443975/image/how-applybg_ubllfp.png')`, marginTop: '-10%' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-tittle white-text text-center">
                  <span>our services</span>
                  
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-process text-center mb-30">
                  <div className="process-ion">
                    <span className="flaticon-search"></span>
                  </div>
                  <div className="process-cap">
                    <h5>1. Calculate score</h5>
                    <p>Calculate score based on Canadian and European standards</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-process text-center mb-30">
                  <div className="process-ion">
                    <span className="flaticon-curriculum-vitae"></span>
                  </div>
                  <div className="process-cap">
                    <h5>2. Evaluate score</h5>
                    <p>Evaluate score matching CV with job description.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-process text-center mb-30">
                  <div className="process-ion">
                    <span className="flaticon-tour"></span>
                  </div>
                  <div className="process-cap">
                    <h5>3. Generate tailored CV</h5>
                    <p>     Generate tailored CV<br></br> based on your input.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        </main>
      <Footer/>
    </div>
  );
};

