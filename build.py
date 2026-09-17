import json
import os
from datetime import datetime

RESUME_DATA = {
    "about": {
        "name": "Shaurya Harkar",
        "title": "CEH Intern Candidate",
        "tagline": "Cybersecurity learner focused on Linux basics, networking fundamentals, OWASP Top 10, and hands-on CTF practice.",
        "bio": "I am a BTech Computer Engineering student building a foundation for ethical hacking and security analysis. I practice through picoCTF, study common web risks through OWASP Top 10, and use Linux, networking basics, Git, and GitHub in my learning workflow.",
        "location": "India / Remote",
        "availability": "Available for cybersecurity and CEH internship opportunities.",
        "highlights": [
            "Solved picoCTF challenges to practice practical security thinking",
            "Studied OWASP Top 10 vulnerabilities and web security basics",
            "Comfortable with Linux basics, networking fundamentals, Git, and GitHub",
        ],
    },
    "stats": [
        {"label": "Target Role", "value": "CEH / Cybersecurity Intern"},
        {"label": "Focus", "value": "Linux, Networking, OWASP Top 10, picoCTF"},
    ],
    "skills": [
        {
            "category": "Cybersecurity Fundamentals",
            "items": [
                "Linux Basics",
                "Networking Basics",
                "OWASP Top 10",
                "picoCTF Practice",
                "Security Fundamentals",
            ],
        },
        {
            "category": "Tools & Workflow",
            "items": ["Git", "GitHub", "Command Line Basics", "Documentation"],
        },
        {
            "category": "Secondary Skill",
            "items": ["Flutter", "Dart"],
        },
    ],
    "experience": [
        {
            "role": "Cybersecurity Learner",
            "company": "Self Study + CTF Practice",
            "duration": "2025 - Present",
            "summary": "Building practical security fundamentals for a CEH internship role.",
            "bullets": [
                "Solved picoCTF challenges to strengthen problem solving, Linux usage, and security concepts.",
                "Studied OWASP Top 10 to understand common web application vulnerabilities.",
                "Practiced Git and GitHub for tracking notes, labs, and project work.",
            ],
            "stack": ["Linux", "Networking", "OWASP Top 10", "picoCTF", "GitHub"],
        }
    ],
    "education": [
        {
            "degree": "BTech Computer Engineering",
            "university": "Pimpri Chinchwad College Of Engineering, Akurdi",
            "year": "2025 - 2029",
            "details": "Current focus: cybersecurity fundamentals, networking, Linux, and ethical hacking basics.",
        }
    ],
    "certifications": [
        {
            "name": "Linux Unhatched",
            "issuer": "Cisco Networking Academy",
            "detail": "Completed beginner Linux fundamentals.",
        },
        {
            "name": "Networking Basics",
            "issuer": "Cisco Networking Academy",
            "detail": "Completed foundational computer networking concepts.",
        },
        {
            "name": "Hackviser Core Certification",
            "issuer": "Hackviser",
            "detail": "Completed core cybersecurity learning certification.",
        },
    ],
    "hobbies": [
        {
            "name": "Reading Books",
            "detail": "Enjoy exploring thoughtful writing and ideas through books.",
            "note": "Recent read: The Modest Proposal",
        },
        {
            "name": "CTF Practice",
            "detail": "Practice cybersecurity concepts through beginner-friendly CTF challenges.",
            "note": "Platform: picoCTF",
        },
    ],
    "projects": [
        {
            "name": "picoCTF Practice",
            "description": "Solved picoCTF challenges to build comfort with security reasoning, Linux commands, and problem-solving under constraints.",
            "outcome": "Improved understanding of beginner cybersecurity topics through hands-on practice.",
            "stars": "CTF",
            "forks": "Practice",
            "stack": ["Linux", "Security Basics", "Problem Solving"],
        },
        {
            "name": "OWASP Top 10 Study",
            "description": "Studied the OWASP Top 10 to understand common web application risks and how attackers think about vulnerable systems.",
            "outcome": "Built awareness of injection, broken access control, authentication risks, misconfiguration, and other core web security issues.",
            "stars": "Web Security",
            "forks": "Study Notes",
            "stack": ["OWASP Top 10", "Web Security", "Notes"],
        },
        {
            "name": "Resume Terminal",
            "description": "A terminal-inspired resume website focused on a concise CEH internship profile.",
            "outcome": "Presents skills, certifications, CTF practice, and contact details through an interactive command interface.",
            "stars": "Portfolio",
            "forks": "Interactive",
            "stack": ["HTML", "CSS", "JavaScript"],
            "link": "https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume",
        },
    ],
    "contact": {
        "email": "harkarshaurya@gmail.com",
        "github": "https://github.com/harkarshaurya-eng",
        "linkedin": "https://linkedin.com/in/shaurya-harkar",
        "cta": "Open to CEH internship and beginner cybersecurity opportunities.",
    },
    "metadata": {
        "last_updated": datetime.now().strftime("%Y-%m-%d"),
        "terminal_label": "shaurya@ceh-intern",
    },
}


def main():
    output_path = os.path.join(os.path.dirname(__file__), "data.json")
    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(RESUME_DATA, file, indent=2)
    print(f"Built resume dataset into: {output_path}")


if __name__ == "__main__":
    main()
