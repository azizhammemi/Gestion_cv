import React, { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const PdfEditor = () => {
  const [text, setText] = useState("");

  const generateDocx = () => {
    // Load the docx template file (as binary content)
    fetch("/path/to/template.docx")
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const zip = new PizZip(data);
        const doc = new Docxtemplater(zip);

        // Set the text in the document (you need to use placeholders in the template)
        doc.setData({ myText: text });

        try {
          // Render the document
          doc.render();

          // Get the modified document as a Blob
          const out = doc.getZip().generate({ type: "blob" });

          // Save the generated document using FileSaver
          saveAs(out, "generated.docx");
        } catch (error) {
          console.error("Error while generating the document:", error);
        }
      });
  };

  return (
    <div>
      <h2>Generate DOCX Document</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={generateDocx}>Generate DOCX</button>
    </div>
  );
};

