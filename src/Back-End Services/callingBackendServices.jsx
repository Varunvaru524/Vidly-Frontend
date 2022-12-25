import axios from "axios";
import { toast } from "react-toastify";


let apis = {
    movies:'http://localhost:3900/api/movies',
    genres:'http://localhost:3900/api/genres',
    login: 'http://localhost:3900/api/auth',
    register:'http://localhost:3900/api/users'
}


// Handling all backend errros
axios.interceptors.response.use(null,e=>{
    toast.error(e.message)
    console.log(e);
})


// Calling with APIs
function allMovies() {
    return axios.get(apis.movies)
}

function getMovie(id) {
    return axios.get(apis.movies + '/' + id)
}

function newMovie(movie) {
    return axios.post(apis.movies,movie)
}

function updateMovie(id,movie) {
    return axios.put(apis.movies+'/'+id,movie)
}

function allGenres() {
    return axios.get(apis.genres)
}

async function deleteMovie(id) {
    return await axios.delete(apis.movies+'/'+id)
}

async function register(item) {
    return await axios.post(apis.register,item)
}

async function login(item) {
    return await axios.post(apis.login,item)
}


let httpServices = {
    allMovies,
    getMovie,
    newMovie,
    updateMovie,
    allGenres,
    deleteMovie,
    register,
    login
}
export default httpServices