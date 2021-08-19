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
import {A} from "react-select/dist/index-4bd03571.esm";

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
                <ul className={`header__navbar`}>
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
        </div>
    )
}

export default HomePage