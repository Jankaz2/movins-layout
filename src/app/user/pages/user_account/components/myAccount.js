import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {DataContext} from "../../../../utils/data/dataManager";
import MyAccountScss from "../styles/myAccount.scss"
import {MdPerson} from 'react-icons/md'

const MyAccount = () => {
    const BASE_TICKETS_URL = 'http://localhost:5000/tickets'
    const BASE_USERS_URL = 'http://localhost:5000/users'

    const history = useHistory()
    const {change, setChange} = useContext(DataContext)
    const [tickets, setTickets] = useState([])
    const [showTickets, setShowTickets] = useState(false)
    const [showUserData, setShowUserData] = useState(true)
    const [userData, setUserData] = useState({})
    const [purchasedTickets, setPurchasedTickets] = useState(null)

    const date = new Date()
    const timeInMs = date.getTime()

    const differenceInDays = (date2) => {
        const splittedDate = date2.split('-')
        const month = parseInt(splittedDate[1]) - 1
        const date = Date.UTC(parseInt(splittedDate[0]), month,  splittedDate[2])
        return parseInt((date - timeInMs) / (1000 * 3600 * 24))
    }

    const loadUserTickets = async (userId) => {
        const response = await fetch(BASE_TICKETS_URL + `/91`)
            .then(response => response.json())
            .then(tickets => {
                setTickets(tickets.data)
            })

        setChange(true)
        return response.json()
    }

    const loadUserData = async (userId) => {
        const response = await fetch(BASE_USERS_URL + `/91`)
            .then(response => response.json())
            .then(user => {
                setUserData(user.data)
            })

        setChange(true)
        return response.json()
    }

    const loadPurchasedTickets = async (userId) => {
        const response = await fetch(BASE_USERS_URL + `/purchase/91`)
            .then(response => response.json())
            .then(number => {
                setPurchasedTickets(number.data)
            })

        setChange(true)
        return response.json()
    }

    useEffect(() => {
        async function getData() {
            await loadUserTickets()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [tickets, change])

    useEffect(() => {
        async function getData() {
            await loadUserData()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [userData, change])

    useEffect(() => {
        async function getData() {
            await loadPurchasedTickets()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [purchasedTickets, change])

    return (
        <div className='my-account'>
            <nav className='my-account__nav'>
                <h2 className='my-account__text heading-tertiary__blue'>My account <span
                    className='my-account__person-icon'><MdPerson/></span></h2>
                <ul className='my-account__options'>
                    <li className='my-account__options--item'
                        onClick={() => {
                            setShowUserData(false)
                            setShowTickets(true)
                        }}
                    >My tickets
                    </li>
                    <li className='my-account__options--item'
                        onClick={() => {
                            setShowTickets(false)
                            setShowUserData(true)
                        }}
                    >Data
                    </li>
                    <li className='my-account__options--item--home'
                        onClick={() => history.push("/")}
                    >Home
                    </li>
                </ul>
            </nav>
            {
                showTickets &&
                <ul className='my-account__tickets'>
                    {
                        tickets.map(ticket => {
                            return (
                                <li className='my-account__tickets__single-ticket'>
                                    <div className='row'>
                                        <h3 className={`heading-tertiary__${ticket.purchaseDate <= ticket.seance.date ? 'active' : 'inactive'}`}>
                                            {ticket.purchaseDate <= ticket.seance.date ? 'active' : 'inactive'}
                                        </h3>
                                        <div className='col-1-of-2'>
                                            <h3 className='heading-tertiary'>Title</h3>
                                            <h3 className='heading-secondary__name u-margin-bottom-tiny'>{ticket.seance.movie.title}</h3>
                                            <h3 className='heading-tertiary__blue'>Genre:</h3>
                                            <h3 className='heading-tertiary u-margin-bottom-tiny'>{ticket.seance.movie.genre}</h3>
                                            <h3 className='heading-tertiary__blue'>Show date:</h3>
                                            <h3 className='heading-tertiary u-margin-bottom-tiny'>{ticket.seance.date}</h3>
                                            <h3 className='heading-tertiary__blue'>Duration:</h3>
                                            <h3 className='heading-tertiary'>{ticket.seance.movie.duration} minutes</h3>
                                        </div>
                                        <div className='col-1-of-2'>
                                            <h3 className='heading-tertiary__blue u-margin-top-very-tiny'>Purchase date:</h3>
                                            <h3 className='heading-tertiary u-margin-bottom-tiny'>{ticket.purchaseDate}</h3>
                                            <h3 className='heading-tertiary__blue'>Price:</h3>
                                            <h3 className='heading-tertiary u-margin-bottom-tiny'>{ticket.price}</h3>
                                            <h3 className='heading-tertiary__blue'>Days to show:</h3>
                                            <h3 className='heading-tertiary u-margin-bottom-tiny'>
                                                {differenceInDays(ticket.seance.date) > 0 ? differenceInDays(ticket.seance.date) : 'SHOW HAS BEEN DONE'}</h3>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            {
                showUserData &&
                <div className='my-account__user'>
                    <h3 className='heading-tertiary__blue'>Username:</h3>
                    <h3 className='heading-tertiary u-margin-bottom-tiny'>{userData.username}</h3>
                    <h3 className='heading-tertiary__blue'>Age:</h3>
                    <h3 className='heading-tertiary u-margin-bottom-tiny'>{userData.age}</h3>
                    <h3 className='heading-tertiary__blue'>Email:</h3>
                    <h3 className='heading-tertiary u-margin-bottom-tiny u-text-lowercase'>{userData.email}</h3>
                    <h3 className='heading-tertiary__blue'>Role:</h3>
                    <h3 className='heading-tertiary u-margin-bottom-tiny'>{userData.role}</h3>
                    <h3 className='heading-tertiary__blue'>Number of purchased tickets:</h3>
                    <h3 className='heading-tertiary'>{purchasedTickets}</h3>
                </div>
            }
        </div>
    )
}

export default MyAccount