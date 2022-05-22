import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const sxCard = {
  display: 'flex',
  borderBottom: 1,
  height: "200px",
  padding: "10px",

}

const sxImage = {
  display: "inline",
  height: "180px",
  width: "180px"
}

const sxDescription = {
  marginLeft: "20px",
  marginTop: "20px",
  width: "400px"
}

const sxDelete = {
  marginTop: "2em"
}

const sxPrice = {
  textAlign: "end",
  width: "100%",
  marginTop: "1em",
  marginRight: "2em"
}
function SalesCard(DTO) {

  let { cart, setCart } = DTO

  const parsePrice = (price) => {
    if (price >= 100) {
      price = price + ''
      return "$" + price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2,)
    }
    else {
      return "$0."
    }

  }

  const handleDelete = async () => {

    let url = `${DTO['port']}/api/carts/delete/${DTO['nft_id']}`
    let accessToken = localStorage.getItem('accessToken')

    axios.delete(url, { headers: { authorization: `Bearer ${accessToken}` } })
      .then(res => {
        let clone = [...cart].filter(x => x['nft_id'] !== DTO['nft_id'])
        toast.error(`Deleted ${DTO['name']} ( ${DTO['tokenId']} ) from cart`);
        setCart(clone)
      }).catch(err => console.error(err))

  }

  const parseDate = timestamp => {
    timestamp = parseInt(timestamp)
    var date = new Date(timestamp);
    return ("Date: " + date.getDate() +
      "/" + (date.getMonth() + 1) +
      "/" + date.getFullYear() +
      " " + date.getHours() +
      ":" + date.getMinutes() +
      ":" + date.getSeconds());
  }

  return (
    <>
      <ToastContainer />
      <Box sx={sxCard}>
        <Box sx={sxImage}>
          <img src={DTO['imageUrl']} style={{ objectFit: "cover", width: "180px", height: "180px" }} alt={DTO['nft_id']} />
        </Box>

        <Box sx={sxDescription}>

          <Box>
            <Typography>
              {DTO['name']}
            </Typography>
            <Typography>
              {parseDate(DTO['datetime'])}
            </Typography>
            <Typography>
              token id : {DTO['tokenId']}
            </Typography>
          </Box>

          <Box sx={sxDelete}>
            <Button variant='outlined' color="error" onClick={handleDelete} >
              <Typography>Delete</Typography>
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Button>
          </Box>
        </Box>

        <Box sx={sxPrice}>
          <Typography variant="h6">
            {parsePrice(DTO['price'])}
          </Typography>
        </Box>
      </Box>

    </>
  )
}

export default SalesCard