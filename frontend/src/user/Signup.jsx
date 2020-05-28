import React , {useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper';


const SignUp = () => {

    const [values , setValues] = useState({ 
     name : '',
     email : '',
     password : '',
     error : '',
     success : false
    })

    const { name , email , password, error , success } = values;

    const handleChanges = name =>  event => {
        setValues({...values, error: false, [name] : event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name , email , password})
        .then(data => {
            if (data.error) {
               setValues({...values, error : data.error , success: false}) 
            }
            else {
                setValues({...values, 
                    name : '',
                    email : '',
                    password : '',
                    error : '',
                    success : true
                })
            }
        })
        .catch()
    }

   const  successMessage = () => {
       return (
           <div className="alert alert-success" style={{ display: success ? '' : 'none'}}>

               You have sucessfully created account. click <Link to='/signin'>Login here</Link>
           </div>
       )
   }

   const  errorMessage = () => {
    return (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none'}}>

            {error}
        </div>
    )
}

    const SignUpForm = () => {
        return ( 
            <React.Fragment>
                <div className="container-fluid">
                    <div className="col-md-6  offset-sm-3">
                        <form>
                            <div className="form-group">
                                <label className="text-light">Name</label>
                                <input className="form-control" 
                                onChange={handleChanges("name")}
                                value={name}
                                type="text" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Email</label>
                                <input className="form-control"
                                onChange={handleChanges("email")}
                                value={email}
                                type="email" />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Password</label>
                                <input className="form-control" 
                                onChange={handleChanges("password")}
                                value={password}
                                type="password" />
                            </div>
                            <button onClick={onSubmit} className="btn-success btn btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            
            </React.Fragment>
          );
    }

    return ( 
        <React.Fragment>
            <Base title="Sign up" description="A Page For User to Sign Up!">
                {successMessage()}
                {errorMessage()}
                {SignUpForm()}
            </Base>
    {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </React.Fragment>
     );
}
 
export default SignUp;