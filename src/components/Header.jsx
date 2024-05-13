/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import React, { useContext, useState, useEffect } from 'react'
import Link from '@mui/material/Link'
import { useNavigate, useLocation } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import '../App.css'
import { ShopContext, CartContext } from '../store'

const menuLinks = ['/shop', '/cart', '/order']

export const Header = (props) => {
  // console.log('render Header')

  const path = useLocation().pathname
  const state = useContext(ShopContext).state
  const cart = useContext(CartContext).state
  const navigate = useNavigate()
  const menubar = { minHeight: '20px', height: '20px' }
  const [value, setValue] = useState(props.index)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
    navigate(menuLinks[newValue])
  }

  useEffect(() => {
    if (!state.username) {
      navigate('/')
    }
  })

  return (
    <header className="header">
      CD Shop <i><b>Demo</b></i> Site
      <Tabs sx={{ ...menubar, marginLeft: '5%' }} value={value} onChange={handleTabChange} aria-label="menu">
        <Tab label='Shop' component="a" sx={{ ...menubar, width: '55px', minWidth: '55px' }}/>
        <Tab label='Cart' component="a" sx={{ ...menubar, width: '55px', minWidth: '55px' }}/>
        <Tab label='Order' component="a" sx={{ ...menubar, width: '60px', minWidth: '60px' }}/>
      </Tabs>
      <p className='shop_username'>{state.username}</p>
      {
        menuLinks.slice(0, 2).includes(path) &&
        <span style={{ fontWeight: 'bold', color: '#e3811e' }}>Your Point: {cart.point}</span>
      }
      <Link underline='hover' href='#' onClick={() => navigate('/shop')}>Home</Link>
      <Link underline='hover' href='' onClick={() => navigate('/')}>Sign out</Link>
    </header>
  )
}
