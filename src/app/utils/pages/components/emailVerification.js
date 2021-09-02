import React from 'react'
import {FaRegEnvelope} from "react-icons/fa";
import EmailVerificationSCSS from "../styles/emailVerification.scss"

const EmailVerification = () => {
    return (
        <div>
            <div className='email-verification'>
                <div className='correct-200'>
                    <h1 className='correct-200__text'>Check your email to verify account</h1>
                    <span className='email-verification__check-icon'><FaRegEnvelope/></span>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification