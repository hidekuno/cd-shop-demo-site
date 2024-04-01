'use strict'

import React, { useReducer } from 'react'
import { cartReducer } from './reducers'

export const ShopContext = React.createContext({})
const POINT_INIT_VAL = 100
const initialState = { cart: [], point: POINT_INIT_VAL, jsonfile: 'cd.json' }

export const ShopContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <ShopContext.Provider value={{state,dispatch}}>
      {props.children}
    </ShopContext.Provider>
  )
}
