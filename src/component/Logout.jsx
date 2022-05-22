import React from 'react'
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
function Logout() {

    let navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        navigate('../')
      
    }, [])
    
    return (<>

    </>)
    
}

export default Logout