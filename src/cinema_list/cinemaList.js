import React, {useState, useContext} from "react"
import Header from "../header/header"
import CinemasListCss from "./cinemasList.css"
import {DataContext} from "../data_transfer/dataManager";

const CinemasList = () => {
    const { state } = useContext(DataContext)

    return (
        <div>
             <div>
                <nav className='cinema-list-section-nav'>
                    <span><div className="cinemas-list-section-logo">CinemaFactory</div></span>
                    <form className='cinema-list-section-form'>
                        <input type="search" placeholder="cinema name"/>
                        <input type="search" placeholder="city"/>
                        <input type="submit" value="search"/>
                    </form>
                </nav>
            </div>
            <section className="cinemas-list-section">
                <ul>
                    {
                        state.cinemas.map((cinema, idx) => {
                            return (
                                <li key={idx} className='font-link cinema-from-list row'>
                                    <div className='col span-1-of-2'>
                                        <p>{cinema.name} -> {cinema.city}</p>
                                    </div>
                                    <div className='col span-1-of-2'>
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
                            )
                        })
                    }
                </ul>
            </section>
        </div>
    )
}

export default CinemasList