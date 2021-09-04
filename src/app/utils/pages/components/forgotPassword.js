import React, {useRef, useState} from "react";
import ForgotPasswordScss from '../styles/forgotPassword.scss'
import {Link} from "react-router-dom";
import {ImHappy, ImSad} from "react-icons/im";

const ForgotPassword = () => {
    const BASE_USERS_URL = 'http://localhost:5000/users'
    const [sendEmailResponse, setSendEmailResponse] = useState({correct: false, error: false})
    const email = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const passwordDto = {email: email.current.value}
        const response = await fetch(BASE_USERS_URL + '/forgot-password', {
            method: 'POST',
            body: JSON.stringify(passwordDto),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            setSendEmailResponse({error: true})
            return;
        }

        setSendEmailResponse({correct: true})
        return await response.json()
    }

    return (
        <div className="forgot-password">
            <div className='cinemas-list-section__logo'>
                <Link to="/">
                    <span className='cinemas-list-section__logo--text'>Movins</span>
                </Link>
            </div>
            <form className='forgot-password__form'
                  onSubmit={handleSubmit}
                  action="">
                <label htmlFor="forgot-password-email">Email your account is registered with</label>
                <input className='popup__input forgot-password__email'
                       type="email"
                       id='forgot-password-email'
                       placeholder='e-mail'
                       ref={email}
                />
                <input className='popup__input--submit forgot-password__submit'
                       type="submit"
                       value='submit'
                />
            </form>
            {
                sendEmailResponse.error &&
                <div className='error-statement'>
                    <div className='error-statement__top-section'>
                        <h3 className='heading-tertiary'>Something went wrong</h3>
                        <span className='error-statement__icon'><ImSad/></span>
                    </div>
                    <div className='error-statement__bottom-section'>
                        <button
                            onClick={() => setSendEmailResponse({error: false})}
                            className='error-statement__btn'>
                            Ok
                        </button>
                    </div>
                </div>
            }
            {
                sendEmailResponse.correct &&
                <div className='correct-statement'>
                    <div className='correct-statement__top-section'>
                        <h3 className='heading-tertiary'>Email has been sent successfully</h3>
                        <span className='correct-statement__icon'><ImHappy/></span>
                    </div>
                    <div className='correct-statement__bottom-section'>
                        <button
                            onClick={() => setSendEmailResponse({correct: false})}
                            className='correct-statement__btn'>
                            Ok
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ForgotPassword