'use strict'

import React from 'react'
import {render} from '@testing-library/react'
import {App} from '../App'
import {ShopContextProvider, CartContextProvider} from '../store'

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
        <App />
      </CartContextProvider>
    </ShopContextProvider>
  )
}
