import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './RegisterForm';

const RoutingRegister = (props) => {
    let navigate = useNavigate()
    return ( 
        <React.Fragment>
            <Register routeNavigate={navigate}/>
        </React.Fragment>
     );
}
 
export default RoutingRegister;
