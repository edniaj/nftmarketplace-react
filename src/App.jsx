import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'


export const portContext = createContext(null)

function App() {




  return (
    <div className='App' >
      <BrowserRouter>
        <portContext.Provider value={{port:'http://localhost:3008'}}>

          <Routes>
            <Route path='/' element={<Home />} />

            {/* <Route element={<ProtectedRoutes />}> */}
            {/* <Route path='/' element={<Checkout />} /> */}
            {/* </Route> */}
          </Routes>
        </portContext.Provider>
      </BrowserRouter>
    </div >
  );
}






export default App;
