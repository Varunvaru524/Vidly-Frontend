import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import authentication from '../../Back-End Services/authService';
import './NavBar.css'

class NavBar extends Component {
    render() { 
        return (
            <header>
                <nav>
                    <ul>
                        <NavLink to='/' reloadDocument>Vidly</NavLink>
                        <NavLink to='/movies'>Movies</NavLink>
                        {authentication.authorization()?<a href='/'>{authentication.authorization().name}</a>:<NavLink to='/login'>Login</NavLink>}
                        {authentication.authorization()?<NavLink className='delete' style={{color:'white'}} reloadDocument onClick={()=>localStorage.removeItem('loginToken')}>Logout</NavLink>:<NavLink to='/register'>Register</NavLink>}
                    </ul>
                </nav>
            </header>
        );
    }
}
 
export default NavBar;