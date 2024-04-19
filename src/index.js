'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Signin } from './components/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Store, Order, Cart } from './App'
import { ShopContextProvider, CartContextProvider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <ShopContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Signin />} />
          <Route path={'/shop'} element={<Store />} />
          <Route path={'/order'} element={<Order />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'*'} element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  </ShopContextProvider>
)
