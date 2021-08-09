import React from 'react'
import UserActivationScss from '../styles/userActivation.scss'
import {FaRegCheckCircle} from "react-icons/all";

const UserActivation = () => {
    return (
        <div>
            <div className='user-activation'>
                <div className='correct-200'>
                    <h1 className='correct-200__text'>Great, your account has been registered</h1>
                    <span className='user-activation__check-icon'><FaRegCheckCircle/></span>
                </div>
            </div>
        </div>
    )
}

export default UserActivation