import React, {useContext, useEffect, useState} from "react"
import {FaShoppingBasket, FaVideo, FaWindowClose} from "react-icons/fa"
import CinemaCss from "./styles/cinema.scss"
import {DataContext} from "../../../../utils/data_transfer/dataManager";

function Cinema() {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
    const [showBuyTicketSection, setShowBuyTicketSection] = useState(false)
    const {cinemaId, change, setChange} = useContext(DataContext)
    const showOnClick = () => setShowBuyTicketSection(true)
    const hideOnClick = () => setShowBuyTicketSection(false)
    const [cinema, setCinema] = useState({})
    const [cinemaRoomsIds, setCinemaRoomsIds] = useState([])
    const [seances, setSeances] = useState([])

    const loadSingleCinema = async () => {
        await fetch(BASE_CINEMA_URL + `/${cinemaId}`)
            .then(response => response.json())
            .then(cinema => {
                setCinema(cinema.data)
            })
            .catch(err => console.log(err))
    }

    const loadCinemaRoomsIds = async () => {
        await fetch(BASE_CINEMA_URL + `/rooms/name/${cinema.id}`)
            .then(response => response.json())
            .then(cinemaRooms => {
                cinemaRooms.data.forEach(cinemaRoom => setCinemaRoomsIds([...cinemaRoomsIds, cinemaRoom.id]))
            })
            .catch(err => console.log(err))
    }

    const loadSeances = async () => {
        await cinemaRoomsIds.forEach((id, index) => {
            fetch(BASE_CINEMA_URL + `/movies/seances/${id}`)
                .then(response => response.json())
                .then(seances => {
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
    }, [])

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

    return (
        <div className='cinema__page'>
            <nav className='cinema__page--nav'>
                <h2 className='heading-secondary__name'>{cinema.name}</h2>
            </nav>
            <section className='cinema__page--section'>
                <ul className='cinema__page--cinemas-list'>
                    {
                        seances.length > 0 ?
                            seances.map((seance, idx) => {
                                return (
                                    <div>
                                        <div>
                                            <li key={seance.id}
                                                className={'cinema__page--cinemas-list--item row'}>
                                                <div>
                                                    <div className={'col span-1-of-2 font-link'}>
                                                        <h3 className='heading-secondary__name u-margin-bottom-tiny'>{seance.movie.title}</h3>
                                                        <h3 className='heading-tertiary__blue'>Genre:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.movie.genre}</h3>
                                                        <h3 className='heading-tertiary__blue'>Show date:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.date}</h3>
                                                        <h3 className='heading-tertiary__blue'>Duration:</h3>
                                                        <h3 className='heading-tertiary'>{seance.movie.duration} minutes</h3>
                                                    </div>
                                                    <div className={'col span-1-of-2 font-link'}>
                                                        <h3 className='heading-tertiary'>Cinema Room</h3>
                                                        <h3 className='heading-secondary__name u-margin-bottom-tiny'>{seance.cinemaRoom.name}</h3>
                                                        <h3 className='heading-tertiary__blue'>Rows:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.cinemaRoom.rows}</h3>
                                                        <h3 className='heading-tertiary__blue'>Places:</h3>
                                                        <h3 className='heading-tertiary u-margin-bottom-tiny'>{seance.cinemaRoom.places}</h3>
                                                        <button
                                                            className='buy__ticket--section__btn'
                                                            onClick={showOnClick}>
                                                            buy ticket
                                                        </button>
                                                        <div>
                                                            {showBuyTicketSection ?
                                                                <BuyTicketSection
                                                                    rows={seance.cinemaRoom.rows}
                                                                    places={seance.cinemaRoom.places}
                                                                    closePopup={hideOnClick}/>
                                                                : null}
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
                                    <h1 className='error-404__text'>There are any seances this cinema shows now</h1>
                                </div>
                            </div>
                    }
                </ul>
            </section>
        </div>
    )
}

const BuyTicketSection = (props) => {
    const [greenPlace, setGreenPlace] = useState([])
    const [showStatement, setShowStatement] = useState(false)

    const changeColor = (e, value) => {
        const greenPlaceCopy = [...greenPlace]

        if (greenPlace.length >= 6 && !e.target.className.includes('greenTd')) {
            setShowStatement(true)
        } else {
            if (greenPlaceCopy.includes(value)) {
                setGreenPlace([...greenPlaceCopy.filter(val => val !== value)])
            } else {
                greenPlaceCopy.push(value)
                setGreenPlace([...greenPlaceCopy])
            }
        }
    }

    const generateValueForTable = (x, y) => {
        return x === 0 ? y + 1 : (y + 1) + (x * 10)
    }

    return (
        <div className='popup'>
            <div className='popup__inside'>
                 <span className='popup__inside--close'
                       onClick={props.closePopup}
                 >&#10005;</span>
                <div className='buy__ticket--section'>
                    <div className='buy__ticket--section__places'>
                        <h3 className='heading-tertiary'>Select and book your seat</h3>
                        <table className='buy__ticket--section__table u-margin-bottom-tiny'>
                            <tbody>
                            {
                                [...Array(props.rows)].map((row, rowIdx) =>
                                    <tr key={rowIdx}>
                                        {
                                            [...Array(props.places)].map((place, idx) =>
                                                <td key={rowIdx === 0 ? idx + 1 : (idx + 1) + (rowIdx * 10)}
                                                    className={`buy__ticket--section__table--seat
                                                    ${greenPlace.includes(rowIdx + 1 > 1 ? (idx + 1) + (rowIdx * 10) : idx + 1) ?
                                                        'greenTd' :
                                                        'whiteTd'}`}
                                                    onClick={(e) => {
                                                        changeColor(e, rowIdx + 1 > 1 ? (idx + 1) + (rowIdx * 10) : idx + 1)
                                                    }
                                                    }>{generateValueForTable(rowIdx, idx)}</td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div>
                            <div>
                                <h3 className='heading-tertiary'>Choosen places:</h3>
                                {
                                    [...greenPlace].map((place, idx) =>
                                        <div className='buy__ticket--section__selected-place'>{place}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='u-margin-top-small'>
                        <button className='buy__ticket--section__btn'>buy</button>
                    </div>
                    {
                        showStatement ?
                            <div className='error-statement'>
                                <h3 className='heading-tertiary'>You cannot buy more than 6 tickets</h3>
                                <button
                                    onClick={() => {
                                        setShowStatement(false)
                                    }}
                                    className='error-statement__btn'>
                                    Ok
                                </button>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Cinema