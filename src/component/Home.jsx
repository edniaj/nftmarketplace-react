import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { portContext } from '../App'

function Home () {
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
  }, [])

  return (
    <>
      <div>{JSON.stringify(collections)}</div>
      <div class='container-fluid'>
        <div class='d-flex flex-wrap'>
          <div class='row row-cols-auto'>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
            <div className='card col'>
              <div className='card-body me-3'>
                <h5 className='card-title'>Card title</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div href='#' className='card-link'>
                  Card link
                </div>
                <div href='#' className='card-link'>
                  Another link
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
