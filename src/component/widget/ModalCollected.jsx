import { Box } from '@mui/system'
import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, OutlinedInput, Typography } from '@material-ui/core'
import TextField from '@mui/material/TextField';
import { portContext } from '../../App';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';



// this is for listings without a price
function ModalCollected({ modalId }) {

    const navigate = useNavigate();
    const [inputPrice, setInputPrice] = useState('')

    const port = useContext(portContext)['port'];

    const validatePrice = (price) => {
        if (!isNaN(price) && price > 0) return false
        return true
    }

    const handleChange = e => {
        setInputPrice(e.target.value)
    }
    const checkAccessToken = async () => {
        let token = localStorage.getItem("accessToken");
        if (token) {
            let tokenExpiry = jwt_decode(token).exp;
            let currentUnixTime = Math.round(new Date().getTime() / 1000);
            if (currentUnixTime >= tokenExpiry) {
                // console.log("Access token has expired. Getting a new token now.");
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

    const parsePrice = (price) => {
        if (price >= 100) {
            price = price + ''
            return "$" + price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2,)
        }
        else {
            return "$0." + price
        }
    }
    // console.log(modalId)
    const handlePost = async () => {
        let url = `${port}/api/listings/create`
        await checkAccessToken()
        let accessToken = localStorage.getItem('accessToken')
        let body = { nft_id: modalId, price: inputPrice }


        await axios.post(url, body, { headers: { authorization: `Bearer ${accessToken}` } })
            .then(res => {
                toast.success(`Successfully created listing${modalId}`)
                navigate(0)
            })
            .catch(err => {
                // console.log(`ERROR : ${err}`)
                toast.error(`Failed to create listing`)
            })
    }
    return (
        <>
            <ToastContainer />
            <div className="modal fade" id="deleteModal" tabIndex="-1" style={{marginTop:"30vh"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body d-flex justify-content-between">
                            <Box>
                                <Typography variant="h4">Create new listing</Typography>
                                <Typography variant="h6">Listing price : {parsePrice(inputPrice)}</Typography>
                                <Typography>(denominated in cents)</Typography>
                                <Box sx={{ marginTop: "2em" }}>
                                    <FormControl
                                    >

                                        <TextField
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            error={validatePrice(inputPrice)}
                                            label="Price"
                                            name="price"
                                            value={inputPrice}
                                            onChange={handleChange}
                                        />

                                    </FormControl>
                                    <Box sx={{ display: "flex", marginTop: "2em" }}>
                                        <Button variant="outlined" onClick={handlePost}>Submit</Button>
                                    </Box>
                                </Box>
                            </Box>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCollected