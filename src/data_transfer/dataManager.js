import React, {useState, createContext} from "react";

export const DataContext = createContext([{}])

export const DataManager = ({children}) => {
    const [state, setState] = useState({
        cinemas: [
            {name: "Cinema Under The Stars", city: "Poznan"},
            {name: "Cinema Under The Stars", city: "Warsaw"},
            {name: "Mind", city: "Warsaw"},
            {name: "CinemaStreet", city: "Cracov"},
            {name: "Heaven", city: "Poznan"},
            {name: "Dream", city: "Gdansk"},
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