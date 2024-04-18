'use strict'

// fix. ReferenceError: React is not defined when npm test
import React from 'react'

import Container from '@mui/material/Container'
import './App.css'
import { Shop } from './components/Shop'
import { Cart } from './components/Cart'
import { Header } from './components/Header'
import { History } from './components/History'

export const Store = () => {
  return (
    <div>
      <Header index={0} />
      <Container sx={{'padding': '1rem'}}>
        <Shop />
        <Cart />
      </Container>
    </div>
  )
}
export const Order = () => {
  return (
    <div>
      <Header index={1} />
      <p style={{marginLeft: '40%'}}>Order History(<b>Under Construction</b>)</p>
      <Container sx={{'padding': '1rem'}}>
        <History />
      </Container>
    </div>
  )
}
