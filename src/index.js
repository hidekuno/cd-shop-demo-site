'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ShopContextProvider,CartContextProvider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <ShopContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </ShopContextProvider>
)
