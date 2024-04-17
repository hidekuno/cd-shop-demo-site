'use strict'

// fix. ReferenceError: React is not defined when npm test
import React, {useContext, useState} from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import {useNavigate, useLocation} from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import '../App.css'
import { ShopContext,CartContext } from '../store'
import { changeItemList } from '../actions/shopAction'

const menuLinks = ['/shop', '/history']
const getMenuIndex = (path) => {
  for (const i in menuLinks) {
    if (path == menuLinks[i]) {
      return Number(i)
    }
  }
  return 0
}

export const Header = () => {
  const path = useLocation().pathname
  const {state, dispatch} = useContext(ShopContext)
  const cart = useContext(CartContext).state
  const navigate = useNavigate()
  const menubar = {minHeight: '20px', height: '20px'}
  const [value, setValue] = useState(getMenuIndex(path))

  const handleChange = (event) => {
    dispatch(changeItemList(event.target.value))
  }
  const handleTabChange = (event, newValue) => {
    setValue(newValue)
    navigate(menuLinks[newValue])
  }
  return (
    <header className="header">
      CD Shop <i><b>Demo</b></i> Site
      <Tabs sx={{...menubar, marginLeft:'5%'}} value={value} onChange={handleTabChange} aria-label="menu">
        <Tab label='Shop' component="a" sx={{...menubar, width:'55px',minWidth:'55px'}}/>
        <Tab label='History'component="a" sx={{...menubar,width:'80px',minWidth:'80px'}}/>
      </Tabs>
      { path === '/shop' &&
        <Select
          labelId="demo-simple-select-label"
          sx={{ height: 25, marginLeft: '20%'}}
          onChange={handleChange}
          value={state.jsonfile}
          data-testid="select-element"
          id="demo-simple-select">
          <MenuItem value={'cd.json'}>CD</MenuItem>
          <MenuItem value={'lp.json'}>LP</MenuItem>
          <MenuItem value={'mp3.json'}>MP3</MenuItem>
        </Select>
      }
      {
        path === '/shop' &&
        <span style={{'fontWeight': 'bold', color: '#1976d2'}}>Your Point: {cart.point}</span>
      }
      <p className='shop_username'>{state.username}</p>
      <Link underline='hover' href='#' onClick={() => navigate('/shop')}>Home</Link>
      <Link underline='hover' href=''  onClick={() => navigate('/')}>Sign out</Link>
    </header>
  )
}
