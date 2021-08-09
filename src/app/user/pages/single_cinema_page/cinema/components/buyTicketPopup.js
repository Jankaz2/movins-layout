import React, {useContext, useEffect, useState} from "react";
import CinemaScss from '../styles/cinema.scss'
import StatementScss from '../../../../../styles/scss/utils/statement.scss'
import {DataContext} from "../../../../../utils/data/dataManager";


const BuyTicketSection = (props) => {
    const BASE_TICKET_URL = 'http://localhost:5000/tickets'
    const BASE_SEATS_URL = 'http://localhost:5000/cinema/seats'

    const seance = props.seance
    const rows = props.rows
    const places = props.places
    const finalArray = props.array
    const today = new Date()
    const days = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    const [greenPlace, setGreenPlace] = useState([{row: null, place: null}])
    const [showStatement, setShowStatement] = useState(false)
    const [showBuyStatement, setShowBuyStatement] = useState(false)
    const [choice, setChoice] = useState(false)
    const [currentlyBookedTickets, setCurrentlyBookedTickets] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])
    const [coordinates, setCoordinates] = useState({left: "", top: ""})

    const {setChange} = useContext(DataContext)

    const handleElementBooked = e => {
        setChange(true)

        const l = e.clientX + 'px'
        const t = e.clientY + 'px'
        const currentCell = e.currentTarget

        setCoordinates({left: l, top: t})
    }

    const loadSeats = async () => {
        await fetch(BASE_TICKET_URL)
            .then(response => response.json())
            .then(tickets => {
                tickets.data.forEach(newSeat => setBookedSeats(old => [...old, newSeat]))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        async function getData() {
            await loadSeats()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [currentlyBookedTickets])

    const changeColor = (e, row, place) => {
        const greenPlaceCopy = [...greenPlace]

        if (!e.target.className.includes('greyTd')) {
            if (greenPlace.length >= 7 && !e.target.className.includes('greenTd')) {
                setShowStatement(true)
            } else {
                if (greenPlaceCopy.filter(seat => seat.place === place).length > 0) {
                    setGreenPlace([...greenPlaceCopy.filter(seat => seat.place !== place)])
                } else {
                    greenPlaceCopy.push({row: row, place: place})
                    setGreenPlace([...greenPlaceCopy])
                }
            }
        }
    }

    const createTickets = (places) => {
        const tempTickets = []

        places.forEach(place =>
            tempTickets.push(
                {
                    userId: 91,
                    seanceId: seance.id,
                    seat: {
                        row: place.row,
                        place: place.place,
                        cinemaRoomId: seance.cinemaRoom.id,
                    },
                    price: 50,
                    purchaseDate: year + '-' + month + '-' + days
                }
            )
        )

        setCurrentlyBookedTickets(tempTickets)
        console.log(currentlyBookedTickets)
    }

        const orderTicket = async (tickets) => {
            for await (const ticket of tickets) {
                await fetch(BASE_TICKET_URL, {
                    method: 'POST',
                    body: JSON.stringify(ticket),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            setChange(false)
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
                                    [...Array(rows)].map((row, rowIdx) =>
                                        <tr key={rowIdx}>
                                            {
                                                [...Array(places)].map((place, placeIdx) =>
                                                    <td key={finalArray[rowIdx][placeIdx]}
                                                        className={`buy__ticket--section__table--seat
                                                    
                                                    ${typeof (bookedSeats) === 'undefined' ? null
                                                            : bookedSeats.filter(ticket =>
                                                                seance.cinemaRoom.id === ticket.seance.cinemaRoom.id &&
                                                                seance.movie.id === ticket.seance.movie.id &&
                                                                ticket.seat.row === rowIdx + 1 &&
                                                                ticket.seat.place === finalArray[rowIdx][[placeIdx]]).length > 0
                                                                ? 'greyTd'
                                                                : greenPlace.filter(seat => seat.place === finalArray[rowIdx][placeIdx]).length > 0
                                                                    ? 'greenTd'
                                                                    : 'whiteTd'}`}

                                                        onClick={(e) => changeColor(e, rowIdx + 1, finalArray[rowIdx][placeIdx])}
                                                    >{finalArray[rowIdx][placeIdx]}</td>
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
                                        [...greenPlace]
                                            .filter((seat, idx) => idx !== 0)
                                            .map((seat, idx) =>
                                                <div className='buy__ticket--section__selected-wrapper'>
                                                    <div className='buy__ticket--section__selected-row'>
                                                        <p className='buy__ticket--section__selected-row-p'>Row</p>
                                                        {seat.row}
                                                    </div>
                                                    <div className='buy__ticket--section__selected-place'>
                                                        <p className='buy__ticket--section__selected-place-p'>Place</p>
                                                        {seat.place}
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='u-margin-top-tiny'>
                            <button className='buy__ticket--section__btn'
                                    onClick={() => {
                                        setShowBuyStatement(true)
                                        createTickets(greenPlace)
                                    }}>
                                buy
                            </button>
                        </div>
                        {
                            showStatement ?
                                <div className='error-statement'>
                                    <h3 className='heading-tertiary'>You cannot buy more than 6 tickets</h3>
                                    <button
                                        onClick={() => setShowStatement(false)}
                                        className='error-statement__btn'>
                                        Ok
                                    </button>
                                </div>
                                : null
                        }
                    </div>
                    {
                        showBuyStatement ?
                            <div className='statement'>
                            <span className='statement--close'
                                  onClick={() => {
                                      setShowBuyStatement(false)
                                  }}
                            >&#10005;</span>
                                <p className='statement__text'>Do you really want to buy this ticket?</p>
                                <div className='statement__buttons'>
                                    <button className="statement__buttons--yes"
                                            onClick={() => {
                                                orderTicket(currentlyBookedTickets).catch(err => console.log(err))
                                                setShowBuyStatement(false)
                                            }}
                                    >Yes
                                    </button>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }

    export default BuyTicketSection