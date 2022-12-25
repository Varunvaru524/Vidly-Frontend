import React, { Component } from 'react';
import './Pagination.css'

class Pagination extends Component {
    render() { 
        const {totalMovies,pageSize,currentPage,onPagination} = this.props
        let totalPages = Math.ceil(totalMovies/pageSize)
        let pageNumbers = []

        for (let i = 0; i < totalPages; i++) {
            pageNumbers.push(i+1)
        }

        if (totalPages === 1) {
            return
        }

        return (
            <div className='paginationContainer'>
                {pageNumbers.map((e,i)=><button style={{backgroundColor:(e === currentPage)&&'rgb(0, 53, 245)',color:(e === currentPage)&&'white'}} onClick={()=>onPagination(e)} key={i}>{e}</button>)}
            </div>
        );
    }
}
 
export default Pagination;