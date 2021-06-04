import React, {Component} from 'react'
import AboutUsSectionCss from './aboutUsSection.scss'
import img1 from './images/pic1.png'
import img2 from './images/pic2.png'
import img3 from './images/pic3.png'

class AboutUsSection extends Component {
    render() {
        return (
            <section className='about-us-section'>
                <div className="u-center-text">
                    <h2 className='about-us-section-text'>The name of culture is cinemafactory</h2>
                </div>
                <div className='row'>
                    <div className='col span-1-of-2 box about-us-section-text'>
                        <h3>Who we are?</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Adipisci corporis cumque delectus deleniti earum explicabo
                            fuga laudantium odit porro similique.
                        </p><br/>
                        <h3>Find your dreams</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Adipisci corporis cumque delectus deleniti earum explicabo
                        </p>
                    </div>
                    <div className='col span-1-of-2 box'>
                        <div className="composition">
                            <img src={img1} alt="Picture 1" className='photo photo-1'/>
                            <img src={img2} alt="Picture 2" className='photo photo-2'/>
                            <img src={img3} alt="Picture 3" className='photo photo-3'/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AboutUsSection