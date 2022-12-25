import React, { Component } from 'react';
import authentication from './../../Back-End Services/authService';

class TableHead extends Component {
    state = {
        tableHeadData : [
            [
                {displayName:'No',databaseName:'slNo'},
                {displayName:'Title',databaseName:'title'},
                {displayName:'Genre',databaseName:'Genre'},
                {displayName:'Stock',databaseName:'numberInStock'},
                {displayName:'Rate',databaseName:'dailyRentalRate'},
                {displayName:'Like',databaseName:'Like'},
                {displayName:'Delete',databaseName:'Delete'}
            ]
        ]
    }

    componentDidMount() {
        if (authentication.authorization()) {
            return
        }
        else{
            let updatedTableHeadData = this.state.tableHeadData[0].filter(e=>e.displayName!=='Delete')
            this.setState({tableHeadData:[updatedTableHeadData]})
        }
    }

    render() { 
        const {onSort,sortStatus,sortActive} = this.props
        
        return (
            <thead>
                {this.state.tableHeadData.map((e,i)=>{
                    return (
                        <tr key={i}>{e.map((e,i)=>{
                            return (
                                <th onClick={()=>onSort(e.databaseName)} key={i}>{e.displayName}<i style={{display:(sortActive===e.databaseName)?'inline-block':'none'}} className={(sortStatus)?"fa-solid fa-caret-up":"fa-solid fa-caret-down"}></i></th>
                            )
                        })}</tr>
                    )
                })}
            </thead>
        );
    }
}

export default TableHead;