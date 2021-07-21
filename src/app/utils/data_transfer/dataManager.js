import React, {useState, createContext, useEffect} from "react";

export const DataContext = createContext({
    cinemas: [],
    setCinemas: () => {
    }
})

export const DataManager = props => {
    const [cinemas, setCinemas] = useState([])
    const [change, setChange] = useState(true)
    const [transferredCinemas, setTransferredCinemas] = useState([])
    const [loginBox, setLoginBox] = useState(true)

    const loadData = async () => {
        await fetch('http://localhost:5000/cinema')
            .then(response => response.json())
            .then(cinemas => {
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
            loginBox, setLoginBox
        }}>
            {props.children}
        </DataContext.Provider>
    )
}