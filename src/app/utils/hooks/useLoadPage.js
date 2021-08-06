import React, {useState} from 'react'
import LoadingPage from "../pages/loadingPage";

const useLoadPage = () => {
    const [loading, setLoading] = useState(false)
    return [
        loading ? <LoadingPage/> : null,
        () => setLoading(true),
        () => setLoading(false)
    ]
}

export default useLoadPage