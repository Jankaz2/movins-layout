import AdminPageScss from './styles/adminPage.scss'
import GridScss from '../../../utils/grid/grid.scss'
import React, {useState, useEffect, useContext} from "react";
import {DataContext} from "../../../utils/data_transfer/dataManager";
import {FaGlobe, FaVideo} from "react-icons/fa";
import Select from 'react-select'

const BASE_URL = 'http://localhost:5000/cinema'


const AdminPage = () => {
    const [showCreateCinema, setShowCreateCinema] = useState(false)
    const [showCreateNewAdmin, setShowCreateNewAdmin] = useState(false)
    const [showAllCinemas, setShowAllCinemas] = useState(false)
    const [showAllUsers, setShowAllUsers] = useState(false)
    const [showAddCinemaRoomToCinema, setShowAddCinemaRoomToCinema] = useState(false)

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
                        <h3 className="heading-tertiary">Add cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolorum, enim est, fuga, fugit id minus nihil nobis
                            officiis optio praesentium quae ut. Aut distinctio error eum
                            fuga, in inventore ipsam!
                        </p>
                        <button className="menu-section__button">Create</button>
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
        </div>
    )
}

export default AdminPage

const AddCinemaPopup = (props) => {
    const [cinemaName, setCinemaName] = useState({name: ""})
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
    const [cinemaRooms, setCinemaRoomsArray] = useState([])

    const addCinema = async (cinema) => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(cinema),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json();
    }

    const submit = (e) => {
        e.preventDefault()
        setCinemaRoomsArray(array => [...array, cinemaRoomSingleObject])

        const mergedCinema = {
            ...cinemaName,
            address,
            cinemaRooms
        }

        addCinema(mergedCinema)
        setCinemaName('')
        setAddress({city: '', street: '', number: ''})
        setCinemaRoomSingleObject({name: '', rows: '', places: ''})
        setCinemaRoomsArray([])
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
                                    <input className='primary-input popup__input'
                                           type="text" id='name'
                                           onChange={handleNameChange}
                                           value={cinemaName.name}
                                           placeholder='Name'/>
                                    <label htmlFor="city">City</label>
                                    <input className='primary-input popup__input'
                                           type="text" id='city'
                                           onChange={handleAddressChange}
                                           value={address.city}
                                           placeholder='City'/>
                                    <label htmlFor="street">Street</label>
                                    <input className='primary-input popup__input'
                                           type="text" id='street'
                                           onChange={handleAddressChange}
                                           value={address.street}
                                           placeholder='Street'/>
                                    <label htmlFor="number">Number</label>
                                    <input className='primary-input popup__input'
                                           type="number" id='number'
                                           onChange={handleAddressChange}
                                           value={address.number}
                                           placeholder='Number'/>
                                </div>
                                <div className="col span-1-of-2">
                                    <label htmlFor="name">Cinema Room name</label>
                                    <input className='primary-input popup__input'
                                           type="text" id='name'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.name}
                                           placeholder='Name'/>
                                    <label htmlFor="rows">Rows</label>
                                    <input className='primary-input popup__input'
                                           type="number" id='rows'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.rows}
                                           placeholder='Rows'/>
                                    <label htmlFor="places">Places</label>
                                    <input className='primary-input popup__input'
                                           type="number" id='places'
                                           onChange={handleCinemaRoomsChange}
                                           value={cinemaRoomSingleObject.places}
                                           placeholder='Places'/>
                                    <input className='popup__input--submit'
                                           type="submit" id='submit'
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
    const {cinemas, setCinemas} = useContext(DataContext)
    const [cinemaRoom, setCinemaRoom] = useState({
        name: "",
        rows: "",
        places: ""
    })
    const [cinemaName, setCinemaName] = useState("")

    const options = []
    cinemas.forEach(cinema => {
        options.push({value: cinema.name, label: cinema.name})
    })

    const handleChange = e => {
        const newCinemaRoom = {...cinemaRoom}
        newCinemaRoom[e.target.id] = e.target.value
        setCinemaRoom(newCinemaRoom)
    }

    const onSelectChange = (e) => {
        setCinemaName(e.value)
    }

    const addCinemaRoom = async (cinemaRoom, cinemaName) => {
        const cinemaRooms = []
        cinemaRooms.push(cinemaRoom)

        const response = await fetch(BASE_URL + `/${cinemaName}`,
            {
                method: 'PATCH',
                body: JSON.stringify(cinemaRooms),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

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
                                        //inputValue={cinemaName}
                                        options={options}
                                        onChange={onSelectChange}
                                        id='name'
                                />
                                <label htmlFor="name">Cinema room name</label>
                                <input className='primary-input popup__input' type="text" id="name"
                                       onChange={handleChange}
                                       value={cinemaRoom.name}
                                       placeholder=''/>
                                <label htmlFor="rows">Cinema room rows number</label>
                                <input className='primary-input popup__input' type="number" id="rows"
                                       onChange={handleChange}
                                       value={cinemaRoom.rows}
                                       placeholder=''/>
                                <label htmlFor="places">Cinema room places number</label>
                                <input className='primary-input popup__input' type="number" id="places"
                                       onChange={handleChange}
                                       value={cinemaRoom.places}
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
    const {cinemas, setCinemas} = useContext(DataContext)

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
                                <th>Pos.</th>
                                <th>Cinema name</th>
                                <th>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                cinemas.map((cinema, idx) => {
                                    return (
                                        <tr key={cinema.id}>
                                            <td>{idx + 1}</td>
                                            <td>{cinema.name}</td>
                                            <td>{cinema.address.city}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

const ShowAllUsersPopup = (props) => {
    const [users, setUsers] = useState([])

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
                            </tr>
                            </thead>
                            <tbody>
                            {

                                users.map((user, idx) => {
                                    return (
                                        <tr key={user.id}>
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
        </div>
    )
}