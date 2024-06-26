/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import React from 'react'
import { render } from '@testing-library/react'
import {Store, Order, Cart, Viewed} from '../App'
import { Signin } from '../components/Signin'
import { StoreContextProvider } from '../store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shop } from '../components/Shop'
import { Cart as CartPart } from '../components/Cart'

export const Response = class {
  constructor (filename) {
    this.filename = filename
  }

  json () {
    const fs = require('fs')
    return JSON.parse(fs.readFileSync(this.filename, 'utf8'))
  }
}
export const testRender = () => {
  return render(
    <StoreContextProvider>
      <BrowserRouter>
        <Shop />
        <CartPart />
      </BrowserRouter>
    </StoreContextProvider>
  )
}
export const testLoginRender = () => {
  return render(
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
}
