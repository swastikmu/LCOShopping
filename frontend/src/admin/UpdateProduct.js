import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link , Redirect} from "react-router-dom";
import { getCategories, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";



const UpdateProduct = ({match}) => {

  const {user , token} = isAuthenticated();
  console.log(token)

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  const preload = (productId) => {
    console.log(productId);
    getProduct(productId).then(data => {
      
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({ ...values,
        
        name : data.name,
        description : data.description,
        price : data.price,
        category : data.category._id,
        stock : data.stock,
        formData : new formData()

        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const successMessage = () => {
    
     return    (
       <div className="alert alert-success alert mt-3"
       style={{ display : createdProduct ? "" : "none"}}
       >
         <h4>{createdProduct} is created successfully</h4>
       </div>
     )
  

}

const redirectHome = () => {

  if (loading) {
    setTimeout( function () {
      if (getaRedirect){
        return <Redirect to='./admin/dashboard'/>
    }}, 2000)
  }

}


const errorMessage = () => {

if (error) {
 return    <h4 className="text-danger">Failed to create Product</h4>
}

}

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" , loading: false});
    updateProduct(user._id , token , formData)
      .then((product) => {
        console.log(createdProduct)
              if (product.error) {
                setValues({ ...values, loading: true, getaRedirect: true, error: product.error});
               }
               else{
                setValues({ ...values, 
                name : "", 
                description : "",
                price : "",
                stock : "",
                photo: "",
                loading: false,
                createdProduct: product.name
                });
               }
      })
  };

  const handleChange = name => event => {
  const  value = name === "photo" ? event.target.files[0] : event.target.value;
  formData.set(name, value);
  setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
      
           { categories && categories.map((category , index ) => 
              (<option key={index} value={category._id}>{category.name}</option>)
            )
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
          {redirectHome()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
