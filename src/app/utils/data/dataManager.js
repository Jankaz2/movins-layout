import React, {useState, createContext, useEffect} from "react";
import useLoadPage from "../hooks/useLoadPage";

export const DataContext = createContext({
    cinemas: [],
    setCinemas: () => {
    }
})

export const DataManager = props => {
    const BASE_CINEMA_URL = 'http://localhost:5000/cinema'
    const [cinemas, setCinemas] = useState([])
    const [change, setChange] = useState(true)
    const [transferredCinemas, setTransferredCinemas] = useState([])
    const [loginBox, setLoginBox] = useState(true)
    const [cinemaId, setCinemaId] = useState(null)
    const [loader, showLoader, hideLoader] = useLoadPage()

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
            loader, showLoader, hideLoader
        }}>
            {props.children}
        </DataContext.Provider>
    )
}