import jwtDecode from 'jwt-decode';


function authorization() {
    try {
        return jwtDecode(localStorage.getItem('loginToken'))
    } catch (e) {
        return false
    }
}


let authentication = {
    authorization
}

export default authentication