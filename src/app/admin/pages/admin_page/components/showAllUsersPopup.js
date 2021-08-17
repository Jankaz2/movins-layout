import {DataContext} from "../../../../utils/store/appContext";
import React, {useState, useEffect, useContext} from 'react'
import ObjectOptions from "./objectOptions";

const ShowAllUsersPopup = (props) => {
    const BASE_USERS_URL = 'http://localhost:5000/users'
    const {change, setChange} = useContext(DataContext)
    const [users, setUsers] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [coordinates, setCoordinates] = useState({left: "", top: ""})
    const [userInfoToDelete, setUserInfoToDelete] = useState({id: 0, username: "", email: ""})
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const rowData = row => {
        const data = []
        for (let j in row.cells) {
            if (row.cells.hasOwnProperty(j)) {
                const col = row.cells[j]
                data.push(col.firstChild.nodeValue)
            }
        }
        setUserInfoToDelete({id: data[0], username: data[1], email: data[2]})
    }

    const handleElementClick = e => {
        setChange(true)
        setShowOptions(true)

        const l = e.clientX + 'px'
        const t = e.clientY + 'px'
        const currentRow = e.currentTarget

        rowData(currentRow)
        setCoordinates({left: l, top: t})
    }

    const loadData = async () => {
        await fetch(BASE_USERS_URL)
            .then(response => response.json())
            .then(users => {
                setUsers(users.data)
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        e.preventDefault()
        if (e.target.className.match('cinema-admin-username-input')) {
            setUsername(e.target.value)
        }
        if (e.target.className.match('cinema-admin-email-input')) {
            setEmail(e.target.value)
        }
    }

    useEffect(() => {
        async function getData() {
            await loadData()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [change])

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
                            <tr>
                                <td></td>
                                <td>
                                    <input className='data-list-admin--search cinema-admin-username-input'
                                           type="search"
                                           value={username}
                                           onChange={handleChange}
                                           placeholder='Search...'
                                    />
                                </td>
                                <td></td>
                                <td>
                                    <input className='data-list-admin--search cinema-admin-email-input'
                                           type="search"
                                           value={email}
                                           onChange={handleChange}
                                           placeholder='Search...'
                                    />
                                </td>
                            </tr>
                            {

                                users.map((user, idx) => {
                                    return (
                                        <tr key={user.id}
                                            onClick={handleElementClick}
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
                    <ObjectOptions showOptions={showOptions} setShowOptions={setShowOptions}
                                   coordinates={coordinates} setCoordinates={setCoordinates}
                                   userInfoToDelete={userInfoToDelete}
                                   setUserInfoToDelete={setUserInfoToDelete}
                    />
                </div>
            }
        </div>
    )
}

export default ShowAllUsersPopup