import React, {useState, useEffect, useContext} from "react";
import {useForm} from "react-hook-form"
import HeaderCss from './header.scss'
import MainScss from '../scss/main.scss'
import WebStartScss from './webstart.scss'
import {Link} from "react-scroll"
import {useHistory} from "react-router-dom"
import {FaVideo, FaGlobe} from "react-icons/fa"
import CinemasList from "../cinema_list/cinemaList";
import {DataContext} from "../data_transfer/dataManager";
import StepsSection from "../steps_section/stepsSection";
import AboutUsSection from "../about_us_section/aboutUsSection";
import Reviews from "../reviews_section/reviews";
import Contact from "../contact_section/contact";
import {FaSearch} from "react-icons/all";

function Header() {
    return (
        <div>
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
    const [showLogin, setShowLogin] = useState(false)
    const [showRegistry, setShowRegistry] = useState(false)

    return (
        <div>
            <nav>
                <ul className={`header__navbar`}>

                    <ul className="header__navbar--options">
                        <li className="header__navbar--item about-us-link">
                            <Link to="about-us-section" spy={true} smooth={true}
                                  offset={-60} duration={500}>
                                <a href="">About us</a>
                            </Link></li>
                        <li className="header__navbar--item contact-link">
                            <Link activeClass="active" to="contact-us-section"
                                  spy={true} smooth={true} offset={-60}
                                  duration={500}>
                                <a href="">Contact</a>
                            </Link></li>
                    </ul>

                    <ul className="header__navbar--info">
                        <li className="header__navbar--item log-in-link">
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
                        <li className="header__navbar--item sign-up-link">
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

                    <span><div className="header__logo"><a href="#">LOGO</a></div></span>

                </ul>
            </nav>
            <div className='header__registry'>
                {
                    showLogin &&
                    <div className="header__registry--login-box">
                        <form className='header__registry--login-box--form'>
                            <input className='login-form-input primary-input' type="text" placeholder="login"/>
                            <input className='login-form-input primary-input' type="password" placeholder="password"/>
                            <input className='login-form-input-submit primary-input' type="submit" value="Log in"/>
                        </form>
                    </div>
                }
                {
                    showRegistry &&
                    <div className="header__registry--signup-box">
                        <form className='header__registry--login-box--form'>
                            <input className='login-form-input primary-input' type="name" placeholder="Name"/>
                            <input className='login-form-input primary-input' type="text" placeholder="Surname"/>
                            <input className='login-form-input primary-input' type="email" placeholder="e-mail"/>
                            <input className='login-form-input primary-input' type="number" placeholder="phone number"/>
                            <input className='login-form-input primary-input' type="password" placeholder="password"/>
                            <input className='login-form-input primary-input' type="password"
                                   placeholder="repeat password"/>
                            <input className='login-form-input-submit primary-input' type="submit" value="Sign in"/>
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
        if (e.target.className.match('cinema-name-input')) {
            setName({name: e.target.value, clicked: false})
        }
        if (e.target.className.match('cinema-city-input')) {
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
            <div className="webstart--page">
                <h1 className='heading--primary'>
                    <span className="heading--primary--main">Find cinema and book ticket</span>
                    <span className="heading--primary--sub">Search among dozens of cinemas.</span>
                </h1>
                <form className="webstart--page__find-cinema" onSubmit={handleSubmit}>
                    <input className={'cinema-name-input primary-input'}
                           type="search"
                           placeholder="cinema name"
                           onChange={handleChange}
                           onFocus={() => setFocus({name: true})}
                           onBlur={() => setFocus({name: false})}
                           value={name.name}
                    />
                    <input className={'cinema-city-input primary-input'}
                           type="search"
                           placeholder="city"
                           onChange={handleChange}
                           onFocus={() => setFocus({city: true})}
                           onBlur={() => setFocus({city: false})}
                           value={city.city}
                    />
                    <input type="submit" value="search" className="submit-cinemas-inputs"/>
                </form>
                <div className='webstart--page__search-boxes'>
                    <div className={
                        `search-cinema-name 
                            ${(name.name.length === 0 && !hasFocus.name && !name.clicked) || name.clicked
                            ? 'disappear'
                            : ''}`}>
                        <ul>
                            {
                                filteredCinemas.map((cinema, index) => {
                                    return (
                                        <li key={cinema.id}
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
                    <div className={
                        `search-cinema-city 
                        ${(city.city.length === 0 && !hasFocus.city && !city.clicked) || city.clicked
                            ? 'disappear'
                            : ''}`}>
                        <ul>
                            {
                                filteredCinemas.map((cinema, index) => {
                                    return (
                                        <li key={cinema.id}
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
        </div>
    )
}

export default Header