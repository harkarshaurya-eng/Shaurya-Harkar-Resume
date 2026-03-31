import json
import os
from datetime import datetime

RESUME_DATA = {
    "about": {
        "name": "Shaurya Harkar",
        "title": "Flutter Developer & Machine Learning Enthusiast",
        "tagline": "Building high-performance mobile apps and intelligent systems with a focus on clean design and real-world impact.",
        "bio": "I develop scalable Flutter applications with smooth UI/UX and integrate machine learning to create smart, responsive products. My work combines strong product intuition with solid engineering, turning ideas into fast, reliable, and user-focused applications.",
        "location": "India / Remote",
        "availability": "Available for freelance, contract, and full-time opportunities.",
        "highlights": [
            "Terminal-inspired interfaces with strong visual direction",
            "End-to-end delivery from UI systems to backend integration",
            "Performance-minded builds focused on clarity and maintainability"
        ]
    },
    "stats": [
        {"label": "Focus", "value": "Flutter applications, AI integration for problem solving"},
        {"label": "Stack", "value": "React + Node"}
    ],
    "skills": [
        {
            "category": "Core Skills",
            "items": [
                "Flutter (Dart) Developer",
                "Supabase",
                "Algorand",
                "Python",
                "C/C++",
                "Business Problem Solving",
                "Bug Bounty Hunter",
                "Training Local AIs",
                "AI Integration in Flutter Applications"
            ]
        }
    ],
    "experience": [
        {
            "role": "Lead Full-Stack Developer",
            "company": "Tech Innovations Inc.",
            "duration": "2023 - Present",
            "summary": "Leading product delivery across interface design, frontend architecture, and scalable service integrations.",
            "bullets": [
                "Designed and shipped responsive product surfaces that improved usability across desktop and mobile workflows.",
                "Built Node.js service layers and reusable frontend patterns that accelerated delivery across multiple releases.",
                "Turned complex product requirements into clean implementation plans with a strong focus on maintainable systems."
            ],
            "stack": ["React", "Node.js", "AWS", "Design Systems"]
        }
    ],
    "education": [
        {
            "degree": "BTech Computer Engineering",
            "university": "Pimpri Chinchwad College Of Engineering, Akurdi",
            "year": "2025 - 2029",
            "details": ""
        }
    ],
    "hobbies": [
        {
            "name": "Reading Books",
            "detail": "Enjoy exploring thoughtful writing and ideas through books.",
            "note": "Recent read: The Modest Proposal"
        },
        {
            "name": "Coding In Dart",
            "detail": "Spend free time building with Dart and sharpening application logic through hands-on coding.",
            "note": "Preferred for experimenting with app ideas and clean implementation patterns."
        }
    ],
    "projects": [
        {
            "name": "StudyGrasp",
            "description": "A learning app based on a time-constrained forced-learning technique to help students memorize faster and more efficiently.",
            "outcome": "Combines an integrated AI chatbot helper named Suresh with a timetable-based lecture notification system to keep study sessions structured and responsive.",
            "stars": "Flutter App",
            "forks": "AI Learning System",
            "stack": ["Flutter", "Dart", "AI Chatbot", "Notifications"]
        },
        {
            "name": "Netfree Pay",
            "description": "A working simulation of an offline UPI payment system built around tokenization and after-sync transaction handling for low-connectivity environments.",
            "outcome": "The model captures payment intents offline, verifies them through secure token flows, and syncs them once connectivity returns. It was designed with layered safeguards including bcrypt-based credential protection, AES-256 encryption, SHA-256 hashing, and additional validation checks to keep payment data dependable and secure.",
            "stars": "Offline Fintech",
            "forks": "Working Prototype",
            "stack": ["Tokenization", "Offline Sync", "UPI Simulation", "bcrypt", "AES-256", "SHA-256"]
        },
        {
            "name": "Resume Terminal",
            "description": "A cinematic resume website that presents professional experience inside a custom terminal-inspired interface.",
            "outcome": "Transforms a standard resume into an immersive portfolio presentation with strong personal branding.",
            "stars": "Featured",
            "forks": "UI Case Study",
            "stack": ["HTML", "CSS", "JavaScript"],
            "link": "https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume"
        },
        {
            "name": "Algorand App",
            "description": "A decentralized application concept focused on stateful workflows, cryptographic interactions, and clear user flows.",
            "outcome": "Explores blockchain product UX with a stronger emphasis on accessibility and structured frontend patterns.",
            "stars": "Web3",
            "forks": "Product Build",
            "stack": ["React", "Web3", "Smart Contracts"]
        },
        {
            "name": "WhatsApp Bot",
            "description": "An automation-first messaging workflow designed to triage requests, coordinate queues, and reduce manual overhead.",
            "outcome": "Improves response handling through systemized message routing and backend orchestration.",
            "stars": "Automation",
            "forks": "Backend System",
            "stack": ["Node.js", "APIs", "Queueing"]
        }
    ],
    "contact": {
        "email": "harkarshaurya@gmail.com",
        "github": "https://github.com/harkarshaurya-eng",
        "linkedin": "https://linkedin.com/in/shaurya-harkar",
        "cta": "Open for collaborations where strong design and dependable engineering need to work together."
    },
    "metadata": {
        "last_updated": datetime.now().strftime("%Y-%m-%d"),
        "terminal_label": "shaurya@resume-terminal"
    }
}


def main():
    output_path = os.path.join(os.path.dirname(__file__), "data.json")
    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(RESUME_DATA, file, indent=2)
    print(f"Built resume dataset into: {output_path}")


if __name__ == "__main__":
    main()
