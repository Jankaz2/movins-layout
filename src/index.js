import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from "./app/app"
import {AppContext} from "./app/utils/store/appContext";

ReactDOM.render(
    <React.StrictMode>
        <AppContext>
            <App/>
        </AppContext>
    </React.StrictMode>,
    document.getElementById('root')
);
