import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import CinemasList from "../cinema_list/cinemaList";
import {DataManager} from "../data_transfer/dataManager";

function App() {
    return (
        <DataManager>
            <Router>
                    <Route path="/cinema-list" exact component={CinemasList}/>
                    <Route path="/" exact component={Header}/>
                    <Route path="/" component={Footer}/>
            </Router>
        </DataManager>
    );
}

export default App