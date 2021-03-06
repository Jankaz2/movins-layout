import React from 'react'
import {FaSearch, FaCamera, FaShoppingCart, FaSmile} from "react-icons/fa";
import GridCss from '../../../../../styles/scss/utils/grid.scss'
import StepsSectionCss from '../styles/stepsSection.scss'

const StepsSection = () => {
    return (
        <section className="steps-section">
            <div className="row">
                <div className="col-1-of-4">
                    <div className="steps-section__step">
                        <span className="steps-icon"><FaSearch/></span>
                        <h3 className='heading-tertiary'>Find cinema</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Ab architecto autem error, fuga nobis non numquam obcaecati
                        </p>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="steps-section__step">
                        <span className="steps-icon"><FaCamera/></span>
                        <h3 className='heading-tertiary'>Choose film</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Ab architecto autem error, fuga nobis non numquam obcaecati
                        </p>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="steps-section__step">
                        <span className="steps-icon"><FaShoppingCart/></span>
                        <h3 className='heading-tertiary'>Buy ticket</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Ab architecto autem error, fuga nobis non numquam obcaecati

                        </p>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="steps-section__step">
                        <span className="steps-icon"><FaSmile/></span>
                        <h3 className='heading-tertiary'>Enjoy your film</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Ab architecto autem error, fuga nobis non numquam obcaecati
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StepsSection