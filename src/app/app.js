import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./user/pages/home_page/header/components/homePage";
import Footer from "./user/pages/home_page/footer/components/footer";
import CinemasList from "./user/pages/search_cinema_page/cinema_list/components/cinemaList";
import Cinema from "./user/pages/single_cinema_page/cinema/components/cinema"
import {AppContext} from "./utils/store/appContext";
import AdminPage from "./admin/pages/admin_page/adminPage";
import PageNotFound from "./utils/pages/components/pageNotFound";
import MyAccount from "./user/pages/user_account/components/myAccount";
import UserActivation from "./utils/pages/components/userActivation";
import EmailVerification from "./utils/pages/components/emailVerification";

function App() {
    return (
        <AppContext>
            <Router>
                <Switch>
                    <Route path="/cinema-list" exact component={CinemasList}/>
                    <Route path="/cinema-list/cinema/:id" exact component={Cinema}/>
                    <Route path="/users/activation" component={UserActivation}/>
                    <Route path="/user/verification" component={EmailVerification}/>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/admin" exact component={AdminPage}/>
                    <Route path="/my-account" exact component={MyAccount}/>
                    <Route exact component={PageNotFound}/>
                </Switch>
                <Route path="/" component={Footer}/>
            </Router>
        </AppContext>
    );
}

export default App