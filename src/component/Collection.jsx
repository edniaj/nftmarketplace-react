import axios from 'axios'
import React from 'react'
import { Fragment } from 'react'
import { useContext, createContext } from 'react'
import { useState } from 'react'
import { useEffect, useRef, useCallback } from 'react'
import { portContext } from '../App'
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom'
import NftCard from './widget/NftCard'
import CollectionHeader from './widget/CollectionHeader'
import '../App.css';
import { Box } from '@mui/system'
import { Button, Typography } from '@material-ui/core'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Drawer from '@mui/material/Drawer';
import { Container } from 'react-bootstrap'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterForm from './widget/FilterForm'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CollectionCard from './widget/CollectionCard'

const sxMain = {
    display: 'flex'
}
const sxFilter = {
    display: 'inlineBlock',
    width: "390px",
    height: "100vh",
    backgroundColor: "background.paper",
    position: 'sticky',
    top: 0,
    overflowY: 'scroll',
    zIndex:9
}
const sxHideFilter = {
    position: 'sticky',
    top: 0
}
const sxBackButton = {
    textAlign: 'end',
    '&hover': {
        backgroundColor: 'blue'
    }
}




export default function Collection() {

    const [collections, setCollections] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true) // Do not edit this code yet
    const [showFilter, setShowFilter] = useState(true)
    const [formData, setFormData] = useState({})
    const [traitStats, setTraitStats] = useState({})
    const observer = useRef()
    const port = useContext(portContext)['port']
    const { id } = useParams()
    const [collectionInfo, setCollectionInfo] = useState('')

    // Infinite scrolling - Credits to @ https://github.com/WebDevSimplified/React-Infinite-Scrolling/blob/master/src/
    const lastCardRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }

        })
        if (node) observer.current.observe(node)

    }, [loading, hasMore])

    const convertFormData = () => {
        let data = JSON.stringify(formData)
        console.log(data)
        return data
    }

    const loadTraitStats = async () => {
        // await axios.get(`${port}/api/collections/traitStats?id=${id}`).then(x => {
        await axios.get(`http://localhost:3008/api/collections/traitStats?id=${id}`).then(x => {
            setTraitStats(x.data)
        }).catch(err => console.error(err))
    }
    const loadCollection = async (source) => {
        let url = `${port}/api/collections/search?id=${id}&page=${pageNumber}&filter=${convertFormData()}`
        await axios.get(url, {
            cancelToken: source.token
        }).then(x => {
            setCollections([...x[`data`]])
        }).catch(err => console.log(err))
    }

    const loadCollectionInfo = async (source) => {

        let url = `http://localhost:3008/api/collections/withoutJoin?id=${id}`
        await axios.get(url,
            { cancelToken: source.token }).then(x => {
                setCollectionInfo(x['data'])
            }).catch(err => console.error(err))
    }

    useEffect(() => {
        console.log('Loading collection info')
        let source = axios.CancelToken.source()
        convertFormData(formData)
        loadCollectionInfo(source)
        return () => {
            source.cancel()
        }
    }, [])
    // Load first page of data
    useEffect(() => {
        console.log('Loading collection')
        let source = axios.CancelToken.source()
        convertFormData(formData)
        let isCancelled = false
        if (!isCancelled) loadCollection(source)
        return () => {
            isCancelled = true
            source.cancel()
        }
    }, [port, pageNumber, formData])

    useEffect(() => {
        let isCancelled = false
        if (!isCancelled) loadTraitStats()
        return () => {
            isCancelled = true
        }
    }, [])


    const generateCard = () => {
        return collections.map((v, i) => {

            if (collections.length - 1 === i) {
                return (
                    <Fragment key={i}>
                        <Grid item xs={1} >
                            <div ref={lastCardRef}>
                                {NftCard(v)}
                            </div>
                        </Grid>
                    </Fragment>)
            } else {
                return (
                    <Fragment key={i}>
                        <Grid item xs={1} >
                            {NftCard(v)}

                        </Grid>
                    </Fragment>)
            }


        })
    }

    const generateSidebar = () => {
        if (showFilter) {
            return (
                <Box
                    component='div'
                    sx={sxFilter}
                >
                    <Box sx={sxBackButton} >
                        <Button
                            endIcon={
                                <IconButton fontSize="large">
                                    <ArrowBackIcon fontSize='large' />
                                </IconButton>
                            }
                            onClick={() => setShowFilter(false)}
                        >

                        </Button>

                    </Box>

                    <Button
                        endIcon={
                            <ManageSearchIcon fontSize='large' />
                        }
                    >
                        <Typography variant="h5">
                            Filter
                        </Typography>
                    </Button>

                    <FilterForm manageForm={{ formData, setFormData, traitStats }} />
                </Box >

            )
        } else {
            return (
                <Box
                    sx={sxHideFilter}
                >

                    <Button
                        endIcon={
                            <IconButton fontSize="large">
                                <ArrowForwardIcon fontSize='large' />
                            </IconButton>
                        }
                        onClick={() => setShowFilter(true)}
                    >


                    </Button>
                </Box>
            )
        }
    }


    return (
        <>
            <Container fluid>
                <Box> {CollectionHeader(collectionInfo)}</Box>
                <Box sx={sxMain}>
                    <div>
                        {generateSidebar()}

                    </div>
                    <div className='grid-container--fit'>
                        {generateCard()}
                    </div>

                </Box>

            </Container>


        </>
    )
}



