'use strict'

export const ADD_ITEM = 'ADD_ITEM'
export const DEL_ITEM = 'DEL_ITEM'
export const CLEAR_ITEMS = 'CLEAR_ITEMS'
export const ADD_POINT = 'ADD_POINT'
export const DEL_POINT = 'DEL_POINT'
export const SET_JSONFILE = 'SET_JSONFILE'

const getItem = (cart, id) => cart.find((item) => item.id === id)
const deleteItem = (cart, id) => cart.filter((item) => item.id !== id)
const existsItem = (cart, id) =>  cart.some((item) => item.id === id)

export const cartReducer = (state, action) => {
  switch (action.type) {
  case ADD_ITEM:
    return {
      ...state,
      cart: (() => {
        if (existsItem(state.cart, action.payload.id)) {

          const item = getItem(state.cart, action.payload.id)
          return [
            {
              ...item,
              stock: item.stock + 1,
              totalPrice: item.price * (item.stock + 1),
            },
            ...deleteItem(state.cart, action.payload.id),
          ]
        } else {
          const { id, title, artist, price, imageUrl } = action.payload
          return [
            {
              id,
              title,
              price,
              artist,
              imageUrl,
              stock: 1,
              totalPrice: price,
            },
            ...state.cart,
          ]
        }
      })()
    }
  case DEL_ITEM: {
    const item = getItem(state.cart, action.payload.id)
    const stock = item.stock - 1
    return {
      ...state,
      cart: (() => {
        if (stock === 0) {
          return deleteItem(state.cart, action.payload.id)
        } else {
          return [
            {
              ...item,
              stock: stock,
              totalPrice: item.price * stock,
            },
            ...deleteItem(state.cart, action.payload.id),
          ]
        }
      })()
    }
  }
  case CLEAR_ITEMS:
    return { cart: [], point: state.point, jsonfile: state.jsonfile }

  case ADD_POINT:
    return { cart: state.cart, point: state.point + action.payload.point, jsonfile: state.jsonfile }

  case DEL_POINT: {
    const point = state.point - action.payload.point
    return { cart: state.cart, point: (0 > point)? 0 : point, jsonfile: state.jsonfile }
  }
  case SET_JSONFILE:
    return { cart: state.cart, point: state.point, jsonfile: action.payload.jsonfile }

  default:
    throw new Error('No such action type')
  }
}
