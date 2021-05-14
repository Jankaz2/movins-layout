import React from 'react'
import NavbarCss from './navbar.css'

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul className="navbar">
                    <ul className="navbar-options">
                        <li className="navbarItem font-link"><a href="">Show films</a></li>
                        <li className="navbarItem font-link"><a href="">Buy ticket</a></li>
                        <li className="navbarItem font-link"><a href="">Find cinema</a></li>
                    </ul>
                    <ul className="navbar-info">
                        <li className="navbarItem font-link"><a href="">Home</a></li>
                        <li className="navbarItem font-link"><a href="">Contact</a></li>
                        <li className="navbarItem font-link"><a href="">About us</a></li>
                        <li className="navbarItem font-link"><a href="">Log in</a></li>
                        <li className="navbarItem font-link"><a href="">Sign up</a></li>
                    </ul>
                    <span><div className="logo"><a href="">cinema</a></div></span>
                </ul>
            </nav>
            <div className="webstart-page">
               <h2>Cinema is not only about making people dream.
                   <br/>&nbsp;&nbsp;&nbsp;It's about changing things and making people think.
                </h2>
            </div>
            <button className="show-more">Show more</button>
        </header>
    );
}

export default Navbar