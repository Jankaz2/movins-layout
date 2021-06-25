import React, {Component} from "react"
import FooterCss from "./footer.scss"
import {FaTwitter, FaFacebook, FaInstagram, FaGoogle}
    from "react-icons/fa"


class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="font-link socials">
                    <h2>Socials</h2>
                    <div className={"icon twitter-icon"}><FaTwitter/></div>
                    <div className={"icon facebook-icon"}><FaFacebook/></div>
                    <div className={"icon instagram-icon"}><FaInstagram/></div>
                    <div className={"icon google-icon"}><FaGoogle/></div>
                </div>
                <div className="footer-info">
                    <div className="row">
                        <div className="col span-1-of-3">
                            <ul>
                                <li><h4>Cinema</h4></li>
                                <li>Privacy Politic</li>
                                <li>Cookies</li>
                                <li>Support</li>
                            </ul>
                        </div>
                        <div className="col span-1-of-3">
                            <ul>
                                <li><h4>Company</h4></li>
                                <li>About</li>
                                <li>Partners</li>
                                <li>Support</li>
                                <li>FAQ</li>
                            </ul>
                        </div>
                        <div className="col span-1-of-3">
                            <ul className='footer-contacts'>
                                <li><h4>Contacts</h4></li>
                                <li>Cinema, Inc</li>
                                <li>225 View Street</li>
                                <li>San Diego, USA</li>
                                <li>Tel: <span className="footer-number">+99 111 222 333</span></li>
                                <li>E-mail: <span className="footer-email">appcinema2021@gmail.com</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright-info">
                        <p>Copyright &copy; 2021 Cinema. All rights reserved. </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer