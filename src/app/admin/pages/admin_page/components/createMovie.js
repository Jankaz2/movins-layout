import React, {useState, useContext, useEffect} from 'react'
import {DataContext} from "../../../../utils/store/appContext";
import useLoadPage from "../../../../utils/hooks/useLoadPage";
import Select from "react-select";
import {ImHappy, ImSad} from "react-icons/im";

const CreateMovie = (props) => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

    const prices = JSON.parse(localStorage.getItem('prices'))

    const [createMovieResponse, setCreateMovieResponse] = useState({correct: false, error: false})
    const [movieData, setMovieData] = useState({
        title: '',
        genre: '',
        duration: '',
        releaseDate: ''
    })
    const [seances, setSeances] = useState([])
    const [seanceSingleObject, setSeanceSingleObject] = useState({date: ''})
    const [cinemaRooms, setCinemaRooms] = useState([])
    const [cinemaRoomData, setCinemaRoomData] = useState({name: '', id: null})
    const [ticketPrice, setTicketPrice] = useState({movieTile: '', price: '', finalObj: ''})

    const {change, setChange} = useContext(DataContext)

    const loadCinemaRooms = async () => {
        await fetch(BASE_CINEMA_URL + '/rooms')
            .then(response => response.json())
            .then(cinemaRooms => {
                setCinemaRooms(cinemaRooms.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        async function getData() {
            await loadCinemaRooms()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [change])

    const options = []
    cinemaRooms.forEach(cinemaRoom => {
        options.push({value: cinemaRoom.id, label: cinemaRoom.name})
    })

    const addMovie = async (movie, cinemaRoomId) => {
        const response = await fetch(BASE_CINEMA_URL + `/movies/admin/${cinemaRoomId}`, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            setCreateMovieResponse({correct: false, error: true})
            return
        }
        prices.push(ticketPrice.finalObj)
        localStorage.setItem('prices', JSON.stringify(prices))
        setCreateMovieResponse({correct: true, error: false})
        setChange(true)
        return await response.json();
    }

    const submit = (e) => {
        e.preventDefault()

        const seances = []
        seances.push(seanceSingleObject)

        const mergedMovie = {
            ...movieData,
            seances
        }

        addMovie(mergedMovie, cinemaRoomData.id).catch(err => console.log(err))
        setMovieData({
            title: '',
            genre: '',
            duration: '',
            releaseDate: ''
        })
        setSeances([])
    }

    const handleMovieChange = e => {
        const newMovie = {...movieData}
        newMovie[e.target.id] = e.target.value

        setMovieData(newMovie)
    }

    const handleSeanceChange = e => {
        const newSeance = {...seanceSingleObject}

        newSeance[e.target.id] = e.target.value
        setSeanceSingleObject(newSeance)
    }

    const handlePriceChange = e => {
        setTicketPrice({
            movieTitle: movieData.title,
            price: e.target.value,
            finalObj: movieData.title + '.' + e.target.value
        })
    }

    const onSelectChange = (e) => {
        setCinemaRoomData({name: e.label, id: e.value})
    }

    return (
        <div>
            {
                props.showCreateMovie &&
                <div className='popup'>
                    <div className="popup__inside">
                        <span className='popup__inside--close'
                              onClick={() => props.setShowCreateMovie(!props.showCreateMovie)}
                        >&#10005;</span>
                        <div className="row">
                            <form
                                onSubmit={(e) => submit(e)}
                                action=""
                                className="form form__add-cinema">
                                <label htmlFor="cinema-rooms">Cinema room</label>
                                <Select className='react-select react-select__update' name=""
                                        options={options}
                                        onChange={onSelectChange}
                                        id='cinema-rooms'
                                />

                                <label htmlFor="title">Title</label>
                                <input className='primary-input popup__input'
                                       type="text" id='title'
                                       onChange={handleMovieChange}
                                       value={movieData.title}
                                       required={true}
                                />
                                <label htmlFor="city">Genre</label>
                                <input className='primary-input popup__input'
                                       type="text" id='genre'
                                       onChange={handleMovieChange}
                                       value={movieData.genre}
                                       required={true}
                                />
                                <label htmlFor="street">Duration</label>

                                <input className='primary-input popup__input'
                                       type="number" id='duration'
                                       onChange={handleMovieChange}
                                       value={movieData.duration}
                                       placeholder='in mins, e.g. 150'
                                       required={true}
                                />

                                <label htmlFor="number">Release date</label>
                                <input className='primary-input popup__input'
                                       type="text" id='releaseDate'
                                       onChange={handleMovieChange}
                                       value={movieData.releaseDate}
                                       placeholder='yyyy-mm-dd'
                                       required={true}
                                />

                                <label htmlFor="name">Seance</label>
                                <input className='primary-input popup__input'
                                       type="text" id='date'
                                       onChange={handleSeanceChange}
                                       value={seanceSingleObject.date}
                                       placeholder='yyyy-mm-dd'
                                       required={true}
                                />

                                <label htmlFor="name">Ticket price</label>
                                <input className='primary-input popup__input'
                                       type="text" id='price'
                                       onChange={handlePriceChange}
                                       value={ticketPrice.price}
                                       required={true}
                                />
                                <input className='popup__input--submit'
                                       type="submit"
                                       id='submit'
                                       value='create'/>

                            </form>
                        </div>
                    </div>
                    {
                        createMovieResponse.error &&
                        <div className='error-statement'>
                            <div className='error-statement__top-section'>
                                <h3 className='heading-tertiary'>Something went wrong</h3>
                                <span className='error-statement__icon'><ImSad/></span>
                            </div>
                            <div className='error-statement__bottom-section'>
                                <button
                                    onClick={() => setCreateMovieResponse({error: false})}
                                    className='error-statement__btn'>
                                    Ok
                                </button>
                            </div>
                        </div>
                    }
                    {
                        createMovieResponse.correct &&
                        <div className='correct-statement'>
                            <div className='correct-statement__top-section'>
                                <h3 className='heading-tertiary'>Movie has been added</h3>
                                <span className='correct-statement__icon'><ImHappy/></span>
                            </div>
                            <div className='correct-statement__bottom-section'>
                                <button
                                    onClick={() => setCreateMovieResponse({correct: false})}
                                    className='correct-statement__btn'>
                                    Ok
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default CreateMovie