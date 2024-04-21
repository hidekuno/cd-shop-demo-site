/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import React from 'react'
import {render} from '@testing-library/react'
import {Store,Order,Cart} from '../App'
import {Signin} from '../components/Signin'
import {ShopContextProvider, CartContextProvider} from '../store'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

export const response = class {
  constructor(filename) {
    this.filename = filename
  }
  json() {
    const fs = require('fs')
    return JSON.parse(fs.readFileSync(this.filename, 'utf8'))
  }
}
export const testRender = () => {
  return render(
    <ShopContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Store />
        </BrowserRouter>
      </CartContextProvider>
    </ShopContextProvider>
  )
}
export const testLoginRender = () => {
  return render(
    <ShopContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Signin />} />
            <Route path={'/shop'} element={<Store />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/order'} element={<Order />} />
            <Route path={'*'} element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </ShopContextProvider>
  )
}
