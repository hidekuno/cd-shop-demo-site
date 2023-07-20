// fix. ReferenceError: React is not defined when npm test
import React from 'react'

import Container from '@mui/material/Container'
import './App.css'
import { Shop } from './components/Shop'
import { Cart } from './components/Cart'

export const App = () => {
  return (
    <div>
      <header className='header'>
      CD Shop <i><b>Demo</b></i> Site</header>
      <Container sx={{'padding': '1rem'}}>
        <Shop />
        <Cart />
      </Container>
    </div>
  )
}
