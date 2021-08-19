import React, {Component} from 'react'
import ReviewsCss from '../styles/reviews.scss'
import man1 from '../images/man1.png'
import woman11 from '../images/woman11.png'
import woman1 from '../images/woman1.png'

class Reviews extends Component {
    render() {
        return (
            <section className='reviews-section'>
                <div className='row'>
                    <h2 className='heading-secondary'>Our users know why we are the best!</h2>
                </div>
                <div className='row u-margin-bottom-small'>
                    <div className='review'>
                        <figure className="review__photo">
                            <img src={woman1} alt="Woman 1" className="review__image"/>
                            <figcaption className="review__caption">Jane Smith</figcaption>
                        </figure>
                        <div className="review__text">
                            <h3 className="heading_tertiary">It changed my life!</h3>
                                <p>
                                    I do not remember any other website that has changed my life
                                    as this one. It saves my time so much, I do not need to go to the
                                    cinema to check what films they show, because everything is here!
                                </p>
                        </div>
                    </div>
                </div>
                <div className='row u-margin-bottom-small'>
                    <div className='review'>
                        <figure className="review__photo">
                            <img src={man1} alt="Woman 1" className="review__image"/>
                            <figcaption className="review__caption">Luke White</figcaption>
                        </figure>
                        <div className="review__text">
                            <h3 className="heading_tertiary">This website is just amazing!</h3>
                            <p>
                                Just wow! It makes life easy. I was oppose to this website
                                originally, but when I started using this, I just regret
                                I haven't used this before. Really amazing!
                            </p>
                        </div>
                    </div>
                </div>
                <div className='row u-margin-bottom-small'>
                    <div className='review'>
                        <figure className="review__photo">
                            <img src={woman11} alt="Woman 1" className="review__image"/>
                            <figcaption className="review__caption">Lisa Kane</figcaption>
                        </figure>
                        <div className="review__text">
                            <h3 className="heading_tertiary">I can finally find cinema with my favourite films</h3>
                            <p>
                                Movins, thank you so much for your work. Because of you, I can
                                easily find cinema with film I really want to watch. I do not need
                                to ask on forums or call to cinema receptionists to ask them about
                                films because everything I need is here!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Reviews