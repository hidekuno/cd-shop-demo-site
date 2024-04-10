'use strict'

// fix. ReferenceError: React is not defined when npm test
import React, {useContext} from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'

import '../App.css'
import { ShopContext } from '../store'
import { changeItemList } from '../actions/shopAction'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(ShopContext)

  const handleChange = (event) => {
    dispatch(changeItemList(event.target.value))
  }
  const handleSignout = () => {
    navigate('/')
  }
  return (
    <header className="header">
      CD Shop <i><b>Demo</b></i> Site
      <Select
        labelId="demo-simple-select-label"
        sx={{ height: 30, marginLeft: '10%'}}
        onChange={handleChange}
        value={state.jsonfile}
        data-testid="select-element"
        id="demo-simple-select">
        <MenuItem value={'cd.json'}>CD</MenuItem>
        <MenuItem value={'lp.json'}>LP</MenuItem>
        <MenuItem value={'mp3.json'}>MP3</MenuItem>
      </Select>
      <Link underline='hover' href='#' onClick={handleSignout} sx={{ marginLeft: '60%' }}>Sign out</Link>
    </header>
  )
}
