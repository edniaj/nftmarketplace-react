import React from 'react'
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import { Badge, Button, Stack } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CollectionsIcon from '@mui/icons-material/Collections';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function LoginWidget() {

    const [id, setId] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('accessToken')
        if (token) {
            setId(jwt_decode(token).id)
        }
    }, [])


    const GenerateButtons = () => {
        let navigate = useNavigate()
        if (localStorage.getItem("accessToken")) {
            return <>
                <Stack direction='row' gap={5}>

                    <IconButton
                        size="large"
                        aria-label="logout button"
                        color="inherit"
                        onClick={() => navigate(`/explore-collections`)}
                    >
                        <Typography> Collections</Typography>
                        <Badge>
                            <CollectionsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size="large"
                        aria-label="logout button"
                        color="inherit"
                        onClick={() => navigate(`/profile`)}
                    >
                        <Typography> Profile</Typography>
                        <Badge>
                            <AccountBoxIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size="large"
                        aria-label="logout button"
                        color="inherit"
                        onClick={() => navigate('/cart')}
                    >
                        <Typography> Cart</Typography>
                        <Badge>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size="large"
                        aria-label="logout button"
                        color="inherit"
                        onClick={() => navigate('/logout')}
                    >
                        <Typography> Logout</Typography>
                        <Badge>
                            <LogoutIcon />
                        </Badge>
                    </IconButton>

                </Stack>

            </>
        } else {
            return <>
                <IconButton
                    size="large"
                    aria-label="login button"
                    color="inherit"
                    onClick={() => navigate('/login')}
                >
                    <Typography> Login</Typography>
                    <Badge>
                        <LoginIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="login button"
                    color="inherit"
                    onClick={() => navigate('/register')}
                >
                    <Typography> Register</Typography>
                    <Badge>
                        <HowToRegIcon />
                    </Badge>
                </IconButton>

            </>
        }
    }

    return (
        <>
            {GenerateButtons()}

        </>
    )
}

export default LoginWidget