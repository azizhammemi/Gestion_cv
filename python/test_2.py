from flask import Flask, jsonify, request
from flask_cors import CORS
import PyPDF2
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    file.save('condidate.pdf')

    return 'File uploaded successfully'


def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file.

    Arguments:
    pdf_path : str : Path to the PDF file.

    Returns:
    str : Text extracted from the PDF.
    """
    text = ""
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

@app.route('/matching', methods=['GET'])
def matching():
    nom = request.args.get('nom', '')
    prenom = request.args.get('prenom', '')
    adresse = request.args.get('adresse', '')
    telephone = request.args.get('telephone', '')
    email = request.args.get('Email', '')  # Note: using lowercase 'email' for consistency
    langues = request.args.get('langues', '')
    softskills = request.args.get('softskills', '')
    hardskills = request.args.get('hardskills', '')
    jobdescription=request.args.get('jobdescription', '')
    response_data = f' {nom} {prenom} {adresse} {telephone} {email} {langues} {softskills} {hardskills} '
    text=[response_data,jobdescription]
    cv=CountVectorizer()
    count_matrix=cv.fit_transform(text)
    matchPercentage=round(cosine_similarity(count_matrix)[0][1]*100)
    return  f' votre score est {str(matchPercentage)}% '    
if __name__ == '__main__':
    app.run(port=4000)