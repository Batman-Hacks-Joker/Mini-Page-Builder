import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import GitHubIcon from '@mui/icons-material/GitHub';
import "./DarkMode.css";
const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark");
    };

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light");
    };

    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    };

    useEffect(() => {
        const selectedTheme = localStorage.getItem("selectedTheme");
        if (selectedTheme === 'dark') {
            setDarkMode();
        }
    }, []); 

 const handleGitHubClick = () => {
        window.open("https://github.com/Batman-Hacks-Joker", "_blank");
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={localStorage.getItem("selectedTheme") === "dark"} 
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
            
            <button className="GitHubButton" onClick={handleGitHubClick}
            title="Find Me Here">
                <GitHubIcon style={{ marginRight: 8 }} />
                fanatiAKS
            </button> 
        </div>
    );
};

export default DarkMode;
