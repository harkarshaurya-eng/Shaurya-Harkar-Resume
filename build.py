import urllib.request
import json
import os
from datetime import datetime

GITHUB_USERNAME = "harkarshaurya-eng"
API_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"

# Define the precise fallback structural data in case of API failure or ratelimiting
RESUME_DATA = {
    "about": {
        "name": "Shaurya Harkar",
        "title": "Senior Software Architect & Systems Engineer",
        "bio": "Passionate about building highly-optimized, globally scaled architectural systems. Experienced in C++, Node.js, and bare-metal integrations.",
        "location": "Remote / Global"
    },
    "skills": [
        {"category": "Core Languages", "items": ["C++", "Python", "JavaScript/TypeScript", "Rust"]},
        {"category": "Systems & Cloud", "items": ["Node.js", "Docker", "AWS", "CMake", "Linux/WSL", "Git"]},
        {"category": "Frameworks", "items": ["React", "Ink", "FTXUI", "Next.js", "Flutter"]},
    ],
    "experience": [
        {
            "role": "Senior Software Architect",
            "company": "Tech Innovations Inc.",
            "duration": "2023 - Present",
            "bullets": [
                "Architected a scalable, multi-threaded C++ microservice backend handling 10k+ requests per second.",
                "Decreased AWS cloud expenditure by 40% through strict container optimization and caching matrices."
            ]
        },
        {
            "role": "Software Developer Intern",
            "company": "Global Systems LLC",
            "duration": "2022 - 2023",
            "bullets": [
                "Engineered cross-platform automated testing suites for the flagship ESP32 IoT application.",
                "Collaborated with senior engineers to migrate legacy React pipelines to Next.js."
            ]
        }
    ],
    "education": [
        {
            "degree": "B.S. in Computer Science",
            "university": "University of Technology",
            "year": "2020 - 2024",
            "details": "Specialization in Systems Engineering and Distributed Computing. GPA: 3.9/4.0"
        }
    ],
    "projects": [
        {
            "name": "ESP32 Emulator",
            "description": "A high-performance C++ Emulator mapping real-world physical pin instructions to virtual execution engines.",
            "stars": "Loading...",
            "forks": "Loading..."
        },
        {
            "name": "Algorand App",
            "description": "Decentralized state-machine smart contract framework heavily bridging web3 cryptography.",
            "stars": "Loading...",
            "forks": "Loading..."
        },
        {
            "name": "WhatsApp Bot",
            "description": "An autonomous AI triage integration designed to manage thousands of concurrent message requests via dynamic queues.",
            "stars": "Loading...",
            "forks": "Loading..."
        }
    ],
    "contact": {
        "email": "shaurya@example.com",
        "github": "https://github.com/harkarshaurya-eng",
        "linkedin": "https://linkedin.com/in/shaurya-harkar"
    },
    "metadata": {
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
}

def fetch_github_stats():
    print("Fetching live repository stats from GitHub...")
    try:
        req = urllib.request.Request(API_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                
                # Match projects by fuzzy name logic
                for repo in data:
                    repo_name = repo.get("name", "").lower()
                    for proj in RESUME_DATA["projects"]:
                        # Soft match for Algorand, WhatsApp, etc.
                        if proj["name"].lower().split()[0] in repo_name:
                            proj["stars"] = str(repo.get("stargazers_count", 0))
                            proj["forks"] = str(repo.get("forks_count", 0))
                print("Successfully synced GitHub statistics!")
            else:
                print(f"Warning: GitHub API returned {response.status}. Using fallback static data.")
    except Exception as e:
        print(f"Failed to reach GitHub API: {e}. Using fallback static data.")

def fetch_profile_photo():
    print("Downloading local visual profile artifacts...")
    photo_url = f"https://avatars.githubusercontent.com/{GITHUB_USERNAME}"
    output_path = os.path.join(os.path.dirname(__file__), "profile.jpg")
    try:
        urllib.request.urlretrieve(photo_url, output_path)
    except Exception as e:
        print(f"Skipping profile image: {e}")

def main():
    fetch_github_stats()
    # fetch_profile_photo() Disabled to preserve custom user-uploaded portrait
    
    output_path = os.path.join(os.path.dirname(__file__), "data.json")
    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(RESUME_DATA, file, indent=2)
    print(f"Built resume dataset natively into: {output_path}")

if __name__ == "__main__":
    main()
