import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './navigation/navbar'
import StepsSection from "./steps_section/stepsSection";

ReactDOM.render(
    <React.StrictMode>
        <Navbar/>
        <StepsSection/>
    </React.StrictMode>,
    document.getElementById('root')
);
