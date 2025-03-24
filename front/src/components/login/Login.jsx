import './LoginForm.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export const Login = () => {


  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateouverture, setDateOuverture] = useState('');
  const [nomEntreprise, setNomEntreprise] = useState('');
  
  


  const handlelogin = async (e) => {
    console.log(email)
    console.log(password)
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      console.log(response.data.user);

      localStorage.setItem('user_id', response.data.user._id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user);
      console.log(response.data.token);

   if (response.data.user.role === 'condidat') {
      const response1 = await axios.get(`http://localhost:5001/condidat/user/${response.data.user._id}`);
      localStorage.setItem('username', response1.data.result[0].nom);
      
      window.location.href = '/';
    } else if (response.data.user.role === 'entreprise') {
      const response2 = await axios.get(`http://localhost:5001/entreprise/user/${response.data.user._id}`);
      localStorage.setItem('username', response2.data.result[0].nomEntreprise);
    
      window.location.href = '/about';
    }
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};
    try {
      let endpoint = '';


      if (role === 'entreprise') {
        endpoint = 'http://localhost:5001/api/auth/register/entreprise';
        data = {
          email,
          password,
          role,
          adresse,
          telephone,
          dateouverture,
          nomEntreprise
        };
      } else if (role === 'condidat') {
        endpoint = 'http://localhost:5001/api/auth/register/condidat';
        data = {
          email,
          password,
          role,
          adresse,
          telephone,
          nom,
          prenom
        };
      }

      const response = await axios.post(endpoint, data);

      console.log(response.data);
     
    } catch (error) {
      console.error(error.response.data.error);

      console.log(data);
    }
  };


  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const enr = document.getElementById('enr');

    const handleSignUpClick = () => {
      container.classList.add("right-panel-active");
    };

    const handleSignInClick = () => {
      container.classList.remove("right-panel-active");
    };

    signUpButton.addEventListener('click', handleSignUpClick);
    signInButton.addEventListener('click', handleSignInClick);
    enr.addEventListener('click', handleSignInClick);

    return () => {
      signUpButton.removeEventListener('click', handleSignUpClick);
      signInButton.removeEventListener('click', handleSignInClick);
      enr.removeEventListener('click', handleSignUpClick);

    };
  }, []); // Assurez-vous de passer une dépendance vide pour exécuter useEffect une seule fois lors du montage


  return (
    <div>
      <center>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
          <div class="formm">
          <div class="containerr" id="containerr">
        <div class="form-containerr sign-up-containerr">
            <form onSubmit={handleSubmit}>
                <h1 class="h11">Create Account</h1>
                <span class="pp">or use your email for registration</span>
                <input type="email" class="inputt" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" class="inputt" placeholder="Adresse" onChange={(e) => setAdresse(e.target.value)} />
                <input type="telephone" class="inputt" placeholder="Telephone" onChange={(e) => setTelephone(e.target.value)} />
                <input type="password" class="inputt" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <div id="role">
                    <label>Role:</label>
                    <input type="radio" id="condidat" name="role" value="condidat" style={{ display: 'inline-block' }} onChange={(e) => { setRole(e.target.value); handleRoleChange(e); }} />
                    <label for="condidat">Condidat</label>
                    <input type="radio" id="entreprise" name="role" value="entreprise" style={{ display: 'inline-block' }} onChange={(e) => { setRole(e.target.value); handleRoleChange(e); }} />
                    <label for="entreprise">Entreprise</label>
                </div>
                {selectedRole === 'entreprise' && (
                    <>
                        <input type="text" class="inputt" placeholder="nom de entreprise" onChange={(e) => setNomEntreprise(e.target.value)} />
                        <input type="date" class="inputt" onChange={(e) => setDateOuverture(e.target.value)} />
                    </>
                )}
                {selectedRole === 'condidat' && (
                    <>
                        <input type="text" class="inputt" placeholder="First Name" onChange={(e) => setNom(e.target.value)} />
                        <input type="text" class="inputt" placeholder="Last Name" onChange={(e) => setPrenom(e.target.value)} />
                    </>
                )}
                <button class="buttonn" id="enr">Sign Up</button>
            </form>
        </div>
        <div class="form-containerr sign-in-containerr">
            <form onSubmit={handlelogin}>
                <h1 class="h11">Sign in</h1>
                <div class="social-containerr">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span class="pp">or use your account</span>
                <input type="email" class="inputt" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" class="inputt" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <a href="#" class="aa"></a>
                <button class="buttonn">Sign In</button>
            </form>
        </div>
        <div class="overlay-containerr">
            <div class="overlayy">
                <div class="overlay-panell overlay-leftt">
                    <h1 class="h11">Welcome Back!</h1>
                    <p class="pp">To keep connected with us please login with your personal info</p>
                    <button class="buttonn ghost" id="signIn">Sign In</button>
                </div>
                <div class="overlay-panell overlay-rightt">
                    <h1 class="h11">Hello, Friend!</h1>
                    <p class="pp">Enter your personal details and start journey with us</p>
                    <button class="buttonn ghost" id="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</div>


            </div></div>   
      </center>
    </div>
  )
}


