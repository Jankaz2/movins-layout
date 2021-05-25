import React, {useState, createContext} from "react";

export const DataContext = createContext([])

export const DataManager = ({children}) => {
    const [state, setState] = useState({
        cinemas: [
            {id: 1, name: "Cinema Under The Stars", city: "Poznan"},
            {id: 2, name: "Cinema Under The Stars", city: "Warsaw"},
            {id: 3, name: "Mind", city: "Warsaw"},
            {id: 4, name: "CinemaStreet", city: "Cracov"},
            {id: 5, name: "Heaven", city: "Poznan"},
            {id: 6, name: "Dream", city: "Gdansk"},
        ]
    })

    const updateState = value => {
        setState(value)
    }

    return (
        <DataContext.Provider value={{state, updateState}}>
            {children}
        </DataContext.Provider>
    )
}