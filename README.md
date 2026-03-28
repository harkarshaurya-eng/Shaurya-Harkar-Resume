# 🚀 Shaurya Harkar - CLI Resume

[![Node.js Version](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![NPM Package](https://img.shields.io/badge/npx-shaurya--resume-blue.svg)](https://www.npmjs.com/package/shaurya-resume)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-grade, interactive terminal resume built using **React (Ink)**. This application transforms your resume into a high-performance terminal experience with Cyberpunk aesthetics, real-time GitHub integration, and native ANSI portrait rendering.

---

## ⚡ Instant Run (Recommended)
Launch the resume instantly without cloning any code. 

**Requirements:** [Node.js](https://nodejs.org/) installed.

```bash
npx shaurya-resume
```

---

## 💻 Setup & Run (One-Liner)
Copy and paste the command for your operating system to clone, install, and launch the resume in one go:

### 🪟 Windows (PowerShell)
*This command checks if the folder exists, cleans it, and launches the full build.*
```powershell
if (Test-Path Shaurya-Harkar-Resume) { Remove-Item -Recurse -Force Shaurya-Harkar-Resume }; git clone https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume.git; cd Shaurya-Harkar-Resume; npm install; npm run build; npm start
```

### 🍎 macOS (Terminal / iTerm2)
```bash
git clone https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume.git && cd Shaurya-Harkar-Resume && npm install && npm run build && npm start
```

### 🐧 Linux
```bash
git clone https://github.com/harkarshaurya-eng/Shaurya-Harkar-Resume.git && cd Shaurya-Harkar-Resume && npm install && npm run build && npm start
```

---

## 🌟 Key Features
- **Cyberpunk UI**: Vibrant terminal theme with dynamic gradients.
- **Native ANSI Portrait**: Optimized high-fidelity terminal image rendering.
- **Static-Data Pipeline**: Python-driven stats caching for zero-latency execution.
- **Interactive Navigation**: Seamless transitions between 'Experience', 'Projects', and 'Contact'.

---

## 🛠️ Customization
1. **Personal Info**: Update `data.json`.
2. **Profile Photo**: Replace `profile.jpg`.
3. **Refresh Stats**: Run `npm run build` (requires Python).

---

## 📦 Distribution
1. **Build**: `npm run build`
2. **Publish**: `npm publish` (after `npm login`)

---

*Shaurya Harkar &copy; 2024*
