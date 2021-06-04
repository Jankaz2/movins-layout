import React from 'react'
import {FaSearch, FaCamera, FaShoppingCart, FaSmile} from "react-icons/all";
import GridCss from '../grid/grid.scss'
import StepsSectionCss from './stepsSection.scss'

const StepsSection = () => {
    return (
        <section className="steps-section">
            <div className="row">
                <div className="step col span-1-of-4">
                    <span className="steps-icon"><FaSearch/></span>
                    <h4>Find cinema</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                    </p>
                </div>
                <div className="step col span-1-of-4">
                    <span className="steps-icon"><FaCamera/></span>
                    <h4>Choose film</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                    </p>
                </div>
                <div className="step col span-1-of-4">
                    <span className="steps-icon"><FaShoppingCart/></span>
                    <h4>Buy ticket</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati

                    </p>
                </div>
                <div className="step col span-1-of-4">
                    <span className="steps-icon"><FaSmile/></span>
                    <h4>Enjoy your film</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                    </p>
                </div>
            </div>
        </section>
    );
}

export default StepsSection