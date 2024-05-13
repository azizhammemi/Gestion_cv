import React, { useState } from 'react';

function CreateCv1() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hardSkills, setHSkills] = useState('');
  const [softSkills, setSSkills] = useState('');
  const [langues, setLangues] = useState([]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/cvs', {
            email,
            longueDescription,
            descriptionhardskils,
            descriptioncomptenceTechnique,
            nom,
            prenom,
            adresse,
            telephone,
        });
        // Traitement en cas de succès de la requête
    } catch (error) {
        // Gestion des erreurs
        if (error.response) {
            // La requête a été effectuée et le serveur a répondu avec un code d'erreur
            console.error('Erreur de réponse du serveur:', error.response.data);
        } else if (error.request) {
            // La requête a été effectuée mais aucune réponse n'a été reçue
            console.error('Pas de réponse du serveur:', error.request);
        } else {
            // Une erreur s'est produite lors de la configuration de la requête
            console.error('Erreur lors de la requête:', error.message);
        }
    }
};

  const handleLangueChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLangues([...langues, value]);
    } else {
      setLangues(langues.filter((langue) => langue !== value));
    }
  };


  

  return (
    <div className="container">
      <header>
        <h1 id="title">Please give your informations </h1>
        <p id="description">Thank you for taking the time to complete your cv manually</p>
      </header>
      <main>
        <form id="survey-form" onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom
            <input
              id="nom"
              type="text"
              placeholder="Donner votre nom "
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </label>
          <label htmlFor="prenom">Prénom
            <input
              id="prenom"
              type="text"
              placeholder="Donner votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </label>
          <label htmlFor="adresse">Adresse
            <input
              id="adresse"
              type="text"
              placeholder="Donner votre adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </label>
          <label htmlFor="phone">Téléphone
            <input
              id="phone"
              type="phone"
              placeholder="Donner votre n° Téléphone"
              value={telephone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email">Email
            <input
              id="email"
              type="email"
              placeholder="Donner votre Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <fieldset>
            <legend>Quelles langues parlez-vous ?</legend>
            <label htmlFor="FR">
              <input
                id="FR"
                type="checkbox"
                name="langue"
                value="FR"
                checked={langues.includes('FR')}
                onChange={handleLangueChange}
              />
              Français
            </label>
            <label htmlFor="ENG">
              <input
                id="ENG"
                type="checkbox"
                name="langue"
                value="ENG"
                checked={langues.includes('ENG')}
                onChange={handleLangueChange}
              />
              Anglais
            </label>
            <label htmlFor="GER">
              <input
                id="GER"
                type="checkbox"
                name="langue"
                value="GER"
                checked={langues.includes('GER')}
                onChange={handleLangueChange}
              />
              Allemand
            </label>
          </fieldset>

          <label htmlFor="hardSkills">HardSkills
            <textarea
              id="hardSkills"
              placeholder="Donner une description pour vous HardSkills"
              value={hardSkills}
              onChange={(e) => setHSkills(e.target.value)}
              rows="7"
              required
            />
          </label>
          <label htmlFor="softSkills">SoftSkills
            <textarea
              id="softSkills"
              placeholder="Donner une description pour vous softSkills"
              value={softSkills}
              onChange={(e) => setSSkills(e.target.value)}
              rows="7"
              required
            />
          </label>
        
          <button id="submit" type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default CreateCv1;
