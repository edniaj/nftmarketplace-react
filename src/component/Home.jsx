import React from 'react'
import { Carousel, Container } from 'react-bootstrap';
import { Box, Button, Typography } from '@material-ui/core'
import ExploreCollection from './ExploreCollection';

function Home() {
    return (
        <>
            <Container fluid >

                <Container>

                    <Carousel style={{}}>
                        <Carousel.Item>
                            <img
                                className="img-fluid img-thumbnail w-100"
                                src="https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=h2000"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Bored Ape Yatch Club</h3>
                                <p>What you waiting for ?</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cdn.wallpapersafari.com/43/49/KCAD4F.jpg"
                                alt="Second slide"
                            />
                         <Carousel.Caption>
                                <h3>Only for members</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://cdn.wallpapersafari.com/50/52/1ko7Ma.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>BAYC GANG</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                </Container>
                <div>
                    <Typography variant='h3' style={{ textAlign: "center", marginTop: "2em" }}>Explore collections</Typography>
                    <Typography variant='body2' style={{ textAlign: "center", marginTop: "2em" }} color='textSecondary'>Too much data in one collection, thus there's only 3 collections available</Typography>
                    <ExploreCollection />
                </div>
            </Container>

        </>
    )
}

export default Home