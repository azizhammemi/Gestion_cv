from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import fitz
import re
from geotext import GeoText
import PyPDF2
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import request, send_file
from pdf2image import convert_from_bytes
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    file.save('condidate.pdf')

    return 'File uploaded successfully'



regex_patterns = {
    "linkedin": r'(https?://)?(www\.)?linkedin\.com/.*',
    "gmail": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
    "phone": r'\b\+\d+|\d+\b'
}
def detect_cities(cv_text):
    places = GeoText(cv_text)
    cities = list(places.cities)
    return cities

def extract_cv_content(pdf_path, regex_patterns):
    cv_text = ""
    detected_info = {key: False for key in regex_patterns.keys()}  
    has_image = False

    pdf_document = fitz.open(pdf_path)

    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        cv_text += page.get_text()

        for info_name, regex_pattern in regex_patterns.items():
            detected = detect_info(cv_text, regex_pattern)
            if detected:
                detected_info[info_name] = True

        image_list = page.get_images(full=True)
        if image_list:
            has_image = True
            break

    faces = []
    if has_image:
        xref = image_list[0][0]
        base_image = pdf_document.extract_image(xref)
        image_bytes = base_image["image"]
        image_np = np.frombuffer(image_bytes, dtype=np.uint8)
        image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
        faces = detect_faces(image)

    criteria_detected = identify_criteria(cv_text, detected_info,"criteria_output.xlsx")

    return cv_text, detected_info, has_image, criteria_detected, faces
def detect_info(text, regex_pattern):
    return bool(re.search(regex_pattern, text))

def identify_criteria(cv_text, detected_info, excel_file):
    # Load the Excel file
    df = pd.read_excel(excel_file)
    
    # Initialize the dictionary to store detected criteria
    criteria_detected = {}

    # Iterate through each column (criterion) in the Excel file
    for criterion in df.columns:
        # Get the list of keywords for the current criterion, dropping NaN values
        keywords = df[criterion].dropna().tolist()

        # Check if any of the keywords exist in the cv_text
        criteria_detected[criterion] = any(keyword.lower() in cv_text.lower() for keyword in keywords)
    
    return criteria_detected

def detect_faces(image):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    return faces

def calculate_missing_elements(detected_info, faces, criteria_detected, detected_cities, canadian=True):
    missing_elements = []

    if canadian:
        if (len(faces))> 0:
            missing_elements.append("Image de profil (enlever)")
    else:
        if len(faces)==0:
            missing_elements.append("Image de profil (ajouter)")

    if not detected_info["linkedin"] and not detected_info["gmail"] and not detected_info["phone"]:
        missing_elements.append("Informations personnelles (ajouter)")
    if not detected_cities:
        missing_elements.append("Ville (ajouter)")
    for criterion, is_present in criteria_detected.items():
        if not is_present:
            missing_elements.append(criterion + " (ajouter)")

    return missing_elements
def calculate_score_canadian(detected_info, faces, criteria_detected, detected_cities):
    weights = {
        "Compétences": 3,
        "Expérience professionnelle": 2.5,
        "Éducation et formation": 1.5,
        "Loisirs et centres d’intérêt": 1,
        "Visage": 2,
        "Informations personnelles": 1.5
    }

    total_weight = sum(weights.values())
    present_weight = 0

    # Calcul du poids des compétences, de l'expérience professionnelle, de l'éducation et de la formation, des loisirs et centres d'intérêt
    for criterion, is_present in criteria_detected.items():
        if isinstance(is_present, bool) and is_present:
            present_weight += weights[criterion]

    # Calcul du poids des informations personnelles
    if detected_info["linkedin"] or detected_info["gmail"] or detected_info["phone"]:
        present_weight += weights["Informations personnelles"]

    # Calcul du poids du visage
    if len(faces) == 0:
        present_weight += weights["Visage"]

    score = (present_weight / total_weight) * 100
    return score
def calculate_score_european(detected_info, faces, criteria_detected, detected_cities):
    weights = {
        "Compétences": 3,
        "Expérience professionnelle": 2.5,
        "Éducation et formation": 1.5,
        "Loisirs et centres d’intérêt": 1,
        "Visage": 2,
        "Informations personnelles": 1.5
    }

    total_weight = sum(weights.values())
    present_weight = 0

    # Calcul du poids des compétences, de l'expérience professionnelle, de l'éducation et de la formation, des loisirs et centres d'intérêt
    for criterion, is_present in criteria_detected.items():
        if isinstance(is_present, bool) and is_present:
            present_weight += weights[criterion]

    # Calcul du poids des informations personnelles
    if detected_info["linkedin"] or detected_info["gmail"] or detected_info["phone"]:
        present_weight += weights["Informations personnelles"]

    # Calcul du poids du visage
    if len(faces) > 0:
        present_weight += weights["Visage"]

    score = (present_weight / total_weight) * 100
    return score

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







def extract_elements_from_job_description(job_description, matching_dict):
  elements = []

  for key, values in matching_dict.items():
    for value in values:
      if value.lower() in job_description.lower():
        elements.append(value)
  return elements

def extract_elements_from_cv(cv_text, matching_dict):
    elements = []

    for key, values in matching_dict.items():
        for value in values:
            if value.lower() in cv_text.lower():
                elements.append(value)
    return elements


def calculate_similarity(cv_elements, job_elements):
    cv_elements_set = set(cv_elements)
    job_elements_set = set(job_elements)

    # Calculer les éléments présents dans la description de poste mais absents du CV
    job_only_elements = job_elements_set - cv_elements_set

    # Calculer le score de similarité
    if not job_only_elements:  # Si aucun élément n'est présent uniquement dans la description de poste
        similarity_score = 100.0  # Score de similarité maximum
    else:
        # Score de similarité basé sur la proportion d'éléments présents uniquement dans la description de poste
        similarity_score = (1 - len(job_only_elements) / len(job_elements_set)) * 100

    return similarity_score

