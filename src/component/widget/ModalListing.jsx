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
import 'react-toastify/dist/ReactToastify.css';

// this is for listings with a price tag
function ModalListing(props) {
    
    const navigate = useNavigate();
    const [inputPrice, setInputPrice] = useState('')

    const port = useContext(portContext)['port'];
    let {modalId} = props
    const validatePrice = (price) => {
        if (!isNaN(price) && price > 0) return false
        return true
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

    const handleChange = e => {
        setInputPrice(e.target.value)
    }

    const handlePost = async () => {
        // console.log(`modal id : ${JSON.stringify(props)}`)
        let url = `${port}/api/listings/update/${modalId}`
        await checkAccessToken()
        let accessToken = localStorage.getItem('accessToken')
        let body = { price: inputPrice, modalId }
        await axios.put(url, body, { headers: { authorization: `Bearer ${accessToken}` } })
            .then(res => {
                toast.success(`Successfully edited listing id :${modalId}`)
                navigate(0)
            })
            .catch(err => {
                // console.log(`ERROR : ${err}`)
                toast.error(`Failed to edit listing id :${modalId}`)
            })
    }

    const handleDelete = async () => {
        let url = `${port}/api/listings/delete/${modalId}`
        await checkAccessToken()
        let accessToken = localStorage.getItem('accessToken')
        await axios.delete(url, { headers: { authorization: `Bearer ${accessToken}` } })
            .then(res => {                
                toast.success(`You have deleted listing id :${modalId}`)
            })
            .catch(err => {
                console.log(`ERROR : ${err}`)
                toast.error(`Failed to edit listing id :${modalId}`)
            })
    }

    return (
        <>
            <ToastContainer />
            <div className="modal fade" id="deleteModal" tabIndex="-1" style={{marginTop:"20vh"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body d-flex justify-content-between">
                            <Box>
                                <Typography variant="h6">Edit price</Typography>
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

                                </Box>
                                <Box sx={{ display: "flex", marginTop: "2em" }}>
                                    <Button variant="outlined" onClick={handlePost}>Submit</Button>
                                </Box>

                                <Box sx={{marginTop: "2em" }}>
                                    <Typography variant="h6">Delete listing</Typography>
                                    <Typography>You will not be able to undo this action</Typography>
                                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
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

export default ModalListing