import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { IconCollection } from "./Icons.jsx";


export const Cvformone = () => {
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

  const [activeTab, setActiveTab] = useState("personal");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // This should reference the component you want to print
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleArrayChange = (section, index, field, value) => {
    const newData = { ...formData };
    newData[section][index][field] = value;
    setFormData(newData);
  };

  const addItem = (section, newItem) => {
    const newData = { ...formData };
    newData[section].push(newItem);
    setFormData(newData);
  };

  const removeItem = (section, index) => {
    const newData = { ...formData };
    newData[section].splice(index, 1);
    setFormData(newData);
  };
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
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.container}>
          {/* Header Section */}
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.name}>{formData.name || "Your Name"}</Text>
            <Text style={pdfStyles.title}>{formData.title || "Your Title"}</Text>
            <View style={pdfStyles.contactInfo}>
              <View style={pdfStyles.contactItem}>
                <Link style={pdfStyles.contactText}>
                  {formData.email || "Email"}
                </Link>
              </View>
              <View style={pdfStyles.contactItem}>
                <Text style={pdfStyles.contactText}>{formData.number || "Phone"}</Text>
              </View>
              <View style={pdfStyles.contactItem}>
                <Link src={formData.linkedin || ""} style={pdfStyles.contactText}>
                   {formData.linkedin ? formData.linkedin.replace("https://www.linkedin.com/in/","") : ""}
                </Link>
              </View>
              <View style={pdfStyles.contactItem}>
                <Link src={formData.site || ""} style={pdfStyles.contactText}>
                  {formData.site || ""}
                </Link>
              </View>
            </View>
          </View>
  
          {/* Main Content Sections */}
          <View style={pdfStyles.mainContent}>
            <View style={pdfStyles.leftColumn}>
              {/* About Me */}
              <View style={pdfStyles.section}>
                <Text style={pdfStyles.sectionTitle}>About Me</Text>
                <Text style={pdfStyles.paragraph}>{formData.about}</Text>
              </View>
  
              {/* Experience */}
              <View style={pdfStyles.section}>
                <Text style={pdfStyles.sectionTitle}>Experience</Text>
                {formData.experiences.map((experience, index) => (
                  <View key={index} style={pdfStyles.item}>
                    <Text style={pdfStyles.itemTitle}>{experience.title || "Job Title"}</Text>
                    <Text style={pdfStyles.itemDate}>
                      {experience.date || "Date"} - {experience.datefin || "Date"}
                    </Text>
                    <Text style={pdfStyles.itemDescription}>{experience.description || "Description"}</Text>
                    <Text style={pdfStyles.itemKeywords}>Keywords: {experience.keyworld || "Keywords"}</Text>
                  </View>
                ))}
              </View>
  
              {/* Projects */}
              <View style={pdfStyles.section}>
                <Text style={pdfStyles.sectionTitle}>Projects</Text>
                {formData.projects.map((project, index) => (
                  <View key={index} style={pdfStyles.item}>
                    <Text style={pdfStyles.itemTitle}>{project.title || "Project Title"}</Text>
                    <Text style={pdfStyles.itemDescription}>{project.description || "Description"}</Text>
                  </View>
                ))}
              </View>
            </View>
  
            <View style={pdfStyles.rightColumn}>
              {/* Skills */}
              <View style={pdfStyles.section}>
                <Text style={pdfStyles.sectionTitle}>Skills</Text>
                {formData.skills.map((skill, index) => (
                  <Text key={index} style={pdfStyles.skillItem}>- {skill || "Skill"}</Text>
                ))}
              </View>
  
              {/* Certifications */}
              <View style={pdfStyles.section}>
                <Text style={pdfStyles.sectionTitle}>Certifications</Text>
                {formData.certifications.map((certification, index) => (
                  <Text key={index} style={pdfStyles.skillItem}>- {certification || "Certification"}</Text>
                ))}
              </View>
  
              {/* Interests */}
              <View style={pdfStyles.section}>
                <Text style={pdfStyles.sectionTitle}>Interests</Text>
                {formData.interests.map((interest, index) => (
                  <Text key={index} style={pdfStyles.skillItem}>- {interest || "Interest"}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
 

  return (
    <div className="p-8"  style={{
      display: "flex",
      justifyContent: "space-between",
      
      padding: "20px", // Add some padding
      backgroundColor: "#f8f9fa", // Light background color

    }}>
      {/* Navigation Bar */}
     
      {/* Dynamic Form Content */}
      <div>
      <div className="flex space-x-4 mb-8 border-b-2">
        <button
          onClick={() => handleTabChange("personal")}
          className={`pb-2 ${activeTab === "personal" ? "border-b-4 border-blue-500 font-bold" : ""}`}
        >
          Personal Details
        </button>
        <button
          onClick={() => handleTabChange("experiences")}
          className={`pb-2 ${activeTab === "experiences" ? "border-b-4 border-blue-500 font-bold" : ""}`}
        >
          Experiences
        </button>
        <button
          onClick={() => handleTabChange("projects")}
          className={`pb-2 ${activeTab === "projects" ? "border-b-4 border-blue-500 font-bold" : ""}`}
        >
          Projects
        </button>
        <button
          onClick={() => handleTabChange("skills")}
          className={`pb-2 ${activeTab === "skills" ? "border-b-4 border-blue-500 font-bold" : ""}`}
        >
          Skills
        </button>
        <button
          onClick={() => handleTabChange("certifications")}
          className={`pb-2 ${activeTab === "certifications" ? "border-b-4 border-blue-500 font-bold" : ""}`}
        >
          Certifications
        </button>
        <button
          onClick={() => handleTabChange("interests")}
          className={`pb-2 ${activeTab === "interests" ? "border-b-4 border-blue-500 font-bold" : ""}`}
        >
          Interests
        </button>
      </div>

        {activeTab === "personal" && (
          <div>
            <div className="flexcvone">
              <div>
                <label>
                  <input
                    placeholder="Name"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  <input
                    placeholder="Phone"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    name="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </label>
                <br />
              </div>
              <div>
                <label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  <input
                    type="text"
                    placeholder="Linkedin"
                    name="linkedin"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  <input
                    type="text"
                    placeholder="Website"
                    name="site"
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.site}
                    onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                  />
                </label>
                <br />
              </div>
            </div>
            <label>
              <br />
              <textarea
                name="about"
                placeholder="About Me"
                value={formData.about}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                cols={50}
                rows={7}
              />
            </label>
            <br />
          </div>
        )}

        {activeTab === "experiences" && (
          <div>
            <h3>Experience</h3>
            {formData.experiences.map((experience, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Name Company"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={experience.title}
                  onChange={(e) =>
                    handleArrayChange("experiences", index, "title", e.target.value)
                  }
                />
                <br />
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Description"
                  value={experience.description}
                  onChange={(e) =>
                    handleArrayChange("experiences", index, "description", e.target.value)
                  }
                  cols={50}
                  rows={7}
                />
                <br />
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Date Start"
                  value={experience.date}
                  onChange={(e) =>
                    handleArrayChange("experiences", index, "date", e.target.value)
                  }
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="End Date"
                  value={experience.datefin}
                  onChange={(e) =>
                    handleArrayChange("experiences", index, "datefin", e.target.value)
                  }
                />
                <br />
                <br />
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Keywords"
                  value={experience.keyworld}
                  onChange={(e) =>
                    handleArrayChange("experiences", index, "keyworld", e.target.value)
                  }
                />
                <br />
                <br />
                <button
                  className="button-warning"
                  type="button"
                  onClick={() => removeItem("experiences", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <br />
            <button
              className="btn btn-success"
              type="button"
              onClick={() => addItem("experiences", { title: "", description: "", date: "", datefin: "", keyworld: "" })}
            >
              Add Experience
            </button>
          </div>
        )}
 {activeTab === "projects" && (
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

{activeTab === "skills" && (
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

        {activeTab === "certifications" && (
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

        {activeTab === "interests" && (
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

        {/* Add sections for "projects", "skills", "certifications", and "interests" similar to the "experiences" section above */}

        <br />
     
      </div>
     
      <PDFViewer style={{ width: "50%", height: "100vh" }}>
        <MyDocument formData={formData} />
      </PDFViewer>
    </div>

  );
};

const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica", // Use a more professional font if possible
    fontSize: 12, // Set a base font size
  },
  container: {
    flexDirection: "row", // Two-column layout
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    width: "100%", // Header spans both columns
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center", // Center the contact info
    flexWrap: "wrap", // Allow wrapping on smaller screens
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center", // Align icon and text vertically
    marginHorizontal: 8, // Add some space between items
    marginBottom: 4,
  },
  contactText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4, // Add space between icon and text
    textDecoration: "none"
  },
  mainContent: {
    flexDirection: "row",
    flexGrow: 1, // Allow content to expand
  },
  leftColumn: {
    width: "60%", // Adjust column widths as needed
    paddingRight: 20,
  },
  rightColumn: {
    width: "40%",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottom: "1px solid #000",
    paddingBottom: 4,
  },
  item: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: "#444",
    marginBottom: 4,
  },
  itemKeywords: {
    fontSize: 12,
    color: "#777",
  },
  skillItem: {
      fontSize: 12,
      marginBottom: 4,
  }
});
