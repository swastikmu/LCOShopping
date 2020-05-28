import React from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'

const AdminDashBoard = () => {

    const {user : {name , email , role}} = isAuthenticated();
    const AdminLeftSide = () =>{
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                        <li className="list-group-item">
                            <Link to='/admin/create/category' className="nav-link text-info text-center">Create Categories</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/admin/categories' className="nav-link text-info text-center">Manage Categories</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/admin/create/product' className="nav-link text-info text-center">Create Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/admin/products' className="nav-link text-info text-center">Manage Products</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/admin/orders' className="nav-link text-info text-center">Manage Order</Link>
                        </li>
                    </ul>
            </div>
        )
    }

    const AdminRightSide = () =>{
        return(
            <div className="card mb-4">
                <h4 className="card-header bg-dark text-white text-center">Admin Information</h4>
                <ul className="list-group">
                        <li className="list-group-item">
                           <span className="badge badge-success mr-2">Name :</span> {name}
                        </li>
                        <li className="list-group-item">
                           <span className="badge badge-success mr-2">Email :</span> {email}
                        </li>
                        <li className="list-group-item">
                           <span className="badge badge-danger">You Are Admin: Be careful with Changes</span>
                        </li>
                      
                    </ul>
            </div>
        )
    }

     
    const {user : {
        
    }} = isAuthenticated();



    return ( 
        <React.Fragment>
            <Base title="Welcome to Admin Page" description="manage all your products here" className="container bg-success p-4"> 
                {/* <h1>This is AdminDashboard page</h1> */}
                <div className="row">
                    <div className="col-3">
                    {AdminLeftSide()}
                    </div>
                    <div className="col-9">
                    {AdminRightSide()}
                    </div>
                </div>
            
            </Base>

        </React.Fragment>     );
}
 
export default AdminDashBoard;