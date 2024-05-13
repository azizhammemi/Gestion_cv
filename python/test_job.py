import PyPDF2
from sklearn.feature_extraction.text import CountVectorizer

from sklearn.metrics.pairwise import cosine_similarity

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

# Exemple d'utilisation :
pdf_path = 'condidate.pdf'  # Remplacez 'cv-Drira.pdf' par le chemin de votre fichier PDF
resume = extract_text_from_pdf(pdf_path)
print(resume)
job_description = """

Title: Artificial Intelligence (AI) Engineer/Developer

Job Summary:
We are looking for a highly skilled and motivated Artificial Intelligence Engineer/Developer to join our team. The ideal candidate will have a strong background in machine learning, deep learning, and artificial intelligence techniques. The AI Engineer/Developer will be responsible for designing, developing, and implementing AI solutions to solve complex problems and enhance our products or services.

Responsibilities:

Research, design, and implement machine learning algorithms and models to solve specific business problems or improve existing processes.
Develop and train deep learning models using frameworks such as TensorFlow, PyTorch, or Keras for tasks such as image recognition, natural language processing, and predictive analytics.
Collect, preprocess, and analyze large datasets to extract meaningful insights and features for use in AI models.
Collaborate with cross-functional teams including data scientists, software engineers, and domain experts to understand requirements and integrate AI solutions into products or services.
Evaluate and benchmark different AI techniques and algorithms to identify the most effective approaches for specific tasks or applications.
Optimize and fine-tune AI models for performance, accuracy, and scalability.
Deploy AI models into production environments and monitor their performance in real-world applications.
Stay updated with the latest advancements in artificial intelligence, machine learning, and deep learning research, and incorporate new techniques and technologies into AI solutions.
Document and communicate technical concepts, methodologies, and results to both technical and non-technical stakeholders.
Provide guidance and mentorship to junior AI engineers/developers as needed.
Requirements:

Bachelor's degree in Computer Science, Engineering, Mathematics, or related field. Advanced degree (Master's or Ph.D.) in Artificial Intelligence, Machine Learning, or a related discipline is preferred.
Proven experience as an AI Engineer, Machine Learning Engineer, or similar role, with a strong portfolio of AI projects and implementations.
Proficiency in programming languages commonly used in AI and machine learning such as Python, and experience with relevant libraries and frameworks (e.g., TensorFlow, PyTorch, scikit-learn).
Solid understanding of machine learning algorithms, deep learning architectures, and AI techniques, with hands-on experience in training and deploying models.
Experience with data preprocessing, feature engineering, and model evaluation techniques.
Strong analytical and problem-solving skills, with the ability to formulate and solve complex AI problems.
Excellent communication and teamwork skills, with the ability to collaborate effectively with cross-functional teams.
Familiarity with cloud platforms (e.g., AWS, Azure, Google Cloud) and experience deploying AI models in cloud environments is a plus.
Knowledge of software development best practices, version control systems (e.g., Git), and agile methodologies.
Passion for learning and staying updated with the latest advancements in AI and machine learning research."""
text=[resume,job_description]
cv=CountVectorizer()
count_matrix=cv.fit_transform(text)
matchPercentage=round(cosine_similarity(count_matrix)[0][1]*100)

print(cosine_similarity(count_matrix))
print("your cv matches about "+str(matchPercentage)+"% with the job description")