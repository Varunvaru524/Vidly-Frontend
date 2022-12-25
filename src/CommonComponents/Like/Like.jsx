import React, { Component } from 'react';
import './Like.css'

class Like extends Component {
    render() { 
        return (
            <i className={(this.props.likeStatus)?"fa-solid fa-heart":"fa-regular fa-heart"}></i>
        );
    }
}
 
export default Like;