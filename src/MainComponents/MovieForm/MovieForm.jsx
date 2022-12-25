import React, { Component } from 'react';
import Joi from 'joi-browser';
import httpServices from './../../Back-End Services/callingBackendServices';

class MoviesForm extends Component {

    state = {
        movie:{title:'',genre:'',numberInStock:'',rate:''},
        errors:{title:'',genre:'',numberInStock:'',rate:''},
        allGenres:[]
    }

    schema = {
        title: Joi.string().required().label('Title'),
        genre: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(255).label('Number in stock').required(),
        rate: Joi.number().min(0).max(10).required().label('Rate')
    }

    async componentDidMount() {
        let {data} = await httpServices.allGenres()
        this.setState({allGenres:data})

        // To add new Movie
        if (this.props.parameters.id === 'new') {
            return
        }

        // To edit existing movie
        else {
            let {data} = await httpServices.getMovie(this.props.parameters.id)
            let updatedMovie = {
                title: data.title,
                genre: data.genre._id,
                numberInStock: data.numberInStock,
                rate: data.dailyRentalRate
            }
            this.setState({movie:updatedMovie})
        }
    }

    handleChange = ({currentTarget})=>{
        const {name,value} = currentTarget
        let movie = this.state.movie
        movie[name] = value
        this.setState({movie})
    }

    validationOnSubmit(){
        let validated = Joi.validate(this.state.movie,this.schema,{abortEarly:false})

        if (validated.error) {
            let updatedErrors = {}
            for (let i = 0; i < validated.error.details.length; i++) {
                updatedErrors[validated.error.details[i].path] = validated.error.details[i].message
            }
            this.setState({errors:updatedErrors})
        }
        else{
            this.setState({errors:{title:'',genre:'',numberInStock:'',rate:''}})
            return true
        }
    }

    async handleSubmit(event){
        event.preventDefault()
        if (this.validationOnSubmit()) {

            let newMovie = {
                title:this.state.movie.title,
                genreId:this.state.movie.genre,
                numberInStock:this.state.movie.numberInStock,
                dailyRentalRate:this.state.movie.rate
            }

            // To add new Movie
            if (this.props.parameters.id === 'new') {
                await httpServices.newMovie(newMovie)
            }
            // To update the existing movie
            else {
                await httpServices.updateMovie(this.props.parameters.id,newMovie)
            }
            
            this.props.routeNavigate('/')
            window.location.reload()
        }
        else {
            console.log('Error Found');
        }
    }


    render() { 
        return (
            <form onSubmit={(e)=>this.handleSubmit(e)} >
                <div className="movieForm">
                    <h1>Movie Form</h1><br />
                    <div className="movieTitle">
                        <p>Title</p>
                        <input type="text" value={this.state.movie.title} onChange={(e)=>this.handleChange(e)} name='title' placeholder='Enter Movie Title' autoFocus/>
                        <div className='errorFound'>{this.state.errors.title}</div>
                    </div><br />
                    <div className="movieGenre">
                        <p>Genre</p>
                        <select value={this.state.movie.genre} onChange={(e)=>this.handleChange(e)} name="genre">
                            <option value=''>Select Genre</option>
                            {this.state.allGenres.map((e,i)=>{return <option value={e._id} key={i} >{e.name}</option>})}
                        </select>
                        <div className='errorFound'>{this.state.errors.genre}</div>
                    </div><br/>
                    <div className="movieNoInStock">
                        <p>Number in Stock</p>
                        <input type="text" value={this.state.movie.numberInStock} onChange={(e)=>this.handleChange(e)} name='numberInStock' placeholder='Enter Number in Stock'/>
                        <div className='errorFound'>{this.state.errors.numberInStock}</div>
                    </div><br />
                    <div className="movieRate">
                        <p>Rate</p>
                        <input type="text" value={this.state.movie.rate} onChange={(e)=>this.handleChange(e)} name='rate' placeholder='Enter Rating'/>
                        <div className='errorFound'>{this.state.errors.rate}</div>
                    </div><br />
                    <button className='delete'>Save</button>
                </div>
            </form>
        );
    }
}
 
export default MoviesForm;