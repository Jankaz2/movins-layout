import React from 'react'
import PageNotFoundScss from '../styles/pageNotFound.scss'

const PageNotFound = () => {
    return (
        <div className='page-not-found'>
            <div className='error-404'>
                <h1 className='error-404__text'>404</h1>
                <h1 className='error-404__text'>Not Found</h1>
                <h1 className='error-404__text'>This page does not exist</h1>
            </div>
        </div>
    )
}

export default PageNotFound