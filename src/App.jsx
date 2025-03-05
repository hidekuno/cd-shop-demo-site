/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import Container from '@mui/material/Container'
import './App.css'
import { Shop } from './components/Shop'
import { Header } from './components/Header'
import { Cart as CartPart } from './components/Cart'
import { Order as OrderPart } from './components/Order'
import { Viewed as ViewedPart } from './components/Viewed'

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
export const Viewed = () => {
  return (
    <div>
      <Header index={1} />
      <Container sx={{ padding: '1rem' }}>
        <ViewedPart />
      </Container>
    </div>
  )
}
export const Cart = () => {
  return (
    <div>
      <Header index={2} />
      <Container sx={{ padding: '1rem' }}>
        <CartPart />
      </Container>
    </div>
  )
}
export const Order = () => {
  return (
    <div>
      <Header index={3} />
      <Container sx={{ padding: '1rem' }}>
        <OrderPart />
      </Container>
    </div>
  )
}
