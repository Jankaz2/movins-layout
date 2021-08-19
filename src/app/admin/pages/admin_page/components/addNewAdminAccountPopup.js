import {DataContext} from "../../../../utils/store/appContext";
import React, {useState, useContext} from 'react'
import {ImHappy, ImSad} from "react-icons/all";

const AddNewAdminAccountPopup = (props) => {
    const BASE_USER_URL = 'http://localhost:5000/users'

    const {setChange} = useContext(DataContext)
    const [addAdminAccountResponse, setAddAdminAccountResponse] = useState({correct: false, error: false})
    const [userData, setUserData] = useState({
        username: '',
        age: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        role: 'ADMIN'
    })

    const handleChange = e => {
        const newAdminAccount = {...userData}

        newAdminAccount[e.target.id] = e.target.value
        setUserData(newAdminAccount)
    }

    const createAdminAccount = async (user) => {
        const response = await fetch(BASE_USER_URL + '/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            setAddAdminAccountResponse({error: true})
            return
        }

        setAddAdminAccountResponse({correct: true})
        setChange(true)
        return await response.json();
    }

    const handleSubmit = e => {
        e.preventDefault()

        createAdminAccount(userData).catch(err => console.log(err))
    }

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
                            <form action="" className="form form__add-cinema"
                                  onSubmit={handleSubmit}>
                                <label htmlFor="username">Username</label>
                                <input className='primary-input popup__input' type="text" id='username'
                                       onChange={handleChange}/>
                                <label htmlFor="street">Age</label>
                                <input className='primary-input popup__input' type="number" id='age'
                                       onChange={handleChange}/>
                                <label htmlFor="Email">Email</label>
                                <input className='primary-input popup__input' type="email" id='email'
                                       onChange={handleChange}/>
                                <label htmlFor="password">Password</label>
                                <input className='primary-input popup__input' type="password" id='password'
                                       onChange={handleChange}/>
                                <label htmlFor="repeat__password">Repeat password</label>
                                <input className='primary-input popup__input' type="password" id='password'
                                       onChange={handleChange}/>
                                <input className='popup__input--submit' type="submit" id='submit'
                                       value='create'/>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                addAdminAccountResponse.error &&
                <div className='error-statement'>
                    <div className='error-statement__top-section'>
                        <h3 className='heading-tertiary'>Something went wrong</h3>
                        <span className='error-statement__icon'><ImSad/></span>
                    </div>
                    <div className='error-statement__bottom-section'>
                        <button
                            onClick={() => setAddAdminAccountResponse({error: false})}
                            className='error-statement__btn'>
                            Ok
                        </button>
                    </div>
                </div>
            }
            {
                addAdminAccountResponse.correct &&
                <div className='correct-statement'>
                    <div className='correct-statement__top-section'>
                        <h3 className='heading-tertiary'>Admin has been added, let him check his email</h3>
                        <span className='correct-statement__icon'><ImHappy/></span>
                    </div>
                    <div className='correct-statement__bottom-section'>
                        <button
                            onClick={() => setAddAdminAccountResponse({correct: false})}
                            className='correct-statement__btn'>
                            Ok
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddNewAdminAccountPopup