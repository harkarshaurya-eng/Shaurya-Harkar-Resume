# 🚀 Shaurya Harkar - CLI Resume

[![Node.js Version](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![NPM Package](https://img.shields.io/badge/npx-shaurya--resume-blue.svg)](https://www.npmjs.com/package/shaurya-resume)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-grade, interactive terminal resume built using **React (Ink)**. This application transforms your resume into a high-performance terminal experience with Cyberpunk aesthetics, real-time GitHub integration, and native ANSI portrait rendering.

---

## ⚡ Instant Access (Recommended)
You can run the resume directly without cloning any code. 

**Requirements:** [Node.js](https://nodejs.org/) installed.

```bash
npx shaurya-resume
```

---

## 🌟 Key Features
- **Cyberpunk UI**: Vibrant terminal theme with dynamic gradients powered by `gradient-string`.
- **System Boot Sequence**: Interactive "Diagnostic" spinner simulating a futuristic login.
- **Native ANSI Portrait**: High-fidelity terminal-based image rendering (optimized for 45-cell width).
- **Static-Data Pipeline**: Built-in Python scraper (`build.py`) that pre-emptively caches your live GitHub stars and forks to ensure zero-latency.
- **Interactive Navigation**: Use your arrow keys to flick between 'About', 'Experience', 'Projects', and 'Contact' with zero flicker.

---

## 💻 Developer Setup (Build from Source)

### 1. Prerequisites
- **Node.js** (v18+)
- **Python 3** (Only for rebuilding `data.json`)
- **Modern Terminal**: (PowerShell, iTerm2, or GNOME Terminal)

### 2. Manual Installation

#### 🪟 Windows (PowerShell)
```powershell
# Clone & Enter
git clone https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume.git
cd Shaurya-Harkar-Resume

# Build & Launch
npm install
npm run build
npm start
```

#### 🍎 macOS / 🐧 Linux (Bash/Zsh)
```bash
# Clone & Enter
git clone https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume.git
cd Shaurya-Harkar-Resume

# Build & Launch
npm install
npm run build
npm start
```

---

## 🛠️ Configuration & Customization
Modify the resume behavior without touching the core React logic:

1. **Personal Information**: Edit `data.json` to update your biography, experience, and contact links.
2. **Profile Picture**: Replace `profile.jpg` in the root folder with your own headshot.
3. **Live Stats**: Run `npm run build` to pull fresh data from your GitHub repositories automatically.

---

## 🎨 Best Experience Recommendation
To ensure the Cyberpunk gradients and ANSI portrait look their best, please use:
- **Windows**: [Windows Terminal](https://aka.ms/terminal)
- **macOS**: [iTerm2](https://iterm2.com/)
- **Cross-Platform**: [Alacritty](https://alacritty.org/) or [WezTerm](https://wezfurlong.org/wezterm/)

---

## 📦 Distribution
This project is configured for global `npm` distribution. 

1. **Build**: `npm run build`
2. **Login**: `npm login`
3. **Publish**: `npm publish`

---

*Shaurya Harkar &copy; 2024*
