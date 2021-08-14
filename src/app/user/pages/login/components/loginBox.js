import React, {useContext, useState} from "react";
import {useHistory} from 'react-router-dom'
import LoginBoxScss from '../styles/loginBox.scss'
import {DataContext} from "../../../../utils/data/dataManager";

const LoginBox = (props) => {
    const BASE_URL = 'http://localhost:5000'
    const history = useHistory()

    const {
        loginBox,
        setLoginBox,
        setChange,
        loggedUser,
        setLoggedUser,
        isLogged,
        setIsLogged,
        setIsRegistered
    } = useContext(DataContext)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [loginData, setLoginData] = useState({username: '', password: ''})
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        age: '',
        password: '',
        passwordConfirmation: '',
        role: 'USER'
    })
    const [userDataFocused, setUserDataFocused] = useState({usernameFocused: false, passwordFocused: false})
    const [error, setError] = useState({username: false, password: false})
    const [passwordConfirmation, setPasswordConfirmation] = useState(false)
    const width = window.innerWidth

    const handleLoginChange = (e) => {
        const loggedUser = {...loginData}
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

        loggedUser[e.target.id] = e.target.value
        setLoggedUser(loggedUser)
    }

    const handleRegisterChange = e => {
        const newUser = {...registerData}
        if (e.target.id === 'register-username') {
            newUser['username'] = e.target.value
        }

        if (e.target.id === 'email') {
            newUser['email'] = e.target.value
        }

        if (e.target.id === 'age') {
            newUser['age'] = e.target.value
        }

        if (e.target.id === 'register-password') {
            newUser['password'] = e.target.value
        }

        if (e.target.id === 'register-password-confirmation') {
            if (!e.target.value.match(newUser['password'])) {
                setPasswordConfirmation(true)
            } else {
                setPasswordConfirmation(false)
            }
            newUser['passwordConfirmation'] = e.target.value
        }

        setRegisterData(newUser)
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

    const register = async (user) => {
        const response = await fetch(BASE_URL + "/users/register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setChange(true)
        return await response.json();
    }

    const submitLogin = e => {
        e.preventDefault()
        login(loggedUser).catch(err => console.log(err))
        setIsLogged(true)
    }

    const submitRegister = e => {
        e.preventDefault()
        register(registerData).catch(err => console.log(err))
        setIsRegistered(true)
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
                                          onSubmit={e => {
                                              submitLogin(e)
                                              history.push("/")
                                          }}
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
                                               onChange={handleLoginChange}
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
                                               onChange={handleLoginChange}
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
                                    <form className='login__box--signup-box--form'
                                          onSubmit={e => {
                                              submitRegister(e)
                                              history.push("/user/verification")
                                          }}
                                    >
                                        <input className='signup-form-input primary-input' type="text"
                                               id='register-username'
                                               onChange={handleRegisterChange}
                                               placeholder="Username"/>
                                        <input className='signup-form-input primary-input' type="email"
                                               id='email'
                                               onChange={handleRegisterChange}
                                               placeholder="e-mail"/>
                                        <input className='signup-form-input primary-input' type="number"
                                               id='age'
                                               onChange={handleRegisterChange}
                                               placeholder="age"/>
                                        <input className='signup-form-input primary-input' type="password"
                                               id='register-password'
                                               onChange={handleRegisterChange}
                                               placeholder="password"/>
                                        <input
                                            className={`${passwordConfirmation ? 'error-input' : 'correct-input'} signup-form-input primary-input`}
                                            type="password"
                                            id='register-password-confirmation'
                                            onChange={handleRegisterChange}
                                            placeholder="repeat password"/>
                                        {
                                            passwordConfirmation &&
                                                <p className='error-message'>Passwords are not the same</p>
                                        }
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