import React, {useState, useEffect} from "react";
import NavbarCss from './navbar.css'
import {Link} from "react-scroll"
import {FaVideo} from "react-icons/fa"

function Navbar() {
    const [scroll, setScroll] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegistry, setShowRegistry] = useState(false)
    const [inputName, setInputName] = useState("")
    const [inputCity, setInputCity] = useState("")

    let cinemas = [
        {name: "cinema1", city: "city1"},
        {name: "colorcinema", city: "gdansk"},
        {name: "starsCinema", city: "cracov"},
        {name: "heavenCInema", city: "warsaw"},
        {name: "lassa", city: "posen"},
    ]

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

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.className === 'cinema-name-input') {
            setInputName(e.target.value)
        } else {
            setInputCity(e.target.value)
        }
    }

    if (inputName.length > 0) {
        cinemas = cinemas.filter((i) => {
            return i.name.match(inputName);
        })
    }

    if (inputCity.length > 0) {
        cinemas = cinemas.filter((i) => {
            return i.city.match(inputCity);
        })
    }

    return (
        <header>
            <nav>
                <ul className={`navbar ${scroll && 'sticky'}`}>
                    <ul className="navbar-options">
                        <li className="navbarItem font-link"><Link to="about-us-section" spy={true} smooth={true}
                                                                   offset={-60} duration={500}>
                            <a href="">About us</a></Link></li>
                        <li className="navbarItem font-link"><Link activeClass="active" to="contact-us-section"
                                                                   spy={true} smooth={true} offset={-60}
                                                                   duration={500}>
                            <a href="">Contact</a></Link></li>
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
                <h1>Find cinema and book ticket.</h1>
                <h3>Search among dozens of cinemas.</h3>
                <form action="" className="find-cinema">
                    <input className={'cinema-name-input'} type="search" placeholder="cinema name"
                           onChange={handleChange} value={inputName}/>
                    <input className={'cinema-city-input'} type="search" placeholder="city"
                           onChange={handleChange} value={inputCity}/>
                    <input type="submit" value="search"/>
                </form>
                <div className='search-boxes'>
                    <div className={`search-cinema-name ${inputName.length === 0 ? 'disappear' : ''}`}>{
                        cinemas.map((cinema, index) => {
                            return (
                                <ul>
                                    <li className={'font-link'} key={index}>
                                        <span className={'icon-small'}><FaVideo/></span>{cinema.name}
                                    </li>
                                </ul>
                            )
                        })
                    }
                    </div>
                    <div className={`search-cinema-city ${inputCity.length === 0 ? 'disappear' : ''}`}>
                        {
                            cinemas.map((cinema, index) => {
                                return (
                                    <ul>
                                        <li className={'font-link'} key={index}>
                                            {cinema.city}
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar