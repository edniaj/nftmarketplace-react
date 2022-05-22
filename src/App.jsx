import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExploreCollection from './component/ExploreCollection'
import Collection from './component/Collection'
import Navbar from './component/Navbar'
// import ProtectedRoutes from './component/ProtectedRoutes'
import Login from './component/Login'
import Logout from './component/Logout';
import Cart from './component/Cart';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Asset from './component/Asset';
import Profile from './component/Profile';
import ProfileRedirect from './component/ProfileRedirect';
import Home from './component/Home';
import { Box } from '@material-ui/core';
import { Stack } from '@mui/material';
import Register from './component/Register';
export const portContext = createContext(null)
export const loginContext = createContext(null)
export const cartContext = createContext(null)

function App() {
  const [cart, setCart] = useState([]) // NFTID 10008
  const [login, setLogin] = useState(false)
  const port = 'https://jdnftmarketplace.herokuapp.com'


  const checkAccessToken = async () => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      let tokenExpiry = jwt_decode(token).exp;
      let currentUnixTime = Math.round(new Date().getTime() / 1000);
      if (currentUnixTime >= tokenExpiry) {
        console.log("Access token has expired. Getting a new token now.");
        // Token has expired, need to refresh
        const refreshToken = localStorage.getItem("refreshToken");
        let refreshResponse = await axios.post(`${port}/api/users/refresh`, {
          refreshToken: refreshToken,
        });

        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        token = refreshResponse.data.accessToken;
      }
    }
  }
  const loadCart = async (source, accessToken) => {
    console.log('loading cart')
    let url = `${port}/api/carts/`

    await axios.get(url, { params: { cart } },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      }
    ).then(res => {
      setCart(res['data'])
    }).catch(err => console.error(err))
  }


  useEffect(() => {
    let isMounted = true
    let source = axios.CancelToken.source()

    if (isMounted && login) {
      let accessToken = localStorage.getItem('accessToken')
      loadCart(source, accessToken)
    }
    return () => {
      isMounted = false
      source.cancel()
    }
  }, [login])

  // State memory is not persistent, use localStorage

  return (
    <div className='App' >
      <BrowserRouter>
        <portContext.Provider value={{ port, login, setLogin, checkAccessToken }}>
          <Stack gap={11}>
            <Navbar props={{ cart, setCart, login, setLogin }} />
            <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/explore-collections' element={<ExploreCollection />} />
              <Route path='/collections/:id' element={<Collection />} />
              <Route path='/assets/:id' element={<Asset />} />
              <Route path='/login' element={<Login />} />

              <Route path='/logout' element={<Logout />} />

              <Route path='/cart' element={<Cart cart={cart} setCart={setCart} login={login} />} />
              <Route path='/profile' element={<ProfileRedirect />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/register' element={<Register/>} />
              {/* <Route element={<ProtectedRoutes/>}>              
            </Route> */}
            </Routes>
          </Stack>

        </portContext.Provider>
      </BrowserRouter>
    </div >
  );
}






export default App;
