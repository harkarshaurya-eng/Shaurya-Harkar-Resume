# Shaurya Harkar - Production CLI Resume

Welcome to the source code for my interactive, React-powered (Ink) Command Line Interface Resume.

## 🚀 Architecture
- **Frontend**: `Node.js` + `React Ink` for a flicker-free, stateful terminal GUI.
- **Data Harvesting**: A bespoke `build.py` statically scrapes my live GitHub repositories and compiles them into a secure, zero-latency `data.json` package.
- **Graphics**: Real terminal image rendering via `terminal-image` with automatic fallback processing for unsupported terminal environments.

---

## 💻 Local Development & Testing

### 1. Build the Data
Before running or publishing the app, you must seed the dynamic data from GitHub.
```bash
python build.py
```
*(This will fetch live stars/forks from GitHub and download the profile image)*

### 2. Test Locally
Run the React-Ink application natively on your machine:
```bash
npm install
npm start
```

### 3. Test the NPX Global Binary
To test exactly how a third-party recruiter or user would experience the execution (`npx shaurya-resume`):
```bash
npm link
shaurya-resume
```

---

## 📦 Publishing to NPM
When you're ready to publish this to the global `npm` registry so anyone can invoke it using `npx shaurya-resume`:

1. Ensure `build.py` was run recently.
2. Login to your NPM account:
```bash
npm login
```
3. Publish identically:
```bash
npm publish
```
