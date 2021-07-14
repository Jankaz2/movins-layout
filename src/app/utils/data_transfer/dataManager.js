import React, {useState, createContext, useEffect} from "react";

export const DataContext = createContext({
    cinemas: [],
    setCinemas: () => {
    }
})

export const DataManager = props => {
    const [cinemas, setCinemas] = useState([])
    const [change, setChange] = useState(true)

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
        <DataContext.Provider value={{cinemas, setCinemas, change, setChange}}>
            {props.children}
        </DataContext.Provider>
    )
}