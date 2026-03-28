#!/usr/bin/env node

import React, { useState, useEffect } from 'react';
import { render, Box, Text, Spacer, Newline } from 'ink';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import gradient from 'gradient-string';
import terminalImage from 'terminal-image';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the compiled static data
const rawData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
const resumeData = JSON.parse(rawData);

// Cyberpunk theme gradient
const cyberpunkGradient = gradient(['#ff00ff', '#00ffff']);

// Sub-components for each section
const AboutSection = () => (
    <Box flexDirection="column" paddingLeft={2}>
        <Text color="cyanBright">Name: <Text color="white">{resumeData.about.name}</Text></Text>
        <Text color="cyanBright">Title: <Text color="white">{resumeData.about.title}</Text></Text>
        <Text color="cyanBright">Location: <Text color="white">{resumeData.about.location}</Text></Text>
        <Newline />
        <Text color="gray">{resumeData.about.bio}</Text>
    </Box>
);

const SkillsSection = () => (
    <Box flexDirection="column" paddingLeft={2}>
        {resumeData.skills.map(skillGroup => (
            <Box key={skillGroup.category} flexDirection="column" marginBottom={1}>
                <Text bold color="cyan">{skillGroup.category}:</Text>
                <Text color="white">  {skillGroup.items.join(' • ')}</Text>
            </Box>
        ))}
    </Box>
);

const ProjectsSection = () => (
    <Box flexDirection="column" paddingLeft={2}>
        {resumeData.projects.map(proj => (
            <Box key={proj.name} flexDirection="column" marginBottom={1}>
                <Text bold color="magentaBright">{proj.name} <Text color="yellow">★ {proj.stars}</Text> <Text color="blue">Ψ {proj.forks}</Text></Text>
                <Text color="gray">  {proj.description}</Text>
            </Box>
        ))}
    </Box>
);

const ContactSection = () => (
    <Box flexDirection="column" paddingLeft={2}>
        <Text color="cyanBright">Email: <Text color="white">{resumeData.contact.email}</Text></Text>
        <Text color="cyanBright">GitHub: <Text color="white">{resumeData.contact.github}</Text></Text>
        <Text color="cyanBright">LinkedIn: <Text color="white">{resumeData.contact.linkedin}</Text></Text>
        <Newline />
        <Text color="gray">To connect or hire, please send an email. System encrypted.</Text>
    </Box>
);

const App = () => {
    const [booting, setBooting] = useState(true);
    const [imageRendered, setImageRendered] = useState("");
    const [view, setView] = useState('about');

    useEffect(() => {
        // Run diagnostic boot animation
        const timer = setTimeout(() => {
            setBooting(false);
        }, 2000);

        // Try to load the profile picture fallback as ANSI graphics
        const loadImg = async () => {
            try {
                const imgPath = path.join(__dirname, 'profile.jpg');
                if (fs.existsSync(imgPath)) {
                    // Instruct terminalImage to render tightly bounding box sizes 
                    // so it doesn't break the CSS-like flex layouts in Ink.
                    const ascii = await terminalImage.file(imgPath, { width: '30%', preserveAspectRatio: true });
                    setImageRendered(ascii);
                }
            } catch (err) {
                setImageRendered("[No Access Privileges for Visual Portrait]");
            }
        };

        loadImg();
        return () => clearTimeout(timer);
    }, []);

    if (booting) {
        return (
            <Box margin={2}>
                <Text color="green">
                    <Spinner type="aesthetic" />
                </Text>
                <Text color="cyanBright"> SYSTEM DIAGNOSTIC AND MODULE LOADING... </Text>
            </Box>
        );
    }

    const items = [
        { label: 'ABOUT ME', value: 'about' },
        { label: 'PROPRIETARY PROJECTS', value: 'projects' },
        { label: 'TECHNICAL SKILLS', value: 'skills' },
        { label: 'COMM LINK', value: 'contact' },
    ];

    const handleSelect = (item) => {
        setView(item.value);
    };

    return (
        <Box flexDirection="column" margin={2} padding={1} borderStyle="round" borderColor="magenta">
            {/* Header: Picture + Name */}
            <Box flexDirection="row" marginBottom={1}>
                <Box width="30%" marginRight={2}>
                    <Text>{imageRendered}</Text>
                </Box>
                <Box flexDirection="column" flexGrow={1} justifyContent="center">
                    <Text bold>{cyberpunkGradient("SHAURYA HARKAR // LEVEL 99 ARCHITECT")}</Text>
                    <Text color="gray">System Status: SECURE. Offline rendering complete.</Text>
                    <Text color="gray">Data Last Synced: {resumeData.metadata.last_updated}</Text>
                </Box>
            </Box>

            {/* Split view: Nav on left, Content on right */}
            <Box flexDirection="row">
                <Box width="35%" flexDirection="column" paddingRight={2} borderStyle="single" borderColor="cyan" borderRight={true} borderTop={false} borderBottom={false} borderLeft={false}>
                    <Text bold color="cyanBright" marginBottom={1}>[ ROOT MENU ]</Text>
                    <SelectInput items={items} onSelect={handleSelect} />
                </Box>
                
                <Box width="65%" paddingLeft={2} flexDirection="column">
                    <Text bold color="magentaBright" marginBottom={1}>[ DATABASE : {view.toUpperCase()} ]</Text>
                    {view === 'about' && <AboutSection />}
                    {view === 'skills' && <SkillsSection />}
                    {view === 'projects' && <ProjectsSection />}
                    {view === 'contact' && <ContactSection />}
                </Box>
            </Box>
            
            <Spacer />
            
            <Box marginTop={1}>
                <Text color="gray">Use [UP/DOWN] arrows to navigate. [CTRL+C] to Exit.</Text>
            </Box>
        </Box>
    );
};

// Mount the React Application to stdout
render(<App />);
