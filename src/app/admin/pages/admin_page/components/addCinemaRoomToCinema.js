import {DataContext} from "../../../../utils/data_transfer/dataManager";
import Select from "react-select";
import React, {useState, useContext} from 'react'

const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

const AddCinemaRoomToCinema = (props) => {
    const [error, setError] = useState({
        name: false,
        rows: false,
        places: false
    })
    const {cinemas, setChange} = useContext(DataContext)
    const [cinemaRoom, setCinemaRoom] = useState({
        name: "", rows: "", places: ""
    })
    const [cinemaRoomFocused, setCinemaRoomFocused] = useState({
        nameFocused: false, rowsFocused: false, placesFocused: false
    })

    const [cinemaName, setCinemaName] = useState("")

    const options = []
    cinemas.forEach(cinema => {
        options.push({value: cinema.name, label: cinema.name})
    })

    const handleChange = e => {
        const newCinemaRoom = {...cinemaRoom}

        if (e.target.id === 'name' &&
            (!e.target.value.match(/^[A-Za-z ]+$/) || e.target.value.length < 4)) {
            setError({name: true})
        } else if (e.target.id === 'name') {
            setError({name: false})
        }

        if (e.target.id === 'rows' &&
            (!Number.isInteger(Number(e.target.value)) || parseInt(e.target.value) < 1)) {
            setError({rows: true})
        } else if (e.target.id === 'rows') {
            setError({rows: false})
        }

        if (e.target.id === 'places' &&
            (!Number.isInteger(Number(e.target.value)) || parseInt(e.target.value) < 1)) {
            setError({places: true})
        } else if (e.target.id === 'places') {
            setError({places: false})
        }
        newCinemaRoom[e.target.id] = e.target.value
        setCinemaRoom(newCinemaRoom)
    }

    const onSelectChange = (e) => {
        setCinemaName(e.value)
    }

    const addCinemaRoom = async (cinemaRoom, cinemaName) => {
        console.log(cinemaRoom)
        const cinemaRooms = []
        cinemaRooms.push(cinemaRoom)

        const response = await fetch(BASE_CINEMA_URL + `/${cinemaName}`,
            {
                method: 'PATCH',
                body: JSON.stringify(cinemaRooms),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

        setChange(true)
        return await response.json()
    }

    const handleSubmit = e => {
        e.preventDefault()
        addCinemaRoom(cinemaRoom, cinemaName)
        setCinemaRoom({name: '', rows: '', places: ''})
    }

    return (
        <div>
            {
                props.showAddCinemaRoomToCinema &&
                <div className="popup">
                    <div className="popup__inside">
                             <span className='popup__inside--close'
                                   onClick={() => props.setShowAddCinemaRoomToCinema(!props.showAddCinemaRoomToCinema)}
                             >&#10005;</span>
                        <div className="row">
                            <form action=""
                                  className="form form__add-cinemaRoom"
                                  onSubmit={e => handleSubmit(e)}>
                                <label htmlFor="name">Choose cinema</label>
                                <Select className='react-select' name=""
                                        defaultValue={options[0]}
                                        options={options}
                                        onChange={onSelectChange}
                                        id='name'
                                />
                                <label htmlFor="name">Cinema room name</label>
                                {
                                    error.name && cinemaRoomFocused.nameFocused ?
                                        <p className='error-message'>
                                            Length must be greater than 2<br/>
                                            Syntax must be: <span
                                            className='error-message__syntax'> /^[A-Za-z ]+$/</span>
                                        </p> : null
                                }
                                <input className='primary-input popup__input' type="text" id="name"
                                       onChange={handleChange}
                                       value={cinemaRoom.name}
                                       onFocus={() => setCinemaRoomFocused({nameFocused: true})}
                                       onBlur={() => setCinemaRoomFocused({nameFocused: false})}
                                       placeholder=''/>
                                <label htmlFor="rows">Cinema room rows number</label>
                                {
                                    error.rows && cinemaRoomFocused.rowsFocused ?
                                        <p className='error-message'>
                                            Number must be integer and greater than 0
                                        </p> : null
                                }
                                <input className='primary-input popup__input' type="number" id="rows"
                                       onChange={handleChange}
                                       value={cinemaRoom.rows}
                                       onFocus={() => setCinemaRoomFocused({rowsFocused: true})}
                                       onBlur={() => setCinemaRoomFocused({rowsFocused: false})}
                                       placeholder=''/>
                                <label htmlFor="places">Cinema room places number</label>
                                {
                                    error.places && cinemaRoomFocused.placesFocused ?
                                        <p className='error-message'>
                                            Number must be integer and greater than 0
                                        </p> : null
                                }
                                <input className='primary-input popup__input' type="number" id="places"
                                       onChange={handleChange}
                                       value={cinemaRoom.places}
                                       onFocus={() => setCinemaRoomFocused({placesFocused: true})}
                                       onBlur={() => setCinemaRoomFocused({placesFocused: false})}
                                       placeholder=''/>
                                <input className='popup__input--submit' type="submit" id='submit'
                                       value='add'/>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddCinemaRoomToCinema