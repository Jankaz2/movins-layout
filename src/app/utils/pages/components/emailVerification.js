import React from 'react'
import {FaRegEnvelope} from "react-icons/all";

const EmailVerification = () => {
    return (
        <div>
            <div className='user-activation'>
                <div className='correct-200'>
                    <h1 className='correct-200__text'>Check your email to verify account</h1>
                    <span className='user-activation__check-icon'><FaRegEnvelope/></span>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification