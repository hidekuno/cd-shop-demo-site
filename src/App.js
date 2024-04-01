'use strict'

// fix. ReferenceError: React is not defined when npm test
import React from 'react'

import Container from '@mui/material/Container'
import './App.css'
import { Shop } from './components/Shop'
import { Cart } from './components/Cart'
import { Header } from './components/Header'

export const App = () => {
  return (
    <div>
      <Header />
      <Container sx={{'padding': '1rem'}}>
        <Shop />
        <Cart />
      </Container>
    </div>
  )
}
