import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

function ProtectedRoute (props){
    const cookie = new Cookies();

    return(
        <Route 
            render={()=>{
                if(cookie.get("estiLogat") === "rapid"){
                    return(
                        props.children
                    )
                }else{
                    return(
                        <Redirect to="/login"/>
                    )
                }
            }}
        />
    )
}

export default ProtectedRoute;