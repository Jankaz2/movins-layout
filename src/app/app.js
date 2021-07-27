import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./user/pages/home_page/header/components/homePage";
import Footer from "./user/pages/home_page/footer/components/footer";
import CinemasList from "./user/pages/search_cinema_page/cinema_list/components/cinemaList";
import Cinema from "./user/pages/single_cinema_page/cinema/components/cinema"
import {DataManager} from "./utils/data_transfer/dataManager";
import AdminPage from "./admin/pages/admin_page/adminPage";
import LoadingPage from "./utils/pages/LoadingPage";

function App() {
    return (
        <DataManager>
            <Router>
                <Route path="/cinema-list" exact component={CinemasList}/>
                <Route path="/cinema-list/cinema/:id" exact component={Cinema}/>
                <Route path="/" exact component={HomePage}/>
                <Route path="/admin" exact component={AdminPage}/>
                <Route path="/" component={Footer}/>
            </Router>
        </DataManager>
    );
}

export default App