import React, {useContext, useState} from "react"
import {FaShoppingBasket, FaVideo, FaWindowClose} from "react-icons/fa"
import CinemaCss from "./cinema.scss"
import {DataContext} from "../../../utils/data_transfer/dataManager";

function Cinema() {
    const [showBuyTicketSection, setShowBuyTicketSection] = useState(false)
    const showOnClick = () => setShowBuyTicketSection(true)
    const hideOnClick = () => setShowBuyTicketSection(false)
    const mockCinema = {
        id: 1,
        name: 'Cinema Under The Stars',
        address: {
            city: 'Poznan',
            street: 'Owocowa',
            number: 12
        },
        cinemaRooms: {
            name: "The Darkest",
            rows: 10,
            places: 100,
        },

        movies: [
            {
                id: 1,
                name: 'Harry Potter',
                genre: 'Fiction',
                description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae consequatur dignissimos impedit ipsam laborum numquam quidem, reiciendis unde vitae! At culpa distinctio eius et fugit labore laboriosam laborum libero magnam molestias non optio possimus ratione repudiandae sunt, vel vitae!'
            },
            {
                id: 2,
                name: 'Game of Thrones',
                genre: 'Fiction',
                description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae consequatur dignissimos impedit ipsam laborum numquam quidem, reiciendis unde vitae! At culpa distinctio eius et fugit labore laboriosam laborum libero magnam molestias non optio possimus ratione repudiandae sunt, vel vitae!'
            },
            {
                id: 3,
                name: 'Love',
                genre: 'Drama',
                description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae consequatur dignissimos impedit ipsam laborum numquam quidem, reiciendis unde vitae! At culpa distinctio eius et fugit labore laboriosam laborum libero magnam molestias non optio possimus ratione repudiandae sunt, vel vitae!'
            },
            {
                id: 4,
                name: 'Sherlock Holmes',
                genre: 'Fiction',
                description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae consequatur dignissimos impedit ipsam laborum numquam quidem, reiciendis unde vitae! At culpa distinctio eius et fugit labore laboriosam laborum libero magnam molestias non optio possimus ratione repudiandae sunt, vel vitae!'
            },
            {
                id: 5,
                name: 'The Lord of Rings',
                genre: 'Fiction',
                description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae consequatur dignissimos impedit ipsam laborum numquam quidem, reiciendis unde vitae! At culpa distinctio eius et fugit labore laboriosam laborum libero magnam molestias non optio possimus ratione repudiandae sunt, vel vitae!'
            },
        ]
    }

    return (
        <div className={'cinema-page'}>
            <nav>
                <h2 className={'font-link'}>{mockCinema.name}</h2>
            </nav>
            <section className={'cinema-section'}>
                <ul>
                    {
                        mockCinema.movies.map((movie, idx) => {
                            return (
                                <div>
                                    <div>
                                        <li key={movie.id} className={'row'}>
                                            <div>
                                                <div className={'col span-1-of-2 font-link'}>
                                                    <h4>Title: {movie.name}</h4><br/>
                                                    <h4>Genre: {movie.genre}</h4>
                                                    <br/><br/>
                                                    <button
                                                        className={'buy-ticket-btn'}
                                                        onClick={showOnClick}
                                                    >
                                                        buy ticket
                                                    </button>
                                                </div>
                                                <div className={'col span-1-of-2 font-link'}>
                                                    <h4>Description</h4>
                                                    <br/>
                                                    <p>{movie.description}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <div>
                                            {showBuyTicketSection ?
                                                <BuyTicketSection
                                                    rows={mockCinema.cinemaRooms.rows}
                                                    places={mockCinema.cinemaRooms.places}
                                                    closePopup={hideOnClick}/>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </section>
        </div>
    )
}

const BuyTicketSection = (props) => {
    const [greenPlace, setGreenPlace] = useState([])
    const [showStatement, setShowStatement] = useState(false)
    const [redPlace, setRedPlace] = useState()
    const placesInRow = parseInt(props.places / props.rows)

    const changeColor = (e, value) => {
        const greenPlaceCopy = [...greenPlace]

        if (greenPlace.length >= 3 && e.target.className !== 'greenTd') {
            setShowStatement(true)
        } else {
            if (greenPlaceCopy.includes(value)) {
                setGreenPlace([...greenPlaceCopy.filter(val => val !== value)])
            } else {
                greenPlaceCopy.push(value)
                setGreenPlace([...greenPlaceCopy])
            }
        }
        console.log(greenPlace)
    }

    return (
        <div className={'popup font-link'}>
            <span
                className={'icon-small'}
                onClick={props.closePopup}
            ><FaWindowClose/></span>
            <div className={'popup-inner'}>
                <div>
                    <div className={'cinema-places col span-1-of-2'}>
                        <h3>Select and book your seat</h3>
                        {/*  <div className={'screen'}><p>screen</p></div>*/}
                        <table className='seats-table'>
                            <tbody>
                            {
                                [...Array(props.rows)].map((row, rowIdx) =>
                                    <tr key={rowIdx}>
                                        {
                                            [...Array(placesInRow)].map((x, idx) =>
                                                <td key={rowIdx + 1 > 1 ? (idx + 1) + (rowIdx * 10) : idx + 1}
                                                    className={`${greenPlace.includes(rowIdx + 1 > 1 ? (idx + 1) + (rowIdx * 10) : idx + 1) ?
                                                        'greenTd' :
                                                        'whiteTd'}`}
                                                    onClick={(e) =>
                                                        changeColor(e, rowIdx + 1 > 1 ? (idx + 1) + (rowIdx * 10) : idx + 1)
                                                    }
                                                >{rowIdx + 1 > 1 ? (idx + 1) + (rowIdx * 10) : idx + 1}
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={'cinema-buying-section col span-1-of-2'}>
                        <div>
                            <div className={'col span-1-of-2'}>
                                <h4>Choosen row: </h4><br/>
                                <div>
                                    {
                                        [...greenPlace].map((place, idx) =>
                                            <div
                                                className={'selected-place'}>{
                                                place < 100 ?
                                                    place < 10 ?
                                                        parseInt(place / 10) + 1 :
                                                        parseInt(place / 10) :
                                                    place % 10 === 0 ? parseInt((place - 1) / 10) :
                                                        parseInt(place / 10)
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={'col span-1-of-2'}>
                                <h4>Choosen place:</h4><br/>
                                <div>
                                    {
                                        [...greenPlace].map((place, idx) =>
                                            <div className={'selected-place'}>{place}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <button
                            className={'buy-ticket-btn-buying-section'}
                        >
                            buy
                            <span className={'icon-small-shopping'}><FaShoppingBasket/></span>
                        </button>
                    </div>
                    {
                        showStatement ?
                            <div className={'error-statement'}>
                                <h2>You cannot buy more than 3 tickets</h2>
                                <button
                                    onClick={() => {
                                        setShowStatement(false)
                                    }}
                                >
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