@app.route('/matching', methods=['GET'])
def matching():
    pdf_path = 'condidate.pdf'  # Replace with the path to your PDF file
    cv_text = extract_text_from_pdf(pdf_path)
    df = pd.read_excel('matching_dict_columns.xlsx')
    matching_dict = {
        'competance': df['competance'].dropna().tolist(),
        'soft_skills': df['soft_skills'].dropna().tolist(),
        'langues': df['langues'].dropna().tolist()
    }
    
    job_description = request.args.get('content', '')  # Retrieve job description from the query parameter

    job_elements = extract_elements_from_job_description(job_description, matching_dict)
    cv_elements = extract_elements_from_cv(cv_text, matching_dict)

    print("job elements",job_elements)
    print("cv elements",cv_elements)
    missing_competences = [element for element in job_elements if element in matching_dict['competance'] and element not in cv_elements]
    missing_soft_skills = [element for element in job_elements if element in matching_dict['soft_skills'] and element not in cv_elements]
    missing_langues = [element for element in job_elements if element in matching_dict['langues'] and element not in cv_elements]

    print("Compétences manquantes dans le CV :", missing_competences)
    print("Soft skills manquantes dans le CV :", missing_soft_skills)
    print("Langues manquantes dans le CV :", missing_langues)

    # Calculer la similarité entre les éléments extraits
    similarity = calculate_similarity(cv_elements,job_elements)

    response = {
            "job_elements": job_elements,
            "cv_elements": cv_elements,
            "missing_competences": missing_competences,
            "missing_soft_skills": missing_soft_skills,
            "missing_langues": missing_langues,
            "similarity": similarity
        }
        
        # Renvoi de la réponse JSON au client
    return jsonify(response), 200

@app.route('/match', methods=['GET'])
def match():
    nom = request.args.get('nom', '')
    titre = request.args.get('titre', '')
    about = request.args.get('about', '')
    youremail = request.args.get('youremail', '')
    contact = request.args.get('contact', '')  # Note: using lowercase 'email' for consistency
    pays = request.args.get('pays', '')
    linkdin = request.args.get('linkdin', '')
    competence = request.args.get('competence', '')
    langage= request.args.get('langage', '')
    formation = request.args.get('formation', '')
    stage = request.args.get('stage', '')
    loisirs= request.args.get('loisirs', '')
    jobdescription=request.args.get('jobdescription', '')
    df = pd.read_excel('matching_dict_columns.xlsx')
    matching_dict = {
        'competance': df['competance'].dropna().tolist(),
        'soft_skills': df['soft_skills'].dropna().tolist(),
        'langues': df['langues'].dropna().tolist()
    }
    response_data = f' {nom} {titre} {about} {youremail} {contact} {pays} {linkdin} {competence} {formation} {stage} {loisirs} {langage}'
    
    job_elements = extract_elements_from_job_description(jobdescription, matching_dict)
    cv_elements = extract_elements_from_cv(response_data, matching_dict)
    similarity = calculate_similarity(cv_elements,job_elements)
    missing_competences = [element for element in job_elements if element in matching_dict['competance'] and element not in cv_elements]
    missing_soft_skills = [element for element in job_elements if element in matching_dict['soft_skills'] and element not in cv_elements]
    missing_langues = [element for element in job_elements if element in matching_dict['langues'] and element not in cv_elements]
    response = {
            "job_elements": job_elements,
            "cv_elements": cv_elements,
            "missing_competences": missing_competences,
            "missing_soft_skills": missing_soft_skills,
            "missing_langues": missing_langues,
            "similarity": similarity
        }
        
        # Renvoi de la réponse JSON au client
    return jsonify(response), 200  


@app.route('/cv', methods=['GET'])
def anlyse():
    pdf_cv_path = "condidate.pdf"  
    cv_text, detected_info, has_profile_image, criteria_detected, faces = extract_cv_content(pdf_cv_path, regex_patterns)
    detected_cities = detect_cities(cv_text)

    canadian_score = calculate_score_canadian(detected_info, faces, criteria_detected, detected_cities)
    canadian_score = "{:.2f}".format(canadian_score)  
    missing_elements_canadian = calculate_missing_elements(detected_info, faces, criteria_detected, detected_cities, canadian=True)

    european_score = calculate_score_european(detected_info, faces, criteria_detected, detected_cities)
    european_score = "{:.2f}".format(european_score) 
    missing_elements_european = calculate_missing_elements(detected_info, faces, criteria_detected, detected_cities, canadian=False)
    
    return jsonify({
        "canadian_score": canadian_score,
        "european_score": european_score,
        "missingElementsCanadian": missing_elements_canadian,
        "missingElementsEuropean": missing_elements_european
    })



@app.route('/hello/', methods=['POST', 'GET'])
def hello():
    if request.method == 'POST':
        # Extract form data
        name = request.form['yourname']
        email = request.form['youremail']
        contact = request.form['contact']
        compétences = request.form['compétences']
        expérience = request.form['expérience']
        loisirs = request.form['loisirs']
        langage = request.form['langage']
        
        # Handle file upload (image)
        if 'image' in request.files:
            image = request.files['image']
            # Save the image or process it as per your requirements
            # For example, to save it:
            image.save('uploaded_image.jpg')

        # Return JSON response
        return jsonify({
            'name': name,
            'email': email,
            'contact': contact,
            'compétences': compétences,
            'expérience': expérience,
            'loisirs': loisirs,
            'langage': langage,
        })
    elif request.method == 'GET':
        return "Hello, GET request received!"


if __name__ == '__main__':
    app.run(host='localhost', port=3000)