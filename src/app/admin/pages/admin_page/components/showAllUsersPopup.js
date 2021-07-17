import {DataContext} from "../../../../utils/data_transfer/dataManager";
import React, {useState, useEffect} from 'react'

const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

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

export default ShowAllUsersPopup