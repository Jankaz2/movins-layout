import {DataContext} from "../../../../utils/store/appContext";
import React, {useState, useContext} from 'react'
import {ImHappy, ImSad} from "react-icons/im";

const AddCinemaPopup = (props) => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

    const [addCinemaResponse, setAddCinemaResponse] = useState({correct: false, error: false})
    const [error, setError] = useState({
        name: false,
        city: false,
        street: false,
        number: false,
        cinemaRoomName: false,
        rows: false,
        places: false
    })
    const [cinemaName, setCinemaName] = useState({name: ""})
    const [cinemaNameFocused, setCinemaNameFocused] = useState({focused: false})
    const [address, setAddress] = useState({
        city: "", street: "", number: ""
    })
    const [addressFocused, setAddressFocused] = useState({
        cityFocused: false, streetFocused: false, numberFocused: false
    })
    const [cinemaRoomSingleObject, setCinemaRoomSingleObject] = useState({
        name: "", rows: "", places: ""
    })
    const [cinemaRoomSingleObjectFocused, setCinemaRoomSingleObjectFocused] = useState({
        nameFocused: false, rowsFocused: false, placesFocused: false
    })

    const {setChange, authContextValue} = useContext(DataContext)
    const bearer = 'Bearer ' + authContextValue.refreshToken

    const addCinema = async (cinema) => {
        const response = await fetch(BASE_CINEMA_URL + '/admin/create', {
            method: 'POST',
            body: JSON.stringify(cinema),
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            setAddCinemaResponse({error: true})
            return
        }

        setAddCinemaResponse({correct: true})
        setChange(true)
        return await response.json();
    }

    const submit = (e) => {
        e.preventDefault()

        const cinemaRooms = []
        cinemaRooms.push(cinemaRoomSingleObject)

        const mergedCinema = {
            ...cinemaName,
            address,
            cinemaRooms
        }

        addCinema(mergedCinema)

        if (addCinemaResponse.correct) {
            setCinemaName({name: ''})
            setAddress({city: '', street: '', number: ''})
            setCinemaRoomSingleObject({name: '', rows: '', places: ''})
        }
    }

    const handleNameChange = e => {
        const newCinema = {...cinemaName}
        if (!e.target.value.match(/^[A-Za-z ]+$/) || e.target.value.length < 4) {
            setError({name: true})
        } else {
            setError({name: false})
        }

        newCinema[e.target.id] = e.target.value
        setCinemaName(newCinema)
    }

    const handleAddressChange = e => {
        const newAddress = {...address}
        if (e.target.id === 'city' &&
            (!e.target.value.match(/^[A-Z][a-z]+$/) || e.target.value.length < 3)) {
            setError({city: true})
        } else if (e.target.id === 'city') {
            setError({city: false})
        }

        if (e.target.id === 'street' &&
            (!e.target.value.match(/^[A-Z][a-z]+$/) || e.target.value.length < 3)) {
            setError({street: true})
        } else if (e.target.id === 'street') {
            setError({street: false})
        }

        if (e.target.id === 'number' &&
            (!Number.isInteger(Number(e.target.value)) || parseInt(e.target.value) < 1)) {
            setError({number: true})
        } else if (e.target.id === 'number') {
            setError({number: false})
        }

        newAddress[e.target.id] = e.target.value
        setAddress(newAddress)
    }

    const handleCinemaRoomsChange = (e) => {
        const newCinemaRoom = {...cinemaRoomSingleObject}

        if (e.target.id === 'name' &&
            (!e.target.value.match(/^[A-Za-z ]+$/) || e.target.value.length < 4)) {
            setError({cinemaRoomName: true})
        } else if (e.target.id === 'name') {
            setError({cinemaRoomName: false})
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
        setCinemaRoomSingleObject(newCinemaRoom)
    }

    return (
        <div>
            {
                props.showCreateCinema &&
                <div className='popup'>
                    <div className="popup__inside">
                        <span className='popup__inside--close'
                              onClick={() => props.setShowCreateCinema(!props.showCreateCinema)}
                        >&#10005;</span>
                        <div className="row">
                            <form
                                onSubmit={(e) => submit(e)}
                                action=""
                                className="form form__add-cinema">
                                <div className="col-1-of-2">
                                    <label htmlFor="name">Cinema name</label>
                                    {
                                        error.name && cinemaNameFocused.focused ?
                                            <p className='error-message'>
                                                Length must be greater than 3<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Za-z ]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='name'
                                           onChange={handleNameChange}
                                           onFocus={() => setCinemaNameFocused({focused: true})}
                                           onBlur={() => setCinemaNameFocused({focused: false})}
                                           value={cinemaName.name}
                                           required={true}
                                    />
                                    <label htmlFor="city">City</label>
                                    {
                                        error.city && addressFocused.cityFocused ?
                                            <p className='error-message'>
                                                Length must be greater than 2<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Z][a-z]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='city'
                                           onChange={handleAddressChange}
                                           onFocus={() => setAddressFocused({cityFocused: true})}
                                           onBlur={() => setAddressFocused({cityFocused: false})}
                                           value={address.city}
                                           required={true}
                                    />
                                    <label htmlFor="street">Street</label>
                                    {
                                        error.street && addressFocused.streetFocused ?
                                            <p className='error-message'>
                                                Length must be greater than 2<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Z][a-z]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='street'
                                           onChange={handleAddressChange}
                                           onFocus={() => setAddressFocused({streetFocused: true})}
                                           onBlur={() => setAddressFocused({streetFocused: false})}
                                           value={address.street}
                                           required={true}
                                    />
                                    <label htmlFor="number">Number</label>
                                    {
                                        error.number && addressFocused.numberFocused ?
                                            <p className='error-message'>
                                                Number must be integer and greater than 0
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="number" id='number'
                                           onChange={handleAddressChange}
                                           onFocus={() => setAddressFocused({numberFocused: true})}
                                           onBlur={() => setAddressFocused({numberFocused: false})}
                                           value={address.number}
                                           required={true}
                                    />
                                </div>
                                <div className="col-1-of-2">
                                    <label htmlFor="name">Cinema Room name</label>
                                    {
                                        error.cinemaRoomName && cinemaRoomSingleObjectFocused.nameFocused ?
                                            <p className='error-message'>
                                                Length must be greater than 2<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Za-z ]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='name'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.name}
                                           onFocus={() => setCinemaRoomSingleObjectFocused({nameFocused: true})}
                                           onBlur={() => setCinemaRoomSingleObjectFocused({nameFocused: false})}
                                           required={true}
                                    />
                                    <label htmlFor="rows">Rows</label>
                                    {
                                        error.rows && cinemaRoomSingleObject.rowsFocused ?
                                            <p className='error-message'>
                                                Number must be integer and greater than 0
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="number" id='rows'
                                           onChange={handleCinemaRoomsChange}
                                           onFocus={() => setCinemaRoomSingleObjectFocused({rowsFocused: true})}
                                           onBlur={() => setCinemaRoomSingleObjectFocused({rowsFocused: false})}
                                           value={cinemaRoomSingleObject.rows}
                                           required={true}
                                    />
                                    <label htmlFor="places">Places</label>
                                    {
                                        error.places && cinemaRoomSingleObjectFocused.placesFocused ?
                                            <p className='error-message'>
                                                Number must be integer and greater than 0
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="number" id='places'
                                           onChange={handleCinemaRoomsChange}
                                           onFocus={() => setCinemaRoomSingleObjectFocused({placesFocused: true})}
                                           onBlur={() => setCinemaRoomSingleObjectFocused({placesFocused: false})}
                                           value={cinemaRoomSingleObject.places}
                                           required={true}
                                    />
                                    <input className='popup__input--submit'
                                           type="submit"
                                           id='submit'
                                           value='create'/>
                                </div>
                            </form>
                        </div>
                    </div>
                    {
                        addCinemaResponse.error &&
                        <div className='error-statement'>
                            <div className='error-statement__top-section'>
                                <h3 className='heading-tertiary'>Something went wrong</h3>
                                <span className='error-statement__icon'><ImSad/></span>
                            </div>
                            <div className='error-statement__bottom-section'>
                                <button
                                    onClick={() => setAddCinemaResponse({error: false})}
                                    className='error-statement__btn'>
                                    Ok
                                </button>
                            </div>
                        </div>
                    }
                    {
                        addCinemaResponse.correct &&
                        <div className='correct-statement'>
                            <div className='correct-statement__top-section'>
                                <h3 className='heading-tertiary'>Cinema has been added</h3>
                                <span className='correct-statement__icon'><ImHappy/></span>
                            </div>
                            <div className='correct-statement__bottom-section'>
                                <button
                                    onClick={() => setAddCinemaResponse({correct: false})}
                                    className='correct-statement__btn'>
                                    Ok
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default AddCinemaPopup