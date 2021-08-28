import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from "./app/app"
import {AppContext} from "./app/utils/store/appContext";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <StrictMode>
        <AppContext>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppContext>
    </StrictMode>,
    document.getElementById('root')
);
