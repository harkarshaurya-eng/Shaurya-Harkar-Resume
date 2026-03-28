#!/usr/bin/env node
import React, { useState, useEffect } from "react";
import { render, Box, Text, Spacer, Newline } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import gradient from "gradient-string";
import terminalImage from "terminal-image";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rawData = fs.readFileSync(path.join(__dirname, "../data.json"), "utf8");
const resumeData = JSON.parse(rawData);
const cyberpunkGradient = gradient(["#ff00ff", "#00ffff"]);
const AboutSection = () => /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", paddingLeft: 2 }, /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, "Name: ", /* @__PURE__ */ React.createElement(Text, { color: "white" }, resumeData.about.name)), /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, "Title: ", /* @__PURE__ */ React.createElement(Text, { color: "white" }, resumeData.about.title)), /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, "Location: ", /* @__PURE__ */ React.createElement(Text, { color: "white" }, resumeData.about.location)), /* @__PURE__ */ React.createElement(Newline, null), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, resumeData.about.bio));
const SkillsSection = () => /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", paddingLeft: 2 }, resumeData.skills.map((skillGroup) => /* @__PURE__ */ React.createElement(Box, { key: skillGroup.category, flexDirection: "column", marginBottom: 1 }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: "cyan" }, skillGroup.category, ":"), /* @__PURE__ */ React.createElement(Text, { color: "white" }, "  ", skillGroup.items.join(" \u2022 ")))));
const ExperienceSection = () => /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", paddingLeft: 2 }, resumeData.experience.map((exp) => /* @__PURE__ */ React.createElement(Box, { key: exp.company, flexDirection: "column", marginBottom: 1 }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: "blueBright" }, exp.role, " ", /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "@ ", exp.company)), /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, "[", exp.duration, "]"), exp.bullets.map((bullet, i) => /* @__PURE__ */ React.createElement(Text, { key: i, color: "white" }, "  \u2022 ", bullet)))));
const EducationSection = () => /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", paddingLeft: 2 }, resumeData.education.map((edu) => /* @__PURE__ */ React.createElement(Box, { key: edu.degree, flexDirection: "column", marginBottom: 1 }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: "greenBright" }, edu.degree), /* @__PURE__ */ React.createElement(Text, { color: "cyan" }, edu.university, " | ", edu.year), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "  ", edu.details))));
const ProjectsSection = () => /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", paddingLeft: 2 }, resumeData.projects.map((proj) => /* @__PURE__ */ React.createElement(Box, { key: proj.name, flexDirection: "column", marginBottom: 1 }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: "magentaBright" }, proj.name, " ", /* @__PURE__ */ React.createElement(Text, { color: "yellow" }, "\u2605 ", proj.stars), " ", /* @__PURE__ */ React.createElement(Text, { color: "blue" }, "\u03A8 ", proj.forks)), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "  ", proj.description))));
const ContactSection = () => /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", paddingLeft: 2 }, /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, "Email: ", /* @__PURE__ */ React.createElement(Text, { color: "white" }, resumeData.contact.email)), /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, "GitHub: ", /* @__PURE__ */ React.createElement(Text, { color: "white" }, resumeData.contact.github)), /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, "LinkedIn: ", /* @__PURE__ */ React.createElement(Text, { color: "white" }, resumeData.contact.linkedin)), /* @__PURE__ */ React.createElement(Newline, null), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "To connect or hire, please send an email. System encrypted."));
const App = () => {
  const [booting, setBooting] = useState(true);
  const [imageRendered, setImageRendered] = useState("");
  const [view, setView] = useState("about");
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2e3);
    const loadImg = async () => {
      try {
        const imgPath = path.join(__dirname, "../profile.jpg");
        if (fs.existsSync(imgPath)) {
          const img = await terminalImage.file(imgPath, {
            width: 45
          });
          setImageRendered(img);
        }
      } catch (err) {
        setImageRendered("[No Access Privileges for Visual Portrait]");
      }
    };
    loadImg();
    return () => clearTimeout(timer);
  }, []);
  if (booting) {
    return /* @__PURE__ */ React.createElement(Box, { margin: 2 }, /* @__PURE__ */ React.createElement(Text, { color: "green" }, /* @__PURE__ */ React.createElement(Spinner, { type: "aesthetic" })), /* @__PURE__ */ React.createElement(Text, { color: "cyanBright" }, " SYSTEM DIAGNOSTIC AND MODULE LOADING... "));
  }
  const items = [
    { label: "ABOUT ME", value: "about" },
    { label: "EXPERIENCE LOG", value: "experience" },
    { label: "PROPRIETARY PROJECTS", value: "projects" },
    { label: "TECHNICAL SKILLS", value: "skills" },
    { label: "EDUCATION ARCHIVE", value: "education" },
    { label: "COMM LINK", value: "contact" }
  ];
  const handleSelect = (item) => {
    setView(item.value);
  };
  return /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", margin: 2, padding: 1, borderStyle: "round", borderColor: "magenta" }, /* @__PURE__ */ React.createElement(Box, { flexDirection: "row", marginBottom: 1, alignItems: "flex-start" }, /* @__PURE__ */ React.createElement(Box, { marginRight: 3, borderStyle: "single", borderColor: "blue" }, /* @__PURE__ */ React.createElement(Text, null, imageRendered)), /* @__PURE__ */ React.createElement(Box, { flexDirection: "column", flexGrow: 1, justifyContent: "center", paddingTop: 1 }, /* @__PURE__ */ React.createElement(Text, { bold: true }, cyberpunkGradient("SHAURYA HARKAR // LEVEL 99 ARCHITECT")), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "System Status: SECURE. Offline rendering complete."), /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "Data Last Synced: ", resumeData.metadata.last_updated))), /* @__PURE__ */ React.createElement(Box, { flexDirection: "row" }, /* @__PURE__ */ React.createElement(Box, { width: "35%", flexDirection: "column", paddingRight: 2, borderStyle: "single", borderColor: "cyan", borderRight: true, borderTop: false, borderBottom: false, borderLeft: false }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: "cyanBright", marginBottom: 1 }, "[ ROOT MENU ]"), /* @__PURE__ */ React.createElement(SelectInput, { items, onSelect: handleSelect })), /* @__PURE__ */ React.createElement(Box, { width: "65%", paddingLeft: 2, flexDirection: "column" }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: "magentaBright", marginBottom: 1 }, "[ DATABASE : ", view.toUpperCase(), " ]"), view === "about" && /* @__PURE__ */ React.createElement(AboutSection, null), view === "experience" && /* @__PURE__ */ React.createElement(ExperienceSection, null), view === "education" && /* @__PURE__ */ React.createElement(EducationSection, null), view === "skills" && /* @__PURE__ */ React.createElement(SkillsSection, null), view === "projects" && /* @__PURE__ */ React.createElement(ProjectsSection, null), view === "contact" && /* @__PURE__ */ React.createElement(ContactSection, null))), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Box, { marginTop: 1 }, /* @__PURE__ */ React.createElement(Text, { color: "gray" }, "Use [UP/DOWN] arrows to navigate. [CTRL+C] to Exit.")));
};
render(/* @__PURE__ */ React.createElement(App, null));
