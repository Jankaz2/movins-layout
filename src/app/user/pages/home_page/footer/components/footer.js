import React, {Component} from "react"
import {Link} from "react-router-dom"
import FooterCss from "../styles/footer.scss"

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__logo-box">
                    <Link className='footer__logo-box-text' to="/">
                        <h1 className='heading--primary--main'>MOVINS</h1>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-1-of-2">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <p className="footer__link__p">Company</p>
                                </li>
                                <li className="footer__item">
                                    <p className="footer__link__p">Carrer</p>
                                </li>
                                <li className="footer__item">
                                    <p className="footer__link__p">Privacy</p>
                                </li>
                                <li className="footer__item">
                                    <p className="footer__link__p">Terms</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-1-of-2">
                        <p className="footer_copyright">
                            Created by <a href="https://github.com/Jankaz2"
                                          target="_blank"
                                          className="footer__link">Jan Kaźmierczak</a>, as his own project for
                            portfolio.&nbsp;
                            <a href="#" className='footer__link'>Movins </a> is Spring
                            application with fully responsive layout. Every functionality
                            has been created by <a href="https://github.com/Jankaz2"
                                                   target="_blank"
                                                   className="footer__link">Jan Kaźmierczak</a>.<br/>
                            Home page layout is inspired by Jonas Schmedtmann online course Advanced CSS and SASS
                             where I learned advanced CSS tricks and SASS from.
                            <br/>Copyright &copy; by Jan Kaźmierczak.
                        </p>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer