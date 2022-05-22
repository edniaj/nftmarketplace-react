import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import '../../App.css';
import { Link } from 'react-router-dom'

const sxCard = {
  // display: 'inlineBlock',
  width: '100%',
  height: 'auto',
  border: '3px',
  padding: 1,
  textDecoration: 'none',
  marginBottom: 5,
}

const sxMedia = {
  objectFit: 'cover',
  borderTopWidth: 1,
}

const sxAvatar = {
  margin: 'auto',
  position: 'relative',
  bottom: 70,
  height: "126px",
  width: "126px",

}

const sxName = {
  textAlign: 'center',
  position: 'relative',
  bottom: 60,
}
// image should be objectfit:c0ver



export default function CollectionCard(DTO) {

  let { name, profileUrl, bannerUrl, description, id } = DTO

  const truncate = (phrase) => {
    if (phrase.length > 100) {
      phrase = phrase.slice(0, 100)
      phrase = phrase + "..."
    }
    return phrase
  }

  if (Object.keys(DTO).length === 0) return (<></>)
  return (
    <Card sx={sxCard} >
      <CardActionArea >
        <CardMedia
          component="img"
          height="200"
          image={bannerUrl}
          alt={name}
          sx={sxMedia}
        />
      </CardActionArea >

      <Avatar alt="main pic" src={profileUrl} sx={sxAvatar} />
      <Typography variant="h3" sx={sxName}>
        {name}
      </Typography>
      <CardContent>
        <Typography
          component="span"
          variant="body2"
          color="text.secondary"
          sx={{position:"relative",bottom:40}}
        >
          {description}
        </Typography>

      </CardContent>

    </Card>

  );
}

