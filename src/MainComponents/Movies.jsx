import React, { Component } from 'react';
import httpServices from '../Back-End Services/callingBackendServices';
import authentication from './../Back-End Services/authService';
import Table from "../CommonComponents/Table/Table";
import Pagination from "../CommonComponents/Pagination/Pagination";
import Filter from '../CommonComponents/Filtering/Filtering'

class Movies extends Component {
    state = {
        allMovies:[],
        genres:[],
        pageSize:4,
        currentPage:1,
        currentGenre:'All Movies',
        currentSearch:'',
        sortStatus:true,
        sortActive:null
    }

    async componentDidMount(){
        let {data:allMovies} = await httpServices.allMovies()
        let {data:allGenres} = await httpServices.allGenres()
        this.setState({allMovies:allMovies,genres:allGenres})
    }

    handleSearch({currentTarget}){
        this.setState({currentSearch:currentTarget.value})
    }

    handleDelete(currentElement){
        let updated = this.state.allMovies.filter(e=>e !== currentElement)
        this.setState({allMovies:updated})
        
        httpServices.deleteMovie(currentElement._id)
    }

    handleLike = (currentElement)=>{
        let updated = this.state.allMovies.map(e=>{
            if (currentElement === e) {
                e.likeStatus = !e.likeStatus
                return e
            }
            else return e
        })
        this.setState({allMovies:updated})
    }

    handlePagination = (currentPage)=>{
        this.setState({currentPage})
    }

    handleFiltering = (currentGenre)=>{
        this.setState({currentGenre:currentGenre.name,currentPage:1})
    }

    handlesorting=(currentElement)=>{
        if ((currentElement === 'title')||(currentElement === 'numberInStock')||(currentElement === 'dailyRentalRate')||(currentElement === 'Genre')) {
            let updated = null
                if (currentElement === 'Genre') {
                    updated = this.state.allMovies.sort((a,b)=>{
                        if (a.genre.name<b.genre.name) {
                            return -1
                        }
                        if (a.genre.name>b.genre.name) {
                            return 1
                        }
                        return 0
                    })
                }
                else {updated = this.state.allMovies.sort((a,b)=>{
                    if (a[currentElement]<b[currentElement]) {
                        return -1
                    }
                    if (a[currentElement]>b[currentElement]) {
                        return 1
                    }
                    return 0
                })}
            if (this.state.sortStatus === true) {
                this.setState({allMovies:updated,sortStatus:!this.state.sortStatus,sortActive:currentElement})
            }
            else {this.setState({allMovies:updated.reverse(),sortStatus:!this.state.sortStatus,sortActive:currentElement})}
        }
    }

    render() { 
        const {allMovies,pageSize,currentPage,genres,currentGenre,currentSearch,sortStatus,sortActive} = this.state
        
        const filterApplied = allMovies.filter(e=>{
            if (currentGenre === 'All Movies') {
                return true
            }
            else if (e.genre.name === currentGenre) {
                return true
            }
            else return false
        })

        return (
            <main>
                <div className='col-1'>
                    <Filter allData={genres} currentGenre={currentGenre} onFiltering={this.handleFiltering}/>
                </div>
                <div className="col-2">
                    <div id='dbCount'>{filterApplied.length} Movies in the Data Base</div>
                    {authentication.authorization()&&<button className='delete'><a style={{color:'white',textDecoration:'none'}} href="/movies/new">Add New Movie</a></button>}
                    <input type="text" placeholder='Search' value={currentSearch} onChange={(e)=>this.handleSearch(e)} /><br /><br />
                    <Table allData={filterApplied} sortActive={sortActive}  sortStatus={sortStatus} pageSize={pageSize} currentPage={currentPage} currentSearch={currentSearch} onDelete={(e)=>this.handleDelete(e)} onLiked={this.handleLike} onSort={this.handlesorting}/>
                    <Pagination totalMovies={filterApplied.length} pageSize={pageSize} currentPage={currentPage} onPagination={this.handlePagination}/>
                </div>
            </main>
        );
    }
}
 
export default Movies;