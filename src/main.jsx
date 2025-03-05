/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import { createRoot } from 'react-dom/client'
import './index.css'
import { Signin } from './components/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Store, Order, Cart, Viewed } from './App'
import { StoreContextProvider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <StoreContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Signin />} />
        <Route path={'/shop'} element={<Store />} />
        <Route path={'/viewed'} element={<Viewed />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'/order'} element={<Order />} />
        <Route path={'*'} element={<Signin />} />
      </Routes>
    </BrowserRouter>
  </StoreContextProvider>
)
