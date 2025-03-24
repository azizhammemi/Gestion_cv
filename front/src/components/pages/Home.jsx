import './home.css'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faUpload } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import {Footer} from './footer';
import ModaleMissing from './ModaleMissing';

export const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [cvCondidat, setcvCondidat] = useState('');
  const [data, setData] = useState('');
  const [scoreEurope, setEuropeScore] = useState('');
  const [scoreCanda, setCanadaScore] = useState('');

  const [missingEurope, setEuropeMissing] = useState('');
  const [missingCanda, setCanadaMissing] = useState('');
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const backgroundImage = {
    backgroundImage: `url('https://res-console.cloudinary.com/dhaus3mvm/thumbnails/v1/image/upload/v1715365254/aDFfaGVyb19yaWM1eHE=/drilldown')`,
  };




  if (data === null) {
    return null; // Render nothing if data is null
  }
  const userCondidatName = localStorage.getItem('username');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const fileType = ['application/pdf'];
  const workerUrl = 'https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js';


  const handleFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Faites quelque chose avec le fichier sélectionné, par exemple : 
      console.log('Fichier sélectionné:', selectedFile);
    }
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000//upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log(response)
        fetchCVData()
      })
      .catch(error => {
        console.log(error)
      });

    let selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setPdfFile(e.target.result);
        setcvCondidat(selectedFile); // Set the file itself to cvCondidat state
      };
    } else {
      setPdfFile(null);
      setcvCondidat(''); // Reset cvCondidat if no valid file selected
    }

  };

  const fetchCVData = () => {
    fetch('http://localhost:3000/cv')
      .then(response => response.json())
      .then(data => {
        console.log('CV Data:', data);
        setCanadaScore(data.canadian_score)
        setEuropeScore(data.european_score)
        setCanadaMissing(data.missingElementsCanadian)
        setEuropeMissing(data.missingElementsEuropean)
        console.log(scoreEurope)


      })
      .catch(error => console.error('Error fetching CV data:', error));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      if (user_id === null) {
        navigate("/login");
      } else {

        setViewPdf(pdfFile);



        const endpoint = 'http://localhost:5001/cv';
        try {
          const formData = new FormData();
          formData.append('cvCondidat', cvCondidat);
          formData.append('userId', user_id);
          const response = await axios.post(endpoint, formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      }
    } else {
      setViewPdf(null);
    }
  };

  return (
    <div>
        <div class="slider-area ">
         
            <div class="slider-active">
            <div className="single-slider slider-height d-flex align-items-center" style={backgroundImage}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-6 col-lg-9 col-md-10">
                                <div class="hero__caption">

                                    <h1>Find the most exciting startup jobs</h1>
                                </div>
                            </div>
                        </div>
                     
                        <div class="row">
                            <div class="col-xl-8">
                                
                                <form action="#" class="search-box">
                                    <div class="input-form">
                                        <input type="text" placeholder="Job Tittle or keyword"/>
                                    </div>
                                    <div class="select-form">
                                        <div class="select-itms">
                                            <select name="select" id="select1">
                                                <option value="">Location BD</option>
                                                <option value="">Location PK</option>
                                                <option value="">Location US</option>
                                                <option value="">Location UK</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="search-form">
                                        <a href="#">Find job</a>
                                    </div>	
                                </form>	
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br><br></br><br></br>
        <section>
        <div class="our-services section-pad-t10">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-xl-10">
                                        <div class="cv-caption text-center">
                                            <p class="pera1">FEATURED TOURS Packages</p>
                                            <p class="pera2"> Make a Difference with Your Online Resume!</p>
                                            <ModaleMissing scoreEurope={scoreEurope} scoreCanda={scoreCanda} missingEurope={missingEurope} missingCanda={missingCanda} />

                                            <form onSubmit={handleSubmit} className='form1'>
                                              <div className="row">
                                                <div className="col">
                                                  <input type="file" class="border-btn2 border-btn4" onChange={handleChange} />
                                                </div>

                                                <div className="col">
                                                  <button type='submit' className='btn btn-success'> View PDF 📄</button>
                                                </div>

                                              </div>
                                            </form>
                                            <center>

        

    
                                                              {/* <h2>👀 View PDF 📄</h2> */}
                                                              <div className='pdf-container'>
                                                                <Worker workerUrl={workerUrl}><br />
                                                                  {viewPdf ? <Viewer fileUrl={viewPdf} /> : <>No CV found !</>}
                                                                </Worker>
                                                              </div><br />


                                                              </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
          </section>
          <section>
        <div class="our-services section-pad-t30">
            <div class="container">
              
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>FEATURED TOURS Packages</span>
                            <h2>Browse Top Categories </h2>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-contnet-center">
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Design & Creative</a></h5>
                                <span>(653)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-cms"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Design & Development</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-report"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Sales & Marketing</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-app"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Mobile Application</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-helmet"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Construction</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-high-tech"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Information Technology</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-real-estate"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Real Estate</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div class="single-services text-center mb-30">
                            <div class="services-ion">
                                <span class="flaticon-content"></span>
                            </div>
                            <div class="services-cap">
                               <h5><a href="job_listing.html">Content Writer</a></h5>
                                <span>(658)</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                       
        </section>
     
<Footer/>
    </div>

  );
};

