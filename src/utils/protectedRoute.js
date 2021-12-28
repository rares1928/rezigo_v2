import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

function ProtectedRoute (props){
    const cookie = new Cookies();
    
    return(
        <Route 
            render={()=>{
                if(cookie.get("estiLogat") === "rapid" && cookie.get("accessToken").length > 20 ){
                    return(
                        props.children
                    )
                }else{
                    return(
                        <Redirect to="/prezentare"/>
                    )
                }
            }}
        />
    )
}

export default ProtectedRoute;