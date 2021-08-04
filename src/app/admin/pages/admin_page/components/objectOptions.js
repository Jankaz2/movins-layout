import {DataContext} from "../../../../utils/data_transfer/dataManager";
import {MdDeleteForever, MdUpdate} from "react-icons/md";
import React, {useState, useContext} from 'react'

const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

const ObjectOptions = props => {
    const [deleteStatement, setDeleteStatement] = useState(false)
    const {setChange} = useContext(DataContext)

    const deleteCinema = async (cinemaId) => {
        console.log(cinemaId)
        const response = await fetch(BASE_CINEMA_URL + `/${cinemaId}`,
            {method: 'DELETE'})

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
        </div>
    )
}

export default ObjectOptions