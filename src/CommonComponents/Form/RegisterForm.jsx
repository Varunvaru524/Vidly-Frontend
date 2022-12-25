import React, { Component } from 'react';
import httpServices from '../../Back-End Services/callingBackendServices';
import Joi from 'joi-browser'

class Register extends Component {
    state = {
        register:{username:'',password:'',name:''},
        errors:{username:'',password:'',name:''}
    }

    schema = {
        username:Joi.string().email().required(),
        password:Joi.string().min(5).required(),
        name:Joi.string().min(5).alphanum().required()
    }

    handleChange(event){
        let updatedRegister = this.state.register
        updatedRegister[event.currentTarget.name] = event.currentTarget.value
        this.setState({register:updatedRegister})
    }

    validationOnSubmit(){
        let validated = Joi.validate(this.state.register,this.schema,{abortEarly:false})

        if (validated.error) {
            let updatedErrors = {}
            for (let i = 0; i < validated.error.details.length; i++) {
                updatedErrors[validated.error.details[i].path] = validated.error.details[i].message
            }
            this.setState({errors:updatedErrors})
        }
        else{
            this.setState({errors:{username:'',password:'',name:''}})
            return true
        }
    }

    handleSubmit(event){
        event.preventDefault()
        if (this.validationOnSubmit()) {

            // Calling Backend Service
            let registerInfo = {
                email:this.state.register.username,
                password:this.state.register.password,
                name:this.state.register.name
            }

            httpServices.register(registerInfo)
            .then(e=>{
                localStorage.setItem('loginToken',e.headers["x-auth-token"])
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
                <div className="register">
                    <h1>Register</h1><br />
                    <div className="registerName">
                        <p>Name</p>
                        <input type="text" value={this.state.register.name} onChange={(e)=>this.handleChange(e)} placeholder='Enter Name' name='name' autoFocus/>
                        <div className='errorFound'>{this.state.errors.name}</div>
                    </div><br />
                    <div className="registerUsername">
                        <p>Username or Email</p>
                        <input type="text" value={this.state.register.username} onChange={(e)=>this.handleChange(e)} placeholder='Enter Username or Email' name='username'/>
                        <div className='errorFound'>{this.state.errors.username}</div>
                    </div><br />
                    <div className="registerPassword">
                        <p>Password</p>
                        <input type="password" value={this.state.register.password} onChange={(e)=>this.handleChange(e)} placeholder='Enter Password' name='password'/>
                        <div className='errorFound'>{this.state.errors.password}</div>
                    </div><br/>
                    <button className='delete'>Register</button>
                </div>
            </form>
        );
    }
}
 
export default Register;