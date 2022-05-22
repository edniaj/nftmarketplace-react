import axios from 'axios'
import React from 'react'
import { Fragment } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { portContext } from '../App'
import Grid from '@mui/material/Grid';
import CollectionCard from './widget/CollectionCard'
import '../App.css';




export default function ExploreCollection() {
    const port = useContext(portContext)['port']
    const [collections, setCollections] = useState([])

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            axios.get(`${port}/api/collections/`).then(x => {
                console.log(x.data)
                setCollections(x.data)
            })
        }

        return () => {
            isCancelled = true
        }
    }, [port])



    const generateCard = () => {
        return collections.map((v, i) => {
            console.log('i = ', i, '\n v = ', v) // Test code

            let { name, profileUrl, bannerUrl, description, id } = v
            return (
                <Fragment key={i}>
                    {/* <Box sx={{ margin: 1, objectFit: 'cover' }}> */}
                    <Grid xs={1} >
                        {CollectionCard(name, profileUrl, bannerUrl, description, id)}
                    </Grid>
                    {/* </Box> */}
                </Fragment>)
        })
    }


    return (
        <>
            <div className='grid-container--fit'>
                {generateCard()}
                {generateCard()}
                {generateCard()}
            </div>




        </>
    )
}
