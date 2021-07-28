import {useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../../../utils/data_transfer/dataManager";
import {FaGlobe, FaVideo} from "react-icons/fa";
import WebStartScss from '../styles/webstart.scss'

const WebStart = () => {
    const history = useHistory();
    const [name, setName] = useState({name: "", clicked: false});
    const [city, setCity] = useState({city: "", clicked: false});
    const [hasFocus, setFocus] = useState({name: false, city: false})
    const [filteredCinemas, setFilteredCinemas] = useState([])
    const {cinemas, setTransferredCinemas} = useContext(DataContext)

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
            (name.name.length > 0 && city.city.length > 0 ?
                    cinema.name.toLowerCase() === name.name.toLowerCase() &&
                    cinema.address.city.toLowerCase() === city.city.toLowerCase()
                    :
                    cinema.name.toLowerCase() === name.name.toLowerCase() ||
                    cinema.address.city.toLowerCase() === city.city.toLowerCase()
            ))

        setTransferredCinemas(submittedCinemas)
        history.push("/cinema-list");
    };

    return (
        <div className="webstart--page">
            <h1 className='heading--primary'>
                <span className="heading--primary--main">Find cinema and book ticket</span>
                <span className="heading--primary--sub">Search among dozens of cinemas.</span>
            </h1>
            <form className="webstart--page__find-cinema"
                  onSubmit={handleSubmit}>
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
                <input type="submit"
                       value="search"
                       className="webstart--page__find-cinema--submit"/>
            </form>
            <div className='webstart--page__search-boxes'>
                <div className={
                    `search-cinema-name 
                            ${(name.name.length === 0 && !hasFocus.name && !name.clicked)
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
                        ${(city.city.length === 0 && !hasFocus.city && !city.clicked)
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
    )
}

export default WebStart