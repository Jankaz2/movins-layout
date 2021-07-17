import AdminPageScss from './styles/adminPage.scss'
import GridScss from '../../../utils/grid/grid.scss'
import ButonScss from '../../../styles/scss/utils/_buttons.scss'
import React, {useState, useEffect, useContext} from "react";
import {DataContext} from "../../../utils/data_transfer/dataManager";
import {FaGlobe, FaVideo} from "react-icons/fa";
import Select from 'react-select'
import {MdDeleteForever, MdUpdate} from "react-icons/md"
import {GrUpdate} from 'react-icons/gr'
import userEvent from "@testing-library/user-event";

const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
const BASE_USER_URL = 'http://localhost:5000/user'


const AdminPage = () => {
    const [showCreateCinema, setShowCreateCinema] = useState(false)
    const [showCreateNewAdmin, setShowCreateNewAdmin] = useState(false)
    const [showAllCinemas, setShowAllCinemas] = useState(false)
    const [showAllUsers, setShowAllUsers] = useState(false)
    const [showAddCinemaRoomToCinema, setShowAddCinemaRoomToCinema] = useState(false)
    const [showUpdateCinema, setShowUpdateCinema] = useState(false)

    useEffect(() => {
        document.title = 'Movins | ADMIN system'
    }, [])

    return (
        <div className='admin-page'>
            <h1 className="admin-page__welcome-heading heading--secondary">
                Welcome admin, choose the option and manage your app
            </h1>
            <section className='menu-section'>
                <div className="row">
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Create cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowCreateCinema(!showCreateCinema)}
                        >Create
                        </button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Create new admin account</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowCreateNewAdmin(!showCreateNewAdmin)}
                        >Create
                        </button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Add cinema room to cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowAddCinemaRoomToCinema(!showAddCinemaRoomToCinema)}
                        >Add
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Show all cinemas</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowAllCinemas(!showAllCinemas)}
                        >Show
                        </button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Show all users</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowAllUsers(!showAllUsers)}
                        >Show
                        </button>
                    </div>
                    <div className="menu-section__option col span-1-of-3">
                        <h3 className="heading-tertiary">Update cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button"
                                onClick={() => setShowUpdateCinema(!showUpdateCinema)}
                        >Update
                        </button>
                    </div>
                </div>
            </section>
            <AddCinemaPopup showCreateCinema={showCreateCinema} setShowCreateCinema={setShowCreateCinema}/>
            <AddNewAdminAccountPopup showCreateNewAdmin={showCreateNewAdmin}
                                     setShowCreateNewAdmin={setShowCreateNewAdmin}/>
            <ShowAllCinemasPopup showAllCinemas={showAllCinemas} setShowAllCinemas={setShowAllCinemas}/>
            <ShowAllUsersPopup showAllUsers={showAllUsers} setShowAllUsers={setShowAllUsers}/>
            <AddCinemaRoomToCinema showAddCinemaRoomToCinema={showAddCinemaRoomToCinema}
                                   setShowAddCinemaRoomToCinema={setShowAddCinemaRoomToCinema}/>
            <UpdateCinema showUpdateCinema={showUpdateCinema} setShowUpdateCinema={setShowUpdateCinema}/>
        </div>
    )
}

export default AdminPage

