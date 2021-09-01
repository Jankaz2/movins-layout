import {DataContext} from "../../../../utils/store/appContext";
import {MdDeleteForever} from "react-icons/md";
import React, {useState, useContext} from 'react'
import {ImHappy, ImSad} from "react-icons/im";

const ObjectOptions = props => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
    const BASE_USERS_URL = 'http://localhost:5000/users'

    const [deleteStatement, setDeleteStatement] = useState(false)
    const [deleteCinemaResponse, setDeleteCinemaResponse] = useState({correct: false, error: false})
    const [deleteUserResponse, setDeleteUserResponse] = useState({correct: false, error: false})
    const {setChange} = useContext(DataContext)
    console.log(props.showOptions)
    console.log(props.showUserOptions)
    const deleteCinema = async (cinemaId) => {
        const response = await fetch(BASE_CINEMA_URL + `/admin/${cinemaId}`,
            {method: 'DELETE'})

        if (!response.ok) {
            setDeleteCinemaResponse({error: true})
            return;
        }
        setDeleteCinemaResponse({correct: true})
        setChange(true)
        return await response.json()
    }

    const deleteUser = async (userId) => {
        const response = await fetch(BASE_USERS_URL + `/admin/${userId}`,
            {method: 'DELETE'})

        if (!response.ok) {
            setDeleteUserResponse({error: true})
            return;
        }
        setDeleteUserResponse({correct: true})
        setChange(true)
        return await response.json()
    }

    return (
        <div>
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
                                                    Do you really want to
                                                    delete {props.cinemaInfoToDelete.name} cinema permanently?
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
                            </ul>
                        </div>
                    </div>
                }
                {
                    deleteCinemaResponse.error &&
                    <div className='error-statement'>
                        <div className='error-statement__top-section'>
                            <h3 className='heading-tertiary'>Something went wrong</h3>
                            <span className='error-statement__icon'><ImSad/></span>
                        </div>
                        <div className='error-statement__bottom-section'>
                            <button
                                onClick={() => setDeleteCinemaResponse({error: false})}
                                className='error-statement__btn'>
                                Ok
                            </button>
                        </div>
                    </div>
                }
                {
                    deleteCinemaResponse.correct &&
                    <div className='correct-statement'>
                        <div className='correct-statement__top-section'>
                            <h3 className='heading-tertiary'>Cinema has been deleted</h3>
                            <span className='correct-statement__icon'><ImHappy/></span>
                        </div>
                        <div className='correct-statement__bottom-section'>
                            <button
                                onClick={() => setDeleteCinemaResponse({correct: false})}
                                className='correct-statement__btn'>
                                Ok
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div>
                {
                    props.showUserOptions &&
                    <div>
                        <div className='object__options' id='object__options__id'
                             style={props.coordinates}>
                    <span className='object__options--close'
                          onClick={() => {
                              props.setShowUserOptions(!props.showUserOptions)
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
                                                    Do you really want to
                                                    delete {props.userInfoToDelete.username} permanently?
                                                </p>
                                                <button
                                                    className='object__options--delete--statement-btn object__options--delete--statement-btn--yes'
                                                    onClick={() => {
                                                        deleteUser(props.userInfoToDelete.id)
                                                        props.setShowUserOptions(!props.showUserOptions)
                                                        setDeleteStatement(!deleteStatement)
                                                    }}>
                                                    Yes
                                                </button>
                                                <button
                                                    className='object__options--delete--statement-btn object__options--delete--statement-btn--cancel'
                                                    onClick={() => {
                                                        props.setShowUserOptions(!props.showUserOptions)
                                                        setDeleteStatement(!deleteStatement)
                                                    }}>
                                                    Cancel
                                                </button>
                                            </li>
                                        </ul>
                                    }
                                </li>
                            </ul>
                        </div>
                        {
                            deleteUserResponse.error &&
                            <div className='error-statement'>
                                <div className='error-statement__top-section'>
                                    <h3 className='heading-tertiary'>Something went wrong</h3>
                                    <span className='error-statement__icon'><ImSad/></span>
                                </div>
                                <div className='error-statement__bottom-section'>
                                    <button
                                        onClick={() => setDeleteUserResponse({error: false})}
                                        className='error-statement__btn'>
                                        Ok
                                    </button>
                                </div>
                            </div>
                        }
                        {
                            deleteUserResponse.correct &&
                            <div className='correct-statement'>
                                <div className='correct-statement__top-section'>
                                    <h3 className='heading-tertiary'>User has been deleted</h3>
                                    <span className='correct-statement__icon'><ImHappy/></span>
                                </div>
                                <div className='correct-statement__bottom-section'>
                                    <button
                                        onClick={() => setDeleteUserResponse({correct: false})}
                                        className='correct-statement__btn'>
                                        Ok
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ObjectOptions