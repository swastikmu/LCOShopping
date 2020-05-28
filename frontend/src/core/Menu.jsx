import React , {Fragment} from 'react';
import {Link, withRouter } from 'react-router-dom';
import { signout , isAuthenticated} from '../auth/helper';


const currentTab = (history , path) => {
    if (history.location.pathname === path) {
        return {color : '#2ECC72'}
    }
    else{
        return {color : '#FFFFFF'}
    }
}

const Menu = ({history}) => {
    return ( 
        <React.Fragment>

        {/* <nav className="navbar navbar-inverse navbar-static-top justify-content-end">
          
    
                    <Link style={currentTab(history , '/')} className="nav-link" to="/">Home</Link>
                    <Link style={currentTab(history , '/cart')} className="nav-link" to="/cart">Cart</Link>
            
            </nav> */}

            <ul  className="nav nav-tabs bg-dark ">
                <li className="nav-item">
                    <Link style={currentTab(history , '/')} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history , '/cart')} className="nav-link" to="/cart">Cart</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && 
                <li className="nav-item">
                <Link style={currentTab(history , '/user/dashboard')} className="nav-link" to="/user/dashboard">Dashboard</Link>
                </li>
                }
                { isAuthenticated() && isAuthenticated().user.role === 1 && 
                <li className="nav-item ">
                <Link style={currentTab(history , '/admin/dashboard')} className="nav-link" to='/admin/dashboard'>Admin Dashboard</Link>
                </li>
                }
                
                
                {!isAuthenticated() && 
                <Fragment>
                <li className="nav-item">
                    <Link style={currentTab(history , '/signup')} className="nav-link" to="/signup">Sign Up</Link>
                </li>

                {/* {!isAuthenticated() &&  */}
                <li className="nav-item">
                <Link style={currentTab(history , '/signin')} className="nav-link text-success" to="/signin">Sign In</Link>
                </li>
                </Fragment>}
                
               {isAuthenticated() && (
                   <li className="nav-item">
                   {/* <Link style={currentTab(history , '/signout')}  className="nav-link" to="/signout">Sign Out</Link> */}
                   <span className="nav-link text-warning" onClick={
                       () => {
                           signout(() => {
                               history.push('/')
                           })
                       }
                   } >Sign Out</span>
               </li>
               )} 
              
            </ul>

        </React.Fragment>
     );
}
 
export default withRouter(Menu);