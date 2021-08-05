import {useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../../../utils/data/dataManager";
import {FaSearch} from "react-icons/fa";
import Select from "react-select";
import WebStartScss from '../styles/webstart.scss'

const WebStart = () => {
    const history = useHistory();
    const [name, setName] = useState({name: ""});
    const [city, setCity] = useState({city: ""});
    const {cinemas, setTransferredCinemas} = useContext(DataContext)

    const distinct = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const cinemasCitiesDistinct = cinemas
        .map(cinema => cinema.address.city)
        .filter(distinct)

    const cinemaNames = []
    cinemas.forEach(cinema =>
        cinemaNames.push({value: cinema.name, label: cinema.name})
    )

    const cinemaCities = []
    cinemasCitiesDistinct.forEach(city =>
        cinemaCities.push({value: city, label: city})
    )

    const handleNameChange = e => {
        setName({name: e.value})
    }

    const handleCityChange = e => {
        setCity({city: e.value})
    }

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
                <Select className='webstart--page__find-cinema-select'
                        placeholder="cinema name"
                        options={cinemaNames}
                        onChange={handleNameChange}
                        id='names-only'
                        maxMenuHeight={200}
                />
                <Select className='webstart--page__find-cinema-select'
                        placeholder="city"
                        options={cinemaCities}
                        onChange={handleCityChange}
                        id='cities-only'
                        maxMenuHeight={200}
                />
                <input type="submit"
                       value="search"
                       className="webstart--page__find-cinema--submit"/>
            </form>
        </div>
    )
}

export default WebStart