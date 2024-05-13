/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

import React, { createContext, useReducer } from 'react'
import { cartReducer } from './reducers/cartReducer.js'
import { shopReducer } from './reducers/shopReducer.js'
import { POINT_INIT_VAL } from './constants'

export const ShopContext = createContext({})
export const CartContext = createContext({})

export const StoreContextProvider = (props) => {
  const [shopState, shopDispatch] = useReducer(shopReducer, { username: '', order: [] })
  const [cartState, cartDispatch] = useReducer(cartReducer, { cart: [], point: POINT_INIT_VAL })

  // console.log('StoreContextProvider render')
  return (
    <ShopContext.Provider value={{ state: shopState, dispatch: shopDispatch }}>
      <CartContext.Provider value={{ state: cartState, dispatch: cartDispatch }}>
        {props.children}
      </CartContext.Provider>
    </ShopContext.Provider>
  )
}
