import pandas as pd

def save_matching_dict_to_excel():
    # Define the matching dictionary
    matching_dict = {
        'competance': [
            'Python', 'Java', 'JavaScript', 'C/C++', 'C#', 'Ruby', 'Swift', 'Kotlin', 'PHP',
            'TypeScript', 'Go', 'Rust', 'Perl', 'MATLAB', 'Objective-C', 'HTML', 'CSS',
            'Bootstrap', 'Tailwind CSS', 'React.js', 'Angular', 'Vue.js', 'Node.js', 'Express.js',
            'Django', 'Flask', 'Ruby on Rails', 'ASP.NET', 'Laravel', 'Symfony', 'WordPress',
            'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Microsoft SQL Server', 'Oracle',
            'NoSQL', 'GraphQL', 'RESTful API', 'SOAP', 'WebSockets', 'JSON', 'XML', 'YAML',
            'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD',
            'Agile', 'Scrum', 'Kanban', 'TDD', 'BDD', 'DevOps', 'Linux', 'Unix', 'Windows',
            'MacOS', 'AWS', 'Azure', 'Google Cloud Platform', 'Heroku', 'Firebase', 'IaaS',
            'PaaS', 'SaaS', 'Microservices', 'Containerization', 'Serverless', 'Big Data',
            'Data Science', 'Machine Learning', 'Deep Learning', 'Artificial Intelligence',
            'Natural Language Processing', 'Computer Vision', 'Neural Networks', 'Reinforcement Learning',
            'Blockchain', 'Cryptocurrency', 'Cybersecurity', 'Penetration Testing', 'Ethical Hacking',
            'Vulnerability Assessment', 'Incident Response', 'Security Auditing', 'Firewalls',
            'Encryption', 'Authentication', 'Authorization', 'Identity Management', 'Network Security',
            'System Administration', 'Virtualization', 'Cloud Computing', 'Infrastructure as Code',
            'Automation', 'Scripting', 'Shell scripting', 'Batch scripting', 'PowerShell',
            'Data Structures', 'Algorithms', 'Object-Oriented Programming', 'Functional Programming',
            'Design Patterns', 'Software Development Life Cycle', 'Continuous Integration',
            'Continuous Deployment', 'Test-Driven Development', 'Behavior-Driven Development',
            'Agile Methodologies', 'Scrum Framework', 'Kanban Methodology', 'DevOps Practices',
            'Version Control Systems', 'Database Management Systems', 'Web Development', 'Mobile Development',
            'Desktop Development', 'Game Development', 'Embedded Systems', 'Internet of Things (IoT)'
        ],
        'soft_skills': [
            'Communication', 'Esprit d\'équipe', 'Adaptabilité', 'Résolution de problèmes', 'Gestion du temps',
            'Créativité', 'Leadership', 'Empathie', 'Flexibilité', 'Esprit critique', 'Gestion du stress',
            'Gestion des conflits', 'Collaboration', 'Prise de décision', 'Travail sous pression', 'Confiance en soi',
            'Organisation', 'Écoute active', 'Pensée analytique', 'Initiative', 'Motivation', 'Persévérance',
            'Gestion de projet', 'Orientation client',
            'Communication', 'Teamwork', 'Adaptability', 'Problem-solving', 'Time management', 'Creativity',
            'Leadership', 'Empathy', 'Flexibility', 'Critical thinking', 'Stress management', 'Conflict resolution',
            'Collaboration', 'Decision-making', 'Working under pressure', 'Self-confidence', 'Organization',
            'Active listening', 'Analytical thinking', 'Initiative', 'Motivation', 'Perseverance', 'Project management',
            'Customer orientation'
        ],
        'langues': ['français', 'anglais', 'espagnol', 'allemand', 'French', 'English', 'Spanish', 'German']
    }

    # Find the maximum length among all lists to create rows for missing values
    max_length = max(len(matching_dict[key]) for key in matching_dict)

    # Prepare the data for the DataFrame, making sure all columns are the same length
    data = {key: value + [''] * (max_length - len(value)) for key, value in matching_dict.items()}

    # Create a DataFrame
    df = pd.DataFrame(data)

    # Save the DataFrame to an Excel file
    df.to_excel('matching_dict_columns.xlsx', index=False)

    print("Data has been saved to matching_dict_columns.xlsx")

# Call the function to save the data
save_matching_dict_to_excel()
