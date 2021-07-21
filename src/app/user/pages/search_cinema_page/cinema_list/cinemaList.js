import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"
import HomePage from "../../home_page/header/homePage"
import CinemasListCss from "./cinemasList.scss"
import {DataContext} from "../../../../utils/data_transfer/dataManager";

const CinemasList = () => {
    const {transferredCinemas} = useContext(DataContext)

    return (
        <div className="cinemas-list-section">
            <div className='cinemas-list-section__logo'>
                <Link to="/">
                    <span className='cinemas-list-section__logo--text'>Movins</span>
                </Link>
            </div>
            <ul>
                {
                    transferredCinemas.length > 0 ?
                        transferredCinemas.map((cinema, idx) => {
                            return (
                                <Link to={`/cinema-list/cinema/${cinema.id}`}>
                                    <li key={cinema.id}
                                        className='cinemas-list-section__item row'>

                                        <div className='col span-1-of-2'>
                                            <h2 className='heading-secondary__name'>{cinema.name}</h2>
                                            <h3 className='heading-tertiary__blue'>City:</h3>
                                            <h3 className='heading-tertiary'>{cinema.address.city}</h3>
                                            <div className='u-margin-bottom-tiny'></div>
                                            <h3 className='heading-tertiary__blue'>Street:</h3>
                                            <h3 className='heading-tertiary'>{cinema.address.street} {cinema.address.number}</h3>
                                        </div>
                                        <div className='border-line'></div>
                                        <div className='col span-1-of-2'>
                                            <h2 className='heading-secondary__name'>Cinema Rooms</h2>
                                            {
                                                cinema.cinemaRooms.map((cinemaRoom, idx) => {
                                                    return (
                                                        <div>
                                                            <h3 className='heading-tertiary__pink'>{cinemaRoom.name}</h3>
                                                            <h3 className='heading-tertiary'>Rows: {cinemaRoom.rows}</h3>
                                                            <h3 className='heading-tertiary'>Places: {cinemaRoom.places}</h3>
                                                            <div className='u-margin-bottom-tiny'></div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                        :
                        <div className='error-404'>
                            <h1 className='error-404__text'>404 Not Found</h1>
                            <h1 className='error-404__text'>There is not cinema you are looking for</h1>
                        </div>
                }
            </ul>
        </div>
    )
}

export default CinemasList