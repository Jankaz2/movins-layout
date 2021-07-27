import React, {Component} from "react"
import FooterCss from "./styles/footer.scss"

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__logo-box">
                    <h1 className='heading--primary--main'>MOVINS</h1>
                </div>
                <div className="row">
                    <div className="col span-1-of-2">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a href="" className="footer__link">Company</a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__link">Carrer</a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__link">Privacy</a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__link">Terms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col span-1-of-2">
                        <p className="footer_copyright">
                            Created by <a href="https://github.com/Jankaz2" target="_blank" className="footer__link">Jan
                            Kaźmierczak</a>, consectetur adipisicing elit.
                            Aliquam architecto culpa dolore dolorem doloremque dolores
                            explicabo ipsam mollitia nobis pariatur qui quia, quibusdam
                            quo quod tempora velit voluptatibus. Ad aliquam aut dicta,
                            dolores eum illum impedit iusto numquam optio possimus quae
                            sapiente tenetur unde ut vel. Consectetur delectus quasi tempora.
                        </p>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer