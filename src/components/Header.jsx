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

const menuLinks = ['/shop', '/cart', '/order']

export const Header = (props) => {
  const path = useLocation().pathname
  const {state, dispatch} = useContext(ShopContext)
  const cart = useContext(CartContext).state
  const navigate = useNavigate()
  const menubar = {minHeight: '20px', height: '20px'}
  const [value, setValue] = useState(props.index)

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
        <Tab label='Cart' component="a" sx={{...menubar,width:'55px',minWidth:'55px'}}/>
        <Tab label='Order' component="a" sx={{...menubar,width:'60px',minWidth:'60px'}}/>
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
      <p className='shop_username'>{state.username}</p>
      {
        menuLinks.slice(0,2).includes(path) &&
        <span style={{'fontWeight': 'bold', color: '#e3811e'}}>Your Point: {cart.point}</span>
      }
      <Link underline='hover' href='#' onClick={() => navigate('/shop')}>Home</Link>
      <Link underline='hover' href=''  onClick={() => navigate('/')}>Sign out</Link>
    </header>
  )
}
