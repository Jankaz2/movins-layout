import React, {useState} from "react";
import CinemaScss from '../styles/cinema.scss'

const BuyTicketSection = (props) => {
    const BASE_TICKET_URL = 'http://localhost:5000/tickets'
    const seance = props.seance
    const rows = props.rows
    const places = props.places
    const finalArray = props.array

    const [greenPlace, setGreenPlace] = useState([{row: null, place: null}])
    const [showStatement, setShowStatement] = useState(false)

    const changeColor = (e, row, place) => {
        const greenPlaceCopy = [...greenPlace]

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

    const orderTicket = async (data) => {
        const response = await fetch(BASE_TICKET_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json();
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
                                                    ${greenPlace.filter(seat => seat.place === finalArray[rowIdx][placeIdx]).length > 0 ? 
                                                        'greenTd' : 'whiteTd'}`}
                                                    onClick={(e) => changeColor(e, rowIdx + 1, finalArray[rowIdx][placeIdx])
                                                    }>{finalArray[rowIdx][placeIdx]}</td>
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
                                        <div className='buy__ticket--section__selected-place'>{seat.place}</div>
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
                                    onClick={() => setShowStatement(false)}
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

export default BuyTicketSection