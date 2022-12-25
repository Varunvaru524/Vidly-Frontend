import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './LoginForm';

const RoutingLogin = () => {
    let navigate = useNavigate()
    return ( 
        <React.Fragment>
            <Login routeNavigate={navigate}/>
        </React.Fragment>
     );
}
 
export default RoutingLogin;
