'use strict'

// fix. ReferenceError: React is not defined when npm test
import React, {useContext} from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import '../App.css'
import { ShopContext } from '../store'
import { changeItemList } from '../actions/shopAction'

export const Header = () => {
  const {state, dispatch} = useContext(ShopContext)

  const handleChange = (event) => {
    dispatch(changeItemList(event.target.value))
  }
  return (
    <header className="header">
      CD Shop <i><b>Demo</b></i> Site
      <Select
        labelId="demo-simple-select-label"
        sx={{ height: 30, marginLeft : 10}}
        onChange={handleChange}
        value={state.jsonfile}
        data-testid="select-element"
        id="demo-simple-select">
        <MenuItem value={'cd.json'}>CD</MenuItem>
        <MenuItem value={'lp.json'}>LP</MenuItem>
        <MenuItem value={'mp3.json'}>MP3</MenuItem>
      </Select>
    </header>
  )
}
