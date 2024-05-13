#code final
import cv2
import numpy as np
import fitz
import re
from geotext import GeoText

# expression régulier pour extraire les informations personnelles
regex_patterns = {
    "linkedin": r'(https?://)?(www\.)?linkedin\.com/.*',
    "gmail": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
    "phone": r'\b\+\d+|\d+\b'
}
#fonction pour détecter le city
def detect_cities(cv_text):
    places = GeoText(cv_text)
    cities = list(places.cities)
    return cities

#fonction qui retourne le cv en format text les detect info des expression régulier les critére détecter de cv et as t'il un image de profile
def extract_cv_content(pdf_path, regex_patterns):
    cv_text = ""
    detected_info = {key: False for key in regex_patterns.keys()}  # Initialisation des informations détectées à False
    has_image = False

    # Ouvrir le fichier PDF correctement
    pdf_document = fitz.open(pdf_path)

    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        cv_text += page.get_text()

        # Détection des informations personnelles dans chaque page du CV
        for info_name, regex_pattern in regex_patterns.items():
            detected = detect_info(cv_text, regex_pattern)
            if detected:
                detected_info[info_name] = True

        # Vérification si le CV contient une image de profil
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

    # Vérification des critères spécifiques
    criteria_detected = identify_criteria(cv_text, detected_info)

    return cv_text, detected_info, has_image, criteria_detected, faces
#fonction qui retourne les info detecter des expression régulier
def detect_info(text, regex_pattern):
    return bool(re.search(regex_pattern, text))
# decter les critaire present dans le cv
def identify_criteria(cv_text, detected_info):
    criteria = {

            "Compétences": ["SKILLS","organizational skills", "digital skills", "language skills", "technical skills", "COMPETENCIES", "Compétences en matière d’organisation", "Compétences numériques", "Compétences linguistiques", "Compétences techniques","Langue","Langues","Aptitudes","Habiletés"],
            "Expérience professionnelle": ["work experience", "position held", "previous jobs", "career path", "expérience professionnelle", "poste occupé", "emplois précédents", "parcours professionnel"," Internship","stage","Expertise","Historique professionnel","Trajectoire professionnelle"],
            "Éducation et formation": ["degree", "training", "education", "schooling", "diplôme", "formation", "éducation", "cursus scolaire","Parcours académique","Academic background","Academic career","Certificats","Certifications","Learning","Apprentissage","Apprenticeship"],
            "Loisirs et centres d’intérêt": ["CENTRES D'INTÉRÊT","Sport","Centres d’intérêt","interests", "hobbies", "passions", "football", "tennis", "reading", "traveling", "movies", "loisirs", "centre d’intérêt", "passions", "football", "tennis", "lecture", "voyages", "cinéma","Passatemps","Hobbies","Leisure activities","Pastimes"]
        }

    criteria_detected = {}
    for criterion, keywords in criteria.items():
        criteria_detected[criterion] = any(keyword.lower() in cv_text.lower() for keyword in keywords)
    return criteria_detected

#detecter les images de profile dans un cv
def detect_faces(image):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    return faces

#afficher les élémant manquant de cv selon chaque norme
def calculate_missing_elements(detected_info, faces, criteria_detected, detected_cities, canadian=True):
    missing_elements = []

    if canadian:
        # Vérifier la présence de l'image de profil dans le CV canadien
        if (len(faces))> 0:
            missing_elements.append("Image de profil (enlever)")
    else:
        # Vérifier la présence de l'image de profil dans le CV européen
        if len(faces)==0:
            missing_elements.append("Image de profil (ajouter)")

    # Vérifier ce qui manque selon les autres critères
    if not detected_info["linkedin"] and not detected_info["gmail"] and not detected_info["phone"]:
        missing_elements.append("Informations personnelles (ajouter)")
    if not detected_cities:
        missing_elements.append("Ville (ajouter)")
    for criterion, is_present in criteria_detected.items():
        if not is_present:
            missing_elements.append(criterion + " (ajouter)")

    return missing_elements

#calcul score selon norme canadien
def calculate_score_canadian(detected_info, faces, criteria_detected, detected_cities):
    total_elements = 6
    present_criteria = 0


    if detected_info["linkedin"] or detected_info["gmail"] or detected_info["phone"]:
        present_criteria += 1

    if (len(faces)==0):
        present_criteria += 1



    for criterion, values in criteria_detected.items():
        if isinstance(values, bool) and values:
            present_criteria += 1
            print("ca")

    score = (present_criteria / total_elements) * 100
    return score

#calcul score selon norme européen
def calculate_score_european(detected_info, faces, criteria_detected, detected_cities):
    total_elements = 6
    present_criteria = 0


    if len(faces)>0:
        present_criteria += 1
        print("photo")

    # Vérifier la présence des informations personnelles
    if detected_info["linkedin"] or detected_info["gmail"] or detected_info["phone"]:
        present_criteria += 1
        print("li")



    # Vérifier la présence d'au moins un élément de chaque critère
    for criterion, values in criteria_detected.items():
        if isinstance(values, bool) and values:
            present_criteria += 1
            print(criterion)

    score = (present_criteria /total_elements) * 100
    print(present_criteria)
    return score
#affichage de fin

pdf_cv_path = "condidate.pdf"  # Mettre à jour avec le chemin de votre fichier PDF
cv_text, detected_info, has_profile_image, criteria_detected, faces = extract_cv_content(pdf_cv_path, regex_patterns)
detected_cities = detect_cities(cv_text)

canadian_score = calculate_score_canadian(detected_info, faces, criteria_detected, detected_cities)
canadian_score = "{:.2f}%".format(canadian_score)  # Formater le score en pourcentage
missing_elements_canadian = calculate_missing_elements(detected_info, faces, criteria_detected, detected_cities, canadian=True)
# Calcul du score selon la norme européenne
european_score = calculate_score_european(detected_info, faces, criteria_detected, detected_cities)
european_score = "{:.2f}%".format(european_score)  # Formater le score en pourcentage
missing_elements_european = calculate_missing_elements(detected_info, faces, criteria_detected, detected_cities, canadian=False)

#affichage score et élemant manquant
# Affichage des scores
print("Score selon la norme canadienne:", canadian_score)
print("Score selon la norme européenne:", european_score)

# Affichage des éléments manquants
if missing_elements_canadian:
    print("Ce qui manque dans le CV selon la norme canadienne :", ", ".join(missing_elements_canadian))
else:
    print("Le CV est complet selon la norme canadienne.")

if missing_elements_european:
    print("Ce qui manque dans le CV selon la norme européenne :", ", ".join(missing_elements_european))
else:
    print("Le CV est complet selon la norme européenne.")
