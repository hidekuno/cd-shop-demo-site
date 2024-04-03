'use strict'

import React, { useReducer } from 'react'
import { cartReducer } from './reducers/cartReducer.js'
import { shopReducer } from './reducers/shopReducer.js'

export const ShopContext = React.createContext({})
export const CartContext = React.createContext({})


export const ShopContextProvider = (props) => {
  const JSON_INIT_VAL = 'cd.json'
  const initialState = { jsonfile: JSON_INIT_VAL }
  const [state, dispatch] = useReducer(shopReducer, initialState)

  return (
    <ShopContext.Provider value={{state,dispatch}}>
      {props.children}
    </ShopContext.Provider>
  )
}
export const CartContextProvider = (props) => {
  const POINT_INIT_VAL = 100
  const initialState = { cart: [], point: POINT_INIT_VAL }
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{state,dispatch}}>
      {props.children}
    </CartContext.Provider>
  )
}
