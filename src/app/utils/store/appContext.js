import React, {useState, createContext, useEffect} from "react";
import useLoadPage from "../hooks/useLoadPage";

export const DataContext = createContext({
    cinemas: [],
    setCinemas: () => {
    },
    token: '',
    isLoggedIn: false,
    login: token => {
    },
    logout: () => {
    }
})

export const AppContext = props => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
    const [cinemas, setCinemas] = useState([])
    const [change, setChange] = useState(true)
    const [transferredCinemas, setTransferredCinemas] = useState([])
    const [loginBox, setLoginBox] = useState(true)
    const [cinemaId, setCinemaId] = useState(null)
    const [loader, showLoader, hideLoader] = useLoadPage()
    const [loggedUsername, setLoggedUsername] = useState('')
    const initialToken = window.localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const userIsLoggedIn = !!token

    let logoutTimer

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token)

        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expirationTime)

        logoutTimer = setTimeout(logoutHandler, expirationTime)
    }

    const authContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    const loadData = async () => {
        showLoader()
        await fetch(BASE_CINEMA_URL)
            .then(response => response.json())
            .then(cinemas => {
                hideLoader()
                setCinemas(cinemas.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        async function getData() {
            await loadData()
        }

        getData().catch(err => console.log(err))
        setChange(false)
    }, [change])

    return (
        <DataContext.Provider value={{
            cinemas, setCinemas,
            change, setChange,
            transferredCinemas, setTransferredCinemas,
            loginBox, setLoginBox,
            cinemaId, setCinemaId,
            loader, showLoader, hideLoader,
            loggedUsername, setLoggedUsername,
            authContextValue
        }}>
            {props.children}
        </DataContext.Provider>
    )
}