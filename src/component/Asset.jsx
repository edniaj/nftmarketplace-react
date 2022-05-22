import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function Asset() {
  const { id } = useParams()

  
  const [asset, setAsset] = useState([])
    
  return (
    <div>{id}</div>
  )
}

export default Asset


