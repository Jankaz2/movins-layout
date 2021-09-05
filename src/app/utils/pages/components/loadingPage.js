import React from "react";
import {Loading} from 'react-loading-dot'
import LoadingPageScss from '../styles/loadingPage.scss'

const LoadingPage = () => {
    return (
        <div className='loading-page'>
            <div className='loading-page__text'>
                <h3 className='heading-tertiary__pink'>Wait a minute</h3>
            </div>
            <div className="loading-page__dots">
                <Loading/>
            </div>
        </div>
    )
}

export default LoadingPage