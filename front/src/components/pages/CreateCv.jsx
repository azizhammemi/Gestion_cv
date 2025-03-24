import React from "react";

export const CreateCv = () => {
  return (
    <div className="create-cv">
      <h1>Create Your CV HERE</h1>
      <button className="upload-button swell">Upload your resume</button>
      <span className="types">as .pdf or .docx file</span>
      <div className="content">
        <img
          alt="resume human"
          width="620"
          height="600"
          src="https://static.jobscan.co/blog/uploads/533x340_01_new.png"
          className="lazyloaded"
          data-ll-status="loaded"
        />
      </div>
      <section id="getstartedwithscan">
        <div id="sanguan" className="othercontainer">
          
          <div id="tomover"></div>
          
          <div className="row grayArea">
            <div id="uploadWrapper">
              <div id="jdSuggestionWrapper">
                <div className="scanHeading">
                </div>
                <div className="stepWrapper">
                  <div className="stepBar">
                    <div className="progress" style={{ width: "0%" }}></div>
                  </div>
                  <div className="step one active">
                    <div className="count">1</div>
                    <div className="name">Upload Resume</div>
                  </div>
                  <div className="step two">
                    <div className="count">2</div>
                    <div className="name">Add Job</div>
                  </div>
                  <div className="step three">
                    <div className="count">3</div>
                    <div className="name">View Results</div>
                  </div>
                </div>
                <div className="formWrapper" trysample="function () { [native code] }">
                  <div className="shadow">
                    <label htmlFor="fileInput" className="header">
                      <span>Upload your resume</span>
                    </label>
                    <input type="file" id="fileInput" accept=".pdf,.docx,.txt" />
                    <div className="documentIcon">
                      <img src="https://static.jobscan.co/images/homePage/document.svg" alt="document icon" />
                    </div>
                    <p className="instruction">Upload your resume to get started</p>
                    <button className="btn btn-default btn-lg sampleScanButton">
                      Don't have a resume? Try a sample scan
                    </button>
                    <a href="/rb/start" target="_blank" rel="noopener" className="rb-link" previewlistener="true">
                      Don't have a resume?
                    </a>
                    <button className="upload-button swell">Upload your resume</button>
                    <span className="types">as .pdf or .docx file</span>
                     </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
