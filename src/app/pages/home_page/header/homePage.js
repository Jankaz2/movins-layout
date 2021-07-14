import React, {useState, useEffect, useContext, useRef} from "react";
import {useForm} from "react-hook-form"
import HeaderCss from './styles/header.scss'
import MainScss from '../../../styles/scss/main.scss'
import WebStartScss from './styles/webstart.scss'
import {Link} from "react-scroll"
import {useHistory} from "react-router-dom"
import {FaVideo, FaGlobe, FaWindowClose} from "react-icons/fa"
import StepsSection from "../steps_section/stepsSection";
import AboutUsSection from "../about_us_section/aboutUsSection";
import Reviews from "../reviews_section/reviews";
import Contact from "../contact_section/contact";
import {DataContext} from "../../../utils/data_transfer/dataManager";
import StickyNavigation from "./stickyNavigation";
import LoginBox from "./loginBox";

function HomePage() {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            <StickyNavigation/>
            <LoginBox showLogin={showLogin} setShowLogin={setShowLogin}/>
            <header className='header'>
                <Navigation showLogin={showLogin} setShowLogin={setShowLogin}/>
                <WebStart/>
            </header>
            <AboutUsSection/>
            <StepsSection/>
            <Reviews/>
            <Contact/>
        </div>
    )
}

const Navigation = (props) => {

    return (
        <div>
            <nav>
                <ul className={`header__navbar`}>
                    <span><div className="header__logo"><a href="#">MOVINS</a></div></span>

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

                    <li className="header__navbar--item log-in-link"
                        onClick={(event) => {
                            props.setShowLogin(!props.showLogin)
                            event.preventDefault()
                        }}>
                        <a href="">Log in</a>
                    </li>

                    <li className="header__navbar--item">
                        <Link activeClass="active"
                              to="steps-section"
                              spy={true}
                              smooth={true}
                              duration={500}>
                            <a href="">How it works</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const WebStart = () => {
    const history = useHistory();
    const [name, setName] = useState({name: "", clicked: false});
    const [city, setCity] = useState({city: "", clicked: false});
    const [hasFocus, setFocus] = useState({name: false, city: false})
    const [filteredCinemas, setFilteredCinemas] = useState([])

    const {cinemas, setCinemas, change, setChange} = useContext(DataContext)

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
        const submittedCinemas = cinemas.filter(cinema =>
            cinema.name.toLowerCase() === name.name.toLowerCase() ||
            cinema.address.city.toLowerCase() === city.city.toLowerCase())
        setCinemas(submittedCinemas)
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

export default HomePage