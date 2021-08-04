import {DataContext} from "../../../../utils/data_transfer/dataManager";
import Select from "react-select";
import React, {useState, useContext} from "react";

const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

const UpdateCinema = props => {
    const {cinemas, setChange} = useContext(DataContext)
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
        const response = await fetch(BASE_CINEMA_URL + `/${name}`, {
            method: 'PUT',
            body: JSON.stringify(cinema),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setChange(true)
        return await response.json();
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
                </div>
            }
        </div>
    )
}

export default UpdateCinema