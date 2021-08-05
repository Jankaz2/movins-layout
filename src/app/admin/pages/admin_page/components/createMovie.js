import React, {useState, useContext, useEffect} from 'react'
import {DataContext} from "../../../../utils/data_transfer/dataManager";
import useLoadPage from "../../../../utils/hooks/useLoadPage";
import Select from "react-select";

const CreateMovie = (props) => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'

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
    const [showLoader, hideLoader] = useLoadPage()

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
        const response = await fetch(BASE_CINEMA_URL + `/movies/${cinemaRoomId}`, {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })

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

        addMovie(mergedMovie, cinemaRoomData.id)
        setMovieData({
            title: '',
            genre: '',
            duration: '',
            releaseDate: ''
        })
        setSeances([])
    }

    const handleChange = e => {
        if (e.target.id === 'title') {
            setMovieData({title: e.target.value})
        } else if (e.target.id === 'genre') {
            setMovieData({genre: e.target.value})
        } else if (e.target.id === 'duration') {
            setMovieData({duration: e.target.value})
        } else if (e.target.id === 'releaseDate') {
            setMovieData({releaseDate: e.target.value})
        }
    }

    const handleSeanceChange = e => {
        const newSeance = {...seanceSingleObject}

        newSeance[e.target.id] = e.target.value
        setSeanceSingleObject(newSeance)
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
                                <Select className='react-select react-select__update' name=""
                                        defaultValue={options[0]}
                                        options={options}
                                        onChange={onSelectChange}
                                        id='cinema-rooms'
                                />

                                <label htmlFor="title">Title</label>
                                <input className='primary-input popup__input'
                                       type="text" id='title'
                                       onChange={handleChange}
                                       value={movieData.title}
                                       required={true}
                                />
                                <label htmlFor="city">Genre</label>
                                <input className='primary-input popup__input'
                                       type="text" id='genre'
                                       onChange={handleChange}
                                       value={movieData.genre}
                                       required={true}
                                />
                                <label htmlFor="street">Duration</label>

                                <input className='primary-input popup__input'
                                       type="number" id='duration'
                                       onChange={handleChange}
                                       value={movieData.duration}
                                       placeholder='in mins, e.g. 150'
                                       required={true}
                                />

                                <label htmlFor="number">Release date</label>
                                <input className='primary-input popup__input'
                                       type="text" id='releaseDate'
                                       onChange={handleChange}
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
                                <input className='popup__input--submit'
                                       type="submit"
                                       id='submit'
                                       value='create'/>

                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreateMovie