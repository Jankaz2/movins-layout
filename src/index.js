import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './navigation/navbar'
import StepsSection from "./steps_section/stepsSection";
import AboutUsSection from "./about_us_section/aboutUsSection";

ReactDOM.render(
    <React.StrictMode>
        <Navbar/>
        <StepsSection/>
        <AboutUsSection/>
    </React.StrictMode>,
    document.getElementById('root')
);
