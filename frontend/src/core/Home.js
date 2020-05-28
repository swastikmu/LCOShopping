import React from 'react';
import '../styles.css'
import {API} from '../backend'
import Base from './Base'
import Card from './Card';



const Home = () => {
    console.log(`API is ${API} `)
    
    return ( 
        <React.Fragment>
            <Base title="Home Page" description="This is Home Page">
                <div className="row">
                    <div className="col-4"><Card/></div>
                    <div className="col-4"><Card/></div>
                    <div className="col-4"><Card/></div>
                </div>
            </Base>
        </React.Fragment>
     );
}
 
export default Home;