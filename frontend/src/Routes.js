import React from 'react';
import {BrowserRouter , Route , Switch} from 'react-router-dom';
import Home from './core/Home';
import SignUp from './user/Signup';
import SignIn from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

const Routes = () => {
    return ( 
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
                <PrivateRoute exact path='/user/dashboard' component={UserDashBoard} />
                <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard} />
                <AdminRoute exact path='/admin/create/category' component={AddCategory} />
                <AdminRoute exact path='/admin/categories' component={ManageCategories} />
                <AdminRoute exact path='/admin/products' component={ManageProduct} />
                <AdminRoute exact path='/admin/product/update/:productId' component={UpdateProduct} />
                <AdminRoute exact path='/admin/create/product' component={AddProduct} />
            </Switch>
        </BrowserRouter>
      );
}
 
export default Routes;