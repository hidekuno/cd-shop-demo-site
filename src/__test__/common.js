'use strict'

import React from 'react'
import {render} from '@testing-library/react'
import {App} from '../App'
import {Signin} from '../components/Signin'
import {ShopContextProvider, CartContextProvider} from '../store'
import {BrowserRouter} from 'react-router-dom'

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
          <App />
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
          <Signin />
        </BrowserRouter>
      </CartContextProvider>
    </ShopContextProvider>
  )
}
