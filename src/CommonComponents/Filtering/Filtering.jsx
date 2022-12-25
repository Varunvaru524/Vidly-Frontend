import React, { Component } from 'react';
import './Filtering.css'

class Filter extends Component {
    render() { 
        const {allData,onFiltering,currentGenre} = this.props
        const moviesFiltered = [{id:1,name:'All Movies'},...allData]
        
        return (
            <div className="filterOuterContainer">
                <div className='filterContainer'>
                    {moviesFiltered.map((e,i)=><button style={{backgroundColor:(e.name===currentGenre)&&'rgb(0, 53, 245)',color:(e.name===currentGenre)&&'white'}} className='filterElements' onClick={()=>onFiltering(e)} key={i} >{e.name}</button>)}
                </div>
            </div>
        );
    }
}
 
export default Filter;