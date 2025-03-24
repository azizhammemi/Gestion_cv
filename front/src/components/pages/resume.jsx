import React, { useState } from "react";

import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const Resume = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    number: "",
    email: "",
    linkedin: "",
    site: "",
    about: "",
    experiences: [{ title: "", description: "", date: "", datefin: "", keyworld: "" }],
    projects: [{ title: "", description: "" }],
    skills: [""],
    certifications: [""],
    interests: [""],
  });

  // Handle form changes for single inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle changes for array-based form fields
  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index][field] = value;
    setFormData({
      ...formData,
      [section]: updatedArray,
    });
  };

  // Add a new item to an array-based field
  const addItem = (section, newItem) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem],
    });
  };

  // Remove an item from an array-based field
  const removeItem = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [section]: updatedArray,
    });
  };

  // Add a new empty string for skills, certifications, and interests
  const addItemm = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], ""],
    });
  };

  // Handle change for array-based fields like skills, certifications, and interests
  const handleArrayChangee = (section, index, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [section]: updatedArray,
    });
  };
  const MyDocument = () => (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{formData.name || "Your Name"}</Text>
          <Text style={pdfStyles.title}>{formData.title || "Your Title"}</Text>
          <Text style={pdfStyles.contact}>
            {formData.email || "Email"}
          </Text>
          <Text style={pdfStyles.contact}>
          {formData.number || "Phone"}
          </Text>
          <Text style={pdfStyles.contact}>
            {formData.linkedin || ""} 
          </Text>
          <Text style={pdfStyles.contact}>
          {formData.site || ""}
          </Text>
        </View>
     
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>About Me</Text>
            <Text style={pdfStyles.paragraph}>{formData.about}</Text>
          </View>
        
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Experience</Text>
          {formData.experiences.map((experience, index) => (
            <View key={index} style={pdfStyles.item}>
              <Text style={pdfStyles.itemTitle}>
                {experience.title || "Job Title"}
              </Text>
              <Text style={pdfStyles.itemDate}>
                {experience.date || "Date"} <Text style={{ marginHorizontal: 5 }} /><Text style={{ marginHorizontal: 5 }} />
                {experience.datefin || "Date"}
              </Text>
              <Text style={pdfStyles.itemDescription}>
                {experience.description || "Description of responsibilities."}
              </Text>
            
              <Text style={pdfStyles.itemTitleworld}>
              keywords:  {experience.keyworld || "keywords of responsibilities."}
              </Text>
            </View>
          ))}
        </View>
        {formData.projects.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Projects</Text>
          {formData.projects.map((project, index) => (
            <View key={index} style={pdfStyles.item}>
              <Text style={pdfStyles.itemTitle}>
                {project.title || "Project Title"}
              </Text>
              <Text style={pdfStyles.itemDescription}>
                {project.description || "Description of the project."}
              </Text>
            </View>
          ))}
        </View>
        )}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Skills</Text>
          {formData.skills.map((skills, index) => (
            <Text key={index}style={pdfStyles.itemDescription}>- {skills || "skills "}</Text>
          ))}
        </View>
        {formData.certifications.length > 0 && (
  <View style={pdfStyles.section}>
    <Text style={pdfStyles.sectionTitle}>Certifications</Text>
    {formData.certifications.map((certification, index) => (
      <Text key={index} style={pdfStyles.itemDescription}>- {certification}</Text>
    ))}
  </View>
)}

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Interests</Text>
          {formData.interests.map((interest, index) => (
            <Text key={index} style={pdfStyles.itemDescription}>- {interest || "Interest Title"}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div  style={{
      display: "flex",
      justifyContent: "space-between",
      
      padding: "20px", // Add some padding
      backgroundColor: "#f8f9fa", // Light background color
    }}>


      <div>
      <nav>
        <button className="button-primary" onClick={() => setActiveSection("about")}>About Me</button>
        <button className="button-primary" onClick={() => setActiveSection("experience")}>Experience</button>
        <button className="button-primary" onClick={() => setActiveSection("projects")}>Projects</button>
        <button className="button-primary" onClick={() => setActiveSection("skills")}>Skills</button>
        <button className="button-primary" onClick={() => setActiveSection("certifications")}>Certifications</button>
        <button className="button-primary" onClick={() => setActiveSection("interests")}>Interests</button>
      </nav>
        <h2>Generate CV</h2>
        {activeSection === "about" && (
          <div>
              <div className="flexcvone">
              <div>
             <label>
       
        
       <input placeholder="Name"
             className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         type="text"
         name="name"
         value={formData.name}
         onChange={handleChange}
       />
     </label>
     <br></br>
     <label>
    
       <input
         type="text" placeholder="Title"
         name="title" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         value={formData.title}
         onChange={handleChange}
       />
     </label>
     <br></br>

     <label>
    
       <input placeholder="Phone"
         type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         name="number"
         value={formData.number}
         onChange={handleChange}
       />
       
     </label>
     <br></br>
 </div>
 <div>
     <label>
       <input
         type="text" placeholder="Email"
         name="email" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         value={formData.email}
         onChange={handleChange}
       />
     </label>
     <br></br>

     <label>
       
       <input
         type="text" placeholder="Linkedin"
         name="linkedin" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         value={formData.linkedin}
         onChange={handleChange}
       />
     </label>
     <br></br>

     <label>
      
       <input
         type="text" placeholder="Website"
         name="site" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         value={formData.site}
         onChange={handleChange}
       />
     </label>
     <br></br>
     </div>  </div>
     <label>
   
     <br></br>
    
       <textarea
         name="about" placeholder="About Me"
         value={formData.about} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
         onChange={handleChange}
         cols={50}
         rows={7}
       />
     </label>
     <br></br>
     
          </div>
        )}

        {activeSection === "experience" && (
          <div>
             <h3>Experience</h3>
        {formData.experiences.map((experience, index) => (
          <div key={index}>
        <input
              type="text"
              placeholder="name company"       className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={experience.title}
              onChange={(e) =>
                handleArrayChange("experiences", index, "title", e.target.value)
              }
            />
                    <br></br>
                   
       <br></br>

            <textarea
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Description"
              value={experience.description}
              onChange={(e) =>
                handleArrayChange("experiences", index, "description", e.target.value)
              }
              cols={50}
              rows={7}
            />
                    <br></br>

         <input
              type="Date" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Date debut"
              value={experience.date}
              onChange={(e) =>
                handleArrayChange("experiences", index, "date", e.target.value)
              }
            />
&nbsp;&nbsp;&nbsp;&nbsp; 
         <input
              type="Date" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Datefin"
              value={experience.datefin}
              onChange={(e) =>
                handleArrayChange("experiences", index, "datefin", e.target.value)
              }
            />
                    <br></br>
                    <br></br>
                    <input
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="keywords"
              value={experience.keyworld}
              onChange={(e) =>
                handleArrayChange("experiences", index, "keyworld", e.target.value)
              }
            />
            <br></br><br></br>
                  <button className="button-warning"
              type="button"
              onClick={() => removeItem("experiences", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <br></br>
        <button className='btn btn-success' type="button" onClick={() => addItem("experiences", { title: "", description: "", date: "" })}>
          Add Experience
        </button>
     

          </div>
        )}

        {activeSection === "projects" && (
          <div>
           <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index}><br></br>
            <input
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Title"
              value={project.title}
              onChange={(e) =>
                handleArrayChange("projects", index, "title", e.target.value)
              }
            /><br></br><br></br>
            <input
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Description"
              value={project.description}
              onChange={(e) =>
                handleArrayChange("projects", index, "description", e.target.value)
              }
            /><br></br><br></br>
                  <button
              type="button" className="button-warning"
              onClick={() => removeItem("projects", index)}
            >
              Remove
            </button>
          </div>
          
        ))}<br></br>
        
        <button className='btn btn-success' type="button" onClick={() => addItem("projects", { title: "", description: "" })}>
          Add Project
        </button>

          </div>
        )}

        {activeSection === "skills" && (
          <div>
            <h3>skills</h3>
        {formData.skills.map((skills, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="skills"
              value={skills}
              onChange={(e) =>
                handleArrayChangee("skills", index, e.target.value)
              }
            />
            <button className="button-warning"
              type="button"
              onClick={() => removeItem("skills", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className='btn btn-success' type="button" onClick={() => addItemm("skills")}>
          Add Skills
        </button>

          </div>
        )}

        {activeSection === "certifications" && (
          <div>
            <h3>certification</h3>
        {formData.certifications.map((certifications, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="certifications"
              value={certifications}
              onChange={(e) =>
                handleArrayChangee("certifications", index, e.target.value)
              }
            />
            <button
              type="button" className="button-warning"
              onClick={() => removeItem("certifications", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className='btn btn-success' type="button" onClick={() => addItemm("certifications")}>
          Add certifications
        </button>

       
          </div>
        )}

        {activeSection === "interests" && (
          <div>
            <h3>Interests</h3>
        {formData.interests.map((interest, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text" className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Interest"
              value={interest}
              onChange={(e) =>
                handleArrayChangee("interests", index, e.target.value)
              }
            />
            <button
              type="button" className="button-warning"
              onClick={() => removeItem("interests", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className='btn btn-success' type="button" onClick={() => addItemm("interests")}>
          Add Interest
        </button>

          </div>
        )}
      </div>

      <PDFViewer style={{ width: "50%", height: "100vh" }}>
        <MyDocument formData={formData} />
      </PDFViewer>
    </div>
  );
};

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  header: { textAlign: "center", marginBottom: 20 },
  name: { fontSize: 20, fontWeight: "bold" },
  title: { fontSize: 15, marginVertical: 4, color: "#555" },
  contact: { fontSize: 12, color: "#888" },
  section: { marginBottom: 20 },
  sectionTitle: {fontSize: 16,fontWeight: "bold",marginBottom: 8,borderBottom: "1px solid #000",titlepaddingBottom: 4, },
  item: { marginBottom: 12 },
  itemTitle: { fontSize: 14, fontWeight: "bold" },
  itemTitleworld: { fontSize: 12, fontWeight: "bold",marginTop:5 },
  itemDate: { fontSize: 12, color: "#666", marginVertical: 4 },
  itemDescription: { fontSize: 12, color: "#444" },
  paragraph: { fontSize: 12, lineHeight: 1.5, color: "#333" },
});
