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
        role: 'ROLE_USER'
    })

    const [registerInputLength, setRegisterInputLength] = useState(false)
    const [userDataRegisterFocused, setUserDataRegisterFocused] = useState({
        usernameFocused: false,
        emailFocused: false,
        ageFocused: false,
        passwordFocused: false
    })
    const [errorRegister, setErrorRegister] = useState({username: false, email: false, age: false, password: false})
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

        loggedUser[e.target.id] = e.target.value
        setLoginData(loggedUser)
    }

    const handleRegisterChange = e => {
        const newUser = {...registerData}

        if (e.target.id === 'register-username' &&
            e.target.value.length > 0 &&
            (!e.target.value.match(/^[A-Za-z]+[0-9]{0,4}$/) ||
                e.target.value.length < 3)) {
            setErrorRegister({username: true})
        } else if (e.target.id === 'register-username') {
            setErrorRegister({username: false})
        }

        if (e.target.id === 'email' &&
            e.target.value.length > 0 &&
            (!e.target.value.match(/^[A-Za-z0-9.]{2,}@[a-z0-9]{2,}.[a-z]{2,}$/))) {
            setErrorRegister({email: true})
        } else if (e.target.id === 'email') {
            setErrorRegister({email: false})
            newUser['email'] = e.target.value
        }

        if (e.target.id === 'age' && e.target.value.match(/^[1-9][0-9]{0,2}$/)) {
            setErrorRegister({age: true})
        } else if (e.target.id === 'age') {
            setErrorRegister({age: false})
            newUser['age'] = e.target.value
        }

        if (e.target.id === 'register-password' &&
            e.target.value.length > 0 &&
            e.target.value.length < 8) {
            setErrorRegister({password: true})
        } else if (e.target.id === 'register-password') {
            setErrorRegister({password: false})
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
        const user = {username: username, password: password}
        authContextValue.setUser(user)

        showLoader()

        const response = await fetch(BASE_URL + "/login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        hideLoader()

        if (response.ok) {
            setChange(true)
            const responseBody = await response.json()

            authContextValue.login(responseBody.accessToken, 300000, responseBody.refreshToken)
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
            role: 'ROLE_USER'
        }

        const response = await fetch(BASE_URL + "/users/register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            setIsOkRegister(true)
            setChange(true)
            history.push("/users/verification")
            return await response.json();
        }

        setIsOkRegister(false)
    }

    const goToForgotPasswordPage = () => {
        history.push('/forgot-password')
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
                                        <input className='login-form-input primary-input' type="text"
                                               onChange={handleLoginChange}
                                               required={true}
                                               ref={usernameRef}
                                               id="username"/>
                                        <label htmlFor="password" className='login__box--label'>Password</label>
                                        <input className='login-form-input primary-input' type="password"
                                               onChange={handleLoginChange}
                                               required={true}
                                               ref={passwordRef}
                                               id='password'/>
                                        <input className='login-form-input-submit primary-input' type="submit"
                                               value="Login"/>
                                        <span className='login__box--boxes__subtext--register-link login__box--forgot-password-link'
                                              onClick={goToForgotPasswordPage}
                                        >Forgot your password? &rarr;</span>
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
                                          onSubmit={register}>
                                        {
                                            errorRegister.username && userDataRegisterFocused.usernameFocused ?
                                                <p className='error-message'>
                                                    Length must be greater than 3<br/>
                                                    Only letters and numbers
                                                </p> : null
                                        }
                                        <input className='signup-form-input primary-input' type="text"
                                               id='register-username'
                                               onChange={handleRegisterChange}
                                               onFocus={() => setUserDataRegisterFocused({usernameFocused: true})}
                                               onBlur={() => setUserDataRegisterFocused({usernameFocused: false})}
                                               placeholder="Username"
                                               required={true}
                                               ref={usernameRefRegister}
                                        />
                                        {
                                            errorRegister.email && userDataRegisterFocused.emailFocused ?
                                                <p className='error-message'>
                                                    Wrong email syntax
                                                </p> : null
                                        }
                                        <input className='signup-form-input primary-input' type="email"
                                               id='email'
                                               onChange={handleRegisterChange}
                                               onFocus={() => setUserDataRegisterFocused({emailFocused: true})}
                                               onBlur={() => setUserDataRegisterFocused({emailFocused: false})}
                                               placeholder="e-mail"
                                               required={true}
                                               ref={emailRef}
                                        />
                                        {
                                            errorRegister.age && userDataRegisterFocused.ageFocused ?
                                                <p className='error-message'>
                                                    Age cannot be less than 1
                                                </p> : null
                                        }
                                        <input className='signup-form-input primary-input' type="number"
                                               id='age'
                                               onChange={handleRegisterChange}
                                               onFocus={() => setUserDataRegisterFocused({ageFocused: true})}
                                               onBlur={() => setUserDataRegisterFocused({ageFocused: false})}
                                               placeholder="age"
                                               required={true}
                                               ref={ageRef}
                                        />
                                        {
                                            errorRegister.password && userDataRegisterFocused.passwordFocused ?
                                                <p className='error-message'>
                                                    Length must be greater than 7<br/>
                                                </p> : null
                                        }
                                        <input className='signup-form-input primary-input' type="password"
                                               id='register-password'
                                               onChange={handleRegisterChange}
                                               onFocus={() => setUserDataRegisterFocused({passwordFocused: true})}
                                               onBlur={() => setUserDataRegisterFocused({passwordFocused: false})}
                                               placeholder="password"
                                               required={true}
                                               ref={passwordRegisterRef}
                                        />
                                        <input
                                            className={`${passwordConfirmation
                                                ? 'error-input'
                                                : registerInputLength
                                                    ? 'correct-input'
                                                    : ''} signup-form-input primary-input`}
                                            type="password"
                                            id='register-password-confirmation'
                                            onChange={handleRegisterChange}
                                            placeholder="repeat password"
                                            required={true}
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
                                <div className='error-statement__top-section'>
                                    <h3 className='heading-tertiary'>Something went wrong, we cannot register you</h3>
                                    <span className='error-statement__icon'><ImSad/></span>
                                </div>
                                <div className='error-statement__bottom-section'>
                                    <button
                                        onClick={() => setIsOkRegister(true)}
                                        className='error-statement__btn'>
                                        Ok
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginBox