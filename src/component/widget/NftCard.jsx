import * as React from 'react';
import { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import '../../App.css';
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { portContext } from '../../App';
import jwt_decode from 'jwt-decode'


const sxCard = {
  cursor: 'pointer',
  width: '100%',
  maxWidth: "470px",
  height: '700px',
  border: '3px',
  borderRadius: '10px',
  padding: 1,
  textDecoration: 'none'
}

const sxMedia = {
  objectFit: 'cover',
  borderTopWidth: 1,
  borderRadius: 5
}

const sxAvatar = {
  margin: 'auto',
  position: 'relative',
  bottom: 20,
  height: "50px",
  width: "50px",
  border: '3px solid white',
}


export default function CollectionCard(DTO) {

  let { imageUrl, tokenId, price, name, nft_id, listing_id } = DTO
  const port = useContext(portContext)['port']

  const theme = createTheme({
    palette: {
      secondary: {
        // This is green.A700 as hex.
        main: '#fff7ed',
      },
      primary: {
        main: '#284e13'
      }
    },
  });

  const parsePrice = (price) => {
    if (price > 100) {
      price = price + ''
      return "$" + price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2,)
    }
    else {
      return "$0."
    }

  }

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

  const truncate = (phrase) => {
    if (phrase.length > 100) {
      phrase = phrase.slice(0, 100)
      phrase = phrase + "..."
    }
    return phrase
  }

  const handleAddCart = async () => {
    let url = `${port}/api/carts/add`
    await checkAccessToken()
    let accessToken = localStorage.getItem('accessToken')
    let body = { listing_id }
    await axios.post(url, body, { headers: { authorization: `Bearer ${accessToken}` } })
      .then(res => {
        toast.success(`Added ${name} ( ${tokenId} ) into cart ${listing_id}`)
      })
      .catch(err => {
        console.log(`ERROR : ${err}`)
        toast.error(`Item already exist in your cart`)
      })
  }



  return (
    <React.Fragment key={nft_id}>
      <ToastContainer />
      <Card sx={sxCard} onClick={() => console.log(`id :${nft_id} ${JSON.stringify(DTO)}`)}>

        <CardActionArea >
          <Link to={`../../assets/${nft_id}`} style={{ textDecoration: 'none' }}>
            <CardMedia
              component="img"
              height="488"
              image={imageUrl}
              alt={tokenId}
              sx={sxMedia}
            />
          </Link>
        </CardActionArea >

        <CardContent>

          <Stack gap={0} >
            <Typography>

            </Typography>
            <Typography>
              {name}
            </Typography>
            <Typography>
              {tokenId}
            </Typography>
            <Typography>{price ? `Price : ${parsePrice(price)}` : 'Not listed'}</Typography>
          </Stack>

          <Box sx={{ display: "flex", marginTop: "2em" }}>
            {price
              ? <>
                <ThemeProvider theme={theme}>
                  <Button variant='contained' color="primary" onClick={handleAddCart} >
                    <Typography>Add to cart</Typography>
                    <IconButton aria-label="add-to-cart" size="small">
                      <AddShoppingCartOutlinedIcon fontSize="inherit" color="secondary" />
                    </IconButton>
                  </Button>
                </ThemeProvider>
                <Link to={`../../assets/${tokenId}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" sx={{ marginLeft: '2em' }}>info</Button>
                </Link>
              </>
              :
              <Link to={`../../assets/${nft_id}`} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" >info</Button>
              </Link>
            }
          </Box>
        </CardContent>

      </Card >
    </React.Fragment>


  );
}

//{"traits":
// {"Mouth":"Phoneme L","Clothes":"Navy Striped Tee","Hat":"Party Hat 2","Fur":"Golden Brown","Eyes":"Closed","Background":"Blue"},
// "status":"notListed","imageUrl":"https://ipfs.io/ipfs/QmSg9bPzW9anFYc3wWU5KnvymwkxQTpmqcRSfYj7UmiBa7","tokenId":"3",
// "datetime":"1652661016","price":"150"}