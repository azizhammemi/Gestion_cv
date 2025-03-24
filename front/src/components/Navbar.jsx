import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  const userCondidatName = localStorage.getItem('username');
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  if (user_id != null) {
    console.log("user:" + user_id);
  }
  useEffect(() => {
    const path = location.pathname.split("/").pop() || 'index.html';
    setActiveItem(path);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const activeNavItem = document.querySelector(`#navbarSupportedContent ul li a[href="/${activeItem}"]`);
      if (activeNavItem) {
        const { top, left, height, width } = activeNavItem.getBoundingClientRect();
        const horiSelector = document.querySelector('.hori-selector');
        horiSelector.style.top = `${top}px`;
        horiSelector.style.left = `${left}px`;
        horiSelector.style.height = `${height}px`;
        horiSelector.style.width = `${width}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeItem]);

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

  return (
    <div>
      <nav className="navbar navbar-expand-custom navbar-mainbg">

        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
            <li className={`nav-item ${activeItem === 'about' ? 'active' : ''}`}>
              <NavLink to="/about"><i className="far fa-address-book"></i>about</NavLink>
            </li>
            <li className={`nav-item ${activeItem === 'services' ? 'active' : ''}`}>
              <NavLink to="/services"><i className="far fa-address-book"></i>Services</NavLink>
            </li>
            <li className={`nav-item ${activeItem === 'compare' ? 'active' : ''}`}>
              <NavLink to="/compare"><i className="far fa-address-book"></i>compare</NavLink>
            </li>
            <li className={`nav-item ${activeItem === 'contact' ? 'active' : ''}`}>
              <NavLink to="/contact"><i className="far fa-clone"></i>Contact</NavLink>
            </li>
            <li className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}>
              <NavLink to="/"><FontAwesomeIcon icon={faHouse} />Home</NavLink>
            </li>
            {user_id == null ? (
              <li className={`nav-item ${activeItem === 'login' ? 'active' : ''} ml-auto`} id="right1">
                <NavLink to="/login"><i class="fa-solid fa-right-to-bracket">login</i></NavLink>
              </li>
            ) : null}

            <div id="logout">
              {user_id != null ? (
                <li className='navbar-nav mr-auto' id="right2" >
                  <i class="fa-solid fa-user">{userCondidatName}</i>
                </li>
              ) : null}
              {user_id != null ? (
                <li className='mr-auto' id="right" >
                  <button onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</button>
                </li>
              ) : null}
            </div>

          </ul>
        </div>
      </nav>
    </div>
  );
};

