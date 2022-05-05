import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { portContext } from '../App'


function Home() {

    const port = useContext(portContext)['port']
    const [collections, setCollections] = useState([])

    useEffect(() => {

        let isCancelled = false
        if (!isCancelled) {
            axios.get(port).then(x => setCollections(x.data))
        }


        return () => {
            isCancelled = true
        }
    }, [])




    return (
        <div>{collections}</div>
    )
}

export default Home