import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import MoviesForm from './MovieForm';

const RoutingMovieForm = () => {
    
    let navigate = useNavigate()
    let parameters = useParams()

    return ( 
        <React.Fragment>
            <MoviesForm routeNavigate={navigate} parameters={parameters}/>
        </React.Fragment>
     );
}
 
export default RoutingMovieForm;
