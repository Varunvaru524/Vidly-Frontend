import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
    const [count, setCount] = useState(3)
    setInterval(() => {
        setCount(count - 1)
    }, 1000);

    let navigate = useNavigate()
    setTimeout(() => {
        navigate('/')
    }, 4000);

    return ( 
        <div className='NotFoundContainer'>
            <div>
                <h1>Page Not Found</h1><br />
                <div>Redirecting to previous page in {count}</div>
            </div>
        </div>
     );
}

export default NotFoundPage;