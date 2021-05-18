import React, {useState, useEffect} from "react";
import NavbarCss from './navbar.css'
import {Link} from "react-scroll"

function Navbar() {
    const [scroll, setScroll] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegistry, setShowRegistry] = useState(false)

    const handleScroll = () => {
        if (window.pageYOffset > 90) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    return (
        <header>
            <nav>
                <ul className={`navbar ${scroll && 'sticky'}`}>
                    <ul className="navbar-options">
                        <li className="navbarItem font-link"><a href="">Show films</a></li>
                        <li className="navbarItem font-link"><a href="">Buy ticket</a></li>
                        <li className="navbarItem font-link"><a href="">Find cinema</a></li>
                    </ul>
                    <ul className="navbar-info">
                        <li className="navbarItem font-link"><Link activeClass="active" to="contact-us-section"
                                                                   spy={true} smooth={true} offset={-60}
                                                                   duration={500}>
                            <a href="">Contact</a></Link></li>
                        <li className="navbarItem font-link"><Link to="about-us-section" spy={true} smooth={true}
                                                                   offset={-60} duration={500}>
                            <a href="">About us</a></Link></li>
                        <li className="navbarItem font-link log-in-link"><a href="" onClick={(event) => {
                            setShowLogin(!showLogin)
                            if (showRegistry) {
                                setShowRegistry(!showRegistry)
                            }
                            event.preventDefault()
                        }}>Log in</a></li>
                        <li className="navbarItem font-link sign-up-link"><a href="" onClick={(event) => {
                            setShowRegistry(!showRegistry)
                            if (showLogin) {
                                setShowLogin(!showLogin)
                            }
                            event.preventDefault()
                        }}>Sign up</a></li>
                    </ul>
                    <span><div className="logo"><a href="#">cinema</a></div></span>
                </ul>
            </nav>
            {
                showLogin &&
                <div className="login-box">
                    <form>
                        <input type="text" placeholder="login"/>
                        <input type="password" placeholder="password"/>
                        <input type="submit" value="Log in"/>
                    </form>
                </div>
            }
            {
                showRegistry &&
                <div className="signup-box">
                    <form>
                        <input type="name" placeholder="Name"/>
                        <input type="text" placeholder="Surname"/>
                        <input type="email" placeholder="e-mail"/>
                        <input type="number" placeholder="phone number"/>
                        <input type="password" placeholder="password"/>
                        <input type="password" placeholder="repeat password"/>
                        <input type="submit" value="Sign in"/>
                    </form>
                </div>
            }
            <div className="webstart-page">
                <h2>Cinema is not only about making people dream.
                    <br/>&nbsp;&nbsp;&nbsp;It's about changing things and making people think.
                </h2>
            </div>
            <button className="show-more"><Link activeClass="active" to="steps-section" spy={true} smooth={true}
                                                offset={-60} duration={500}>
                <a href="">Show more</a>
            </Link></button>
        </header>
    )
}

export default Navbar