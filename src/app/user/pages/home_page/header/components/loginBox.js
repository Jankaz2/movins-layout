import React, {useContext, useState} from "react";
import {useHistory} from 'react-router-dom'
import LoginBoxScss from '../styles/loginBox.scss'
import {DataContext} from "../../../../../utils/data/dataManager";

const LoginBox = (props) => {
    const BASE_URL = 'http://localhost:5000'

    const {loginBox, setLoginBox, setChange, loggedUser, setLoggedUser, isLogged, setIsLogged} = useContext(DataContext)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [userData, setUserData] = useState({username: '', password: ''})
    const [userDataFocused, setUserDataFocused] = useState({usernameFocused: false, passwordFocused: false})
    const [error, setError] = useState({username: false, password: false})
    const width = window.innerWidth

    const handleChange = (e) => {
        const newUser = {...userData}
        if (e.target.id === 'username' &&
            e.target.value.length > 0 &&
            (!e.target.value.match(/^[A-Za-z]+[0-9]{0,4}$/) ||
                e.target.value.length < 3)) {
            setError({username: true})
        } else if (e.target.id === 'username') {
            setError({username: false})
        }

        if (e.target.id === 'password' &&
            e.target.value.length > 0 &&
            e.target.value.length < 8) {
            setError({password: true})
        } else if (e.target.id === 'password') {
            setError({password: false})
        }

        newUser[e.target.id] = e.target.value
        setLoggedUser(newUser)
    }

    const login = async (user) => {
        const response = await fetch(BASE_URL + "/login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setChange(true)
        return await response.json();
    }

    const submit = e => {
        e.preventDefault()
        login(loggedUser).catch(err => console.log(err))
        setIsLogged(true)
        props.history.push("/")
    }

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
                                <div
                                    className={`${width <= 900 && showCreateAccount ? 'hide-div' : 'show-div'} login__box--login-box`}>
                                    <h3 className='login__box--boxes__text heading-tertiary__blue'>Movins</h3>
                                    <p className='login__box--boxes__subtext'>Book tickets and manage your account!</p>

                                    <form className='login__box--login-box--form'
                                          onSubmit={e => submit(e)}
                                    >
                                        <label htmlFor="username"
                                               className='login__box--label'
                                        >Login</label>
                                        {
                                            error.username && userDataFocused.usernameFocused ?
                                                <p className='error-message'>
                                                    Length must be greater than 3<br/>
                                                    Syntax must be: <span
                                                    className='error-message__syntax'>/^[A-Za-z]+[0-9]{0 + ',' + 4}$/</span>
                                                </p> : null
                                        }
                                        <input className='login-form-input primary-input' type="text"
                                               onChange={handleChange}
                                               onFocus={() => setUserDataFocused({usernameFocused: true})}
                                               onBlur={() => setUserDataFocused({usernameFocused: false})}
                                               required={true}
                                               id="username"/>
                                        <label htmlFor="password" className='login__box--label'>Password</label>
                                        {
                                            error.password && userDataFocused.passwordFocused ?
                                                <p className='error-message'>
                                                    Length must be greater than 7<br/>
                                                </p> : null
                                        }
                                        <input className='login-form-input primary-input' type="password"
                                               onChange={handleChange}
                                               onFocus={() => setUserDataFocused({passwordFocused: true})}
                                               onBlur={() => setUserDataFocused({passwordFocused: false})}
                                               required={true}
                                               id='password'/>
                                        <input className='login-form-input-submit primary-input' type="submit"
                                               value="Login"/>
                                    </form>
                                    <p className='login__box--boxes__subtext--register'>New user?&nbsp;
                                        <span className='login__box--boxes__subtext--register-link'
                                              onClick={() => setShowCreateAccount(true)}
                                        >Create an account &rarr;</span></p>
                                </div>
                            </div>
                            <div className='col-1-of-2'>
                                <div
                                    className={`${width <= 900 && showCreateAccount ? 'show-div' : width <= 900 ? 'hide-div' : ''} 
                                    login__box--signup-box`}>
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