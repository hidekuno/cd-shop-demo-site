'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Signin } from './components/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Store, Order } from './App'
import { ShopContextProvider, CartContextProvider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <ShopContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Signin />} />
          <Route path={'/shop'} element={<Store />} />
          <Route path={'/history'} element={<Order />} />
          <Route path={'*'} element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  </ShopContextProvider>
)
