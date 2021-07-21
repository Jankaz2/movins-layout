import {FaWindowClose} from "react-icons/fa";
import React, {useContext} from "react";
import LoginBoxScss from './styles/loginBox.scss'
import {DataContext} from "../../../../utils/data_transfer/dataManager";

const LoginBox = (props) => {
    const {loginBox, setLoginBox} = useContext(DataContext)

    return (
        <div>
            {
                loginBox &&
                <div className='login__box'>
                    <div className="login__box--background">&nbsp;</div>

                    <div className='login__box--popup'>
                        <span className='login__box--popup-close'
                              onClick={() => setLoginBox(false)}
                        ><FaWindowClose/></span>
                        <div className="login__box--boxes">
                            <div className="login__box--login-box col span-1-of-2">
                                <form className='login__box--login-box--form'>
                                    <input className='login-form-input primary-input' type="text"
                                           placeholder="login"/>
                                    <input className='login-form-input primary-input' type="password"
                                           placeholder="password"/>
                                    <input className='login-form-input-submit primary-input' type="submit"
                                           value="Log in"/>
                                </form>
                            </div>
                            <div className="login__box--signup-box col span-1-of-2">
                                <form className='login__box--signup-box--form'>
                                    <input className='signup-form-input primary-input' type="name"
                                           placeholder="Name"/>
                                    <input className='signup-form-input primary-input' type="text"
                                           placeholder="Surname"/>
                                    <input className='signup-form-input primary-input' type="email"
                                           placeholder="e-mail"/>
                                    <input className='signup-form-input primary-input' type="number"
                                           placeholder="phone number"/>
                                    <input className='signup-form-input primary-input' type="password"
                                           placeholder="password"/>
                                    <input className='signup-form-input primary-input' type="password"
                                           placeholder="repeat password"/>
                                    <input className='signup-form-input-submit primary-input' type="submit"
                                           value="Sign in"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginBox