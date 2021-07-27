import React, {useState} from "react";
import CinemaScss from '../styles/cinema.scss'

const BuyTicketSection = (props) => {
    const rows = props.rows
    const places = props.places
    const finalArray = props.array

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
                                                    ${greenPlace.includes(finalArray[rowIdx][placeIdx]) ? 'greenTd' : 'whiteTd'}`}
                                                    onClick={(e) => {
                                                        changeColor(e, finalArray[rowIdx][placeIdx])
                                                    }
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