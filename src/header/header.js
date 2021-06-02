import React, {useState, useEffect, useContext} from "react";
import {useForm} from "react-hook-form"
import HeaderCss from './header.css'
import {Link} from "react-scroll"
import {Link as LinkRouter, Route, useHistory} from "react-router-dom"
import {FaVideo, FaGlobe, FaCaretDown} from "react-icons/fa"
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
                        <li className="navbarItem about-us-link">
                            <Link to="about-us-section" spy={true} smooth={true}
                                  offset={-60} duration={500}>
                                <a href="">About us</a>
                            </Link></li>
                        <li className="navbarItem contact-link">
                            <Link activeClass="active" to="contact-us-section"
                                  spy={true} smooth={true} offset={-60}
                                  duration={500}>
                                <a href="">Contact</a>
                            </Link></li>
                    </ul>
                    <ul className="navbar-info">
                        <li className="navbarItem font-link log-in-link">
                            <a href=""
                               onClick={(event) => {
                                   setShowLogin(!showLogin)
                                   if (showRegistry) {
                                       setShowRegistry(!showRegistry)
                                   }
                                   event.preventDefault()
                               }}>Log in
                            </a>
                        </li>
                        <li className="navbarItem font-link sign-up-link">
                            <a href=""
                               onClick={(event) => {
                                   setShowRegistry(!showRegistry)
                                   if (showLogin) {
                                       setShowLogin(!showLogin)
                                   }
                                   event.preventDefault()
                               }}>Sign up
                            </a>
                        </li>
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
    const [name, setName] = useState({name: "", clicked: false});
    const [city, setCity] = useState({city: "", clicked: false});
    const [hasFocus, setFocus] = useState({name: false, city: false})
    const [cinemas, setCinemas] = useState([])
    const [filteredCinemas, setFilteredCinemas] = useState([])

    const loadData = async () => {
        await fetch('http://localhost:4000/cinema')
            .then(response => response.json())
            .then(cinemas => {
                setCinemas(cinemas.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleChange = e => {
        e.preventDefault()
        if (e.target.className === 'cinema-name-input') {
            setName({name: e.target.value, clicked: false})
        }
        if (e.target.className === 'cinema-city-input') {
            setCity({city: e.target.value, clicked: false})
        }
    }

    useEffect(() => {
        setFilteredCinemas(
            cinemas.filter(cinema => cinema.name.toLowerCase().match(name.name.toLowerCase()))
        )
    }, [name.name, cinemas])

    useEffect(() => {
        setFilteredCinemas(
            cinemas.filter(cinema => cinema.address.city.toLowerCase().match(city.city.toLowerCase()))
        )
    }, [city.city, cinemas])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateState({
            name: name.name,
            city: city.city
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
                           value={name.name}
                    />
                    <input className={'cinema-city-input'}
                           type="search"
                           placeholder="city"
                           onChange={handleChange}
                           onFocus={() => {
                               setFocus({city: true})
                           }}
                           onBlur={() => setFocus({city: false})}
                           value={city.city}
                    />
                    <input type="submit"
                           value="search"/>
                </form>
                <div className='search-boxes'>
                    <div
                        className={
                            `search-cinema-name ${(name.name.length === 0 && !hasFocus.name && !name.clicked)
                            || name.clicked
                                ? 'disappear'
                                : ''}
                            `}>
                        <ul>
                            {
                                filteredCinemas.map((cinema, index) => {
                                    return (
                                        <li className={'font-link'}
                                            key={cinema.id}
                                            onClick={() => {
                                                setName({name: cinema.name, clicked: true})
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
                        className={`search-cinema-city ${(city.city.length === 0 && !hasFocus.city && !city.clicked)
                        || city.clicked
                            ? 'disappear'
                            : ''}`}>
                        <ul>
                            {
                                filteredCinemas.map((cinema, index) => {
                                    return (
                                        <li className={'font-link'}
                                            key={cinema.id}
                                            onClick={() => {
                                                setCity({city: cinema.address.city, clicked: true})
                                            }}
                                        >
                                            <span className={'icon-small'}><FaGlobe/></span>
                                            {cinema.address.city}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Link to="steps-section" spy={true} smooth={true}
                  offset={-60} duration={500}>
                <span className={'show-more-link'}>Show more</span>
                <span className={'caret-down'}><FaCaretDown/></span>
            </Link>
        </div>
    )
}

export default Header