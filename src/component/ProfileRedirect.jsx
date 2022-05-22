import React from 'react'
import {useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function ProfileRedirect() {
    let navigate = useNavigate()
    let id = jwt_decode(localStorage.getItem('accessToken'))['id']
    useEffect(() => {
        navigate(`./${id}`)
    }, []);

    return (
        <></>
    )
}

export default ProfileRedirect