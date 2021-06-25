import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../pages/home_page/header/header";
import Footer from "../pages/home_page/footer/footer";
import CinemasList from "../pages/search_cinema_page/cinema_list/cinemaList";
import Cinema from "../pages/single_cinema_page/cinema/cinema"
import {DataManager} from "../utils/data_transfer/dataManager";

function App() {
    return (
        <DataManager>
            <Router>
                    <Route path="/cinema-list" exact component={CinemasList}/>
                    <Route path="/cinema-list/cinema/:id" exact component={Cinema}/>
                    <Route path="/" exact component={Header}/>
                    <Route path="/" component={Footer}/>
            </Router>
        </DataManager>
    );
}

export default App