import React, {useContext, useRef, useState} from "react";
import {useHistory} from 'react-router-dom'
import {DataContext} from "../../../../utils/store/appContext";
import LoginBoxScss from '../styles/loginBox.scss'
import {ImSad} from "react-icons/im";

const LoginBox = (props) => {
    const BASE_URL = 'http://localhost:5000'
    const history = useHistory()

    const {
        loginBox,
        setLoginBox,
        setChange,
        showLoader,
        hideLoader,
        setLoggedUsername,
    } = useContext(DataContext)

    const {authContextValue} = useContext(DataContext)

    const [isOkLogin, setIsOkLogin] = useState(true)
    const [isOkRegister, setIsOkRegister] = useState(true)
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

    const [registerInputLength, setRegisterInputLength] = useState(false)
    const [userDataFocused, setUserDataFocused] = useState({usernameFocused: false, passwordFocused: false})
    const [error, setError] = useState({username: false, password: false})
    const [passwordConfirmation, setPasswordConfirmation] = useState(false)

    const width = window.innerWidth

    const usernameRef = useRef()
    const passwordRef = useRef()

    const usernameRefRegister = useRef()
    const emailRef = useRef()
    const ageRef = useRef()
    const passwordRegisterRef = useRef()
    const passwordConfirmationRef = useRef()

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
        setLoginData(loggedUser)
        setLoggedUsername(loggedUser.username)
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
            if (e.target.value.length > 0) {
                setRegisterInputLength(true)
            } else {
                setRegisterInputLength(false)
                setPasswordConfirmation(false)
            }

            if (!e.target.value.match(newUser['password'])) {
                setPasswordConfirmation(true)
            } else {
                setPasswordConfirmation(false)
            }
            newUser['passwordConfirmation'] = e.target.value
        }

        setRegisterData(newUser)
    }

    const login = async (event) => {
        event.preventDefault()

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        authContextValue.setUser({username: username, password: password})

        showLoader()

        const response = await fetch(BASE_URL + "/login", {
            method: 'POST',
            body: JSON.stringify(authContextValue.user),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        hideLoader()

        if (response.ok) {
            setChange(true)
            const responseBody = await response.json()

            authContextValue.login(responseBody.accessToken, 300000)
            setLoginBox(false)
            return await responseBody
        }

        setIsOkLogin(false)
    }

    const register = async (event) => {
        event.preventDefault()

        const user = {
            username: usernameRefRegister.current.value,
            email: emailRef.current.value,
            age: ageRef.current.value,
            password: passwordRegisterRef.current.value,
            passwordConfirmation: passwordConfirmationRef.current.value,
            role: 'USER'
        }

        const response = await fetch(BASE_URL + "/users/register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            setIsOkRegister(false)
            return false
        }

        setChange(true)
        return await response.json();
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
                                          onSubmit={login}
                                    >
                                        <label htmlFor="username"
                                               className='login__box--label'
                                        >Login</label>
                                        {
                                            error.username && userDataFocused.usernameFocused ?
                                                <p className='error-message'>
                                                    Length must be greater than 3<br/>
                                                    Syntax must be:/^[A-Za-z]+[0-9]{0 + ',' + 4}$/
                                                </p> : null
                                        }
                                        <input className='login-form-input primary-input' type="text"
                                               onChange={handleLoginChange}
                                               onFocus={() => setUserDataFocused({usernameFocused: true})}
                                               onBlur={() => setUserDataFocused({usernameFocused: false})}
                                               required={true}
                                               ref={usernameRef}
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
                                               ref={passwordRef}
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
                                              register(e)
                                              isOkRegister && history.push("/user/verification")
                                          }}
                                    >
                                        <input className='signup-form-input primary-input' type="text"
                                               id='register-username'
                                               onChange={handleRegisterChange}
                                               placeholder="Username"
                                               ref={usernameRefRegister}
                                        />
                                        <input className='signup-form-input primary-input' type="email"
                                               id='email'
                                               onChange={handleRegisterChange}
                                               placeholder="e-mail"
                                               ref={emailRef}
                                        />
                                        <input className='signup-form-input primary-input' type="number"
                                               id='age'
                                               onChange={handleRegisterChange}
                                               placeholder="age"
                                               ref={ageRef}
                                        />
                                        <input className='signup-form-input primary-input' type="password"
                                               id='register-password'
                                               onChange={handleRegisterChange}
                                               placeholder="password"
                                               ref={passwordRegisterRef}
                                        />
                                        <input
                                            className={`${passwordConfirmation ? 'error-input' : registerInputLength ? 'correct-input' : ''} signup-form-input primary-input`}
                                            type="password"
                                            id='register-password-confirmation'
                                            onChange={handleRegisterChange}
                                            placeholder="repeat password"
                                            ref={passwordConfirmationRef}
                                        />
                                        {
                                            passwordConfirmation &&
                                            <p className='error-message'>Passwords are not the same</p>
                                        }
                                        <input className='signup-form-input-submit primary-input' type="submit"
                                               value="Sign up"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {
                            !isOkLogin &&
                            <div className='error-statement'>
                                <div className='error-statement__top-section'>
                                    <h3 className='heading-tertiary'>Wrong email or login</h3>
                                    <span className='error-statement__icon'><ImSad/></span>
                                </div>
                                <div className='error-statement__bottom-section'>
                                    <button
                                        onClick={() => setIsOkLogin(true)}
                                        className='error-statement__btn'>
                                        Ok
                                    </button>
                                </div>
                            </div>
                        }
                        {
                            !isOkRegister &&
                            <div className='error-statement'>
                                <h3 className='heading-tertiary'>Sorry, we cannot register you</h3>
                                <button
                                    onClick={() => setIsOkRegister(true)}
                                    className='error-statement__btn'>
                                    Try again
                                </button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginBox