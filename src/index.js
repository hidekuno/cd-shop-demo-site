'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Signin } from './components/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './App'
import { ShopContextProvider, CartContextProvider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <ShopContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Signin />} />
          <Route path={'/shop'} element={<App />} />
          <Route path={'*'} element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  </ShopContextProvider>
)
