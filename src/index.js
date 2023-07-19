import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ShopContextProvider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
)
