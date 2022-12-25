import React, { Component } from 'react';
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import PropTypes from 'prop-types'
import './Table.css'

class Table extends Component {
    render() { 
        const {allData,onDelete,onLiked,pageSize,currentPage,currentSearch,onSort,sortStatus,sortActive} = this.props
        if (allData.length === 0) {
            return
        }

        return (
            <table >
              <TableHead sortActive={sortActive} sortStatus={sortStatus} onSort={onSort}/>
              <TableBody pageSize={pageSize} currentPage={currentPage} currentSearch={currentSearch} allData={allData} onDelete={onDelete} onLiked={onLiked}/>
            </table>
        );
    }
}
 
export default Table;

Table.propTypes = {
    allData:PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}

