import React from 'react'
import GridCss from '../grid/grid.css'
import StepsSectionCss from './stepsSection.css'

const StepsSection = () => {
    return (
        <section className="steps-section row">
            <div className="steps-section-welcome-text">
                <h2>CHOOSE AND WATCH</h2>
                <p>
                    Nice to see you. With our help, you are gonna find
                    the nearest cinema and best films. It never was easier.
                    <br/>Just follow the steps and enjoy!
                </p>
            </div>
            <div className="steps">
                <div className="step find-cinema col span-1-of-4">
                    <h4>Find cinema</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                        optio possimus, provident reprehenderit sit tempore
                        voluptate, voluptatem!
                    </p>
                </div>
                <div className="step find-cinema col span-1-of-4">
                    <h4>Choose film</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                        optio possimus, provident reprehenderit sit tempore
                        voluptate, voluptatem!
                    </p>
                </div>
                <div className="step find-cinema col span-1-of-4">
                    <h4>Buy ticket</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                        optio possimus, provident reprehenderit sit tempore
                        voluptate, voluptatem!
                    </p>
                </div>
                <div className="step find-cinema col span-1-of-4">
                    <h4>Enjoy your film</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab architecto autem error, fuga nobis non numquam obcaecati
                        optio possimus, provident reprehenderit sit tempore
                        voluptate, voluptatem!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default StepsSection