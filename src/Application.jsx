import React, { Component } from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Movies from "./MainComponents/Movies";
import NavBar from './CommonComponents/NavBar/NavBar';
import RoutingLogin from './CommonComponents/Form/RoutingLogin';
import RoutingRegister from './CommonComponents/Form/RoutingRegister';
import NotFoundPage from './CommonComponents/Form/NotFoundPage';
import RoutingMovieForm from './MainComponents/MovieForm/RoutingMovieForm';
import authentication from './Back-End Services/authService';

class App extends Component {
    render() { 
        return (
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<Navigate to='/movies'/>}/>
                    <Route path='/movies' element={<Movies/>}/>
                    {authentication.authorization()&&<Route path='/movies/:id' element={<RoutingMovieForm/>}/>}
                    <Route path='/login' element={<RoutingLogin/>}/>
                    <Route path='/register' element={<RoutingRegister/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        );
    }
}

export default App;