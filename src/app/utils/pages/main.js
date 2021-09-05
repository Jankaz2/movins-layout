import React, {useContext} from 'react'
import {DataContext} from "../store/appContext";

const Main = (props) => {
    const BASE_URL = 'http://localhost:5000'
    const {authContextValue} = useContext(DataContext)

    const refreshTokens = async () => {
        if (authContextValue.token !== null) {
            const refreshToken = authContextValue.refreshToken
            const response = await fetch(BASE_URL + '/security/refresh-tokens', {
                method: 'POST',
                body: JSON.stringify({token: refreshToken}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => console.log(err))

            return await response.json()
        }
    }

    return (
        <>
            <main onClick={refreshTokens}>{props.children}</main>
        </>
    )
}

export default Main