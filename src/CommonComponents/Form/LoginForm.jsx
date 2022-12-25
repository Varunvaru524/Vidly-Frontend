import React, { Component } from 'react';
import httpServices from '../../Back-End Services/callingBackendServices';
import  Joi  from 'joi-browser';
import './Form.css'

class Login extends Component {
    state = {
        login:{username:'',password:''},
        errors:{username:'',password:''}
    }

    schema = {
        username:Joi.string().email().required(),
        password:Joi.string().min(5).required()
    }

    handleChange(event){
        let updatedLogin = this.state.login
        updatedLogin[event.currentTarget.name] = event.currentTarget.value
        this.setState({login:updatedLogin})
    }

    validationOnSubmit(){
        let validated = Joi.validate(this.state.login,this.schema,{abortEarly:false})

        if (validated.error) {
            let updatedErrors = {}
            for (let i = 0; i < validated.error.details.length; i++) {
                updatedErrors[validated.error.details[i].path] = validated.error.details[i].message
            }
            this.setState({errors:updatedErrors})
        }
        else{
            this.setState({errors:{username:'',password:''}})
            return true
        }
    }

    handleSubmit(event){
        event.preventDefault()
        if (this.validationOnSubmit()) {
            
            // Calling Backend Service
            let userInfo = {
                email: this.state.login.username,
                password: this.state.login.password
            }
            httpServices.login(userInfo).then(e=>{
                localStorage.setItem('loginToken',e.data)
                this.props.routeNavigate('/')
                window.location.reload()
            })
        }
        else {
            console.log('Error Found');
        }
    }

    render() { 
        return (
            <form onSubmit={(e)=>this.handleSubmit(e)} >
                <div className="login">
                    <h1>Login</h1><br />
                    <div className="loginUsername">
                        <p>Username or Email</p>
                        <input type="text" value={this.state.login.username} onChange={(e)=>this.handleChange(e)} name='username' placeholder='Enter Username or Email' autoFocus/>
                        <div className='errorFound'>{this.state.errors.username}</div>
                    </div><br />
                    <div className="loginPassword">
                        <p>Password</p>
                        <input type="password" value={this.state.login.password} onChange={(e)=>this.handleChange(e)} name='password' placeholder='Enter Password'/>
                        <div className='errorFound'>{this.state.errors.password}</div>
                    </div><br/>
                        <button className='delete'>Login</button>
                </div>
            </form>
        );
    }
}

export default Login;