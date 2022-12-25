import React, { Component } from 'react';
import authentication from '../../Back-End Services/authService';
import {Link} from 'react-router-dom'
import Like from "../Like/Like";
import PropTypes from 'prop-types'

class TableBody extends Component {
    render() { 
        const {allData,onDelete,onLiked,pageSize,currentPage,currentSearch} = this.props

        let addedSearch = []
        if (currentSearch === '') {
            addedSearch = allData
        }
        else{
            addedSearch = allData.filter(element=>element.title.toUpperCase().startsWith(currentSearch.toUpperCase()))
        }

        return (
            <tbody>
                {addedSearch.map((e,i)=>{
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            {authentication.authorization()?<td><Link to={'/movies/'+ e._id}>{e.title}</Link></td>:<td><Link to='/login'>{e.title}</Link></td>}
                            <td>{e.genre.name}</td>
                            <td>{e.numberInStock}</td>
                            <td>{e.dailyRentalRate}</td>
                            <td onClick={()=>onLiked(e)}><Like likeStatus={e.likeStatus}/></td>
                            {authentication.authorization()&&<td><button className='delete' onClick={()=>onDelete(e)}>Delete</button></td>}
                        </tr>
                    )
                }).slice((pageSize*(currentPage-1)),(pageSize*currentPage))}
            </tbody>
        );
    }
}
 
export default TableBody;

TableBody.propTypes = {
    allData: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}
