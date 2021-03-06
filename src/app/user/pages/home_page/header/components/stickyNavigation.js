import React, {useContext, useEffect, useState} from "react";
import StickyNavigationCss from "../styles/stickyNavigation.scss"
import {Link} from "react-scroll";
import {Link as LinkTo} from "react-router-dom"
import {DataContext} from "../../../../../utils/store/appContext";
import useWindowSize from "../../../../../utils/hooks/useWindowSize";

const StickyNavigation = () => {
    const [isSticky, setIsSticky] = useState(false)
    const {authContextValue} = useContext(DataContext)
    const size = useWindowSize()

    const handleScroll = () => {
        if (window.scrollY > 120) {
            if (!isSticky) {
                setIsSticky(true)
            }
        } else {
            if (isSticky) {
                setIsSticky(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    return (
        <div>
            {
                (isSticky || size.width <= 1050) &&
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
                                      duration={500}>
                                    <a href="" className="sticky__navigation__link"
                                       onClick={() => setIsSticky(!isSticky)}>How it works</a>
                                </Link>
                            </li>

                            {
                                !authContextValue.isLoggedIn ?
                                    <li className="sticky__navigation__item">
                                        <a href="" className="sticky__navigation__link"
                                           onClick={() => setIsSticky(!isSticky)}>Log in</a>
                                    </li>
                                    :
                                    <li className="sticky__navigation__item">
                                        <LinkTo to="/my-account">
                                            <a href="" className="sticky__navigation__link"
                                               onClick={() => {setIsSticky(!isSticky)}}>My account
                                            </a>
                                        </LinkTo>
                                    </li>

                            }

                            <li className="sticky__navigation__item">
                                <Link to="about-us-section"
                                      spy={true} smooth={true}
                                      offset={-60}
                                      duration={500}>
                                    <a href="" className="sticky__navigation__link"
                                       onClick={() => setIsSticky(!isSticky)}>About us</a>
                                </Link>
                            </li>

                            <li className="sticky__navigation__item">
                                <Link to="reviews-section"
                                      spy={true} smooth={true}
                                      offset={-60}
                                      duration={500}>
                                    <a href="" className="sticky__navigation__link"
                                       onClick={() => setIsSticky(!isSticky)}>Reviews</a>
                                </Link>
                            </li>

                            <li className="sticky__navigation__item">
                                <li className="sticky__navigation__item">
                                    <Link to="contact-us-section"
                                          spy={true} smooth={true}
                                          offset={-60}
                                          duration={500}>
                                        <a href="" className="sticky__navigation__link"
                                           onClick={() => setIsSticky(!isSticky)}>Contact</a>
                                    </Link>
                                </li>
                            </li>

                            {
                                authContextValue.isLoggedIn &&
                                <li className="sticky__navigation__item">
                                    <li className="sticky__navigation__item">
                                        <a href="" className="sticky__navigation__link"
                                           onClick={() => {
                                               setIsSticky(!isSticky)
                                               authContextValue.logout()
                                           }}>Logout</a>
                                    </li>
                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            }
        </div>
    );
}

export default StickyNavigation