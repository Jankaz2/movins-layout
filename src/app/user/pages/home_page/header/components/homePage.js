import React, {useContext, useEffect, useState} from "react";
import HeaderCss from '../styles/header.scss'
import MainScss from '../../../../../styles/scss/main.scss'
import {useHistory} from "react-router-dom";
import {Link} from "react-scroll"
import StepsSection from "../../steps_section/components/stepsSection";
import AboutUsSection from "../../about_us_section/components/aboutUsSection";
import Reviews from "../../reviews_section/components/reviews";
import Contact from "../../contact_section/components/contact";
import {DataContext} from "../../../../../utils/store/appContext";
import StickyNavigation from "./stickyNavigation";
import LoginBox from "../../../login/components/loginBox";
import WebStart from "./webStart";
import {AiOutlineLogout} from 'react-icons/ai'

function HomePage() {
    const {authContextValue} = useContext(DataContext)

    return (
        <div>
            <StickyNavigation/>
            {!authContextValue.isLoggedIn && <LoginBox/>}
            <header className='header'>
                <Navigation/>
                <WebStart/>
            </header>
            <AboutUsSection/>
            <StepsSection/>
            <Reviews/>
            <Contact/>
        </div>
    )
}

const Navigation = () => {
    const [logoutStatement, setLogoutStatement] = useState(false)

    const {setLoginBox, authContextValue} = useContext(DataContext)
    const history = useHistory()
    const token = localStorage.getItem('token')

    const parseJwt = (token) => {
        if (!token) {
            return;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    useEffect(() => {
        if (token !== null) {
            const decodedToken = parseJwt(authContextValue.token)
            localStorage.setItem('id', decodedToken.sub)
            authContextValue.setId(decodedToken.sub)
        }
    })

    const goToMyAccount = e => {
        history.push("/my-account")
    }

    return (
        <div>
            <nav>
                <ul className='header__navbar'>
                    <span><div className="header__logo"><a href="#">MOVINS</a></div></span>
                    {
                        authContextValue.isLoggedIn &&
                        <li className="header__navbar--item log-out-link"
                            onClick={() => setLogoutStatement(true)}
                        ><AiOutlineLogout/>
                        </li>
                    }
                    <li className="header__navbar--item">
                        <Link to="about-us-section"
                              spy={true} smooth={true}
                              offset={-60}
                              duration={500}>
                            <a href="">About us</a>
                        </Link>
                    </li>

                    <li className="header__navbar--item">
                        <Link to="reviews-section"
                              spy={true} smooth={true}
                              offset={-60}
                              duration={500}>
                            <a href="">Reviews</a>
                        </Link>
                    </li>

                    <li className="header__navbar--item">
                        <Link activeClass="active"
                              to="contact-us-section"
                              spy={true}
                              smooth={true}
                              offset={-60}
                              duration={500}>
                            <a href="">Contact</a>
                        </Link>
                    </li>
                    {
                        !authContextValue.isLoggedIn &&
                        <li className="header__navbar--item log-in-link"
                            onClick={(event) => {
                                setLoginBox(true)
                                event.preventDefault()
                            }}>
                            <a href="">Log in</a>
                        </li>
                    }
                    {
                        authContextValue.isLoggedIn &&
                        <li className="header__navbar--item log-in-link"
                            onClick={goToMyAccount}
                        >
                            <a href="">My account</a>
                        </li>
                    }
                    <li className="header__navbar--item">
                        <Link activeClass="active"
                              to="steps-section"
                              spy={true}
                              smooth={true}
                              offset={-60}
                              duration={500}>
                            <a href="">How it works</a>
                        </Link>
                    </li>
                </ul>
                {
                    logoutStatement &&
                    <div className='logout-statement statement'>
                            <span className='statement--close'
                                  onClick={() => {
                                      setLogoutStatement(false)
                                  }}
                            >&#10005;</span>
                        <p className='statement__text'>Do you really wanna logout?</p>
                        <div className='statement__buttons'>
                            <button className="statement__buttons--yes"
                                    onClick={() => {
                                        authContextValue.logout()
                                        setLogoutStatement(false)
                                    }}>Yes
                            </button>
                        </div>
                    </div>
                }
            </nav>
        </div>
    )
}

export default HomePage