import { API } from "../../backend";


//Category calls

export const createCategory = (userId , token , category ) => {
    console.log(token);
    return (
        fetch(`${API}/category/create/${userId}` , { 
            method : 'POST',
            headers : {
            Accept: 'application/json',
            "Content-Type" : 'application/json',
            Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(category)
        })
        .catch(err => console.log(err))
        .then(res => {return res.json()})
)
}
//get all category

export const getCategories = ( ) => {
    return (
        fetch(`${API}/categories` , { 
            method : 'GET'
        })
        .catch(err => console.log(err))
        .then(res => {return res.json()})
)
}


//Product calls

export const createProduct = (userId , token , product ) => {
    console.log(token);
    return (
        fetch(`${API}/product/create/${userId}` , { 
            method : 'POST',
            headers : {
            Accept: 'application/json',
            // "Content-Type" : 'application/json',
            Authorization : `Bearer ${token}`
            },
            body : product
        })
        .catch(err => console.log(err))
        .then(res => {return res.json()})
)
}
//get all products
export const getAllProducts = ( ) => {
    return (
        fetch(`${API}/products` , { 
            method : 'GET'
        })
        .catch(err => console.log(err))
        .then(response => {
            return response.json();
          })
)
}

//get a single product
export const getProduct = (productId) => {
    
    return (
        fetch(`${API}/product/${productId}` , { 
            method : 'GET'
        })
        .catch(err => console.log(err))
        .then(res => {return res.json()})
)
}

//update a products

export const updateProduct = (product , token , productId , userId) => {
    console.log( "toekn" , token);
    return (
        fetch(`${API}/product/${productId}/${userId}` ,  { 
            method : 'PUT',
            headers : {
            Accept: 'application/json',
            // "Content-Type" : 'application/json',
            Authorization : `Bearer ${token}`
            },
            body : product
        })
        .catch(err => console.log(err))
        .then(res => {return res.json()})
)
}

//delete a product
 
export const deleteProduct = (productId , userId ,token) => {
    return (
        fetch(`${API}/product/${productId}/${userId}` ,  { 
            method : 'DELETE',
            headers : {
            Accept: 'application/json',
            // "Content-Type" : 'application/json',
            Authorization : `Bearer ${token}`
            }
        })
        .then(res => {return res.json()})
        .catch(err => console.log(err))
        
)
}