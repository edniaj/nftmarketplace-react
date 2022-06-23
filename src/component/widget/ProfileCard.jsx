import React from 'react'
import { useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import ModalListing from './ModalListing';
import ModalCollected from './ModalCollected';



const sxCard = {
  cursor: 'pointer',
  width: '100%',
  maxWidth: "250px",
  height: '400px',
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


export default function ProfileCard(DTO) {


  // nft__id and listing__id ; there is 2 underscore because I had to use leftOuterJoin in database 
  let { imageUrl, tokenId, price, name, nft__id, listing__id, nft_id, listing_id, modalId, setModalId } = DTO



  const theme = createTheme({
    palette: {
      secondary: {
        // This is green.A700 as hex.
        main: '#fff7ed',
      },
      primary: {
        main: '#7dbac6'
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



  const truncate = (phrase) => {
    if (phrase.length > 100) {
      phrase = phrase.slice(0, 100)
      phrase = phrase + "..."
    }
    return phrase
  }




  return (
    <React.Fragment key={nft__id}>
      <ToastContainer />


      {price ? <ModalListing modalId={modalId} /> : <ModalCollected modalId={modalId} />}

      <Card sx={sxCard} onClick={() => {
        // console.log(`nft__id :${nft__id} modalId:${modalId}`)
        }}>

        <CardActionArea >
          <Link to={`../../assets/${tokenId}`} style={{ textDecoration: 'none' }}>

            <img src={imageUrl} alt={tokenId} className="img-fluid img-thumbnail" />
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


          <Box sx={{ display: "flex", marginTop: "1em" }}>
            {price
              ? <>
                {/* If there is a price tag on the NFT - > Display edit button together with Info button */}
                <ThemeProvider theme={theme}>

                  <div
                    onClick={async () => {
                      await setModalId(listing_id)
                      // console.log(`listing__id : ${listing_id} nft__id:${nft_id}`)
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    <Button variant='contained' color="primary"  >

                      <Typography sx={{ color: "white" }}>Edit</Typography>

                      <IconButton aria-label="add-to-cart" size="small">
                        <EditIcon fontSize="inherit" color="secondary" />
                      </IconButton>
                    </Button>
                  </div>

                </ThemeProvider>

                <Link to={`../../assets/${tokenId}`} style={{ textDecoration: 'none' }}>
                  <Box sx={{ marginLeft: "2em", }}>
                    <Button variant="outlined">info</Button>
                  </Box>
                </Link>
              </>
              :
              <>
                <Box sx={{ display: "flex", }}>
                  <Box sx={{ marginRight: "2em" }}>


                    <div
                      onClick={async () => {
                        // console.log(DTO)
                        await setModalId(nft__id)
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      <Button variant='contained' color="primary"  >
                        <Typography sx={{ color: "white" }}>List it</Typography>
                      </Button>
                    </div>

                  </Box>

                  <Box>
                    <Link to={`../../assets/${tokenId}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outlined" >info</Button>
                    </Link>
                  </Box>
                </Box>
              </>
            }
          </Box>
        </CardContent>

      </Card >
    </React.Fragment>


  );
}

