import {FaWindowClose} from "react-icons/fa";
import React, {useContext} from "react";
import LoginBoxScss from '../styles/loginBox.scss'
import {DataContext} from "../../../../../utils/data_transfer/dataManager";

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
                        >&#10005;</span>
                        <div className="row login__box--boxes">
                            <div className='col-1-of-2'>
                                <div className="login__box--login-box">
                                    <h3 className='login__box--boxes__text heading-tertiary__blue'>Movins</h3>
                                    <p className='login__box--boxes__subtext'>Book tickets and manage your account!</p>

                                    <form className='login__box--login-box--form'>
                                        <label htmlFor="login" className='login__box--label'>Login</label>
                                        <input className='login-form-input primary-input' type="text"
                                               id='login'/>
                                        <label htmlFor="password" className='login__box--label'>Password</label>
                                        <input className='login-form-input primary-input' type="password"
                                               id='password' />
                                        <input className='login-form-input-submit primary-input' type="submit"
                                               value="Login"/>
                                    </form>
                                </div>
                            </div>
                            <div className='col-1-of-2'>
                                <div className="login__box--signup-box">
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
                                               value="Signin"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginBox