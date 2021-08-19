import React, {Component} from 'react'
import AboutUsSectionCss from '../styles/aboutUsSection.scss'
import img1 from '../images/pic1.png'
import img2 from '../images/pic2.png'
import img3 from '../images/pic3.png'

class AboutUsSection extends Component {
    render() {
        return (
            <section className='about-us-section'>
                <div className="u-center-text">
                    <h2 className='heading-secondary'>The name of culture is movins</h2>
                </div>
                <div className='row'>
                    <div className='col-1-of-2 box'>
                        <h3 className='heading-tertiary'>Who we are?</h3>
                        <p>We are one of the fastest growing company in the world.
                            Our young and ambitious team care about you every single day
                            to make you smile.
                        </p><br/>
                        <h3 className='heading-tertiary'>Find your dreams</h3>
                        <p> Our mission is to get you all the cinemas and films
                            you are looking for without leaving home.
                        </p>
                    </div>
                    <div className='col-1-of-2 box'>
                        <div className="composition">
                            <img src={img1} alt="Picture 1" className='composition__photo composition__photo-1'/>
                            <img src={img2} alt="Picture 2" className='composition__photo composition__photo-2'/>
                            <img src={img3} alt="Picture 3" className='composition__photo composition__photo-3'/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AboutUsSection