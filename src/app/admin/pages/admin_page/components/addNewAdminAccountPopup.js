import {DataContext} from "../../../../utils/data_transfer/dataManager";
import React, {useState, useContext} from 'react'

const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
const BASE_USER_URL = 'http://localhost:5000/user'

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
                                <input className='primary-input popup__input' type="text" id='username'/>
                                <label htmlFor="street">Age</label>
                                <input className='primary-input popup__input' type="number" id='age'/>
                                <label htmlFor="Email">Email</label>
                                <input className='primary-input popup__input' type="email" id='email'/>
                                <label htmlFor="password">Password</label>
                                <input className='primary-input popup__input' type="password" id='password'/>
                                <label htmlFor="repeat__password">Repeat password</label>
                                <input className='primary-input popup__input' type="password" id='password'/>
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

export default AddNewAdminAccountPopup