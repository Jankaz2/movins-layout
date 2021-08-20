import React, {useContext} from "react";
import HeaderCss from '../styles/header.scss'
import MainScss from '../../../../../styles/scss/main.scss'
import Select from "react-select";
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
import {AiOutlineLogout} from 'react-icons/all'

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
    const {setLoginBox, authContextValue} = useContext(DataContext)
    const history = useHistory()

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
                            onClick={authContextValue.logout}
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
                              duration={500}
                              onClick={() => {
                                  console.log(authContextValue.token)
                                  console.log(authContextValue.isLoggedIn)
                              }}
                        >
                            <a href="">How it works</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            {
                window.scrollY <= 120 &&
                <div className='sticky__display'>
                    <div className='sticky__navigation'>
                        <input type="checkbox" className="sticky__navigation__checkbox" id="navi-toggle"/>
                        <label htmlFor="navi-toggle" className="sticky__navigation__button">
                            <span className="sticky__navigation__icon">&nbsp;</span>
                        </label>
                        <div className="sticky__navigation__background">&nbsp;</div>

                        <nav className="sticky__navigation__nav">
                            <ul className="sticky__navigation__list">

                                <li className="sticky__navigation__item">
                                    <Link to="steps-section"
                                          spy={true} smooth={true}
                                          offset={-60}
                                          duration={50}>
                                        <a href="" className="sticky__navigation__link">How it works</a>
                                    </Link>
                                </li>

                                {
                                    !authContextValue.isLoggedIn &&
                                    <li className="sticky__navigation__item">
                                        <a href="" className="sticky__navigation__link">Log in</a>
                                    </li>
                                }
                                <li className="sticky__navigation__item">
                                    <Link to="about-us-section"
                                          spy={true} smooth={true}
                                          offset={-60}
                                          duration={500}>
                                        <a href="" className="sticky__navigation__link">About us</a>
                                    </Link>
                                </li>

                                <li className="sticky__navigation__item">
                                    <Link to="reviews-section"
                                          spy={true} smooth={true}
                                          offset={-60}
                                          duration={500}>
                                        <a href="" className="sticky__navigation__link">Reviews</a>
                                    </Link>
                                </li>

                                <li className="sticky__navigation__item">
                                    <li className="sticky__navigation__item">
                                        <Link to="contact-us-section"
                                              spy={true} smooth={true}
                                              offset={-60}
                                              duration={500}>
                                            <a href="" className="sticky__navigation__link">Contact</a>
                                        </Link>
                                    </li>
                                </li>

                                {
                                    authContextValue.isLoggedIn &&
                                    <li className="sticky__navigation__item">
                                        <li className="sticky__navigation__item">
                                            <Link to="contact-us-section"
                                                  spy={true} smooth={true}
                                                  offset={-60}
                                                  duration={500}>
                                                <a href="" className="sticky__navigation__link"
                                                   onClick={() => {
                                                       authContextValue.logout()
                                                   }}>Logout</a>
                                            </Link>
                                        </li>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            }
        </div>
    )
}

export default HomePage