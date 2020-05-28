import React, {useState} from 'react';
import Base from '../core/Base'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import {createCategory} from './helper/adminapicall'


const AddCategory = () => {


    const [name , setName] = useState("");
    const [error , setError] = useState(false);
    const [success , setSuccess] = useState(false);
    
    const {token , user } = isAuthenticated();

    const handleChange = (event) => {
        setError("");
        setName( event.target.value );
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //bakend create categoy fored
        createCategory(user._id , token , {name})
        .then(data  => {
            if (data.error) {
                setError(true);
            }
            else{
                setName("");
                setSuccess(true);
                setError("");
                
            }
        })
    }

    const successMessage = () => {
       
            if (success) {
             return    <h4 className="text-success">Category Created Successfully</h4>
            }
        
    }

    const errorMessage = () => {
       
        if (error) {
         return    <h4 className="text-danger">Failed to create Category</h4>
        }
    
}

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead font-weight-bold">Enter a Category</p>
                    <input type='text' className="form-control my-3"
                    required
                    autofocus
                    placeholder="e.g Summer Collection"
                    onChange={handleChange}
                    value={name}
                    />
                    <button className="btn btn-outline-info mr-2 " onClick={onSubmit}>Create Category</button>
                </div>
            </form>
        )
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to='/admin/dashboard' className="btn btn-sm btn-success mb-2">Admin Home</Link>
            </div>
        )
    }

    return ( 
        <React.Fragment>
            {/* <h1 className="text-white">Ad a new category here</h1> */}
            <Base title="Create a new Category here"
                  description="Add a category for new t-shirt"
                  className="container bg-info p-4" >

                      <div className="row bg-white rounded">
                        <div className="col-8 offset-md-2"> 
                            {successMessage()}                      
                            {errorMessage()}                      
                            {myCategoryForm()}
                            {goBack()}
                        </div>
                      </div>
            </Base>
        </React.Fragment>
      );
}
 
export default AddCategory;