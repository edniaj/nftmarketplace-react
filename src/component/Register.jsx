import React from 'react'
import Container from '@mui/material/Container'
import { Box, Button, FormControl, IconButton, InputLabel, OutlinedInput, Stack } from '@mui/material'
import { useState, useContext } from 'react'
import { portContext } from '../App'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LoginIcon from '@mui/icons-material/Login'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Typography } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveAsIcon from '@mui/icons-material/SaveAs';

function Register() {
    const { port } = useContext(portContext)

    const [loginForm, setLoginForm] = useState({ username: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    let navigate = useNavigate()

    const handleInput = e => {
        setLoginForm(
            {
                ...loginForm,
                [e.target.name]: e.target.value
            })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handlePOST = async () => {

        // let url = `${port}/api/collections/search?id=${id}&page=${pageNumber}&filter=${convertFormData()}`
        let url = `${port}/api/users/create/`

        // Unable to POST with req.body thus using GET request
        await axios.post(url, loginForm)
            .then(async (res) => {

                // console.log(res.data)
                localStorage.setItem("accessToken", res.data['accessToken']);
                localStorage.setItem("refreshToken", res.data['refreshToken']);
                toast.success("Successfully registered!")
                navigate("/login");
            })
            .catch(err => {
                toast.error(err['response']['statusText']);
            })

    }

    return (
        <>
            <ToastContainer />
            <Container >

                <div style={{
                    backgroundColor: "rgb(235,235,235,0.91)",
                    zIndex: 5,
                    borderRadius: 20,
                    border: "1px solid black",
                    height: "50vh",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: "5vh"
                }}>


                    <Stack direction='column' spacing={2}>
                        <Typography variant="h4">Registration</Typography>
                        <FormControl>
                            <InputLabel>Username : </InputLabel>
                            <OutlinedInput
                                value={loginForm[`username`]}
                                name='username'
                                onChange={handleInput}
                            ></OutlinedInput>
                        </FormControl>

                        <FormControl>
                            <InputLabel> Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={loginForm['password']}
                                name='password'
                                onChange={handleInput}
                                id='password'
                                endAdornment={
                                    <IconButton onClick={handleShowPassword} edge='end'>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                }
                                label='Password'
                            ></OutlinedInput>
                        </FormControl>

                        <Button
                            variant='outlined'
                            endIcon={<SaveAsIcon />}
                            onClick={handlePOST}
                        >
                            Register
                        </Button>

                    </Stack>
                </div>
            </Container>
        </>
    )
}

export default Register