import {DataContext} from "../../../../utils/store/appContext";
import Select from "react-select";
import React, {useState, useContext} from "react";
import {ImHappy, ImSad} from "react-icons/im";

const UpdateCinema = props => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

    const {cinemas, setChange, authContextValue} = useContext(DataContext)
    const bearer = 'Bearer ' + authContextValue.refreshToken

    const [updateCinemaResponse, setUpdateCinemaResponse] = useState({correct: false, error: false})
    const [cinemaName, setCinemaName] = useState({name: ""})
    const [selectCinemaName, setSelectCinemaName] = useState("")
    const [address, setAddress] = useState(
        {
            city: "",
            street: "",
            number: ""
        }
    )

    const options = []
    cinemas.forEach(cinema => {
        options.push({value: cinema.name, label: cinema.name})
    })

    const updateCinema = async (name, cinema) => {
        const response = await fetch(BASE_CINEMA_URL + `/admin/${name}`, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(cinema),
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            setUpdateCinemaResponse({error: true})
            return
        }

        setUpdateCinemaResponse({correct: true})
        setChange(true)
        return await response.json()
    }

    const submit = (e) => {
        e.preventDefault()

        const mergedCinema = {
            ...cinemaName,
            address,
        }

        updateCinema(selectCinemaName, mergedCinema)
        setCinemaName({name: ''})
        setAddress({city: '', street: '', number: ''})
    }

    const handleNameChange = e => {
        const newCinema = {...cinemaName}
        newCinema[e.target.id] = e.target.value
        setCinemaName(newCinema)
    }

    const handleAddressChange = e => {
        const newAddress = {...address}
        newAddress[e.target.id] = e.target.value
        setAddress(newAddress)
    }

    const onSelectChange = (e) => {
        setSelectCinemaName(e.value)
    }

    return (
        <div>
            {
                props.showUpdateCinema &&
                <div className='popup'>
                    <div className="popup__inside">
                        <span className='popup__inside--close'
                              onClick={() => props.setShowUpdateCinema(!props.showUpdateCinema)}
                        >&#10005;</span>
                        <form
                            onSubmit={(e) => submit(e)}
                            action=""
                            className="form">
                            <label htmlFor="name">Cinema you want to update</label>
                            <Select className='react-select react-select__update' name=""
                                    defaultValue={options[0]}
                                    options={options}
                                    onChange={onSelectChange}
                                    id='name'
                            />
                            <label htmlFor="name">Cinema name</label>
                            <input className='primary-input popup__input'
                                   type="text" id='name'
                                   onChange={handleNameChange}
                                   value={cinemaName.name}
                            />
                            <label htmlFor="city">City</label>
                            <input className='primary-input popup__input'
                                   type="text" id='city'
                                   onChange={handleAddressChange}
                                   value={address.city}
                            />
                            <label htmlFor="street">Street</label>
                            <input className='primary-input popup__input'
                                   type="text" id='street'
                                   onChange={handleAddressChange}
                                   value={address.street}
                            />
                            <label htmlFor="number">Number</label>
                            <input className='primary-input popup__input'
                                   type="number" id='number'
                                   onChange={handleAddressChange}
                                   value={address.number}
                            />
                            <input className='popup__input--submit'
                                   type="submit" id='submit'
                                   value='update'/>
                        </form>
                    </div>
                    {
                        updateCinemaResponse.error &&
                        <div className='error-statement'>
                            <div className='error-statement__top-section'>
                                <h3 className='heading-tertiary'>Something went wrong</h3>
                                <span className='error-statement__icon'><ImSad/></span>
                            </div>
                            <div className='error-statement__bottom-section'>
                                <button
                                    onClick={() => setUpdateCinemaResponse({error: false})}
                                    className='error-statement__btn'>
                                    Ok
                                </button>
                            </div>
                        </div>
                    }
                    {
                        updateCinemaResponse.correct &&
                        <div className='correct-statement'>
                            <div className='correct-statement__top-section'>
                                <h3 className='heading-tertiary'>Cinema has been added</h3>
                                <span className='correct-statement__icon'><ImHappy/></span>
                            </div>
                            <div className='correct-statement__bottom-section'>
                                <button
                                    onClick={() => setUpdateCinemaResponse({correct: false})}
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

export default UpdateCinema