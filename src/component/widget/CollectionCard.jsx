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
  cursor: 'pointer',
  width: '100%',
  height: '402px',
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

const sxName = {
  textAlign: 'center',
  position: 'relative',
  bottom: 20,
  border: '3px solid white',
}
// image should be objectfit:c0ver



export default function CollectionCard(name, profileUrl, bannerUrl, description, id) {
  const truncate = (phrase) => {
    if (phrase.length > 100) {
      phrase = phrase.slice(0, 100)
      phrase = phrase + "..."
    }
    return phrase
  }

  return (
    <Link to={`../collections/${id}`} style={{ textDecoration: 'none' }} >

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
        <Typography sx={sxName}>
          {name}
        </Typography>
        <CardContent>
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
          >
            {truncate(description)}
          </Typography>

        </CardContent>

      </Card>
    </Link>
  );
}
