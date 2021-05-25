import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"
import Header from "../header/header"
import CinemasListCss from "./cinemasList.css"
import {DataContext} from "../data_transfer/dataManager";

const CinemasList = () => {
    const {state} = useContext(DataContext)

    return (
        <div>
            <nav className='cinema-list-section-nav'>
                <Link to="/">
                    <span><div className="cinemas-list-section-logo">CinemaFactory</div></span>
                </Link>
                <form className='cinema-list-section-form'>
                    <input type="search" placeholder="cinema name"/>
                    <input type="search" placeholder="city"/>
                    <input type="submit" value="search"/>
                </form>
            </nav>
            <section className="cinemas-list-section">
                <ul>
                    {
                        state.cinemas.map((cinema, idx) => {
                            return (
                                <Link to={`/cinema-list/cinema/${cinema.id}`}>
                                    <li key={cinema.id} className='font-link row'>
                                        <div className='col span-1-of-2'>
                                            <div className='col span-1-of-2'>
                                                <h4>name:</h4>
                                                <h5>{cinema.name}</h5>
                                                <br/>
                                            </div>
                                            <div className='col span-1-of-2'>
                                                <h4>city:</h4>
                                                <h5>{cinema.city}</h5>
                                            </div>
                                        </div>
                                        <div className='col span-1-of-2'>
                                            <h4>Description</h4>
                                            <br/>
                                            <p>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit.
                                                Dolor doloremque dolores id possimus, quae
                                                quas recusandae tempora.
                                                Aspernatur autem blanditiis corporis, dolor
                                                eos esse facere iure
                                                nam nemo, nostrum quibusdam, saepe
                                                similique! Dignissimos doloremque
                                                iusto natus quod. Accusantium, dignissimos,
                                                laudantium.
                                            </p>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </section>
        </div>
    )
}

export default CinemasList