import { Route, Routes } from "react-router-dom";

// import {Navbar} from "./components/Navbar";
import Nav from "./components/nav";

import {Login} from "./components/login/Login";
import "@fortawesome/fontawesome-free/css/all.css";
import { About, Contact, Home, Services ,Compare } from "./components/pages";
import { Resume } from "./components/pages/resume";
import { PdfEditor } from "./components/pages/PdfEditor";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Formeresumes } from "./components/pages/Formeresumes"; 
import { Cvformone } from "./components/pages/Cvformone";
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
       <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/pdf" element={<PdfEditor />} />
        <Route path="/formeresumes" element={< Formeresumes />} />
        <Route path="/cvformone" element={< Cvformone />} />
      </Routes>
      
    </div>
  );
}

export default App;
