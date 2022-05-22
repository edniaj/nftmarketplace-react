import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { portContext } from '../App';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Box, Button, Typography } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutCard from './widget/CheckoutCard';
import { Container } from 'react-bootstrap';


const sxCheckout = {
    textAlign: "end",
    marginTop: "1em",
    marginRight: "2em"
}

function Cart(props) {


    const port = useContext(portContext)['port'];
    const [stripes, setStripes] = useState('')
    let { cart, setCart } = props
    // get new access token if expires
    const checkAccessToken = async () => {
        let token = localStorage.getItem("accessToken");
        if (token) {
            let tokenExpiry = jwt_decode(token).exp;
            let currentUnixTime = Math.round(new Date().getTime() / 1000);
            if (currentUnixTime >= tokenExpiry) {
                console.log("Access token has expired. Getting a new token now.");
                // Token has expired, need to refresh
                const refreshToken = localStorage.getItem("refreshToken");
                let refreshResponse = await axios.post(`${port}/api/users/refresh`, {
                    refreshToken: refreshToken,
                });

                localStorage.setItem("accessToken", refreshResponse.data.accessToken);
                token = refreshResponse.data.accessToken;
            }
        }
    }
    // POST to stripes API -> redirect to Stripe checkout
    const handlePOST = async () => {
        let url = `${port}/api/checkout`
        checkAccessToken()
        let accessToken = localStorage.getItem('accessToken')
        axios.get(url, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
            .then(async (res) => {
                setStripes(res.data)
                const stripePromise = loadStripe(res.data.publishableKey);
                const stripe = await stripePromise;
                stripe.redirectToCheckout({
                    sessionId: res.data.sessionId,
                });
            })
            .catch(err => console.error(err))
        //


        //
    }
    // Load cart from database
    const loadCart = async (source) => {
        await checkAccessToken()
        let accessToken = localStorage.getItem('accessToken')
        let url = `${port}/api/carts/`
        await axios.get(url, { cancelToken: source.token, headers: { authorization: `Bearer ${accessToken}` } })
            .then(res => {
                setCart(res['data'])
            }).catch(err => console.error(err))
    }
    // Load cart
    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source()
        if (isMounted && localStorage.getItem("accessToken")) {
            console.log(`loading cart`)
            loadCart(source)
        }
        return () => {
            isMounted = false
            source.cancel()
        }
    }, [])
    // Parse the price so that it looks pretty $65.58
    const parseTotalPrice = () => {
        let price = 0
        cart.forEach(item => {
            price += item['price']
        })
        if (price > 100) {
            price = price + ''
            return "$" + price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2,)
        }
        else {
            return "$0."
        }

    }
    // Generate cart items
    const generateCheckoutCard = () => {
        let clone = cart ? cart : []
        return clone.map(item => CheckoutCard({ ...item, port, cart, setCart }))
    }

    return (
        <>
            <Container fluid>
                {generateCheckoutCard()}

                <Box sx={sxCheckout}>
                    <Typography variant="h6">
                        Subtotal ( {cart.length} items ): {parseTotalPrice()}
                    </Typography>
                    <Button variant="contained" onClick={handlePOST}>Proceed to Checkout</Button>

                </Box>

            </Container>
        </>
    )
}

export default Cart