import {API} from '../../backend'; //API means backend url

export const signup = (user) => {
    return fetch ( `${API}/signup`, {
    method : 'POST',
    headers : {
            Accept: 'application/json',
            "Content-Type": 'application/json'
    },
    body : JSON.stringify(user)
    })
    .then( res => {return res.json()})
    .catch(err => console.log(err))
}

export const signin = (user) => {
    return fetch ( `${API}/signin`, {
    method : 'POST',
    headers : {
            Accept: 'application/json',
            "Content-Type": 'application/json'
    },
    body : JSON.stringify(user)
    })
    .then( res => {return res.json()})
    .catch(err => console.log(err))
}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
    }
next();
}

export const authenticate = (data , next) => {

    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt' , JSON.stringify(data));
        next();

    
        return fetch( `${API}/signout`,{
            method : 'GET',
        })
        .then(response => console.log('log out successfully'))
        .catch(err => console.log(err))

     

    }

}

export const isAuthenticated = () => {
        if (typeof window == 'undefined') {
            return false
        }
        else {
            if (localStorage.getItem('jwt')) {
                return JSON.parse(localStorage.getItem('jwt'))
            }
            else
            { return false}
        }
}
 
