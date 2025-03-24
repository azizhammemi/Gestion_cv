import React, { useState } from 'react';
import './compare.css'; // Importez votre fichier CSS
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Footer } from './footer';

export const Compare = () => {

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [Data, setData] = useState('');
    const [containerDisplay, setContainerDisplay] = useState('none');


    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    const handleChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:3000//upload', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    };
    const handleSubmit = async () => {
        try {
            // Effectuer une requête GET à http://localhost:4000/matching avec un paramètre de requête
            const getResponse = await fetch(`http://localhost:3000/matching?content=${inputText}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setContainerDisplay('inline');


            // Vérifier si la réponse est OK (statut HTTP 200-299)
            if (!getResponse.ok) {
                throw new Error('Failed to fetch');
            }

            // Analyser la réponse en tant que JSON
            const getResponseData = await getResponse.json();

            // Mettre à jour les données avec les résultats de la réponse
            setData(getResponseData);
            console.log(getResponseData);
            setError(null);
        } catch (error) {
            // Gérer les erreurs en mettant à jour l'état `error` et en affichant l'erreur
            setError(error);
            console.error('Error response:', error);
        }
    }


    return (
        <div>
            <div className="slider-area ">
                <div className="single-slider section-overly slider-height2 d-flex align-items-center" style={{ backgroundImage: `url('https://res.cloudinary.com/dimj6qkuf/image/upload/v1715367209/about_qeosnb.jpg')` }}>                    <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap text-center">
                                <h2>Get your job</h2>
                                <h4>We assist you in securing your job. Please provide the job offer description and share your CV with us, and we will offer you what you need.</h4>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <br></br><br></br>
            <div className="container">

                <div className="input-container">



                    <textarea
                        placeholder="Enter Job Description"
                        id="text"
                        rows="50"
                        style={{
                            overflow: "hidden",
                            wordWrap: "break-word",
                            resize: "none",
                            height: "450px"
                        }}
                        value={inputText}
                        onChange={handleInputChange}
                        className="text-area"
                    />


                    <div id="container1">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <span>Choose File</span>
                            <i class="fa-solid fa-upload"></i>
                            <input id="file-upload" type="file" onChange={handleChange} className="file-input" />


                        </label>
                        <button onClick={handleSubmit} className="submit-button" >
                            Submit
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">Error: {error.message}</div>}
                <div className="output-container" style={{ display: containerDisplay }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Coompétence Requis Dans le job
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {/* Vérifiez si Data.job_elements existe avant de parcourir la liste */}
                                {Data && Data.job_elements ? (
                                    Data.job_elements.map((element, i) => (
                                        <li key={i}>{element}</li>
                                    ))
                                ) : (
                                    <li>Aucune donnée disponible</li>
                                )}
                            </ul>
                        </AccordionDetails>

                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Coompétence contenu dans le cv
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {/* Vérifiez si Data.job_elements existe avant de parcourir la liste */}
                                {Data && Data.cv_elements ? (
                                    Data.cv_elements.map((element, i) => (
                                        <li key={i}>{element}</li>
                                    ))
                                ) : (
                                    <li>Aucune donnée disponible</li>
                                )}
                            </ul>
                        </AccordionDetails>

                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Les compétance manquante
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {/* Vérifiez si Data.job_elements existe avant de parcourir la liste */}
                                {Data && Data.missing_competences ? (
                                    Data.missing_competences.map((element, i) => (
                                        <li key={i}>{element}</li>
                                    ))
                                ) : (
                                    <li>vous aves les Compétance demandés</li>
                                )}
                            </ul>
                        </AccordionDetails>

                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Les softSkils manquante
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {/* Vérifiez si Data.job_elements existe avant de parcourir la liste */}
                                {Data && Data.missing_soft_skills ? (
                                    Data.missing_soft_skills.map((element, i) => (
                                        <li key={i}>{element}</li>
                                    ))
                                ) : (
                                    <li>vous aves les SoftSkils demandés</li>
                                )}
                            </ul>
                        </AccordionDetails>

                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Les Langue manquante
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {/* Vérifiez si Data.job_elements existe avant de parcourir la liste */}
                                {Data && Data.missing_langues ? (
                                    Data.missing_langues.map((element, i) => (
                                        <li key={i}>{element}</li>
                                    ))
                                ) : (
                                    <li>vous aves les Langues demandés</li>
                                )}
                            </ul>
                        </AccordionDetails>

                    </Accordion>
                    <div className='containerScore'>

                        <Stack spacing={1}>
                            {Data.similarity <= 20 && (
                                <Rating
                                    name="fixed-rating"
                                    value={1}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            {Data.similarity > 20 && Data.similarity <= 40 && (
                                <Rating
                                    name="fixed-rating"
                                    value={2}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            {Data.similarity > 40 && Data.similarity <= 60 && (
                                <Rating
                                    name="fixed-rating"
                                    value={3}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            {Data.similarity > 60 && Data.similarity <= 80 && (
                                <Rating
                                    name="fixed-rating"
                                    value={3}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                        </Stack>
                        <Stack spacing={1}>
                            {Data.similarity > 80 && Data.similarity < 100 && (
                                <Rating
                                    name="fixed-rating"
                                    value={4}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                        </Stack>
                        <Stack spacing={1} >
                            {Data.similarity == 100 && (
                                <Rating
                                    name="fixed-rating"
                                    value={5}
                                    precision={0.5}
                                    readOnly
                                />
                            )}
                        </Stack>
                        <h5>{Data.similarity} %</h5>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
