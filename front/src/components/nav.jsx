import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { NavLink } from 'react-router-dom';
import "../../public/assets/css/style.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/nice-select.css";
import "../../public/assets/css/slick.css";
import "../../public/assets/css/themify-icons.css";
import "../../public/assets/css/fontawesome-all.min.css";
import "../../public/assets/css/slicknav.css";
import "../../public/assets/css/magnific-popup.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/owl.carousel.min.css";
import "../../public/assets/css/flaticon.css";
import "../../public/assets/css/price_rangs.css";
import "./nav.css";

/*Récupérer l'utilisateur*/
// const storedUsername = localStorage.getItem('username');


const user_id = localStorage.getItem('user_id');
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const username = localStorage.getItem('username');
  if (user_id != null) {
    console.log("user:" + user_id);
  }

const pages = ['About', 'Services', 'Compare', 'Home'];
const links = ['/about', '/services','/compare','/'];
const settings = ['Logout'];


const handleLogout = async () => {
    try {

      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.log(error.response.data.error);
    }
  };



class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElNav: null,
            anchorElUser: null
        };
        this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
        this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
        this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
        this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
    }

    handleOpenNavMenu(event) {
        this.setState({ anchorElNav: event.currentTarget });
    }

    handleOpenUserMenu(event) {
        this.setState({ anchorElUser: event.currentTarget });
    }

    handleCloseNavMenu() {
        this.setState({ anchorElNav: null });
    }

    handleCloseUserMenu() {
        this.setState({ anchorElUser: null });
    }

    

    render() {
        const { anchorElNav, anchorElUser } = this.state;

        return (
            <div id="big">
 <header>
     
       <div class="header-area header-transparrent">
           <div class="headder-top header-sticky">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-md-2">
                          
                            <div class="logo">
                                <a href="index.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                            </div>  
                        </div>
                        <div class="col-lg-9 col-md-9">
                            <div class="menu-wrapper">
                             
                                <div class="main-menu">
                                    <nav class="d-none d-lg-block">
                                        <ul id="navigation">
                                        <li>              <NavLink to="/"><i className="far fa-address-book"></i>Home</NavLink>
</li>

                                            <li><NavLink to="/about"><i className="far fa-address-book"></i>about</NavLink></li>
                                           <li> <NavLink to="/services"><i className="far fa-address-book"></i>Services</NavLink></li>
                                            <li><NavLink to="/compare"><i className="far fa-address-book"></i>compare</NavLink></li>
                                            <li><NavLink to="/formeresumes"><i className="far fa-address-book"></i>resume</NavLink></li>



                                        </ul>
                                    </nav>
                                </div>          
                             
                                <div class="header-btn d-none f-right d-lg-block">
                                {user_id != null ? (
                
                  <i class="btn head-btn2">{username}</i>
              
              ) : null}
              {user_id != null ? (
                  <button onClick={handleLogout} className="btn head-btn1">Logout</button>
              ) : null}
               {user_id == null ? (
             <NavLink to="/login"><i class="btn head-btn1">Register</i></NavLink>

              ) : null}
              {user_id == null ? (
                <NavLink to="/login"><i class="btn head-btn2">login</i></NavLink>

              ) : null}
                     

                            
                                </div>
                            </div>
                        </div>
                   
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
           </div>
       </div>
     
    </header>
    </div>
        );
    }
}

export default Nav;
