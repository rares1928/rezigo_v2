import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

function ProtectedRouteAdmins (props){
    const cookie = new Cookies();
    
    return(
        <Route 
            render={()=>{
                if(cookie.get("plan") === "Dio" ){
                    return(
                        props.children
                    )
                }else{
                    return(
                        <Redirect to="/"/>
                    )
                }
            }}
        />
    )
}

export default ProtectedRouteAdmins;