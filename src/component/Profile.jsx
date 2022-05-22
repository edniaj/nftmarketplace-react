import axios from 'axios'
import React from 'react'
import { Fragment } from 'react'
import { useContext, createContext } from 'react'
import { useState } from 'react'
import { useEffect, useRef, useCallback } from 'react'
import { portContext } from '../App'
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom'
import ProfileCard from './widget/ProfileCard'
import '../App.css';
import { Button, Typography } from '@material-ui/core'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Container } from 'react-bootstrap'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterForm from './widget/FilterForm'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import SalesCard from './widget/SalesCard'

const sxMain = {
    display: 'flex'
}
const sxFilter = {
    display: 'inlineBlock',
    width: "360px",
    height: "100vh",
    backgroundColor: "background.paper",
    position: 'sticky',
    top: 0,
    overflowY: 'scroll'
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

export const listingsContext = createContext(null)


export default function Profile() {
    const observer = useRef()
    const port = useContext(portContext)['port']
    const { id } = useParams()
    const [pageNumber, setPageNumber] = useState(0)
    const [formData, setFormData] = useState({})
    const [history, setHistory] = useState([])
    const [collections, setCollections] = useState([])
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true) // Do not edit this code yet


    const [modalId, setModalId] = useState(-1)


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


    const loadListings = async (source) => {
        console.log(`Load listings`)
        let url = `${port}/api/collections/listings/search?profile=${id}`
        await axios.get(url, {
            cancelToken: source.token
        }).then(x => {
            setListings([...x[`data`]])
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        let source = axios.CancelToken.source()
        convertFormData(formData)
        let isCancelled = false
        if (!isCancelled) loadListings(source)
        return () => {
            isCancelled = true
            source.cancel()
        }
    }, [])


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


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


    const loadCollection = async (source) => {
        let url = `${port}/api/collections/user/search?profile=${id}&page=${pageNumber}`
        await axios.get(url, {
            cancelToken: source.token
        }).then(x => {
            let clone = x.data
            setCollections(clone)
        }).catch(err => console.log(err))
    }

    const loadHistory = async (source) => {

        let url = `${port}/api/users/sales/${id}`
        await axios.get(url, {
            cancelToken: source.token
        }).then(x => {
            setHistory([...x[`data`]])
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        let source = axios.CancelToken.source()
        loadHistory(source)
        return () => {
            source.cancel()
        }
    }, [])


    const generateCard = (dataCollection) => {
        let clone = [...dataCollection]
        return clone.map((v, i) => {

            if (clone.length - 1 === i) {
                return (
                    <Fragment key={i}>
                        <Grid item xs={1} >
                            <div ref={lastCardRef}>
                                {ProfileCard({ ...v, modalId, setModalId })}
                            </div>
                        </Grid>
                    </Fragment>)
            } else {
                return (
                    <Fragment key={i}>
                        <Grid item xs={1} >
                            {ProfileCard({ ...v, modalId, setModalId })}
                        </Grid>
                    </Fragment>)
            }
        })
    }

    const generateSaleHistory = (DTO) => {
        return DTO.map(item => SalesCard(item))
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 0, zIndex: 99, backgroundColor: "white" }}>
                        <TabList onChange={handleChange} variant="fullWidth" >
                            <Tab label="Listings" value="1" />
                            <Tab label="Collected" value="2" />
                            <Tab label="Sales" value="3" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <Container fluid>
                            <Box sx={sxMain}>
                                <div className='grid-container--fit--profile'>
                                    {generateCard(listings)}
                                </div>
                            </Box>

                        </Container>
                    </TabPanel>


                    <TabPanel value="2">
                        <Container fluid>
                            <Box sx={sxMain}>
                                <div className='grid-container--fit--profile'>

                                    {generateCard(collections)}

                                </div>
                            </Box>
                        </Container>
                    </TabPanel>

                    <TabPanel value="3">
                        {generateSaleHistory(history)}
                    </TabPanel>
                </TabContext>
            </Box>




        </>
    )
}


