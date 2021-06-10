import React, {useState, createContext, useEffect} from "react";

export const DataContext = createContext({
    cinemas: [],
    setCinemas: () => {}
})

export const DataManager = props => {
    const [cinemas, setCinemas] = useState([])

    const loadData = async () => {
        await fetch('http://localhost:4000/cinema')
            .then(response => response.json())
            .then(cinemas => {
                setCinemas(cinemas.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <DataContext.Provider value={{cinemas, setCinemas}}>
            {props.children}
        </DataContext.Provider>
    )
}