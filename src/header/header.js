import React, {useState, useEffect, useContext} from "react";
import {useForm} from "react-hook-form"
import HeaderCss from './header.css'
import {Link} from "react-scroll"
import {Link as LinkRouter, Route, useHistory} from "react-router-dom"
import {FaVideo, FaGlobe} from "react-icons/fa"
import CinemasList from "../cinema_list/cinemaList";
import {DataContext} from "../data_transfer/dataManager";
import StepsSection from "../steps_section/stepsSection";
import AboutUsSection from "../about_us_section/aboutUsSection";
import Reviews from "../reviews_section/reviews";
import Contact from "../contact_section/contact";

function Header() {
    return (
        <div>
            <header>
                <Navigation/>
                <WebStart/>
            </header>
            <StepsSection/>
            <AboutUsSection/>
            <Reviews/>
            <Contact/>
        </div>
    )
}

const Navigation = () => {
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
        <div>
            <nav>
                <ul className={`navbar ${scroll && 'sticky'}`}>
                    <ul className="navbar-options">
                        <li className="navbarItem font-link">
                            <Link to="about-us-section" spy={true} smooth={true}
                                  offset={-60} duration={500}>
                                <a href="">About us</a>
                            </Link></li>
                        <li className="navbarItem font-link">
                            <Link activeClass="active" to="contact-us-section"
                                  spy={true} smooth={true} offset={-60}
                                  duration={500}>
                                <a href="">Contact</a>
                            </Link></li>
                    </ul>
                    <ul className="navbar-info">
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
                    <span><div className="logo"><a href="#">CinemaFactory</a></div></span>
                </ul>
            </nav>
            <div>
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
            </div>
        </div>
    )
}

const WebStart = () => {
    const {updateState} = useContext(DataContext);
    const history = useHistory();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [hasFocus, setFocus] = useState({name: false, city: false})


    let cinemas = [
        {name: "Cinema Under The Stars", city: "Poznan"},
        {name: "Cinema Under The Stars", city: "Warsaw"},
        {name: "Mind", city: "Warsaw"},
        {name: "CinemaStreet", city: "Cracov"},
        {name: "Heaven", city: "Poznan"},
        {name: "Dream", city: "Gdansk"},
    ]

    const handleChange = e => {
        e.preventDefault()
        if (e.target.className === 'cinema-name-input') {
            setName(e.target.value)
        }
        if (e.target.className === 'cinema-city-input') {
            setCity(e.target.value)
        }
    }

    if (name.length > 0) {
        cinemas = cinemas.filter((i) => {
            return i.name.toLowerCase().match(name.toLowerCase());
        })
    }

    if (city.length > 0) {
        cinemas = cinemas.filter((i) => {
            return i.city.toLowerCase().match(city.toLowerCase());
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateState({
            name: name,
            city: city
        });
        history.push("/cinema-list");
    };

    return (
        <div>
            <div className="webstart-page">
                <h1>Find cinema and book ticket.</h1>
                <h3>Search among dozens of cinemas.</h3>
                <form className="find-cinema" onSubmit={handleSubmit}>
                    <input className={'cinema-name-input'}
                           type="search"
                           placeholder="cinema name"
                           onChange={handleChange}
                           onFocus={() => {
                               setFocus({name: true})
                           }}
                           onBlur={() => setFocus({name: false})}
                           value={name}
                    />
                    <input className={'cinema-city-input'}
                           type="search"
                           placeholder="city"
                           onChange={handleChange}
                           onFocus={() => {
                               setFocus({city: true})
                           }}
                           onBlur={() => setFocus({city: false})}
                           value={city}
                    />
                    <input type="submit"
                           value="search"/>
                </form>
                <div className='search-boxes'>
                    <div
                        className={`search-cinema-name ${name.length === 0 && !hasFocus.name ? 'disappear' : ''}`}>
                        <ul>
                            {
                                cinemas.map((cinema, index) => {
                                    return (
                                        <li className={'font-link'}
                                            key={index}
                                            onClick={() => {
                                                setName(cinema.name)
                                            }}
                                        >
                                            <span className={'icon-small'}><FaVideo/></span>
                                            {cinema.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div
                        className={`search-cinema-city ${city.length === 0 && !hasFocus.city ? 'disappear' : ''}`}>
                        <ul>
                            {
                                cinemas.map((cinema, index) => {
                                    return (
                                        <li className={'font-link'}
                                            key={index}
                                            onClick={() => setCity(cinema.city)}
                                        >
                                            <span className={'icon-small'}><FaGlobe/></span>
                                            {cinema.city}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header