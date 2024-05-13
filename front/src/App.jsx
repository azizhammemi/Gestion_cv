import { Route, Routes } from "react-router-dom";

// import {Navbar} from "./components/Navbar";
import Nav from "./components/nav";

import {Login} from "./components/login/Login";
import "@fortawesome/fontawesome-free/css/all.css";
import { About, Contact, Home, Services ,Compare } from "./components/pages";

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

      </Routes>
      
    </div>
  );
}

export default App;
