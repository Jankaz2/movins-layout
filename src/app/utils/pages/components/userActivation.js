import React from 'react'
import UserActivationScss from '../styles/userActivation.scss'
import {useHistory} from "react-router-dom";

const UserActivation = () => {
    const history = useHistory()

    const goToLoginPage = e => {
        history.push('/')
    }

    return (
        <div>
            <div className='user-activation'>
                <div className='correct-200'>
                    <h1 className='correct-200__text'>Great, your account has been registered</h1>
                    <button className='user-activation__login'
                            onClick={goToLoginPage}
                    >login</button>
                </div>
            </div>
        </div>
    )
}

export default UserActivation