const AddCinemaPopup = (props) => {
    const [error, setError] = useState({
        name: false,
        city: false,
        street: false,
        number: false,
        cinemaRoomName: false,
        rows: false,
        places: false
    })
    const [cinemaName, setCinemaName] = useState({name: "", focused: false})
    const [address, setAddress] = useState(
        {
            city: "", street: "", number: "",
            cityFocused: false, streetFocused: false, numberFocused: false
        }
    )
    const [cinemaRoomSingleObject, setCinemaRoomSingleObject] = useState(
        {
            name: "", rows: "", places: "",
            nameFocused: false, rowsFocused: false, placesFocused: false
        }
    )
    const {cinemas, setCinemas, change, setChange} = useContext(DataContext)
    const addCinema = async (cinema) => {
        const response = await fetch(BASE_CINEMA_URL, {
            method: 'POST',
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

        const cinemaRooms = []
        cinemaRooms.push(cinemaRoomSingleObject)

        const mergedCinema = {
            ...cinemaName,
            address,
            cinemaRooms
        }

        addCinema(mergedCinema)
        setCinemaName({name: ''})
        setAddress({city: '', street: '', number: ''})
        setCinemaRoomSingleObject({name: '', rows: '', places: ''})
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
                                <div className="col span-1-of-2">
                                    <label htmlFor="name">Cinema name</label>
                                    {
                                        error.name && cinemaName.focused ?
                                            <p className='error-message'>
                                                Length must be greater than 3<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Za-z ]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='name'
                                           onChange={handleNameChange}
                                           onFocus={() => setCinemaName({focused: true})}
                                           onBlur={() => setCinemaName({focused: false})}
                                           value={cinemaName.name}
                                           required={true}
                                    />
                                    <label htmlFor="city">City</label>
                                    {
                                        error.city && address.cityFocused ?
                                            <p className='error-message'>
                                                Length must be greater than 2<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Z][a-z]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='city'
                                           onChange={handleAddressChange}
                                           onFocus={() => setAddress({cityFocused: true})}
                                           onBlur={() => setAddress({cityFocused: false})}
                                           value={address.city}
                                           required={true}
                                    />
                                    <label htmlFor="street">Street</label>
                                    {
                                        error.street && address.streetFocused ?
                                            <p className='error-message'>
                                                Length must be greater than 2<br/>
                                                Syntax must be: <span
                                                className='error-message__syntax'> /^[A-Z][a-z]+$/</span>
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="text" id='street'
                                           onChange={handleAddressChange}
                                           onFocus={() => setAddress({streetFocused: true})}
                                           onBlur={() => setAddress({streetFocused: false})}
                                           value={address.street}
                                           required={true}
                                    />
                                    <label htmlFor="number">Number</label>
                                    {
                                        error.number && address.numberFocused ?
                                            <p className='error-message'>
                                                Number must be integer and greater than 0
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="number" id='number'
                                           onChange={handleAddressChange}
                                           onFocus={() => setAddress({numberFocused: true})}
                                           onBlur={() => setAddress({numberFocused: false})}
                                           value={address.number}
                                           required={true}
                                    />
                                </div>
                                <div className="col span-1-of-2">
                                    <label htmlFor="name">Cinema Room name</label>
                                    {
                                        error.cinemaRoomName && cinemaRoomSingleObject.nameFocused ?
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
                                           onFocus={() => setCinemaRoomSingleObject({nameFocused: true})}
                                           onBlur={() => setCinemaRoomSingleObject({nameFocused: false})}
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
                                           onFocus={() => setCinemaRoomSingleObject({rowsFocused: true})}
                                           onBlur={() => setCinemaRoomSingleObject({rowsFocused: false})}
                                           value={cinemaRoomSingleObject.rows}
                                           required={true}
                                    />
                                    <label htmlFor="places">Places</label>
                                    {
                                        error.places && cinemaRoomSingleObject.placesFocused ?
                                            <p className='error-message'>
                                                Number must be integer and greater than 0
                                            </p> : null
                                    }
                                    <input className='primary-input popup__input'
                                           type="number" id='places'
                                           onChange={handleCinemaRoomsChange}
                                           onFocus={() => setCinemaRoomSingleObject({placesFocused: true})}
                                           onBlur={() => setCinemaRoomSingleObject({placesFocused: false})}
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
                </div>
            }
        </div>
    )
}

const AddNewAdminAccountPopup = (props) => {
    return (
        <div>
            {
                props.showCreateNewAdmin &&
                <div className='popup'>
                    <div className="popup__inside">
                        <span className='popup__inside--close'
                              onClick={() => props.setShowCreateNewAdmin(!props.showCreateNewAdmin)}
                        >&#10005;</span>
                        <div className="row">
                            <form action="" className="form form__add-cinema">
                                <label htmlFor="username">Username</label>
                                <input className='primary-input popup__input' type="text" id='username'
                                       placeholder='Username'/>
                                <label htmlFor="street">Age</label>
                                <input className='primary-input popup__input' type="number" id='age'
                                       placeholder='Age'/>
                                <label htmlFor="Email">Email</label>
                                <input className='primary-input popup__input' type="email" id='email'
                                       placeholder='email'/>
                                <label htmlFor="password">Password</label>
                                <input className='primary-input popup__input' type="password" id='password'
                                       placeholder='Password'/>
                                <label htmlFor="repeat__password">Repeat password</label>
                                <input className='primary-input popup__input' type="password" id='password'
                                       placeholder='repeat password'/>
                                <input className='popup__input--submit' type="submit" id='submit'
                                       value='create'/>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const AddCinemaRoomToCinema = (props) => {
    const [error, setError] = useState({
        name: false,
        rows: false,
        places: false
    })
    const {cinemas, setCinemas, change, setChange} = useContext(DataContext)
    const [cinemaRoom, setCinemaRoom] = useState({
        name: "", rows: "", places: "",
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
        const cinemaRooms = []
        cinemaRooms.push(cinemaRoom)

        const response = await fetch(BASE_CINEMA_URL + `/${cinemaName}`,
            {
                method: 'PATCH',
                body: JSON.stringify(cinemaRooms),
                headers: {
                    'Content-Type': 'application/json'
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
                                    error.name && cinemaRoom.nameFocused ?
                                        <p className='error-message'>
                                            Length must be greater than 2<br/>
                                            Syntax must be: <span
                                            className='error-message__syntax'> /^[A-Za-z ]+$/</span>
                                        </p> : null
                                }
                                <input className='primary-input popup__input' type="text" id="name"
                                       onChange={handleChange}
                                       value={cinemaRoom.name}
                                       onFocus={() => setCinemaRoom({nameFocused: true})}
                                       onBlur={() => setCinemaRoom({nameFocused: false})}
                                       placeholder=''/>
                                <label htmlFor="rows">Cinema room rows number</label>
                                {
                                    error.rows && cinemaRoom.rowsFocused ?
                                        <p className='error-message'>
                                            Number must be integer and greater than 0
                                        </p> : null
                                }
                                <input className='primary-input popup__input' type="number" id="rows"
                                       onChange={handleChange}
                                       value={cinemaRoom.rows}
                                       onFocus={() => setCinemaRoom({rowsFocused: true})}
                                       onBlur={() => setCinemaRoom({rowsFocused: false})}
                                       placeholder=''/>
                                <label htmlFor="places">Cinema room places number</label>
                                {
                                    error.places && cinemaRoom.placesFocused ?
                                        <p className='error-message'>
                                            Number must be integer and greater than 0
                                        </p> : null
                                }
                                <input className='primary-input popup__input' type="number" id="places"
                                       onChange={handleChange}
                                       value={cinemaRoom.places}
                                       onFocus={() => setCinemaRoom({placesFocused: true})}
                                       onBlur={() => setCinemaRoom({placesFocused: false})}
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

const ShowAllCinemasPopup = (props) => {
    const {cinemas, setCinemas, change, setChange} = useContext(DataContext)
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
                                <th>Database ID</th>
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

const ShowAllUsersPopup = (props) => {
    const [users, setUsers] = useState([])
    const [showOptions, setShowOptions] = useState(false)

    const loadData = async () => {
        await fetch('http://localhost:5000/user')
            .then(response => response.json())
            .then(users => {
                setUsers(users.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            {
                props.showAllUsers &&
                <div className='popup'>
                    <div className="popup__inside popup__inside--cinemas-list">
                        <span className='popup__inside--close'
                              onClick={() => props.setShowAllUsers(!props.showAllUsers)}
                        >&#10005;</span>
                        <table className='data-list-admin'>
                            <thead className='data-list-admin--header'>
                            <tr>
                                <th>Pos.</th>
                                <th>Username</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                users.map((user, idx) => {
                                    return (
                                        <tr key={user.id}
                                            onClick={setShowOptions(!showOptions)}
                                        >
                                            <td>{idx + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.age}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {/*    <ObjectOptions showOptions={showOptions} setShowOptions={setShowOptions}/>*/}
        </div>
    )
}

const UpdateCinema = props => {
    const {cinemas, setCinemas, change, setChange} = useContext(DataContext)
    const [cinemaName, setCinemaName] = useState({name: ""})
    const [selectCinemaName, setSelectCinemaName] = useState("")
    const [address, setAddress] = useState(
        {
            city: "",
            street: "",
            number: ""
        }
    )
    const [cinemaRoomSingleObject, setCinemaRoomSingleObject] = useState(
        {
            name: "",
            rows: "",
            places: ""
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

        const cinemaRooms = []
        cinemaRooms.push(cinemaRoomSingleObject)

        const mergedCinema = {
            ...cinemaName,
            address,
            cinemaRooms
        }

        updateCinema(selectCinemaName, mergedCinema)
        setCinemaName({name: ''})
        setAddress({city: '', street: '', number: ''})
        setCinemaRoomSingleObject({name: '', rows: '', places: ''})
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

    const handleCinemaRoomsChange = (e) => {
        const newCinemaRoom = {...cinemaRoomSingleObject}
        newCinemaRoom[e.target.id] = e.target.value
        setCinemaRoomSingleObject(newCinemaRoom)
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
                            <div className="row">
                                <div className="col span-1-of-2">
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
                                </div>
                                <div className="col span-1-of-2 ">
                                    <label htmlFor="name">Cinema Room name</label>
                                    <input className='primary-input popup__input'
                                           type="text" id='name'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.name}
                                    />
                                    <label htmlFor="rows">Rows</label>
                                    <input className='primary-input popup__input'
                                           type="number" id='rows'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.rows}
                                    />
                                    <label htmlFor="places">Places</label>
                                    <input className='primary-input popup__input'
                                           type="number" id='places'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.places}
                                    />
                                    <input className='popup__input--submit'
                                           type="submit" id='submit'
                                           value='update'/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

const ObjectOptions = props =>
{
    const [deleteStatement, setDeleteStatement] = useState(false)
    const {cinemas, setCinemas, change, setChange} = useContext(DataContext)

    const deleteCinema = async (cinemaId) => {
        console.log(cinemaId)
        const response = await fetch(BASE_CINEMA_URL + `/${cinemaId}`,
            {method: 'DELETE',})

        setChange(true)
        return await response.json()
    }

    return (
        <div>
            {
                props.showOptions &&
                <div>
                    <div className='object__options' id='object__options__id'
                         style={props.coordinates}>
                    <span className='object__options--close'
                          onClick={() => {
                              props.setShowOptions(!props.showOptions)
                              setDeleteStatement(false)
                          }}
                    >&#10005;</span>
                        <ul>
                            <li className='object__options--item'
                                onClick={() => setDeleteStatement(true)}
                            >
                                <span className='icon-options'><MdDeleteForever/></span>
                                Delete
                                <span className='object__options--item--action'>&gt;</span>

                                {
                                    deleteStatement &&
                                    <ul className='object__options--item--nested'>
                                        <li className='object__options--delete--statement'>
                                            <p>
                                                Do you really want to permanently
                                                delete {props.cinemaInfoToDelete.name} cinema?
                                            </p>
                                            <button
                                                className='object__options--delete--statement-btn object__options--delete--statement-btn--yes'
                                                onClick={() => {
                                                    deleteCinema(props.cinemaInfoToDelete.id)
                                                    props.setShowOptions(!props.showOptions)
                                                    setDeleteStatement(!deleteStatement)
                                                }}>
                                                Yes
                                            </button>
                                            <button
                                                className='object__options--delete--statement-btn object__options--delete--statement-btn--cancel'
                                                onClick={() => {
                                                    props.setShowOptions(!props.showOptions)
                                                    setDeleteStatement(!deleteStatement)
                                                }}>
                                                Cancel
                                            </button>
                                        </li>
                                    </ul>
                                }

                            </li>
                            <li className='object__options--item'>
                                <span className='icon-options'><MdUpdate/></span>
                                Update
                                <span className='object__options--item--action'>&gt;</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}