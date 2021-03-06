import React, {useContext, useEffect, useState} from "react"
import BuyTicketSection from "./buyTicketPopup";
import {DataContext} from "../../../../../utils/store/appContext";
import {ImSad} from "react-icons/im";

function Cinema(props) {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
    const {cinemaId, change, setChange, loader, showLoader, hideLoader, authContextValue} = useContext(DataContext)
    const userId = authContextValue.id

    const [showBuyTicketSection, setShowBuyTicketSection] = useState(false)
    const [cinema, setCinema] = useState({})
    const [cinemaRoomsIds, setCinemaRoomsIds] = useState([])
    const [seances, setSeances] = useState([])
    const [transferData, setTransferData] = useState({
        rows: null, places: null,
        userId: userId,
        seance: null,
        ticketPrice: 0
    })
    const [isLoggedInError, setIsLoggedInError] = useState(false)

    const showOnClick = () => setShowBuyTicketSection(true)
    const hideOnClick = () => setShowBuyTicketSection(false)

    const loadSingleCinema = async () => {
        showLoader()
        await fetch(BASE_CINEMA_URL + `/${cinemaId}`)
            .then(response => response.json())
            .then(cinema => {
                hideLoader()
                setCinema(cinema.data)
            })
            .catch(err => console.log(err))
    }

    const loadCinemaRoomsIds = async () => {
        showLoader()
        await fetch(BASE_CINEMA_URL + `/rooms/name/${cinema.id}`)
            .then(response => response.json())
            .then(cinemaRooms => {
                hideLoader()
                cinemaRooms.data.forEach(cinemaRoom => setCinemaRoomsIds([...cinemaRoomsIds, cinemaRoom.id]))
            })
            .catch(err => console.log(err))
    }

    const loadSeances = async () => {
        showLoader()
        await cinemaRoomsIds.forEach((id, index) => {
            fetch(BASE_CINEMA_URL + `/movies/seances/${id}`)
                .then(response => response.json())
                .then(seances => {
                    hideLoader()
                    seances.data.forEach(newSeance => setSeances(old => [...old, newSeance]))
                })
                .catch(err => console.log(err))
        })
    }

    useEffect(() => {
        async function getData() {
            await loadSingleCinema()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [change])

    useEffect(() => {
        async function getData() {
            await loadCinemaRoomsIds()
        }

        getData().catch(err => console.log(err))
    }, [cinema])

    useEffect(() => {
        async function getData() {
            await loadSeances()
        }

        getData().catch(err => console.log(err))
    }, [cinemaRoomsIds])

    const generateArray = (rows, places) => {
        const howManyPlaces = rows * places
        const placesArray = Array(howManyPlaces).fill().map((_, idx) => 1 + idx)
        const finalArray = []

        while (placesArray.length) finalArray.push(placesArray.splice(0, places))

        return finalArray
    }

    let ticketPrice
    const generatePrice = (min, max) => {
        ticketPrice = ((Math.random() * (max - min + 1)) + min).toFixed(2)
        return ticketPrice
    }

    return (
        <div className='cinema__page'>
            <span className='cinema__page--back'
                  onClick={() => props.history.goBack()}
            >&larr;</span>
            <nav className='cinema__page--nav'>
                <h2 className='heading-secondary__name'>{cinema.name}</h2>
            </nav>
            <section className='cinema__page--section'>
                <ul className='cinema__page--cinemas-list'>
                    {
                        seances.length > 0 ?
                            seances.map((seance, _) => {
                                return (
                                    <div>
                                        <div>
                                            <li key={seance.id}
                                                className={'cinema__page--cinemas-list--item row'}>
                                                <div>
                                                    <div
                                                        className={'col-1-of-2 cinema__page--cinemas-list--item--info'}>
                                                        <h3 className='heading-tertiary'>Title</h3>
                                                        <h3 className='heading-secondary__name u-margin-bottom-tiny'>{seance.movie.title}</h3>
                                                        <h3 className='heading-tertiary__blue'>Genre:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.movie.genre}</h3>
                                                        <h3 className='heading-tertiary__blue'>Show date:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.date}</h3>
                                                        <h3 className='heading-tertiary__blue'>Duration:</h3>
                                                        <h3 className='heading-tertiary'>{seance.movie.duration} minutes</h3>
                                                    </div>
                                                    <div className={'col-1-of-2'}>
                                                        <h3 className='heading-tertiary'>Cinema Room</h3>
                                                        <h3 className='heading-secondary__name u-margin-bottom-tiny'>{seance.cinemaRoom.name}</h3>
                                                        <h3 className='heading-tertiary__blue'>Rows:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.cinemaRoom.rows}</h3>
                                                        <h3 className='heading-tertiary__blue'>Places:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.cinemaRoom.places}</h3>
                                                        <h3 className='heading-tertiary__blue'>Price:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{generatePrice(10, 50)}</h3>
                                                        <button
                                                            className='buy__ticket--section__btn'
                                                            onClick={() => {
                                                                if (authContextValue.isLoggedIn) {
                                                                    setTransferData({
                                                                        rows: seance.cinemaRoom.rows,
                                                                        places: seance.cinemaRoom.places,
                                                                        seance: seance,
                                                                        ticketPrice: ticketPrice
                                                                    })

                                                                    showOnClick()
                                                                } else {
                                                                    setIsLoggedInError(true)
                                                                }
                                                            }}>
                                                            buy ticket
                                                        </button>
                                                        <div>
                                                            {
                                                                showBuyTicketSection ?
                                                                    <BuyTicketSection
                                                                        rows={transferData.rows}
                                                                        places={transferData.places}
                                                                        seance={transferData.seance}
                                                                        ticketPrice={ticketPrice}
                                                                        array={generateArray(transferData.rows, transferData.places)}
                                                                        closePopup={hideOnClick}/>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                )
                            }) :
                            <div>
                                <div className='error-404'>
                                    <h1 className='error-404__text'>404 Not Found</h1>
                                    <h1 className='error-404__text'>There are any seances {cinema.name} shows now</h1>
                                </div>
                            </div>
                    }
                </ul>
                {loader}
                {
                    isLoggedInError &&
                    <div className='error-statement'>
                        <div className='error-statement__top-section'>
                            <h3 className='heading-tertiary'>You need to be logged in to buy the ticket</h3>
                            <span className='error-statement__icon'><ImSad/></span>
                        </div>
                        <div className='error-statement__bottom-section'>
                            <button
                                onClick={() => setIsLoggedInError(false)}
                                className='error-statement__btn'>
                                Try again
                            </button>
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}

export default Cinema