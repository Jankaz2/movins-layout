import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './navigation/navbar'
import StepsSection from "./steps_section/stepsSection";
import AboutUsSection from "./about_us_section/aboutUsSection";
import Contact from "./contact_section/contact";
import Reviews from "./reviews_section/reviews";
import Footer from "./footer/footer"

ReactDOM.render(
    <React.StrictMode>
        <Navbar/>
        <StepsSection/>
        <AboutUsSection/>
        <Reviews/>
        <Contact/>
        <Footer/>
    </React.StrictMode>,
    document.getElementById('root')
);
