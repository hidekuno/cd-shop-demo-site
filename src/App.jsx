/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

// fix. ReferenceError: React is not defined when npm test
import React from 'react'

import Container from '@mui/material/Container'
import './App.css'
import { Shop } from './components/Shop'
import { Cart as CartPart } from './components/Cart'
import { Header } from './components/Header'
import { History } from './components/History'

export const Store = () => {
  return (
    <div>
      <Header index={0} />
      <Container sx={{ padding: '1rem' }}>
        <Shop />
      </Container>
    </div>
  )
}
export const Cart = () => {
  return (
    <div>
      <Header index={1} />
      <Container sx={{ padding: '1rem' }}>
        <CartPart />
      </Container>
    </div>
  )
}
export const Order = () => {
  return (
    <div>
      <Header index={2} />
      <p style={{ marginLeft: '40%' }}>Order History</p>
      <Container sx={{ padding: '1rem' }}>
        <History />
      </Container>
    </div>
  )
}