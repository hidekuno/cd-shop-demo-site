/*
 * cd shop demo program
 *
 * hidekuno@gmail.com
 *
 */
'use strict'

export const ADD_ITEM = 'ADD_ITEM'
export const DEL_ITEM = 'DEL_ITEM'
export const CLEAR_ITEMS = 'CLEAR_ITEMS'
export const ADD_POINT = 'ADD_POINT'
export const DEL_POINT = 'DEL_POINT'

const getItem = (cart, id) => cart.find((item) => item.id === id)
const deleteItem = (cart, id) => cart.filter((item) => item.id !== id)
const existsItem = (cart, id) => cart.some((item) => item.id === id)

export const cartReducer = (state, action) => {
  switch (action.type) {
  case ADD_ITEM:
    return {
      ...state,
      cart: (() => {
        if (existsItem(state.cart, action.payload.id)) {
          const item = getItem(state.cart, action.payload.id)
          item.qty = item.qty + 1
          item.totalPrice = item.price * item.qty
          return [ ...state.cart ]
        } else {
          const { id, title, artist, price, imageUrl, stock } = action.payload
          return [
            {
              id,
              title,
              price,
              artist,
              imageUrl,
              stock,
              qty: 1,
              totalPrice: price
            },
            ...state.cart
          ]
        }
      })()
    }
  case DEL_ITEM: {
    const item = getItem(state.cart, action.payload.id)
    item.qty = item.qty - 1
    return {
      ...state,
      cart: (() => {
        if (item.qty === 0) {
          return deleteItem(state.cart, action.payload.id)
        } else {
          item.totalPrice = item.price * item.qty
          return [ ...state.cart ]
        }
      })()
    }
  }
  case CLEAR_ITEMS:
    return { ...state, cart: [] }

  case ADD_POINT:
    return { ...state, point: state.point + action.payload.point }

  case DEL_POINT: {
    const point = state.point - action.payload.point
    return { ...state, point: (point < 0) ? 0 : point }
  }
  default:
    throw new Error('No such action type')
  }
}
