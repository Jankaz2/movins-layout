import React, {Component} from 'react'
import ReviewsCss from './reviews.scss'
import man1 from './images/man1.png'
import woman11 from './images/woman11.png'
import woman1 from './images/woman1.png'

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
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Accusantium distinctio dolore dolorum enim laboriosam minus
                                    officiis possimus provident quam quia quis ratione, rem soluta.
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium distinctio dolore dolorum enim laboriosam minus
                                officiis possimus provident quam quia quis ratione, rem soluta.
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium distinctio dolore dolorum enim laboriosam minus
                                officiis possimus provident quam quia quis ratione, rem soluta.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Reviews