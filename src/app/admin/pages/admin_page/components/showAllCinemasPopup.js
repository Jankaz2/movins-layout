import {DataContext} from "../../../../utils/store/appContext";
import ObjectOptions from './objectOptions'
import React, {useState, useContext, useEffect} from 'react'

const ShowAllCinemasPopup = (props) => {
    const {cinemas, setChange} = useContext(DataContext)

    const [showOptions, setShowOptions] = useState(false)
    const [coordinates, setCoordinates] = useState({left: "", top: ""})
    const [cinemaInfoToDelete, setCinemaInfoToDelete] = useState({id: 0, name: "", city: ""})
    const [name, setName] = useState({name: "", clicked: false});
    const [city, setCity] = useState({city: "", clicked: false});
    const [filteredCinemas, setFilteredCinemas] = useState([])

    const handleElementClick = e => {
        setChange(true)
        setShowOptions(true)

        const l = e.clientX + 'px'
        const t = e.clientY + 'px'
        const currentRow = e.currentTarget

        rowData(currentRow)
        setCoordinates({left: l, top: t})
    }

    const handleChange = e => {
        e.preventDefault()
        if (e.target.className.match('cinema-admin-name-input')) {
            setName({name: e.target.value, clicked: false})
        }
        if (e.target.className.match('cinema-admin-city-input')) {
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

    const rowData = row => {
        const data = []
        for (let j in row.cells) {
            if (row.cells.hasOwnProperty(j)) {
                const col = row.cells[j]
                data.push(col.firstChild.nodeValue)
            }
        }
        setCinemaInfoToDelete({id: data[0], name: data[1], city: data[2]})
    }

    return (
        <div>
            {
                props.showAllCinemas &&
                <div className='popup'>
                    <div className="popup__inside popup__inside--cinemas-list">
                        <span className='popup__inside--close'
                              onClick={() => props.setShowAllCinemas(!props.showAllCinemas)}
                        >&#10005;</span>
                        <table className='data-list-admin'>
                            <thead className='data-list-admin--header'>
                            <tr>
                                <th>Id.</th>
                                <th>Cinema name</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input className='data-list-admin--search cinema-admin-name-input'
                                           type="search"
                                           value={name.name}
                                           onChange={handleChange}
                                           placeholder='Search...'
                                    />
                                </td>
                                <td>
                                    <input className='data-list-admin--search cinema-admin-city-input'
                                           type="search"
                                           value={city.city}
                                           onChange={handleChange}
                                           placeholder='Search...'
                                    />
                                </td>
                            </tr>
                            {
                                filteredCinemas.map((cinema, idx) => {
                                    return (
                                        <tr key={cinema.id}
                                            onClick={handleElementClick}>
                                            <td>{cinema.id}</td>
                                            <td>{cinema.name}</td>
                                            <td>{cinema.address.city}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <ObjectOptions showOptions={showOptions} setShowOptions={setShowOptions}
                                   coordinates={coordinates} setCoordinates={setCoordinates}
                                   cinemaInfoToDelete={cinemaInfoToDelete}
                                   setCinemaInfoToDelete={setCinemaInfoToDelete}
                    />
                </div>
            }
        </div>
    )
}

export default ShowAllCinemasPopup