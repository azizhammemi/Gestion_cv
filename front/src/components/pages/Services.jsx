import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Document, Page, PDFViewer, Text, View,Image  } from '@react-pdf/renderer';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Footer } from './footer';

const styles = {
  page: {
    flexDirection: 'column',
    paddingTop:20,
    paddingLeft:15,
    paddingRight:10,
    paddingBottom:10,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'rgb(143, 9, 255)',
    borderBottom: '1px solid rgb(143, 9, 255)',
  },
  content: {
    fontSize: 12,
    marginBottom: 3,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  paddedContent: {
    paddingBottom:'15px',
    paddingLeft: '50px',
    width:'450px',
    lineHeight: '1.5', // Add line-height for space between lines
  },
  bold: {
    fontStyle: 'gras',
  },
  italic: {
    fontStyle: 'italic',
  },
  size:{
    fontSize:'11px'
  },
  Formation:{
    width:'400px',
    textAlign: 'justify',
  },
  me:{
    fontSize:'7px',
    width:'110px',
    alignItems: 'flex-start', // Align content at the top of the container
    paddingBottom:'20%',
  },
  for:{
    fontSize:'10px',
  },
  con:{
    lineHeight: '1.5', // Add line-height for space between lines
  },
  hh:{
    fontSize: 14,
  },
  haut:{
    lineHeight: '1.5', 
    fontSize:'7px',
    width:'110px',
    alignItems: 'flex-start', // Align content at the top of the container
    paddingBottom:'20%',
  },
};

export const Services = () => {
  const [formData, setFormData] = useState({
    nom: '',
    titre: '',
    about: '',
    youremail: '',
    contact: '',
    pays: '',
    linkdin: '',
    competence:'',
    langage: '', // Initialize langage here
    formation: '',
    stage: '',
    loisirs: '', // Initialize loisirs here
    jobdescription: '',
    image: null,
    wordToColor: '', // New state for the word to color
    color: '#000000', // New state for the color
  });
  const backgroundImage = {
    backgroundImage: `url('../../public/assets/img/hero/about.jpg')`,
  };
 
  const [colorMap, setColorMap] = useState({});
  const [Data, setData] = useState('');
  const [containerDisplay, setContainerDisplay] = useState('none');
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0])
    });
  };
  const handleSubmit = async () => {
    try {
      const getResponse = await fetch(`http://localhost:3000/match?nom=${formData.nom}&titre=${formData.titre}&about=${formData.about}&youremail=${formData.youremail}&contact=${formData.contact}&pays=${formData.pays}&linkdin=${formData.linkdin}&langage=${formData.langage}&competence=${formData.competence}&formation=${formData.formation}&stage=${formData.stage}&loisirs=${formData.loisirs}&jobdescription=${formData.jobdescription}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContainerDisplay('inline');

      if (!getResponse.ok) {
        throw new Error('Failed to fetch');
      }

      const getResponseData = await getResponse.json();
      setData(getResponseData);
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  const handleInputChange = (event, field) => {
    setFormData({ ...formData, [field]: event.target.value });
  };
  
  const renderCompetencesWithBorders = () => {
    const words = formData.competence ? formData.competence.split(' ') : [];
    return words.map((word, index) => (
      <View key={index} style={{ backgroundColor: colorMap[word] || 'lightgray', borderRadius: '5px', padding: '5px', lineHeight: '1.5' }}>
        <Text>{word}</Text>
      </View>
    ));
  };
  
  const langue = () => {
    const words = formData.langage ? formData.langage.split(' ') : [];
    return words.map((word, index) => (
      <View key={index} style={{ backgroundColor: colorMap[word] || 'lightgray', borderRadius: '5px', padding: '5px', lineHeight: '1.5' }}>
        <Text>{word}</Text>
      </View>
    ));
  };
  
  const loisir = () => {
    const words = formData.loisirs ? formData.loisirs.split(' ') : [];
    return words.map((word, index) => (
      <View key={index} style={{ backgroundColor: colorMap[word] || 'lightgray', borderRadius: '5px', padding: '5px', lineHeight: '1.5' }}>
        <Text>{word}</Text>
      </View>
    ));
  };

  return (
    <div>
    <div class="slider-area ">
    <div class="single-slider section-overly slider-height2 d-flex align-items-center" style={backgroundImage}>
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="hero-cap text-center">
                        <h2>About us</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Please provide your information</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
        <fieldset style={{ width: '48%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <legend style={{ padding: '0 10px' }}>Informations personnelles</legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="file" name="image" onChange={handleImageChange} />
            <input type="text" placeholder="Nom" value={formData.nom} onChange={(e) => handleInputChange(e, 'nom')} />
            <input type="text" placeholder="Titre" value={formData.titre} onChange={(e) => handleInputChange(e, 'titre')} />
            <input type="text" placeholder="About" value={formData.about} onChange={(e) => handleInputChange(e, 'about')} />
            <input type="text" placeholder="Your Email" value={formData.youremail} onChange={(e) => handleInputChange(e, 'youremail')} />
            <input type="text" placeholder="Contact" value={formData.contact} onChange={(e) => handleInputChange(e, 'contact')} />
            <input type="text" placeholder="Pays" value={formData.pays} onChange={(e) => handleInputChange(e, 'pays')} />
            <input type="text" placeholder="LinkedIn" value={formData.linkdin} onChange={(e) => handleInputChange(e, 'linkdin')} />
            <input type="text" placeholder="competence" value={formData.competence} onChange={(e) => handleInputChange(e, 'competence')} />
            <input type="text" placeholder="Langage" value={formData.langage} onChange={(e) => handleInputChange(e, 'langage')} />
            <textarea rows={15} cols={30} placeholder="Formation" value={formData.formation} onChange={(e) => handleInputChange(e, 'formation')} />
            <textarea rows={15} cols={30} placeholder="Stage" value={formData.stage} onChange={(e) => handleInputChange(e, 'stage')} />
            <input type="text" placeholder="Loisirs" value={formData.loisirs} onChange={(e) => handleInputChange(e, 'loisirs')} />
          </div>
        </fieldset>
      <div>  <textarea
          placeholder="Description du poste"
          value={formData.jobDescription}
          onChange={(e) => handleInputChange(e, 'jobdescription')}
          style={{ width: '120%', height: '250px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '5%' }}
        />
        <PDFViewer style={{ width: '120%', height: '800px' }}>
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={[styles.flexContainer]}>
          <View style={[styles.imageContainer]}>
            {formData.image && <Image src={formData.image} style={styles.image} />}
          </View>
          <View style={[styles.paddedContent]}>
            <Text style={[styles.bold, styles.italic]}>{formData.nom}</Text>
            <Text>{formData.titre}</Text>
            <Text style={[styles.size]}>{formData.about}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
    
        <View style={[styles.flexContainer]}>
          <View style={[styles.me,styles.con]}>
            <Text><i className="far fa-address-book"></i>
 {formData.youremail}</Text>
            <Text>{formData.contact}</Text>
            <Text>{formData.pays}</Text>
            <Text>{formData.linkdin}</Text>
          </View>
          <View style={[styles.paddedContent]}>
            <Text style={[styles.heading,styles.Formation]}>FORMATION</Text>
            <Text style={[styles.Formation,styles.for]}>{formData.formation}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
    
    <View style={[styles.flexContainer]}>
      <View style={[styles.haut]}>
          <Text style={styles.heading}>COMPÉTENCES</Text>
           <View style={styles.flexContainer}>
            {renderCompetencesWithBorders()}
            </View>
            <Text style={styles.heading}>LANGUES</Text>
            <View style={styles.flexContainer}>
            {langue()}
            </View>
            <Text style={styles.heading}>LOISIR</Text>

            <View style={styles.flexContainer}>
            {loisir()}
          </View>
          </View>
          <View style={[styles.paddedContent]}>
            <Text style={[styles.heading,styles.Formation]}>STAGES PROFESIONNELLES</Text>
            <Text style={[styles.Formation,styles.for]}>{formData.stage}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
</PDFViewer>
</div>
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Soumettre</button>
      <div className="output-container" style={{ display: containerDisplay ,width:'50%'}}>
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

export default Services;
