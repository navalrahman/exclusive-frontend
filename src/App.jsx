import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/Router'

import { Toaster } from 'react-hot-toast';
import ScrollToTop from './ScrollTop';

// Router

const App = () => {

  
  return (
    <div>

      <BrowserRouter>
       <Toaster position="top-right" /> 
       <ScrollToTop/>
        <Router />

      </BrowserRouter>
    </div>
  )
}

export default App